import { Resend } from "resend"

export type ContactEmailPayload = {
  email: string
  firstName: string
  lastName: string
  companyName?: string
  jobTitle?: string
  companySize?: string
  phone?: string
  subject: string
  message: string
}

export const isContactEmailConfigured = (): boolean => {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_TO_EMAIL?.trim())
}

const buildPlainText = (payload: ContactEmailPayload): string => {
  const lines: string[] = [
    "New contact form submission",
    `Time (server): ${new Date().toISOString()}`,
    "",
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
  ]
  if (payload.companyName) {
    lines.push(`Company: ${payload.companyName}`)
  }
  if (payload.jobTitle) {
    lines.push(`Job title: ${payload.jobTitle}`)
  }
  if (payload.companySize) {
    lines.push(`Company size: ${payload.companySize}`)
  }
  if (payload.phone) {
    lines.push(`Phone: ${payload.phone}`)
  }
  lines.push("", `Subject: ${payload.subject}`, "", "Message:", payload.message)
  return lines.join("\n")
}

export const sendContactNotificationEmail = async (payload: ContactEmailPayload): Promise<void> => {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim()
  if (!apiKey || !to) {
    return
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ?? "Rellia Health <onboarding@resend.dev>"

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `[Rellia contact] ${payload.subject}`,
    text: buildPlainText(payload),
    replyTo: payload.email,
  })

  if (error) {
    throw new Error(error.message)
  }
}
