import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export const faqAccordionBlock = defineType({
  name: 'faqAccordion',
  title: 'FAQ Accordion',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'filterCategory',
      title: 'Filter by Category',
      type: 'string',
      description: 'Only show FAQs from this category (leave empty for all)',
      options: {
        list: [
          { title: 'All', value: '' },
          { title: 'General', value: 'general' },
          { title: 'Outdoor Classroom', value: 'outdoor-classroom' },
          { title: 'Volunteering', value: 'volunteering' },
          { title: 'Donations', value: 'donations' },
          { title: 'Grants', value: 'grants' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'FAQ Accordion', subtitle: 'FAQ Block' }
    },
  },
})
