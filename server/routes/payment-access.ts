import { timingSafeEqual } from "crypto"
import type { RequestHandler } from "express"

const safeCompare = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a, "utf8")
  const bufB = Buffer.from(b, "utf8")
  if (bufA.length !== bufB.length) {
    return false
  }
  return timingSafeEqual(bufA, bufB)
}

export const isPaymentKeyValid = (key: string): boolean => {
  const configured = process.env.PAYMENT_PAGE_SECRET?.trim()
  if (!configured) {
    return false
  }
  if (!key) {
    return false
  }
  return safeCompare(key, configured)
}

export const handlePaymentAccess: RequestHandler = (req, res) => {
  if (!process.env.PAYMENT_PAGE_SECRET?.trim()) {
    res.status(503).json({ ok: false, error: "Payment gate not configured" })
    return
  }

  const key = typeof req.query.key === "string" ? req.query.key : ""
  if (!isPaymentKeyValid(key)) {
    res.status(403).json({ ok: false })
    return
  }

  res.status(200).json({ ok: true })
}
