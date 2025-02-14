import { Paper, Stack } from '@mantine/core'
import { CrimeReport } from '../../types/crime-report'
import { IncidentCard } from './IncidentCard'
import { SearchBar } from './SearchBar'
import { useState, useMemo } from 'react'

interface IncidentListProps {
  reports: CrimeReport[]
}

export const IncidentList = ({ reports }: IncidentListProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return reports

    const query = searchQuery.toLowerCase()
    return reports?.filter((report) => {
      return (
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.location.toLowerCase().includes(query)
      )
    })
  }, [reports, searchQuery])

  const sortedReports = useMemo(() => {
    return filteredReports?.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }, [filteredReports])

  return (
    <Stack gap="md" h="100%">
      <SearchBar onSearch={setSearchQuery} />

      <Paper
        shadow="md"
        radius="md"
        withBorder
        style={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Stack p="md" gap="md" h="100%">
          {sortedReports?.map((report: CrimeReport) => (
            <IncidentCard key={report.id} report={report} />
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
