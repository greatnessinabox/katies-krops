import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const featuredClasses = defineType({
  name: 'featuredClasses',
  title: 'Featured Classes',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Upcoming Classes',
    }),
    defineField({
      name: 'limit',
      title: 'Number of Classes to Show',
      type: 'number',
      initialValue: 6,
      validation: (rule) => rule.min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Featured Classes', subtitle: 'Featured Classes Block' }
    },
  },
})
