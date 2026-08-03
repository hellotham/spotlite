import { getCollection, getEntry } from 'astro:content'
import superpowers from '../superpowers.json' with { type: 'json' }

/**
 * Builds the CV model from the site's content collections.
 *
 * Curation here is deliberately DETERMINISTIC, and it never abridges. A CV is a document
 * of record, so nothing in this pipeline may reword, summarise, truncate or infer a fact
 * about the career: every shorter form a variant prints was written by hand as the
 * entry's `summary` or `description`. Earlier versions of this file trimmed bullet lists
 * to fit, which is how a role came to end mid-thought under a sub-heading promising five
 * more. Choosing between hand-written forms is the only curation left here.
 *
 * Editorial copy (headline, summary, career, achievements) lives in
 * src/content/cv/profile.md, where it is written as prose and can be reviewed directly.
 */

export type CvVariant = 'onepage' | 'full'

/** A dated sub-role within a single employer, e.g. NAB's three successive roles. */
export interface CvSubRole {
  title: string
  year?: string
  bullets: string[]
}

export interface CvRole {
  company: string
  role: string
  startYear: number
  endYear?: number
  dateRange: string
  type: 'employment' | 'consulting'
  /** Achievement bullets: the markdown body at priority 1, the hand-written summary at 2. */
  bullets: string[]
  /** Successive roles at one employer. Carried only where the variant prints the body. */
  subRoles: CvSubRole[]
  /** The single-line form, printed where the variant carries neither body nor summary. */
  description?: string
}

export interface CvEducation {
  institution: string
  degree: string
  dateRange: string
  /** The summary, in the full CV. Empty on the one-pager, which prints the description. */
  notes: string[]
  /** The one-line form, printed on the one-pager. */
  description: string
}

export interface CvCompetency {
  title: string
  level: number
}

export interface CvModel {
  name: string
  headline: string
  contact: { label: string; value: string; href?: string }[]
  summary: string
  /** The career told a decade at a time. Rendered on the home page and in both CVs. */
  career: { intro: string; decades: string[] }
  achievements: { title: string; detail: string }[]
  roles: CvRole[]
  earlierRoles: CvRole[]
  education: CvEducation[]
  competencies: CvCompetency[]
  competencyScaleMax: number
  /** The heading above `earlierRoles`, from profile.md. Empty when there are none. */
  earlierHeading: string
}

const COMPETENCY_SCALE_MAX = 7

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * The editorial copy, read out of the profile entry's markdown body.
 *
 * The prose is markdown rather than frontmatter fields because a person writes and
 * reviews it, and prose belongs in a document, not in a data structure. The cost is this
 * parser, and the parser's job is to be loud: every section it cannot find is thrown,
 * not skipped, because a silently empty Profile or a CV missing its achievements is the
 * kind of fault that ships unnoticed.
 */
export interface CvCopy {
  summary: string
  career: { intro: string; decades: string[] }
  achievements: { title: string; detail: string }[]
}

/** Join a wrapped paragraph back into one line. The source wraps for the writer, not the reader. */
const unwrap = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
    .trim()

const blocksOf = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)

/** Markdown list items, re-joining the continuation lines a wrapped item leaves behind. */
const listItems = (text: string) => {
  const items: string[] = []
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const bullet = line.match(/^[-*]\s+(.*)$/)
    if (bullet) items.push(bullet[1])
    else if (items.length) items[items.length - 1] += ` ${line}`
  }
  return items
}

const PROFILE_PATH = 'src/content/cv/profile.md'

const required = (value: string, what: string) => {
  if (!value.trim()) {
    throw new Error(
      `${PROFILE_PATH}: ${what} is missing or empty. The CV cannot be built without it.`
    )
  }
  return value.trim()
}

export const parseCvCopy = (body: string): CvCopy => {
  const sections = new Map<string, string>()
  for (const chunk of body
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/^##\s+/m)
    .slice(1)) {
    const newline = chunk.indexOf('\n')
    sections.set(chunk.slice(0, newline).trim(), chunk.slice(newline + 1))
  }

  const section = (heading: string) => {
    const found = sections.get(heading)
    if (found === undefined) {
      const seen = [...sections.keys()].map((key) => `"${key}"`).join(', ') || 'none'
      throw new Error(`${PROFILE_PATH}: no "## ${heading}" section. Found: ${seen}.`)
    }
    return found
  }

  const careerBlocks = blocksOf(section('Career'))
  const bulleted = (block: string) => /^[-*]\s/.test(block)
  const decades = careerBlocks.filter(bulleted).flatMap(listItems).map(unwrap)
  if (!decades.length) {
    throw new Error(`${PROFILE_PATH}: "## Career" has no bulleted list under it.`)
  }

  const achievements = section('Key Achievements')
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const newline = chunk.indexOf('\n')
      const title = newline === -1 ? chunk : chunk.slice(0, newline)
      const detail = newline === -1 ? '' : blocksOf(chunk.slice(newline + 1)).join(' ')
      return {
        title: required(title, 'an achievement heading'),
        detail: required(unwrap(detail), `the paragraph under "### ${title.trim()}"`)
      }
    })
  if (!achievements.length) {
    throw new Error(`${PROFILE_PATH}: "## Key Achievements" has no "###" headings under it.`)
  }

  return {
    summary: required(unwrap(blocksOf(section('Profile'))[0] ?? ''), 'the Profile paragraph'),
    career: {
      intro: required(
        unwrap(careerBlocks.find((block) => !bulleted(block)) ?? ''),
        'the Career introduction'
      ),
      decades
    },
    achievements
  }
}

/** Reads the profile entry once, for both the CV builder and the home page. */
export const loadCvProfile = async () => {
  const profile = await getEntry('cv', 'profile')
  if (!profile) {
    throw new Error(`${PROFILE_PATH} is missing. The CV and the home page are built from it.`)
  }
  return { data: profile.data, copy: parseCvCopy(profile.body ?? '') }
}

/**
 * Bullets carry inline markdown (bold, italic, links, code). Rendering them as plain
 * text leaves literal ** markers in the PDF, so translate the small subset that
 * actually appears in the content. HTML is escaped first, so nothing in a bullet can
 * inject markup.
 */
export const renderInline = (value: string) =>
  escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/(^|[\s(])_([^_]+)_/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')

export const formatDateRange = (start: number, end?: number) => {
  if (!end) return `${start} – Present`
  if (start === end) return `${start}`
  return `${start} – ${end}`
}

/**
 * Work entries use "## Role Title (Year)" headings for successive roles at one
 * employer, with "- " achievement bullets beneath. Parse that into structure rather
 * than dumping the markdown, so the CV can lay each sub-role out properly.
 */
const parseBody = (body: string) => {
  const topBullets: string[] = []
  const subRoles: CvSubRole[] = []
  let current: CvSubRole | null = null

  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim()
    if (line === '') continue

    const heading = line.match(/^#{2,4}\s+(.*)$/)
    if (heading) {
      const heading_text = heading[1].trim()
      // Pull a trailing "(2007)" or "(2005-2007)" out of the heading into its own field.
      const dated = heading_text.match(/^(.*?)\s*\((\d{4}(?:\s*[-–]\s*\d{4})?)\)\s*$/)
      current = dated
        ? { title: dated[1].trim(), year: dated[2].replace(/\s*-\s*/, '–'), bullets: [] }
        : { title: heading_text, bullets: [] }
      subRoles.push(current)
      continue
    }

    const bullet = line.match(/^[-*]\s+(.*)$/)
    const text = bullet ? bullet[1].trim() : line
    if (current) {
      current.bullets.push(text)
    } else {
      topBullets.push(text)
    }
  }

  return { topBullets, subRoles }
}

const byRecency = <T extends { endYear?: number; startYear: number }>(a: T, b: T) => {
  const endA = a.endYear ?? Number.MAX_SAFE_INTEGER
  const endB = b.endYear ?? Number.MAX_SAFE_INTEGER
  if (endB !== endA) return endB - endA
  return b.startYear - a.startYear
}

/** Which of an entry's three hand-written forms a document prints. */
type CvDetail = 'body' | 'summary' | 'description' | 'listing'

/**
 * The curation policy, entire.
 *
 * A table rather than a chain of conditionals because it has to be legible from both
 * directions — "what does the one-pager do with a priority 2 role" and "where does a
 * summary end up" — and because every cell is a deliberate editorial decision rather
 * than a fallback. `listing` prints the role, employer and years and nothing else.
 *
 * Note what the diagonal means for writing: a summary is read on the one-pager at
 * priority 1 and in the full CV at priority 2, so it has to work at both densities.
 * Education carries no priority — every qualification is shown, and all of them behave
 * as priority 2.
 */
const CV_DETAIL: Record<1 | 2 | 3, Record<CvVariant, CvDetail>> = {
  1: { full: 'body', onepage: 'summary' },
  2: { full: 'summary', onepage: 'description' },
  3: { full: 'description', onepage: 'listing' }
}

export const buildCv = async (variant: CvVariant): Promise<CvModel> => {
  const { data, copy } = await loadCvProfile()
  const cvConfig = { ...data, ...copy }

  const workEntries = await getCollection('work')
  const educationEntries = await getCollection('education')

  // Both documents carry every role. The split is presentational only: a role reduced
  // to a listing goes to the "Earlier career" block, which sets it as one line rather
  // than as a heading with nothing beneath it. Partitioned here, while the tier is in
  // hand, so `detail` never has to travel on the model the layout sees.
  const roles: CvRole[] = []
  const earlierRoles: CvRole[] = []

  for (const entry of workEntries) {
    const detail = CV_DETAIL[entry.data.priority][variant]
    const { topBullets, subRoles } = parseBody(entry.body ?? '')
    const role: CvRole = {
      company: entry.data.company,
      role: entry.data.role,
      startYear: entry.data.startyear,
      endYear: entry.data.endyear,
      dateRange: formatDateRange(entry.data.startyear, entry.data.endyear),
      type: entry.data.type,
      // The schema guarantees a summary wherever `detail` can be 'summary', so an
      // empty list here would be a schema bug rather than a content one.
      bullets:
        detail === 'body' ? topBullets : detail === 'summary' ? (entry.data.summary ?? []) : [],
      subRoles: detail === 'body' ? subRoles : [],
      description: detail === 'description' ? entry.data.description : undefined
    }
    ;(detail === 'listing' ? earlierRoles : roles).push(role)
  }

  roles.sort(byRecency)
  earlierRoles.sort(byRecency)

  // Map before sorting: collection entries expose startyear/endyear on `data`, so the
  // shared comparator only applies once they are normalised.
  const education: CvEducation[] = educationEntries
    .map((entry) => ({
      institution: entry.data.institution,
      degree: entry.data.degree,
      startYear: entry.data.startyear,
      endYear: entry.data.endyear,
      dateRange: formatDateRange(entry.data.startyear, entry.data.endyear),
      notes: variant === 'full' ? entry.data.summary : [],
      description: entry.data.description
    }))
    .sort(byRecency)

  const contact = [
    { label: 'Email', value: cvConfig.contact.email, href: `mailto:${cvConfig.contact.email}` },
    { label: 'Phone', value: cvConfig.contact.phone },
    { label: 'Location', value: cvConfig.contact.location },
    {
      label: 'LinkedIn',
      value: cvConfig.contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: cvConfig.contact.linkedin
    },
    {
      label: 'Website',
      value: cvConfig.contact.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: cvConfig.contact.website
    }
    // Drop anything not supplied rather than printing an empty field.
  ].filter((item) => item.value !== '')

  const minLevel =
    variant === 'onepage' ? cvConfig.onePage.minCompetencyLevel : cvConfig.full.minCompetencyLevel

  const competencies: CvCompetency[] = superpowers
    .filter((item) => item.level >= minLevel)
    .sort((a, b) => b.level - a.level || a.title.localeCompare(b.title))
    .map((item) => ({ title: item.title, level: item.level }))

  const base = {
    name: cvConfig.name,
    headline: cvConfig.headline,
    contact,
    summary: cvConfig.summary,
    career: cvConfig.career,
    achievements: cvConfig.achievements,
    education,
    competencies,
    competencyScaleMax: COMPETENCY_SCALE_MAX
  }

  return {
    ...base,
    roles,
    earlierRoles,
    earlierHeading: earlierRoles.length > 0 ? cvConfig.onePage.earlierCareerHeading : ''
  }
}
