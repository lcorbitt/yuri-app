import { Paper, Title, Text, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { CrimeReport } from '../../types/crime-report'

interface IncidentCardProps {
  report: CrimeReport
}

export const IncidentCard = ({ report }: IncidentCardProps) => {
  const navigate = useNavigate()

  const extractCityState = (
    address: string
  ): { city: string; state: string } => {
    const parts = address.split(',').map((part) => part.trim())

    for (let i = 0; i < parts.length - 1; i++) {
      const nextPart = parts[i + 1].trim()

      const stateMatch = nextPart.match(/^\s*([A-Z]{2})\b/)
      if (stateMatch) {
        return {
          city: parts[i],
          state: stateMatch[1],
        }
      }
    }

    return {
      city: '',
      state: '',
    }
  }

  const extractStreetAddress = (address: string): string => {
    return address.split(',')[0].trim()
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    })

    // Replace EDT/EST with just EST if you want it to be static
    return formatted.replace(/(E[DS]T)$/, 'EST')
  }

  return (
    <Paper
      className="incident-card"
      shadow="xs"
      radius="sm"
      p="md"
      withBorder
      onClick={() => navigate(`/report/${report.id}`)}
      styles={{
        root: {
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
      }}
    >
      <Group justify="space-between" align="flex-start">
        <Title order={4} className="incident-card-title">
          {report.title}
        </Title>
        <Text size="xs" fw={'bold'} className="incident-card-date">
          {formatDate(report.created_at)}
        </Text>
      </Group>

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
    </Paper>
  )
}
