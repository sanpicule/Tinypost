// contexts/ColorModeContext.jsx
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { createContext, useMemo, useState, useContext } from 'react'

import theme from '@public/useCustomTheme'

const ColorModeContext = createContext({
  mode: 'light',
  setMode: () => {},
})

export const useColorMode = () => useContext(ColorModeContext)

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light')

  const themeBase = useMemo(() => {
    return createTheme({
      ...theme,
      palette: theme.colorSchemes?.[mode]?.palette || {},
    })
  }, [mode])
  console.log(themeBase)

  return (
    <ColorModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={themeBase}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
ColorModeProvider.propTypes = {
  children: PropTypes.node,
}
