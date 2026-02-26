import type { StructureResolver } from 'sanity/structure'
import { CogIcon, CalendarIcon, UsersIcon, DocumentTextIcon, SearchIcon, TransferIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings singleton
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),

      // Outdoor Classroom
      S.listItem()
        .title('Outdoor Classroom')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Outdoor Classroom')
            .items([
              S.listItem()
                .title('Classes')
                .schemaType('outdoorClass')
                .child(
                  S.documentTypeList('outdoorClass')
                    .title('Classes')
                    .defaultOrdering([{ field: 'date', direction: 'desc' }])
                ),
              S.listItem()
                .title('Instructors')
                .schemaType('instructor')
                .child(S.documentTypeList('instructor').title('Instructors')),
            ])
        ),

      // Events
      S.listItem()
        .title('Events & Programs')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events & Programs')
            .items([
              S.listItem()
                .title('All Events')
                .schemaType('event')
                .child(
                  S.documentTypeList('event')
                    .title('Events')
                    .defaultOrdering([{ field: 'date', direction: 'desc' }])
                ),
            ])
        ),

      // Community
      S.listItem()
        .title('Community')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Community')
            .items([
              S.listItem()
                .title('Team Members')
                .schemaType('teamMember')
                .child(S.documentTypeList('teamMember').title('Team Members')),
              S.listItem()
                .title('Growers')
                .schemaType('grower')
                .child(S.documentTypeList('grower').title('Growers')),
              S.listItem()
                .title('Partners')
                .schemaType('partner')
                .child(S.documentTypeList('partner').title('Partners')),
            ])
        ),
      S.divider(),

      // Content
      S.listItem()
        .title('Content')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('Pages')
                .schemaType('page')
                .child(S.documentTypeList('page').title('Pages')),
              S.listItem()
                .title('Blog Posts')
                .schemaType('blogPost')
                .child(
                  S.documentTypeList('blogPost')
                    .title('Blog Posts')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('FAQ')
                .schemaType('faqItem')
                .child(S.documentTypeList('faqItem').title('FAQ')),
              S.listItem()
                .title('News / Press')
                .schemaType('newsItem')
                .child(
                  S.documentTypeList('newsItem')
                    .title('News / Press')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
            ])
        ),
      S.divider(),

      // SEO & Config
      S.listItem()
        .title('SEO & Config')
        .icon(SearchIcon)
        .child(
          S.list()
            .title('SEO & Config')
            .items([
              S.listItem()
                .title('Redirects')
                .icon(TransferIcon)
                .schemaType('redirect')
                .child(S.documentTypeList('redirect').title('Redirects')),
            ])
        ),
    ])
