import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { rssSchema } from '@astrojs/rss'
import { glob, file } from 'astro/loaders'

const article = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/article' }),
  schema: rssSchema
})

const project = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/project' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      link: z.url(),
      image: image(),
      featured: z.boolean().optional()
    })
})

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      role: z.string(),
      startyear: z.number(),
      endyear: z.number().optional(),
      type: z.enum(['employment', 'consulting']).default('employment'),
      // Short summary shown on the list pages. The body's first line makes a poor
      // teaser — entries that open with a heading or a lead-in like "Awarded:"
      // read as fragments.
      description: z.string().optional(),
      // Capabilities, domains and technologies this role involved. Aggregated across
      // the collection into the word cloud on /work, where a tag's size is how many
      // roles carry it — so the vocabulary has to be reused deliberately between
      // entries rather than reworded per entry ("IT strategy" and "Technology
      // strategy" are distinct tags on purpose; "Analytics" vs "Data analytics"
      // would be an accident).
      tags: z.array(z.string()).optional().default([]),
      // Optional: an entry with no real mark falls back to a text monogram.
      image: image().optional(),
      // Optional extended wordmark, used where there is room for it (the detail page
      // header). Compact contexts — home page, list pages — keep the square `image`.
      logo: image().optional(),
      // Background of the logo tile, so a mark with its own solid background reads as a
      // seamless circular logo rather than floating on a contrasting disc. Defaults to
      // white, which suits both white-background and transparent marks.
      logoBackground: z.string().optional(),
      // CV curation. Deterministic overrides for the generated CV; the site ignores them.
      // cvPriority raises a role in the one-pager shortlist (higher wins, default is recency).
      cvPriority: z.number().optional(),
      // Drop the role from the CV entirely (kept on the site).
      omitFromCv: z.boolean().optional().default(false),
      // Condensed single line used when the role falls into "Earlier career".
      oneLiner: z.string().optional()
    })
})

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: ({ image }) =>
    z.object({
      institution: z.string(),
      degree: z.string(),
      startyear: z.number(),
      endyear: z.number().optional(),
      // Short summary shown on the list pages. The body's first line makes a poor
      // teaser — entries that open with a heading or a lead-in like "Awarded:"
      // read as fragments.
      description: z.string().optional(),
      // Optional: an entry with no real mark falls back to a text monogram.
      image: image().optional(),
      // As above: optional extended wordmark for the detail page header.
      logo: image().optional(),
      // Background of the logo tile, so a mark with its own solid background reads as a
      // seamless circular logo rather than floating on a contrasting disc. Defaults to
      // white, which suits both white-background and transparent marks.
      logoBackground: z.string().optional(),
      omitFromCv: z.boolean().optional().default(false)
    })
})

const social = defineCollection({
  loader: file('src/social.json', { parser: (text) => JSON.parse(text) }),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    link: z.string(),
    icon: z.string()
  })
})

const page = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/page' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      title: z.string(),
      shorttitle: z.string(),
      description: z.string().optional(),
      draft: z.boolean().optional().default(false),
      layout: z.string(),
      image: image().optional(),
      list: z.array(z.any()).optional()
    })
})

const creation = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/creation' }),
  schema: z.object({
    section: z.string(),
    item: z.string(),
    parent: z.string().optional(),
    description: z.string(),
    action: z.string().optional(),
    link: z.string().optional()
  })
})

const passion = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/passion' }),
  schema: z.object({
    section: z.string(),
    item: z.string(),
    description: z.string()
  })
})

// The CV's editorial copy. Only parameters are validated here: the prose lives in the
// body as markdown, because a person has to write and review it, and is parsed and
// checked by parseCvCopy in src/utils/cv.ts.
const cv = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cv' }),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    contact: z.object({
      email: z.string(),
      phone: z.string(),
      location: z.string(),
      linkedin: z.string(),
      website: z.string()
    }),
    onePage: z.object({
      maxRoles: z.number(),
      maxBulletsPerRole: z.number(),
      minCompetencyLevel: z.number(),
      earlierCareerHeading: z.string(),
      maxEarlierRoles: z.number()
    }),
    full: z.object({
      minCompetencyLevel: z.number(),
      detailedRoles: z.number(),
      maxBulletsPerEarlierRole: z.number()
    })
  })
})

export const collections = {
  article,
  project,
  work,
  education,
  social,
  page,
  creation,
  passion,
  cv
}
