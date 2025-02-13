import { AppShell, rem } from '@mantine/core'
import { SideNavbar } from './SideNavbar'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
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
        <SideNavbar />
      </AppShell.Navbar>

      {/* Main section */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
