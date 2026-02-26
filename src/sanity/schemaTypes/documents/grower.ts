import { defineField, defineType } from 'sanity'
import { LeaveIcon } from '@sanity/icons'

export const grower = defineType({
  name: 'grower',
  title: 'Grower',
  type: 'document',
  icon: LeaveIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'gardenName',
      title: 'Garden Name',
      type: 'string',
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'gardenName', media: 'image' },
  },
})
