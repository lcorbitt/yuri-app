import { AppShell, rem } from '@mantine/core'
import { SideNavbar } from './SideNavbar'
import { TopNavbar } from './TopNavbar'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      layout="default"
      padding="md"
      navbar={{ width: 64, breakpoint: 'sm' }}
      header={{ height: 60 }}
      styles={{
        root: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        },
        main: {
          flex: 1,
          paddingLeft: rem(64),
          paddingRight: 0,
          paddingTop: rem(60),
        },
        navbar: {
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 200,
          height: '100vh',
        },
        header: {
          position: 'fixed',
          left: rem(64),
          right: 0,
          top: 0,
          zIndex: 100,
          background: 'var(--mantine-color-body)',
          padding: '0.5rem 1rem',
        },
      }}
    >
      <SideNavbar />

      <TopNavbar />

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
