import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import './styles/globals.css'
import App from './App.tsx'

const mantineTheme = createTheme({
  fontFamily: 'Geologica, sans-serif',
  fontFamilyMonospace: 'IBM Plex Mono, monospace',
  headings: { fontFamily: 'Cormorant Garamond, serif' },
  primaryColor: 'dubnaBlue',
  colors: {
    dubnaBlue: [
      '#e8f8ff', '#c5edfd', '#9de0fb', '#70d2f8',
      '#4fc3f7', '#38b2e6', '#2196cc', '#1577a8',
      '#0d5a84', '#063d60',
    ],
    dubnaGold: [
      '#fef9ec', '#faefc8', '#f5e39e', '#efd572',
      '#e8b84b', '#d4a030', '#b8821a', '#94630c',
      '#714704', '#502f00',
    ],
  },
  defaultRadius: 'md',
  black: '#07090f',
  white: '#f0f4f8',
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
