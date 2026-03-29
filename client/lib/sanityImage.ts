import imageUrlBuilder from "@sanity/image-url"
import { getSanityDataset, getSanityProjectId } from "@/lib/sanity"

const builder = imageUrlBuilder({
  projectId: getSanityProjectId(),
  dataset: getSanityDataset(),
})

export const urlForImage = (source: unknown): string | null => {
  if (!source || typeof source !== "object") return null
  try {
    return builder.image(source as Parameters<typeof builder.image>[0]).auto("format").quality(85).url()
  } catch {
    return null
  }
}
