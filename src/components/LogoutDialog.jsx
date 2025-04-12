import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import { LoadingButton } from '@mui/lab'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'

import useAuth from '@/hooks/useAuth'

export default function LogoutDialog({ open, setOpen }) {
  const { handleLogOut, logoutLoading } = useAuth()
  const theme = useTheme()
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          paper: {
            sx: {
              width: '350px',
              maxWidth: '90%',
              padding: '20px',
              borderRadius: 4,
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          ログアウト確認
        </DialogTitle>
        <MeetingRoomIcon fontSize="large" sx={{ margin: '0 auto' }} />
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: 'center' }}
          >
            本当にログアウトしますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: theme.palette.text.default,
              borderColor: theme.palette.border.default,
              borderRadius: 2,
            }}
          >
            キャンセル
          </Button>
          <LoadingButton
            onClick={handleLogOut}
            variant="contained"
            color="error"
            loading={logoutLoading}
            sx={{ borderRadius: 2, boxShadow: 0, width: '100px' }}
          >
            はい
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

LogoutDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}
