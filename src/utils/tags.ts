/**
 * Tags, which are one vocabulary shared by two collections.
 *
 * The work history and the articles are tagged from the same set of words, and a tag's
 * page shows both: six articles about enterprise architecture and the six roles that
 * practised it are the same subject seen twice, and splitting them into two vocabularies
 * would have been a filing decision pretending to be a distinction.
 *
 * That sharing is why this is its own module rather than part of `articles.ts`. Categories
 * are article-only — a closed set, one route each, declared over there. Tags are open,
 * counted, and belong to neither collection in particular, so nothing about a role has to
 * import from a module named for articles to describe itself.
 *
 * The vocabulary only works if it is reused deliberately between entries. A tag's size in
 * the clouds is how many entries carry it, and every distinct tag now gets a page of its
 * own, so writing "SOA" where the vocabulary already says "Service oriented architecture"
 * does not merely halve a weight: it publishes a second page and splits the entries
 * between them.
 */

/** The shape both collections satisfy — nothing here needs to know which one it has. */
export interface Tagged {
  data: { tags?: string[] }
}

/**
 * URL segment for a tag.
 *
 * Tags are free prose — "Client/server", "SA-CD", "iOS" — so this has to survive
 * punctuation without leaving an empty or doubled segment. Decompose first: NFKD splits an
 * accented letter into a letter plus a combining mark, so dropping the marks keeps the
 * letter. Stripping before normalising would discard the whole character.
 */
export const tagSlug = (tag: string) =>
  tag
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * URL of a tag's own page.
 *
 * At the site root rather than under /articles/, because a tag page spans both collections
 * and a third of the vocabulary is work-only. "SAP" filed under /articles/ would name a
 * page that lists no articles at all.
 */
export const tagHref = (tag: string) => `${import.meta.env.BASE_URL}tag/${tagSlug(tag)}/`

/**
 * Tally a tag vocabulary across entries, heaviest first.
 *
 * The word cloud's spiral places labels in the order it is given them — the heaviest tag
 * has to arrive first or it does not get the centre. Tags are de-duplicated within an
 * entry: one entry repeating a tag must not inflate its weight.
 */
export const countTags = (entries: Tagged[]) => {
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

/** The same tally, each entry carrying the URL of its own page. */
export const countLinkedTags = (entries: Tagged[]) =>
  countTags(entries).map((tag) => ({ ...tag, href: tagHref(tag.text) }))

/**
 * Every distinct tag across the entries given, with the slug it will be published under.
 *
 * Two tags reducing to the same segment is a naming mistake — "Client/server" and "Client
 * server" would be one page claiming to be about whichever name it happened to keep — so
 * this throws rather than merging them, suffixing one, or dropping it. The vocabulary is
 * hand-written and small; a collision is meant to be fixed at the source, and a build that
 * fails naming both tags is what makes that possible.
 *
 * Pass both collections at once: the slugs have to be unique across the whole vocabulary,
 * not within either half of it, or two pages would compete for one URL and the winner
 * would depend on route ordering.
 */
export const tagIndex = (entries: Tagged[]) => {
  const bySlug = new Map<string, string>()

  for (const entry of entries) {
    for (const tag of entry.data.tags ?? []) {
      const slug = tagSlug(tag)
      if (!slug) throw new Error(`The tag "${tag}" leaves no usable URL segment.`)

      const claimed = bySlug.get(slug)
      if (claimed === undefined) bySlug.set(slug, tag)
      else if (claimed !== tag) {
        throw new Error(
          `The tags "${claimed}" and "${tag}" both reduce to "${slug}". Rename one of them.`
        )
      }
    }
  }

  return [...bySlug.entries()]
    .map(([slug, tag]) => ({ tag, slug }))
    .sort((a, b) => a.tag.localeCompare(b.tag))
}

/** The entries carrying a given tag, in the order they were passed. */
export const taggedWith = <T extends Tagged>(entries: T[], tag: string) =>
  entries.filter((entry) => entry.data.tags?.includes(tag))
