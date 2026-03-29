import type { RequestHandler } from "express"
import Stripe from "stripe"

export const handleCreateEmbeddedCheckout: RequestHandler = async (_req, res) => {
  const secret = process.env.STRIPE_SECRET_KEY?.trim()
  const priceId = process.env.STRIPE_PRICE_ID?.trim()
  if (!secret || !priceId) {
    res.status(503).json({ ok: false, error: "Stripe checkout not configured" })
    return
  }

  const stripe = new Stripe(secret)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded_page",
      line_items: [{ price: priceId, quantity: 1 }],
      redirect_on_completion: "never",
    })

    if (!session.client_secret) {
      res.status(500).json({ ok: false, error: "Missing client secret" })
      return
    }

    res.status(200).json({ ok: true, clientSecret: session.client_secret })
  } catch (err) {
    console.error("[api/create-embedded-checkout]", err)
    res.status(500).json({ ok: false, error: "Could not start checkout" })
  }
}
