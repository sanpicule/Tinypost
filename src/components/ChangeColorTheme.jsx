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

import useCustomTheme from '@public/useCustomTheme'

const ChangeColorTheme = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { mode, setMode } = useColorScheme()
  const { toggleDarkMode } = useCustomTheme()
  const handleClick = (event) => {
    toggleDarkMode()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (theme) => {
    setMode(theme)
    setAnchorEl(null)
  }
  return (
    <Box>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {mode === 'dark' ? (
          <DarkModeIcon />
        ) : (
          <LightModeIcon sx={{ color: 'text.main' }} />
        )}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose('dark')}>
          <Stack direction={'row'} sx={{ gap: 1 }}>
            <DarkModeIcon />
            <Typography>DarkMode</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handleClose('light')}>
          <Stack direction={'row'} sx={{ gap: 1 }}>
            <LightModeIcon />
            <Typography>LightMode</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ChangeColorTheme
