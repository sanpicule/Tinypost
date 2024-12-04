import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton } from '@mui/material'
import { useState } from 'react'

import LogoutDialog from './LogoutDialog'

const LogoutButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClickDialogOpen = () => {
    setDialogOpen(true)
  }

  return (
    <>
      <IconButton onClick={handleClickDialogOpen}>
        <LogoutIcon sx={{ color: 'text.main' }} />
      </IconButton>
      <LogoutDialog open={dialogOpen} setOpen={setDialogOpen} />
    </>
  )
}

export default LogoutButton
