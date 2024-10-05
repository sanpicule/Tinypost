import { LoadingButton } from '@mui/lab'
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
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ログアウト確認</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            本当にログアウトしてよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <LoadingButton
            onClick={handleLogOut}
            variant="contained"
            color="error"
            loading={logoutLoading}
          >
            ログアウト
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
