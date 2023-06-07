import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './app/ThemeProvider'
import GlobalStyle from './assets/styles/GlobalStyles'
import BrowserRouter from './routes/BrowserRouter'

export const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalStyle />
        <BrowserRouter />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
