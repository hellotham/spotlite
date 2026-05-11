export function processTimelineData(workEntries: any[], educationEntries: any[]) {
  const currentYear = new Date().getFullYear();

  const work = workEntries.map(entry => ({
    title: entry.data.role || entry.data.title, // fallback for test mocks
    organization: entry.data.company || entry.data.organization,
    startYear: entry.data.startyear,
    endYear: entry.data.endyear || currentYear,
    isOngoing: !entry.data.endyear,
    type: entry.data.type,
    slug: `/work/${entry.id || entry.slug}`
  }));

  const education = educationEntries.map(entry => ({
    title: entry.data.degree || entry.data.school,
    organization: entry.data.institution || entry.data.school,
    startYear: entry.data.startyear,
    endYear: entry.data.endyear || currentYear,
    isOngoing: !entry.data.endyear,
    type: 'education',
    slug: `/education/${entry.id || entry.slug}`
  }));

  return [...work, ...education].sort((a, b) => a.startYear - b.startYear);
}
