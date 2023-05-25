import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function get(context) {
  const article = await getCollection('article')
  return rss({
    title: 'Spotlite',
    description: 'Personal Web Site',
    site: context.site,
    items: article.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.customData,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.slug}/`
    }))
  })
}
