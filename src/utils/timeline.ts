import type { CollectionEntry } from 'astro:content'

export interface TimelineEntry {
  title: string
  organization: string
  startYear: number
  endYear: number
  isOngoing: boolean
  type: string
  slug: string
}

export function processTimelineData(
  workEntries: CollectionEntry<'work'>[],
  educationEntries: CollectionEntry<'education'>[]
): TimelineEntry[] {
  const currentYear = new Date().getFullYear()

  const work: TimelineEntry[] = workEntries.map((entry) => ({
    title: entry.data.role || ('title' in entry.data ? (entry.data.title as string) : ''), // fallback for test mocks
    organization:
      entry.data.company ||
      ('organization' in entry.data ? (entry.data.organization as string) : ''),
    startYear: entry.data.startyear,
    endYear: entry.data.endyear || currentYear,
    isOngoing: !entry.data.endyear,
    type: entry.data.type,
    slug: `${import.meta.env.BASE_URL}work/${entry.id.replace(/^\//, '')}/`
  }))

  const education: TimelineEntry[] = educationEntries.map((entry) => ({
    title: entry.data.degree || ('school' in entry.data ? (entry.data.school as string) : ''),
    organization:
      entry.data.institution || ('school' in entry.data ? (entry.data.school as string) : ''),
    startYear: entry.data.startyear,
    endYear: entry.data.endyear || currentYear,
    isOngoing: !entry.data.endyear,
    type: 'education',
    slug: `${import.meta.env.BASE_URL}education/${entry.id.replace(/^\//, '')}/`
  }))

  return [...work, ...education].sort((a, b) => a.startYear - b.startYear)
}
