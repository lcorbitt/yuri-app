import { useCrimeReports } from '../hooks/queries/crime_report'
import {
  Table,
  Container,
  Title,
  Text,
  Loader,
  ActionIcon,
} from '@mantine/core'
import Map from '../components/Map'
import ColorSchemeContext from '../ColorSchemeContext'
import { useContext } from 'react'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export const Home = () => {
  const { data: reports, isLoading, error } = useCrimeReports()
  const colorSchemeContext = useContext(ColorSchemeContext)
  const dark = colorSchemeContext.colorScheme === 'dark'

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
    <Container size="xxl" p={0}>
      <ActionIcon
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => colorSchemeContext.onChange(dark ? 'light' : 'dark')}
        title="Toggle color scheme"
      >
        {dark ? (
          <SunIcon style={{ width: 18, height: 18 }} />
        ) : (
          <MoonIcon style={{ width: 18, height: 18 }} />
        )}
      </ActionIcon>

      <Map />
      <Title order={2} mb="xl">
        Reports
      </Title>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {reports?.map((report) => (
            <Table.Tr key={report.id}>
              <Table.Td>{report.title}</Table.Td>
              <Table.Td>{report.location}</Table.Td>
              <Table.Td>{new Date(report.date).toLocaleDateString()}</Table.Td>
              <Table.Td>{report.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  )
}
