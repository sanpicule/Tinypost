import { LoadingButton } from '@mui/lab'
import { Divider, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import useFormatDate from '@/hooks/useFormatDate'

import useDeleteDialog from '../hooks/useDeleteDialog'

export default function DeleteDialog() {
  const location = useLocation()
  const { formatDate } = useFormatDate()
  const data = location.state?.data
  const { open, loading, handleClose, handleDelete } = useDeleteDialog()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">削除確認</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          下記の記事を本当に削除してよろしいですか？
        </DialogContentText>
        <Divider sx={{ mt: 4 }} />
        <Stack sx={{ p: 2, gap: 2 }}>
          <Stack>
            <Typography>タイトル</Typography>
            <Typography sx={{ pl: 2 }}>{data?.title}</Typography>
          </Stack>
          <Stack>
            <Typography>作成日</Typography>
            <Typography sx={{ pl: 2 }}>
              {formatDate(data?.created_at)}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <LoadingButton
          onClick={() => handleDelete(data.id)}
          variant="contained"
          color="error"
          loading={loading}
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
