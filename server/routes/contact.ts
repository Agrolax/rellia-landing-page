import type { RequestHandler } from "express"
import { appendFile, mkdir } from "fs/promises"
import path from "path"
import { z } from "zod"
import {
  isContactEmailConfigured,
  sendContactNotificationEmail,
  type ContactEmailPayload,
} from "../lib/contactEmail"

const contactBodySchema = z.object({
  email: z.string().trim().email().max(320),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  companyName: z.string().trim().max(120).optional(),
  jobTitle: z.string().trim().max(120).optional(),
  companySize: z.string().trim().max(80).optional(),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(10000),
})

const getSubmissionsFilePath = (): string => {
  const override = process.env.CONTACT_SUBMISSIONS_PATH?.trim()
  if (override) {
    return path.isAbsolute(override) ? override : path.join(process.cwd(), override)
  }
  return path.join(process.cwd(), "data", "contact-submissions.jsonl")
}

const appendSubmissionRecord = async (payload: z.infer<typeof contactBodySchema>): Promise<void> => {
  const filePath = getSubmissionsFilePath()
  await mkdir(path.dirname(filePath), { recursive: true })
  const record = JSON.stringify(
    {
      receivedAt: new Date().toISOString(),
      ...payload,
    },
    null,
    2
  )
  const block = `${record}\n\n`
  await appendFile(filePath, block, "utf8")
}

export const handleContactSubmit: RequestHandler = async (req, res) => {
  const parsed = contactBodySchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid form data" })
    return
  }

  const payload = parsed.data

  if (process.env.NODE_ENV !== "production") {
    console.info("[api/contact]", {
      ...payload,
      message: `${payload.message.slice(0, 200)}${payload.message.length > 200 ? "…" : ""}`,
    })
  }

  let fileSaved = false
  try {
    await appendSubmissionRecord(payload)
    fileSaved = true
  } catch (err) {
    console.error("[api/contact] Failed to persist submission", err)
  }

  let emailSent = false
  if (isContactEmailConfigured()) {
    try {
      await sendContactNotificationEmail(payload as ContactEmailPayload)
      emailSent = true
    } catch (err) {
      console.error("[api/contact] Failed to send notification email", err)
    }
  }

  if (!fileSaved && !emailSent) {
    res.status(503).json({ ok: false, error: "Could not save submission" })
    return
  }

  res.status(200).json({ ok: true })
}
