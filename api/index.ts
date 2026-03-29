/**
 * Vercel: export the Express app directly. Do not use serverless-http here — it expects
 * an AWS Lambda (event, context) shape and crashes with FUNCTION_INVOCATION_FAILED.
 * Netlify continues to use serverless-http in netlify/functions/api.ts.
 */
import { createServer } from "../server/index"

const app = createServer()
export default app
