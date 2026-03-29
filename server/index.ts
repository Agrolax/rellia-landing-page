import "./loadEnv"
import cors from "cors"
import express, { type Request, type RequestHandler } from "express"
import { handleDemo } from "./routes/demo"
import { handleCreateEmbeddedCheckout } from "./routes/stripe-embedded-checkout"

const headerOne = (req: Request, name: string): string | undefined => {
  const v = req.headers[name]
  if (Array.isArray(v)) return v[0]
  return typeof v === "string" ? v : undefined
}

/** vercel.json rewrites /api/* → /api; restore the real path so Express routes match */
const fixVercelRewrittenApiPath: RequestHandler = (req, _res, next) => {
  if (!process.env.VERCEL) {
    next()
    return
  }
  try {
    const u = new URL(req.url, "http://v.internal")
    const path = u.pathname
    if (path !== "/api" && path !== "/api/") {
      next()
      return
    }
    const candidate = headerOne(req, "x-invoke-path") || headerOne(req, "x-matched-path")
    if (!candidate?.startsWith("/api/")) {
      next()
      return
    }
    const pathOnly = candidate.split("?")[0] ?? ""
    if (!pathOnly || pathOnly === "/api" || pathOnly === "/api/") {
      next()
      return
    }
    req.url = pathOnly + (u.search || "")
  } catch {
    // leave req.url
  }
  next()
}

export function createServer() {
  const app = express()

  app.use(fixVercelRewrittenApiPath)

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
  app.post("/api/create-embedded-checkout", handleCreateEmbeddedCheckout)

  return app
}
