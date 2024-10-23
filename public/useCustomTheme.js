import { createTheme } from '@mui/material/styles'
import { useState } from 'react'

const useCustomTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.5s ease, color 0.5s ease',
          },
        },
      },
    },
    colorSchemes: {
      dark: true,
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
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      text: {
        main: '#fff',
      },
      background: {
        cooking: '#ef6c00',
        news: '#2196f3',
        lightBlue: '#97BDC5',
      },
      primary: {
        main: '#307B8C',
        light: '#80D8FF',
        dark: '#103B4C',
      },
      secondary: {
        main: '#F4A460',
        light: '#fff176',
        dark: '#F4A410',
      },
      error: {
        main: '#BF3C30',
        light: '#FFCCAA',
        dark: '#9F2C20',
      },
      success: {
        main: '#1de9b6',
        dark: '#4caf50',
      },
    },
  })
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }
  return {
    theme,
    isDarkMode,
    toggleDarkMode,
  }
}

export default useCustomTheme
