import { Group, Title, ActionIcon, AppShell } from '@mantine/core'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'
import ColorSchemeContext from '../ColorSchemeContext'

export const TopNavbar = () => {
  const colorSchemeContext = useContext(ColorSchemeContext)
  const dark = colorSchemeContext.colorScheme === 'dark'

  return (
    <AppShell.Header style={{ padding: '0' }}>
      <Group justify="space-between" gap="xl" h={60}>
        <Title order={2} mx="md" style={{ color: '#00A0A3' }}>
          Yuri
        </Title>

        <ActionIcon
          variant="outline"
          color={dark ? 'white' : 'black'}
          onClick={() => colorSchemeContext.onChange(dark ? 'light' : 'dark')}
          title="Toggle light/dark mode"
          mx="md"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </ActionIcon>
      </Group>
    </AppShell.Header>
  )
}
