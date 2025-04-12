import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useColorScheme,
} from '@mui/material'
import { useState } from 'react'

const ChangeColorTheme = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { mode, setMode } = useColorScheme()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (newMode) => {
    setMode(newMode)
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleClose('light')}>
          <Stack direction="row" alignItems="center" gap={1}>
            <LightModeIcon />
            <Typography>ライトモード</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handleClose('dark')}>
          <Stack direction="row" alignItems="center" gap={1}>
            <DarkModeIcon />
            <Typography>ダークモード</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ChangeColorTheme
