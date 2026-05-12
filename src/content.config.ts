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
      image: image()
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
      image: image()
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

export const collections = { article, project, work, education, social, page, creation, passion }
