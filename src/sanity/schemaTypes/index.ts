// Objects
import { seo } from './objects/seo'
import { link } from './objects/link'
import { location } from './objects/location'
import { socialLink } from './objects/social-link'

// Documents
import { outdoorClass } from './documents/outdoor-class'
import { instructor } from './documents/instructor'
import { event } from './documents/event'
import { teamMember } from './documents/team-member'
import { blogPost } from './documents/blog-post'
import { page } from './documents/page'
import { faqItem } from './documents/faq-item'
import { partner } from './documents/partner'
import { grower } from './documents/grower'
import { newsItem } from './documents/news-item'
import { redirect } from './documents/redirect'
import { siteSettings } from './documents/site-settings'

// Blocks (page builder)
import { hero } from './blocks/hero'
import { richText } from './blocks/rich-text'
import { ctaSection } from './blocks/cta-section'
import { featuredClasses } from './blocks/featured-classes'
import { teamGrid } from './blocks/team-grid'
import { faqAccordionBlock } from './blocks/faq-accordion'

export const schemaTypes = [
  // Objects
  seo,
  link,
  location,
  socialLink,
  // Documents
  outdoorClass,
  instructor,
  event,
  teamMember,
  blogPost,
  page,
  faqItem,
  partner,
  grower,
  newsItem,
  redirect,
  siteSettings,
  // Blocks
  hero,
  richText,
  ctaSection,
  featuredClasses,
  teamGrid,
  faqAccordionBlock,
]
