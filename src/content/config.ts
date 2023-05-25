import { defineCollection, z } from 'astro:content'
import { rssSchema } from '@astrojs/rss'

const article = defineCollection({
  schema: rssSchema
})

const project = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      link: z.string().url(),
      image: image(),
      featured: z.boolean().optional()
    })
})

const work = defineCollection({
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      role: z.string(),
      datespan: z.string(),
      image: image()
    })
})

const menu = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    link: z.string()
  })
})

const social = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    link: z.string().url(),
    icon: z.string()
  })
})

export const collections = { article, project, work, menu, social }
