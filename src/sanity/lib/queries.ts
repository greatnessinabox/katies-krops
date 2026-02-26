import { defineQuery } from 'next-sanity'

// Outdoor Classes
export const OUTDOOR_CLASSES_QUERY = defineQuery(`
  *[_type == "outdoorClass" && status in ["upcoming", "full", "waitlist"]
    && ($ageGroup == "all" || ageGroup == $ageGroup)
    && ($category == "all" || category == $category)
  ] | order(date asc) {
    _id,
    _type,
    title,
    slug,
    date,
    endTime,
    ageGroup,
    category,
    price,
    scholarshipAvailable,
    maxCapacity,
    status,
    registrationUrl,
    image {
      ...,
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    instructor-> { _id, name, image },
    location
  }
`)

export const OUTDOOR_CLASS_BY_SLUG_QUERY = defineQuery(`
  *[_type == "outdoorClass" && slug.current == $slug][0] {
    ...,
    image {
      ...,
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    instructor-> { _id, name, bio, image },
    "siteSettings": *[_type == "siteSettings"][0] {
      defaultPolicies,
      donationUrl
    }
  }
`)

// Site Settings
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    ...,
    socialLinks[]
  }
`)

// Events
export const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(date desc) {
    _id,
    _type,
    title,
    slug,
    date,
    endDate,
    location,
    eventUrl,
    category,
    image {
      ...,
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`)

// Blog Posts
export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    excerpt,
    publishedAt,
    author-> { name },
    image {
      ...,
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`)

// FAQ
export const FAQ_ITEMS_QUERY = defineQuery(`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    _type,
    question,
    answer,
    category
  }
`)

// Team
export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    _type,
    name,
    role,
    bio,
    image {
      ...,
      asset-> {
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`)
