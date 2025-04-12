import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: { main: '#307B8C' },
        secondary: { main: '#F4A460' },
        public: { main: '#3eb370' },
        notPublic: { main: '#D93A49' },
        background: {
          default: '#fff',
          paper: '#f5f5f5',
          cooking: '#ef6c00',
          news: '#2196f3',
          cancel: '#eee',
        },
        text: {
          default: '#121212',
        },
        border: {
          default: '#121212',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: { main: '#307B8C' },
        secondary: { main: '#F4A460' },
        public: { main: '#219634' },
        notPublic: { main: '#D93A49' },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
          cooking: '#ef6c00',
          news: '#219634',
          cancel: '#1e1e1e',
        },
        text: {
          default: 'white',
        },
        border: {
          default: 'white',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
})

export default theme
