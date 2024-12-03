import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'
import useSnackbarOpen from '@/store/useSnackbarOpen'

const useDeleteDialog = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { deletePost } = useSupabase()
  const { openSnackbar } = useSnackbarOpen()

  useEffect(() => {
    setOpen(location.state?.open)
  }, [location.state?.open])

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const res = await deletePost(id)
      setLoading(false)

      if (res.error) {
        openSnackbar('投稿の削除に失敗しました', 'error')
        console.error(res.error)
        return
      }

      navigate(-1)
      openSnackbar('投稿を削除しました', 'success')
    } catch (error) {
      setLoading(false)
      openSnackbar('投稿の削除に失敗しました', 'error')
      console.error('Error deleting post:', error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    navigate('/dashboard')
  }
  return {
    open,
    loading,
    handleClose,
    handleDelete,
  }
}

export default useDeleteDialog
