import { defineField, defineType, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'ctaSection' }),
        defineArrayMember({ type: 'featuredClasses' }),
        defineArrayMember({ type: 'teamGrid' }),
        defineArrayMember({ type: 'faqAccordion' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
