import { useParams } from 'react-router-dom'
import { Container, Text, Loader, Box, rem, Paper, Title } from '@mantine/core'
import { useCrimeReport } from '../hooks/queries/crime_report'
import { IncidentList } from './IncidentList'
import Map from './Map'
import { extractCityState, extractStreetAddress } from '../utils/location'

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
    <Container size="100%" pb={rem(0)} px={rem(0)}>
      <Box
        style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 6rem)' }}
      >
        <Box
          style={{ width: '450px', paddingLeft: rem(16), paddingTop: rem(16) }}
        >
          <Title order={2} c="gray.0">
            {report.title}
          </Title>
          <Text
            size="sm"
            lineClamp={2}
            mt="sm"
            className="incident-card-description"
          >
            {extractCityState(report.location).city},{' '}
            {extractCityState(report.location).state}
          </Text>

          <Text size="sm" className="incident-card-location">
            {extractStreetAddress(report.location)}
          </Text>
          {/* <Text mt="sm" c="gray.6">
            {new Date(report.date).toLocaleDateString()}
          </Text> */}
          <Text mt="sm" c="gray.6">
            Status: {report.status}
          </Text>
          <Text mt="md" c="gray.6">
            {report.description}
          </Text>
        </Box>

        {/* Map */}
        <Paper shadow="md" style={{ flex: 1, height: '100%' }}>
          <Map />
        </Paper>
      </Box>
    </Container>
  )
}
