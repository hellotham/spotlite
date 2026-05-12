import { describe, it, expect } from 'vitest'
import { processTimelineData } from '../src/utils/timeline'

describe('Timeline Logic', () => {
  it('should merge and sort work and education entries by startYear', () => {
    const workEntries = [
      { data: { title: 'Job B', startyear: 2020, type: 'employment' }, slug: 'job-b' },
      { data: { title: 'Job A', startyear: 2010, type: 'consulting' }, slug: 'job-a' }
    ]
    const educationEntries = [
      { data: { school: 'Uni A', startyear: 2005, type: 'education' }, slug: 'uni-a' }
    ]

    // @ts-expect-error - mock data doesn't fully match CollectionEntry type
    const result = processTimelineData(workEntries, educationEntries)

    expect(result).toHaveLength(3)
    expect(result[0].title).toBe('Uni A')
    expect(result[1].title).toBe('Job A')
    expect(result[2].title).toBe('Job B')
    expect(result[0].startYear).toBe(2005)
    expect(result[0].type).toBe('education')
  })

  it('should handle missing endyear as current year', () => {
    const workEntries = [
      { data: { title: 'Current Job', startyear: 2022, type: 'employment' }, slug: 'current' }
    ]
    // @ts-expect-error - mock data doesn't fully match CollectionEntry type
    const result = processTimelineData(workEntries, [])
    const currentYear = new Date().getFullYear()
    expect(result[0].endYear).toBe(currentYear)
    expect(result[0].isOngoing).toBe(true)
  })
})
