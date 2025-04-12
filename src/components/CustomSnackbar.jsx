import { Snackbar } from '@mui/material'

import useSnackbarOpen from '@/store/useSnackbarOpen'
import theme from '@public/useCustomTheme'

const CustomSnackbar = () => {
  const { isOpen, message, closeSnackbar, type } = useSnackbarOpen()
  const getSnackbarColor = (type) => {
    switch (type) {
      case 'success':
        return theme.palette.success.dark
      case 'error':
        return theme.palette.error.main
      default:
        return theme.palette.success.dark
    }
  }
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      message={message}
      onClose={closeSnackbar}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: getSnackbarColor(type),
        },
      }}
    />
  )
}

export default CustomSnackbar
