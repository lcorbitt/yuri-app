import { Paper, Title, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { CrimeReport } from '../../types/crime-report'

interface IncidentCardProps {
  report: CrimeReport
}

export const IncidentCard = ({ report }: IncidentCardProps) => {
  const navigate = useNavigate()

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
      <Title order={4}>{report.title}</Title>
      <Text size="sm" c="dimmed">
        {new Date(report.date).toLocaleDateString()}
      </Text>
      <Text size="sm" lineClamp={2}>
        {report.description}
      </Text>
      <Text size="xs" c="dimmed" mt="xs">
        {report.location}
      </Text>
    </Paper>
  )
}
