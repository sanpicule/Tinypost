import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'

const useDeleteDialog = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { deletePost } = useSupabase()

  useEffect(() => {
    setOpen(location.state?.open)
  }, [location.state?.open])

  const handleDelete = async (id) => {
    setLoading(true)
    const res = await deletePost(id)
    if (res.error) {
      setLoading(false)
      console.error(res.error)
    } else {
      setLoading(false)
      navigate('/dashboard')
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
