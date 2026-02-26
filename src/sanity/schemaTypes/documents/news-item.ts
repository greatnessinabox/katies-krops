import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const newsItem = defineType({
  name: 'newsItem',
  title: 'News / Press',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Publication or news outlet name',
    }),
    defineField({
      name: 'url',
      title: 'Article URL',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'source' },
  },
})
