import { defineField, defineType } from 'sanity'
import { SearchIcon } from '@sanity/icons'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page title in search results (50-60 characters ideal)',
      validation: (rule) => rule.max(70).warning('Titles over 60 characters may be truncated in search results'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'A short summary for search engines (150-160 characters ideal)',
      validation: (rule) => rule.max(160).warning('Descriptions over 160 characters may be truncated'),
    }),
    defineField({
      name: 'image',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Displayed when shared on social media (1200x630 recommended)',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description: 'When enabled, this page will not appear in search results',
    }),
  ],
})
