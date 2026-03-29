import { createClient, type SanityClient } from "@sanity/client"

const DEFAULT_PROJECT_ID = "ggbt0o98"
const DEFAULT_DATASET = "production"

export const getSanityProjectId = (): string =>
  import.meta.env.VITE_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID

export const getSanityDataset = (): string =>
  import.meta.env.VITE_SANITY_DATASET || DEFAULT_DATASET

export const isSanityConfigured = (): boolean => Boolean(getSanityProjectId())

let client: SanityClient | null = null

export const getSanityClient = (): SanityClient | null => {
  if (!isSanityConfigured()) return null
  if (!client) {
    client = createClient({
      projectId: getSanityProjectId(),
      dataset: getSanityDataset(),
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  }
  return client
}

export const sanityFetch = async <T>(query: string, params?: Record<string, unknown>): Promise<T | null> => {
  const c = getSanityClient()
  if (!c) return null
  try {
    return await c.fetch<T>(query, params ?? {})
  } catch {
    return null
  }
}
