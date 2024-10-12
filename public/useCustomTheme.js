import { useMediaQuery } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const useCustomTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1025,
        xl: 1536,
      },
    },
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#307B8C',
        light: '#80D8FF',
        dark: '#103B4C',
      },
      secondary: {
        main: '#ffd740',
        light: '#fff176',
        dark: '#fbc02d',
      },
      error: {
        main: '#BF3C30',
        light: '#FFCCAA',
        dark: '#9F2C20',
      },
    },
  })
  return {
    theme,
  }
}

export default useCustomTheme
