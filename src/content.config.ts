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
      datespan: z.string(),
      image: image()
    })
})

const menu = defineCollection({
  loader: file('src/menu.json', { parser: (text) => JSON.parse(text) }),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    link: z.string()
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
  schema: z
    .object({
      title: z.string(),
      heading: z.string().optional(),
      description: z.string().optional(),
      draft: z.boolean().optional().default(false),
      layout: z.string(),
      image: z.string().optional()
    })
    .catchall(z.any())
})

export const collections = { article, project, work, menu, social, page }
