import { CssBaseline, ThemeProvider } from '@mui/material'

import useCustomTheme from '@public/useCustomTheme.js'

import RouteProvider from './routes/AppRouters.jsx'

function App() {
  const { theme } = useCustomTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteProvider />
    </ThemeProvider>
  )
}

export default App
