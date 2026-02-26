import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/outdoor-classroom/:slug',
      filter: '_type == "outdoorClass" && slug.current == $slug',
    },
    {
      route: '/blog/:slug',
      filter: '_type == "blogPost" && slug.current == $slug',
    },
    {
      route: '/events/:slug',
      filter: '_type == "event" && slug.current == $slug',
    },
  ]),
  locations: {
    siteSettings: defineLocations({
      message: 'This document is used on all pages',
      tone: 'caution',
    }),
    outdoorClass: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/outdoor-classroom/${doc?.slug}`,
          },
          {
            title: 'Outdoor Classroom',
            href: '/outdoor-classroom',
          },
        ],
      }),
    }),
    event: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/events/${doc?.slug}`,
          },
          {
            title: 'Events',
            href: '/events',
          },
        ],
      }),
    }),
    blogPost: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/blog/${doc?.slug}`,
          },
          {
            title: 'Blog',
            href: '/blog',
          },
        ],
      }),
    }),
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
}
