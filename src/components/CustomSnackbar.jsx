import { Snackbar } from '@mui/material'

import useSnackbarOpen from '@/store/useSnackbarOpen'

const CustomSnackbar = () => {
  const { isOpen, message, closeSnackbar, type } = useSnackbarOpen()
  const getSnackbarColor = (type) => {
    switch (type) {
      case 'success':
        return '#4caf50'
      case 'error':
        return '#f44336'
      default:
        return '#4caf50'
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
          backgroundColor: getSnackbarColor(type), // typeに応じて色を変更
          color: '#fff',
        },
      }}
    />
  )
}

export default CustomSnackbar
