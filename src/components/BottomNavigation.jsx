import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SettingsIcon from '@mui/icons-material/Settings'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import { Paper } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LogoutDialog from './LogoutDialog'

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const navigate = useNavigate()
  const handleClick = (e, newValue) => {
    setValue(newValue)
    if (newValue === 'logout') {
      handleClickDialogOpen()
    } else {
      navigate(`/${newValue}`)
    }
  }

  const handleClickDialogOpen = () => {
    setDialogOpen(true)
  }

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleClick}>
        <BottomNavigationAction
          label="記事一覧"
          value="dashboard"
          icon={<SpaceDashboardIcon />}
        />
        <BottomNavigationAction
          label="設定"
          value="settings"
          icon={<SettingsIcon />}
        />
        <BottomNavigationAction
          label="ログアウト"
          value="logout"
          icon={<ExitToAppIcon color="error" />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              color: 'error.main',
            },
          }}
        />
      </BottomNavigation>
      <LogoutDialog open={dialogOpen} setOpen={setDialogOpen} />
    </Paper>
  )
}
