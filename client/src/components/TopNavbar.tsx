import { Group, Title, AppShell, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { Modal } from './Modal'
import { IncidentReportForm } from './IncidentReportForm'

export const TopNavbar = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <AppShell.Header style={{ padding: '0' }}>
        <Group justify="space-between" gap="xl" h={60}>
          <Title order={2} mx="md" c="teal.4">
            Yuri
          </Title>
          <Button
            leftSection={<IconPlus size={20} />}
            onClick={() => setOpened(true)}
            variant="light"
            mx="md"
          >
            Report Incident
          </Button>
        </Group>
      </AppShell.Header>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Report an Incident"
      >
        <IncidentReportForm onSuccess={() => setOpened(false)} />
      </Modal>
    </>
  )
}
