import { createImageUrlBuilder } from '@sanity/image-url'

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hg1dwww9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
