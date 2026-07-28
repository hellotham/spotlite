import { getCollection } from 'astro:content'
import cvConfig from '../cv.json' with { type: 'json' }
import superpowers from '../superpowers.json' with { type: 'json' }

/**
 * Builds the CV model from the site's content collections.
 *
 * Curation here is deliberately DETERMINISTIC — recency, seniority and explicit
 * per-entry flags. A CV is a document of record, so nothing in this pipeline may
 * reword, summarise or infer a fact about the career. Editorial copy (headline,
 * summary, achievements) lives in src/cv.json where it can be reviewed directly.
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
  bullets: string[]
  subRoles: CvSubRole[]
  oneLiner?: string
}

export interface CvEducation {
  institution: string
  degree: string
  dateRange: string
  notes: string[]
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
  achievements: { title: string; detail: string }[]
  roles: CvRole[]
  earlierRoles: CvRole[]
  education: CvEducation[]
  competencies: CvCompetency[]
  competencyScaleMax: number
  /** Companies beyond the listed earlier roles, summarised in one trailing line. */
  earlierCompanies: string[]
}

const COMPETENCY_SCALE_MAX = 7

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

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

/** Total bullets across a role, used to trim the one-pager without dropping roles. */
const bulletCount = (role: CvRole) =>
  role.bullets.length + role.subRoles.reduce((sum, sub) => sum + sub.bullets.length, 0)

const byRecency = <T extends { endYear?: number; startYear: number }>(a: T, b: T) => {
  const endA = a.endYear ?? Number.MAX_SAFE_INTEGER
  const endB = b.endYear ?? Number.MAX_SAFE_INTEGER
  if (endB !== endA) return endB - endA
  return b.startYear - a.startYear
}

/**
 * Flatten a role to a single list of bullets for the one-pager.
 *
 * Sub-role headings are dropped rather than partially filled: trimming mid-way through
 * one leaves a heading above a fragment of its list — Torrens rendered "Undergraduate
 * subjects" followed by one of its five subjects, which reads as truncation rather
 * than a summary. Roles written entirely as sub-roles fall back to their bullets so
 * they are never left blank.
 */
const flattenRole = (role: CvRole, maxBullets: number): CvRole => {
  const source =
    role.bullets.length > 0 ? role.bullets : role.subRoles.flatMap((sub) => sub.bullets)
  return { ...role, bullets: source.slice(0, maxBullets), subRoles: [] }
}

/** Trim a role to at most `maxBullets`, preferring the earliest (most senior) entries. */
const trimRole = (role: CvRole, maxBullets: number): CvRole => {
  if (bulletCount(role) <= maxBullets) return role

  let remaining = maxBullets
  const bullets = role.bullets.slice(0, remaining)
  remaining -= bullets.length

  const subRoles: CvSubRole[] = []
  for (const sub of role.subRoles) {
    if (remaining <= 0) break
    const kept = sub.bullets.slice(0, remaining)
    remaining -= kept.length
    subRoles.push({ ...sub, bullets: kept })
  }

  return { ...role, bullets, subRoles }
}

export const buildCv = async (variant: CvVariant): Promise<CvModel> => {
  const workEntries = await getCollection('work', ({ data }) => !data.omitFromCv)
  const educationEntries = await getCollection('education', ({ data }) => !data.omitFromCv)

  const allRoles: CvRole[] = workEntries
    .map((entry) => {
      const { topBullets, subRoles } = parseBody(entry.body ?? '')
      return {
        company: entry.data.company,
        role: entry.data.role,
        startYear: entry.data.startyear,
        endYear: entry.data.endyear,
        dateRange: formatDateRange(entry.data.startyear, entry.data.endyear),
        type: entry.data.type,
        bullets: topBullets,
        subRoles,
        oneLiner: entry.data.oneLiner,
        cvPriority: entry.data.cvPriority
      }
    })
    .sort(byRecency)

  // Map before sorting: collection entries expose startyear/endyear on `data`, so the
  // shared comparator only applies once they are normalised.
  const education: CvEducation[] = educationEntries
    .map((entry) => {
      const { topBullets, subRoles } = parseBody(entry.body ?? '')
      return {
        institution: entry.data.institution,
        degree: entry.data.degree,
        startYear: entry.data.startyear,
        endYear: entry.data.endyear,
        dateRange: formatDateRange(entry.data.startyear, entry.data.endyear),
        // Awards and scholarships are detail for the full CV; the one-pager keeps
        // education to degree, institution and dates.
        notes: variant === 'full' ? [...topBullets, ...subRoles.flatMap((sub) => sub.bullets)] : []
      }
    })
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
    achievements: cvConfig.achievements,
    education,
    competencies,
    competencyScaleMax: COMPETENCY_SCALE_MAX
  }

  if (variant === 'full') {
    // The full CV keeps every role, but weights detail towards current work: without
    // this an engagement from 2011 could carry more bullets than the role held today.
    const roles = allRoles.map((role, index) =>
      index < cvConfig.full.detailedRoles
        ? role
        : trimRole(role, cvConfig.full.maxBulletsPerEarlierRole)
    )
    return { ...base, roles, earlierRoles: [], earlierCompanies: [] }
  }

  // One-pager: keep the most recent roles in detail, and fold the remainder into a
  // single "Earlier career" block so the full history is still represented.
  const ranked = [...allRoles].sort((a, b) => {
    const priorityA = (a as CvRole & { cvPriority?: number }).cvPriority ?? 0
    const priorityB = (b as CvRole & { cvPriority?: number }).cvPriority ?? 0
    if (priorityA !== priorityB) return priorityB - priorityA
    return byRecency(a, b)
  })

  const featured = ranked.slice(0, cvConfig.onePage.maxRoles)
  const featuredKeys = new Set(featured.map((role) => `${role.company}:${role.startYear}`))

  const remaining = allRoles.filter(
    (role) => !featuredKeys.has(`${role.company}:${role.startYear}`)
  )

  // A 40-year history cannot list every role on one page. Name the most recent of the
  // remainder in full and reduce the rest to a trailing list of employers, so nothing
  // is hidden — the complete history is in the full CV.
  const maxEarlier = cvConfig.onePage.maxEarlierRoles

  return {
    ...base,
    roles: featured
      .sort(byRecency)
      .map((role) => flattenRole(role, cvConfig.onePage.maxBulletsPerRole)),
    earlierRoles: remaining.slice(0, maxEarlier),
    earlierCompanies: remaining.slice(maxEarlier).map((role) => role.company)
  }
}
