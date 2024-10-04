import { useMediaQuery, useTheme } from '@mui/material'

const useResponsive = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  return { mobile }
}

export default useResponsive
