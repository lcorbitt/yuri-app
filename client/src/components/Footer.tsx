import { Group, ActionIcon, AppShell, rem, Text } from '@mantine/core'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useContext, useEffect, useState } from 'react'
import ColorSchemeContext from '../ColorSchemeContext'

export const Footer = () => {
  const colorSchemeContext = useContext(ColorSchemeContext)
  const dark = colorSchemeContext.colorScheme === 'dark'
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return (
    <AppShell.Footer style={{ borderTop: 'none' }} h={rem(32)} px="md">
      <Group justify="flex-end" h="100%" px={rem(0)} gap="xs">
        <Text size="xs" c="dimmed">
          {formattedTime}
        </Text>
        <ActionIcon
          variant="subtle"
          color={dark ? 'gray.5' : 'dark.4'}
          onClick={() => colorSchemeContext.onChange(dark ? 'light' : 'dark')}
          title="Toggle light/dark mode"
          size="md"
          ml={rem(32)}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </ActionIcon>
      </Group>
    </AppShell.Footer>
  )
}
