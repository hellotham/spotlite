/**
 * The article taxonomy: a small, closed set of categories, and an open set of tags.
 *
 * Standard blog practice, and the split does real work here. **Categories** answer two
 * questions a reader of a CV site actually asks — where was this published, and what is
 * it about — so they are few, fixed, and browsable as their own pages. An article
 * usually carries two, one of each kind. **Tags** are subject matter, open-ended, and
 * exist to be counted: the cloud on /articles sizes each by how many articles carry it,
 * which only means something if the vocabulary is reused deliberately between entries
 * rather than reworded per article. "Enterprise architecture" and "Architecture" would
 * be two tags and half the weight.
 *
 * Adding a category is a deliberate act: it appears in the grid, gets a route, and every
 * article has to be reconsidered against it. Adding a tag is not.
 */

export interface ArticleCategory {
  /** The label, as it appears on the grid and in frontmatter. */
  name: string
  /** URL segment for /articles/<slug>/. */
  slug: string
  /** One line under the name on the grid. */
  blurb: string
  /** Provenance categories come first on the grid; subject categories follow. */
  kind: 'provenance' | 'subject'
}

export const ARTICLE_CATEGORIES: readonly ArticleCategory[] = [
  {
    name: 'Conference papers',
    slug: 'conference-papers',
    blurb:
      'Papers and talks given at conferences and seminars, reproduced from the decks and manuscripts they were delivered from.',
    kind: 'provenance'
  },
  {
    name: 'Published articles',
    slug: 'published-articles',
    blurb:
      'Writing that appeared in a magazine or on another site, republished here with a link to where it ran.',
    kind: 'provenance'
  },
  {
    name: 'Written for this site',
    slug: 'written-for-this-site',
    blurb:
      'Pieces written here rather than reproduced from anywhere, some of them filed under the date of the work they describe.',
    kind: 'provenance'
  },
  {
    name: 'Academic work',
    slug: 'academic-work',
    blurb:
      'Assignments written for assessment rather than for readers, reproduced from the manuscripts they were submitted as.',
    kind: 'provenance'
  },
  {
    name: 'Audio and video',
    slug: 'audio-and-video',
    blurb: 'Home theatre, digital audio, and the measurements behind the arguments about them.',
    kind: 'subject'
  },
  {
    name: 'DVD reviews',
    slug: 'dvd-reviews',
    blurb:
      'Discs reviewed for MichaelDVD between 2000 and 2001, judged on the transfer rather than the film.',
    kind: 'subject'
  },
  {
    name: 'Hardware reviews',
    slug: 'hardware-reviews',
    blurb: 'Players, amplifiers and one home theatre PC, measured as well as listened to.',
    kind: 'subject'
  },
  {
    name: 'SA-CD',
    slug: 'sa-cd',
    blurb:
      'Super Audio CD releases reviewed for SA-CD.net between 2003 and 2009, on the performance and the disc in equal measure.',
    kind: 'subject'
  },
  {
    name: 'Finance',
    slug: 'finance',
    blurb:
      'Markets, instruments and the institutions that trade them — including one bank I was working inside when it failed.',
    kind: 'subject'
  },
  {
    name: 'Software',
    slug: 'software',
    blurb: 'Programs I have written, and a few I have taken apart.',
    kind: 'subject'
  },
  {
    name: 'Career',
    slug: 'career',
    blurb:
      'Architecture practice, technology strategy, and what four decades of doing it taught me.',
    kind: 'subject'
  },
  {
    name: 'Computing history',
    slug: 'computing-history',
    blurb: 'Old machines, old formats, and how much of it still runs.',
    kind: 'subject'
  }
] as const

/** The names alone, for the Zod enum that validates frontmatter. */
export const CATEGORY_NAMES = ARTICLE_CATEGORIES.map((c) => c.name) as [string, ...string[]]

export const categoryBySlug = (slug: string) => ARTICLE_CATEGORIES.find((c) => c.slug === slug)

export const categoryByName = (name: string) => ARTICLE_CATEGORIES.find((c) => c.name === name)

/**
 * Tally a tag vocabulary across entries, heaviest first.
 *
 * Shared by the work history and the articles because the word cloud's spiral places
 * labels in the order it is given them — the heaviest tag has to arrive first or it does
 * not get the centre. Tags are de-duplicated within an entry: one entry repeating a tag
 * must not inflate its weight.
 */
export const countTags = (entries: { data: { tags?: string[] } }[]) => {
  const counts = new Map<string, number>()
  for (const entry of entries) {
    for (const tag of new Set(entry.data.tags ?? [])) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count || a.text.localeCompare(b.text))
}
