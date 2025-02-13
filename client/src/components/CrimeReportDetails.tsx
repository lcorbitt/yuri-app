import { useParams } from 'react-router-dom'
import { Container, Title, Text, Loader } from '@mantine/core'
import { useCrimeReport } from '../hooks/queries/crime_report'

export const CrimeReportDetails = () => {
  const { id } = useParams()
  const { data: report, isLoading, error } = useCrimeReport(parseInt(id))

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
        <Text c="red">Error loading crime report</Text>
      </Container>
    )
  }

  return (
    <Container>
      <Title order={2}>{report.title}</Title>
      <Text>Location: {report.location}</Text>
      <Text>Date: {new Date(report.date).toLocaleDateString()}</Text>
      <Text>Status: {report.status}</Text>
      <Text mt="md">{report.description}</Text>
    </Container>
  )
}
