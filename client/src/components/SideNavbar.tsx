import { AppShell, UnstyledButton, Stack, Text } from '@mantine/core'
import {
  IconBrandLine,
  IconFileReport,
  IconLogin,
  IconBell,
  IconSettings,
  IconPlus,
  IconFileTextShield,
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

export const SideNavbar = () => {
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
            {/* Todo: Add logo here */}
            <Text size="xl" fw={700} style={{ color: '#00A0A3' }}>
              Yuri
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
  )
}
