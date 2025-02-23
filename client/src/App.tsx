import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppLayout } from './components/AppLayout'
import ColorSchemeContext from './ColorSchemeContext'
import { useState } from 'react'
import { theme } from './theme'
const queryClient = new QueryClient()

function App() {
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('dark')

  return (
    <ColorSchemeContext.Provider
      value={{ colorScheme, onChange: setColorScheme }}
    >
      <MantineProvider theme={theme} forceColorScheme={colorScheme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="App">
              <Toaster position="top-right" />
              <AppLayout>
                <AppRoutes />
              </AppLayout>
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  )
}

export default App
