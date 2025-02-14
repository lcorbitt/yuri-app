import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'

import { createTheme } from '@mantine/core'

export const theme = createTheme({
  fontFamily: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Space Grotesk, sans-serif' },
  primaryColor: 'teal',
  colors: {
    gray: [
      '#F8F9FA',
      '#E9ECEF',
      '#DEE2E6',
      '#CED4DA',
      '#ADB5BD',
      '#868E96',
      '#495057',
      '#343A40',
      '#212529',
      '#121212',
    ],
    dark: [
      '#A1A2A5',
      '#909196',
      '#797C82',
      '#4C4F56',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
      '#0A0B0C',
    ],
    teal: [
      '#E6FFFA',
      '#B2F5EA',
      '#81E6D9',
      '#4FD1C5',
      '#38B2AC',
      '#00A0A3',
      '#2C7A7B',
      '#285E61',
      '#234E52',
      '#1D4044',
    ],
  },
  fontSizes: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  },
})
