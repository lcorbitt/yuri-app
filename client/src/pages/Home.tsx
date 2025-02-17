import { useCrimeReports } from '../hooks/queries/crime_report'
import { Container, Text, Loader, Box, Paper, rem } from '@mantine/core'
import Map from '../components/Map'
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
    <Container size="100%" pb={rem(0)} px={rem(0)}>
      <Box
        style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 6rem)' }}
      >
        {/* Incident List */}
        <Box
          style={{ width: '450px', paddingLeft: rem(16), paddingTop: rem(16) }}
        >
          <IncidentList reports={reports} />
        </Box>

        {/* Map */}
        <Paper shadow="md" style={{ flex: 1, height: '100%', zIndex: 1 }}>
          <Map />
        </Paper>
      </Box>
    </Container>
  )
}
