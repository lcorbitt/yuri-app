import { Group, Title, AppShell } from '@mantine/core'

export const TopNavbar = () => {
  return (
    <AppShell.Header style={{ padding: '0' }}>
      <Group justify="space-between" gap="xl" h={60}>
        <Title order={2} mx="md" c="teal.5">
          Yuri
        </Title>
      </Group>
    </AppShell.Header>
  )
}
