import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
      initialValue: "Katie's Krops",
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'impactStats',
      title: 'Impact Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'donationUrl',
      title: 'Donation URL',
      type: 'url',
      description: 'CharityProud donation link',
    }),
    defineField({
      name: 'newsletterSignupUrl',
      title: 'Newsletter Signup URL',
      type: 'url',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'defaultPolicies',
      title: 'Default Class Policies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Shown on all class pages unless a class overrides them',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
