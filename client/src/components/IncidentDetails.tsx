import { useParams } from 'react-router-dom'
import { Container, Text, Loader, Box, rem, Paper } from '@mantine/core'
import { useCrimeReport } from '../hooks/queries/crime_report'
import { IncidentList } from './IncidentList'
import Map from './Map'

export const IncidentDetails = () => {
  const { id } = useParams()
  const { data: report, isLoading, error } = useCrimeReport(parseInt(id))

  if (isLoading) {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Loader size="xl" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Text c="red">Error loading crime report</Text>
      </Container>
    )
  }

  return (
    // <Container size="100%" p="md">
    //   <Box
    //     style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 6rem)' }}
    //   >
    //     <Title order={2}>{report.title}</Title>
    //     <Text>Location: {report.location}</Text>
    //     <Text>Date: {new Date(report.date).toLocaleDateString()}</Text>
    //     <Text>Status: {report.status}</Text>
    //   <Text mt="md">{report.description}</Text>
    //   </Box>
    // </Container>

    <Container size="100%" pb={rem(0)} px={rem(0)}>
      <Box
        style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 6rem)' }}
      >
        {/* Incident List */}
        <Box
          style={{ width: '450px', paddingLeft: rem(16), paddingTop: rem(16) }}
        >
          {/* <IncidentList reports={reports} /> */}
        </Box>

        {/* Map */}
        <Paper shadow="md" style={{ flex: 1, height: '100%' }}>
          <Map />
        </Paper>
      </Box>
    </Container>
  )
}
