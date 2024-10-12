import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useDeleteDialog = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(location.state?.open)
  }, [])

  const handleClose = () => {
    setOpen(false)
    navigate('/dashboard')
  }
  return {
    open,
    handleClose,
  }
}

export default useDeleteDialog
