import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { LoadingButton } from '@mui/lab'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import useDeleteDialog from '../hooks/useDeleteDialog'

export default function DeleteDialog() {
  const theme = useTheme()
  const location = useLocation()
  const data = location.state?.data
  const { open, loading, handleClose, handleDelete } = useDeleteDialog()

  return (
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
        削除確認
      </DialogTitle>
      <DeleteSweepIcon fontSize="large" sx={{ margin: '0 auto' }} />
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ textAlign: 'center' }}
        >
          本当に削除してよろしいですか？
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
          onClick={() => handleDelete(data.id)}
          variant="contained"
          color="error"
          loading={loading}
          sx={{ borderRadius: 2, boxShadow: 0, width: '100px' }}
        >
          削除
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}
