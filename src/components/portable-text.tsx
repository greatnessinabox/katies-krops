import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            width={1200}
            height={675}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-stone-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = value?.href?.startsWith('/')
        ? undefined
        : 'noopener noreferrer'
      const target = value?.href?.startsWith('/') ? undefined : '_blank'
      return (
        <a
          href={value?.href}
          rel={rel}
          target={target}
          className="text-forest underline decoration-forest/30 underline-offset-2 transition-colors hover:decoration-forest"
        >
          {children}
        </a>
      )
    },
  },
}

interface PortableTextProps {
  value: any
}

export function PortableText({ value }: PortableTextProps) {
  return <SanityPortableText value={value} components={components} />
}
