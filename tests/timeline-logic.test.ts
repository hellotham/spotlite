import { describe, it, expect } from 'vitest'
import { processTimelineData, formatDateRange } from '../src/utils/timeline'

describe('Timeline Logic', () => {
  it('should merge and sort work and education entries by startYear', () => {
    const workEntries = [
      { id: 'job-b', data: { role: 'Job B', startyear: 2020, type: 'employment' } },
      { id: 'job-a', data: { role: 'Job A', startyear: 2010, type: 'consulting' } }
    ]
    const educationEntries = [
      { id: 'uni-a', data: { degree: 'Uni A', startyear: 2005, type: 'education' } }
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
      { id: 'current', data: { role: 'Current Job', startyear: 2022, type: 'employment' } }
    ]
    // @ts-expect-error - mock data doesn't fully match CollectionEntry type
    const result = processTimelineData(workEntries, [])
    const currentYear = new Date().getFullYear()
    expect(result[0].endYear).toBe(currentYear)
    expect(result[0].isOngoing).toBe(true)
  })

  describe('formatDateRange', () => {
    it('should return just the year if start and end are the same', () => {
      expect(formatDateRange(1994, 1994)).toBe('1994')
    })

    it('should return a range if start and end are different', () => {
      expect(formatDateRange(1994, 1998)).toBe('1994 — 1998')
    })

    it('should return Present if end year is missing', () => {
      expect(formatDateRange(2016)).toBe('2016 — Present')
    })
  })
})
