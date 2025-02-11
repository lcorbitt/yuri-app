import { AppShell, UnstyledButton, Stack, Text, rem } from '@mantine/core'
import { IconHome, IconFileReport, IconLogin } from '@tabler/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavLinkProps {
  icon: React.ReactNode
  label: string
  path: string
  active?: boolean
  onClick?: () => void
}

const NavLink = ({ icon, label, active, onClick }: NavLinkProps) => (
  <UnstyledButton
    onClick={onClick}
    style={{
      padding: '10px 20px',
      width: '100%',
      borderRadius: '4px',
      backgroundColor: active ? '#f0f0f0' : 'transparent',
    }}
  >
    <Stack align="center" gap="xs">
      {icon}
      <Text size="sm">{label}</Text>
    </Stack>
  </UnstyledButton>
)

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { path: '/', label: 'Home', icon: <IconHome size={20} /> },
    {
      path: '/report',
      label: 'Report Crime',
      icon: <IconFileReport size={20} />,
    },
    { path: '/login', label: 'Login', icon: <IconLogin size={20} /> },
  ]

  return (
    <AppShell
      layout="default"
      padding="md"
      navbar={{ width: 250, breakpoint: 'sm' }}
      styles={{
        root: { display: 'flex', flexDirection: 'row', width: '100%' },
        main: { flex: 1, paddingLeft: rem(96) },
        navbar: { position: 'fixed', left: 0, top: 0, bottom: 0 },
      }}
    >
      <AppShell.Navbar>
        <Stack>
          {links.map((link) => (
            <NavLink
              key={link.path}
              {...link}
              active={location.pathname === link.path}
              onClick={() => navigate(link.path)}
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
