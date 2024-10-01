import MenuIcon from '@mui/icons-material/Menu'
import {
  Avatar,
  Stack,
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

import useAuth from '../hooks/useAuth.js'

export default function Layout({ children }) {
  const { isLogin, userInfo } = useAuth()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TinyPost
          </Typography>
          {isLogin && (
            <Stack direction={'row'} alignItems={'center'} gap={2}>
              <Typography>{userInfo.full_name}</Typography>
              <Avatar alt="ユーザアイコン画像" src={userInfo.picture} />
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
