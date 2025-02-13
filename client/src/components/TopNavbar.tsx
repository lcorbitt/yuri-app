import { Group, Title, AppShell, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export const TopNavbar = () => {
  const navigate = useNavigate()

  return (
    <AppShell.Header style={{ padding: '0' }}>
      <Group justify="space-between" gap="xl" h={60}>
        <Title order={2} mx="md" c="teal.4">
          Yuri
        </Title>
        <Button
          leftSection={<IconPlus size={20} />}
          onClick={() => navigate('/report')}
          variant="light"
          mx="md"
        >
          Report Incident
        </Button>
      </Group>
    </AppShell.Header>
  )
}
