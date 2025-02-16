import { AppShell, UnstyledButton, Stack } from '@mantine/core'
import {
  IconBrandLine,
  IconFileReport,
  IconLogin,
  IconBell,
  IconSettings,
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
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: active
        ? 'var(--mantine-color-teal-4)'
        : 'var(--mantine-color-dimmed)',
      transition: 'all 0.2s ease',
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
    { path: '/login', icon: <IconLogin size={20} /> },
  ]

  return (
    <AppShell.Navbar>
      <Stack gap={0} h="100%" justify="center" align="center">
        <Stack gap="md" style={{ flex: 1 }} justify="center">
          {links.map((link) => (
            <NavLink
              key={link.path}
              {...link}
              active={location.pathname === link.path}
              onClick={() => navigate(link.path)}
            />
          ))}
        </Stack>
      </Stack>
    </AppShell.Navbar>
  )
}
