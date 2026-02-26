import { defineField, defineType } from 'sanity'
import { TextIcon } from '@sanity/icons'

export const richText = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Rich Text Block' }
    },
  },
})
