import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'link',
    }),
    defineField({
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Accent', value: 'accent' },
          { title: 'Inverted', value: 'inverted' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'CTA Section', subtitle: 'Call to Action' }
    },
  },
})
