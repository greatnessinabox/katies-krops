import { defineField, defineType } from 'sanity'
import { TransferIcon } from '@sanity/icons'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: TransferIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description: 'The old URL path (must start with /)',
      validation: (rule) =>
        rule
          .required()
          .custom((value) => {
            if (typeof value === 'string' && !value.startsWith('/')) {
              return 'Source must start with /'
            }
            return true
          }),
    }),
    defineField({
      name: 'destination',
      title: 'Destination Path',
      type: 'string',
      description: 'The new URL path to redirect to',
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const source = (context.parent as { source?: string })?.source
          if (value === source) {
            return 'Destination must be different from source'
          }
          return true
        }),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      initialValue: true,
      description: 'Use 301 for permanent redirects, 302 for temporary',
    }),
    defineField({
      name: 'isEnabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
      isEnabled: 'isEnabled',
    },
    prepare({ source, destination, permanent, isEnabled }) {
      return {
        title: `${source} → ${destination}`,
        subtitle: `${permanent ? '301' : '302'} ${isEnabled ? '' : '(disabled)'}`,
      }
    },
  },
})
