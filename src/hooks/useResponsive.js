import { useMediaQuery, useTheme } from '@mui/material'

const useResponsive = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const tab = useMediaQuery(theme.breakpoints.down('md'))

  return { mobile, tab }
}

export default useResponsive
