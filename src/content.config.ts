import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { rssSchema } from '@astrojs/rss'
import { glob, file } from 'astro/loaders'
import { CATEGORY_NAMES } from './utils/articles'
import { TAG_NAMES } from './utils/tags'

/**
 * Subjects, shared by every collection that carries them.
 *
 * A closed enum on purpose. Tags are counted into the word clouds and every distinct one
 * publishes a page at /tag/<slug>/, so a typo or a reworded synonym does not degrade
 * gracefully — it silently splits a subject across two pages, each claiming to be the
 * whole of it. Failing the build naming the offending value is the only version of this
 * that stays true a year later. See src/utils/tags.ts to add one.
 */
const tags = z.array(z.enum(TAG_NAMES)).default([])

const article = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/article' }),
  // rssSchema supplies title, description, pubDate and the rest of the feed's fields.
  // The taxonomy is added on top: categories in src/utils/articles.ts are article-only,
  // and tags in src/utils/tags.ts are shared with every other tagged collection. Both
  // are closed sets now — see the note on `tags` above for why that had to happen.
  schema: rssSchema.extend({
    // At least one: an uncategorised article appears in no grid cell and is reachable
    // only from the feed, which is how a piece quietly stops being findable.
    categories: z.array(z.enum(CATEGORY_NAMES)).min(1),
    tags
  })
})

const project = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/project' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      link: z.url(),
      image: image(),
      featured: z.boolean().optional(),
      tags
    })
})

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z
      .object({
        company: z.string(),
        role: z.string(),
        startyear: z.number(),
        endyear: z.number().optional(),
        type: z.enum(['employment', 'consulting']).default('employment'),
        // Load-bearing in three places: the teaser on the list pages, the role page's
        // meta description, and the CV itself. The body's first line makes a poor
        // teaser — entries that open with a heading or a lead-in like "Awarded:"
        // read as fragments — so this is written by hand, and has to read as all three.
        description: z.string(),
        // How much of this role each document carries. The body is always the website's,
        // in full; the CV never truncates it. See src/utils/cv.ts.
        //
        //   priority   full CV        one-pager
        //   1          the body       summary
        //   2          summary        description
        //   3          description    role, company and years only
        //
        // Summaries land on the one-pager for a priority 1 role, so they are the page's
        // scarcest resource: keep them to about two bullets. If the one-pager stops
        // fitting, lower a role's priority rather than shaving words.
        priority: z.union([z.literal(1), z.literal(2), z.literal(3)]),
        // Condensed key points, written by hand from the body. Required at priority 1
        // and 2, which is enforced below.
        summary: z.array(z.string()).optional(),
        tags,
        // Optional: an entry with no real mark falls back to a text monogram.
        image: image().optional(),
        // Optional extended wordmark, used where there is room for it (the detail page
        // header). Compact contexts — home page, list pages — keep the square `image`.
        logo: image().optional(),
        // Background of the logo tile, so a mark with its own solid background reads as a
        // seamless circular logo rather than floating on a contrasting disc. Defaults to
        // white, which suits both white-background and transparent marks.
        logoBackground: z.string().optional()
      })
      // A priority 1 or 2 role has nowhere to fall back to if its summary is missing:
      // the full CV would print an empty role at priority 2, and the one-pager at
      // priority 1. Fail the build here instead, naming the field.
      .refine((entry) => entry.priority === 3 || (entry.summary?.length ?? 0) > 0, {
        message: 'summary is required at priority 1 and 2',
        path: ['summary']
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
      // As for work, load-bearing three times over: list-page teaser, meta description,
      // and the line the one-pager carries. Terse — typically the awards, one line.
      description: z.string(),
      // Education carries no priority: every qualification is shown, and all of them
      // behave as a work entry at priority 2 — the full CV takes the summary, the
      // one-pager the description, the website the body. So this is always required.
      summary: z.array(z.string()),
      // Optional: an entry with no real mark falls back to a text monogram.
      image: image().optional(),
      // As above: optional extended wordmark for the detail page header.
      logo: image().optional(),
      // Background of the logo tile, so a mark with its own solid background reads as a
      // seamless circular logo rather than floating on a contrasting disc. Defaults to
      // white, which suits both white-background and transparent marks.
      logoBackground: z.string().optional(),
      tags
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
    link: z.string().optional(),
    tags
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
    // What each variant carries. How much of a *role* it carries is not settled here —
    // that is the entry's own `priority`, so it can be judged against the role rather
    // than against a global count.
    onePage: z.object({
      minCompetencyLevel: z.number(),
      earlierCareerHeading: z.string()
    }),
    full: z.object({
      minCompetencyLevel: z.number()
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
