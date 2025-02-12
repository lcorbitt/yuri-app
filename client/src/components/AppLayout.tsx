import { AppShell, UnstyledButton, Stack, Text, rem } from '@mantine/core'
import {
  IconBrandLine,
  IconFileReport,
  IconLogin,
  IconBell,
  IconSettings,
  IconPlus,
  IconFileTextShield,
  IconHome,
} from '@tabler/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavLinkProps {
  icon: React.ReactNode
  path: string
  active?: boolean
  onClick?: () => void
}

const NavLink = ({ icon, active, onClick }: NavLinkProps) => (
  <UnstyledButton
    onClick={onClick}
    style={{
      padding: '20px 20px',
      width: '100%',
      borderRadius: '4px',
      backgroundColor: active ? '#f0f0f0' : 'transparent',
    }}
  >
    <Stack align="center" gap="xs">
      {icon}
    </Stack>
  </UnstyledButton>
)

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    {
      path: '/',
      icon: <IconFileReport size={20} />,
    },
    {
      path: '/investigations',
      icon: <IconFileTextShield size={20} />,
    },
    {
      path: '/chat',
      icon: <IconBrandLine size={20} />,
    },
    {
      path: '/notifications',
      icon: <IconBell size={20} />,
    },
    {
      path: '/settings',
      icon: <IconSettings size={20} />,
    },
    {
      path: '/report',
      icon: <IconPlus size={20} />,
    },
    { path: '/login', icon: <IconLogin size={20} /> },
  ]

  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <AppShell
      layout="default"
      padding="md"
      navbar={{ width: 64, breakpoint: 'sm' }}
      styles={{
        root: { display: 'flex', flexDirection: 'row', width: '100%' },
        main: {
          flex: 1,
          paddingLeft: rem(64),
          paddingRight: 0,
          paddingTop: 0,
        },
        navbar: { position: 'fixed', left: 0, top: 0, bottom: 0 },
      }}
    >
      {/* Side Navbar */}
      <AppShell.Navbar>
        <Stack gap={0}>
          {/* Logo */}
          <UnstyledButton
            onClick={handleHomeClick}
            style={{
              padding: '20px 20px',
              width: '100%',
            }}
          >
            <Stack align="center" gap="xs">
              {/* <IconHome size={24} stroke={1.5} /> */}
              <Text size="xl" fw={700}>
                <span style={{ color: '#22c4bd' }}>Y</span>uri
              </Text>
            </Stack>
          </UnstyledButton>

          {/* Nav Links */}
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

      {/* Main section */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
