import { Paper, Title, Text, Group } from '@mantine/core'
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
      <Group justify="space-between" align="flex-start">
        <Title order={4} className="incident-card-title">
          {report.title}
        </Title>
        <Text size="xs" fw={'bold'} className="incident-card-date">
          {new Date(report.date).toLocaleDateString()}
        </Text>
      </Group>

      <Text
        size="xs"
        lineClamp={2}
        mt="sm"
        className="incident-card-description"
      >
        {report.description}
      </Text>

      <Text size="xs" mt="xs" className="incident-card-location">
        {report.location}
      </Text>
    </Paper>
  )
}
