import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const outdoorClass = defineType({
  name: 'outdoorClass',
  title: 'Outdoor Class',
  type: 'document',
  icon: CalendarIcon,
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
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'date',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'datetime',
    }),
    defineField({
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          { title: 'K-2', value: 'K-2' },
          { title: '3-5', value: '3-5' },
          { title: 'All Ages', value: 'All Ages' },
          { title: 'Adults', value: 'Adults' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Nature', value: 'Nature' },
          { title: 'Cooking', value: 'Cooking' },
          { title: 'Art', value: 'Art' },
          { title: 'Literacy', value: 'Literacy' },
          { title: 'Gardening', value: 'Gardening' },
          { title: 'Wildlife', value: 'Wildlife' },
          { title: 'STEM', value: 'STEM' },
          { title: 'History', value: 'History' },
          { title: 'Field Trip', value: 'Field Trip' },
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'scholarshipAvailable',
      title: 'Scholarship Available',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'maxCapacity',
      title: 'Max Capacity',
      type: 'number',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'location',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      description: 'CharityProud registration link',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.warning('Alt text improves accessibility and SEO'),
        }),
      ],
    }),
    defineField({
      name: 'policies',
      title: 'Class-Specific Policies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Override default policies for this specific class',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Full', value: 'full' },
          { title: 'Waitlist', value: 'waitlist' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (Oldest)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      status: 'status',
      media: 'image',
    },
    prepare({ title, date, status, media }) {
      const d = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: `${d} — ${status || 'upcoming'}`,
        media,
      }
    },
  },
})
