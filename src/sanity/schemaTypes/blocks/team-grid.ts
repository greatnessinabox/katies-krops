import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const teamGrid = defineType({
  name: 'teamGrid',
  title: 'Team Grid',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Our Team',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Team Grid', subtitle: 'Team Grid Block' }
    },
  },
})
