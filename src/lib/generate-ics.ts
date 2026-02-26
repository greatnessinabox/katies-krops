export function generateICS({
  title,
  description,
  startDate,
  endDate,
  location,
}: {
  title: string
  description?: string
  startDate: string
  endDate?: string
  location?: string
}): string {
  const formatICSDate = (date: string) =>
    new Date(date)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')

  const start = formatICSDate(startDate)
  const end = endDate
    ? formatICSDate(endDate)
    : formatICSDate(
        new Date(new Date(startDate).getTime() + 2 * 60 * 60 * 1000).toISOString()
      )

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Katie\'s Krops//Outdoor Classroom//EN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    description ? `DESCRIPTION:${description.replace(/\n/g, '\\n')}` : '',
    location ? `LOCATION:${location}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')
}
