import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import { handleDemo } from "./routes/demo"
import { handlePaymentAccess } from "./routes/payment-access"
import { handleCreateEmbeddedCheckout } from "./routes/stripe-embedded-checkout"

const serverDir = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(serverDir, "..", ".env") })

export function createServer() {
  const app = express()

  // Middleware
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping"
    res.json({ message: ping })
  })

  app.get("/api/demo", handleDemo)
  app.get("/api/payment-access", handlePaymentAccess)
  app.post("/api/create-embedded-checkout", handleCreateEmbeddedCheckout)

  return app
}
