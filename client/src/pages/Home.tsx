import { useCrimeReports } from '../hooks/queries/crime_report'
import {
  Container,
  Title,
  Text,
  Loader,
  Box,
  Paper,
  Stack,
  ActionIcon,
  Group,
} from '@mantine/core'
import Map from '../components/Map'
import ColorSchemeContext from '../ColorSchemeContext'
import { useContext } from 'react'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const { data: reports, isLoading, error } = useCrimeReports()
  const colorSchemeContext = useContext(ColorSchemeContext)
  const dark = colorSchemeContext.colorScheme === 'dark'
  const navigate = useNavigate()

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
      <Group justify="space-between" mb="md">
        <Title order={2}>Incidents</Title>
        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => colorSchemeContext.onChange(dark ? 'light' : 'dark')}
          title="Toggle color scheme"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </ActionIcon>
      </Group>

      <Box
        style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 6rem)' }}
      >
        {/* Reports List Container */}
        <Paper
          shadow="md"
          radius="md"
          withBorder
          style={{
            flex: '0 0 350px',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Stack p="md" gap="md">
            {reports?.map((report) => (
              <Paper
                key={report.id}
                shadow="xs"
                radius="sm"
                p="md"
                withBorder
                style={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'var(--mantine-color-gray-0)',
                  },
                }}
                onClick={() => navigate(`/report/${report.id}`)}
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
            ))}
          </Stack>
        </Paper>

        {/* Map Container */}
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
