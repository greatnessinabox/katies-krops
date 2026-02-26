import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons'

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'object',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
    }),
  ],
})
