import { useCrimeReports } from '../hooks/queries/crime_report'
import { Container, Text, Loader, Box, Paper, Stack } from '@mantine/core'
import Map from '../components/Map'
import { CrimeReport } from '../../types/crime-report'
import { IncidentCard } from '../components/IncidentCard'
import { TopNavbar } from '../components/TopNavbar'
import { IncidentList } from '../components/IncidentList'

export const Home = () => {
  const { data: reports, isLoading, error } = useCrimeReports()

  if (isLoading) {
    return (
      <Container>
        <Loader size="xl" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Text c="red">Error loading crime reports</Text>
      </Container>
    )
  }

  return (
    <Container size="100%" p="md">
      <Box
        style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 7.5rem)' }}
      >
        {/* Incident List */}
        <Box style={{ width: '450px' }}>
          <IncidentList reports={reports} />
        </Box>
        {/* Map */}
        <Paper
          shadow="md"
          radius="md"
          withBorder
          style={{ flex: 1, height: '100%' }}
        >
          <Map />
        </Paper>
      </Box>
    </Container>
  )
}
