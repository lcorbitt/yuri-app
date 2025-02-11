// import logo from './logo.svg'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

const queryClient = new QueryClient()

function App() {
  document.title = 'Yuri'
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="App">
            <Toaster position="top-right" />

            {/* <header className="App-header"> */}
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            {/* </header> */}
          </div>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App
