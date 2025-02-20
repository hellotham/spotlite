import { defineCollection, z } from 'astro:content'
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
      link: z.string().url(),
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
  loader: file('src/menu.json', { parser: (text) => JSON.parse(text) })
})

const social = defineCollection({
  loader: file('src/social.json', { parser: (text) => JSON.parse(text) })
})

export const collections = { article, project, work, menu, social }
