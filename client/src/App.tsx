import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme, MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppLayout } from './components/AppLayout'

const queryClient = new QueryClient()

const theme = createTheme({
  scale: 1,
  fontSmoothing: true,
})

function App() {
  document.title = 'Yuri'
  return (
    <MantineProvider theme={theme}>
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
  )
}

export default App
