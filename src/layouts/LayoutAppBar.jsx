import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import { Avatar, Button, Stack } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import SimpleBottomNavigation from '@/components/BottomNavigation'
import ChangeColorTheme from '@/components/ChangeColorTheme'
import LogoutDialog from '@/components/LogoutDialog'
import useAuth from '@/hooks/useAuth'
import useResponsive from '@/hooks/useResponsive'
import useLoginInfo from '@/store/useLoginInfo'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}))

const drawerMenus = [
  { title: '記事一覧', icon: 'dashboard' },
  { title: '設定', icon: 'settings' },
]

export default function LayoutAppBar() {
  const [open, setOpen] = useState(false)
  const userInfo = useLoginInfo((state) => state.user)

  const { mobile } = useResponsive()
  const { isLogin, checkSession } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme()
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  const handleClickDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      {isLogin && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ paddingX: '10px' }}
            >
              <Toolbar>
                {!mobile && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                      {
                        marginRight: 5,
                      },
                      open && { display: 'none' },
                    ]}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <Typography variant="h6" noWrap component="div">
                  TinyPost
                </Typography>
              </Toolbar>
              {isLogin && (
                <Stack direction={'row'} alignItems={'center'} gap={2}>
                  <ChangeColorTheme />
                  {!mobile && <Typography>{userInfo?.full_name}</Typography>}
                  <Avatar
                    alt="ユーザアイコン画像"
                    src={userInfo?.avatar_url}
                    onClick={() => navigate('/profile')}
                    sx={{
                      cursor: 'pointer',
                      transition: '0.3s',
                      ':hover': {
                        opacity: '70%',
                      },
                    }}
                  />
                </Stack>
              )}
            </Stack>
          </AppBar>
          {!mobile && (
            <Drawer
              variant="permanent"
              open={open}
              sx={{
                '& .MuiDrawer-paper': {
                  backgroundColor: '#97BDC5',
                },
              }}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List sx={{ paddingX: '10px' }}>
                {drawerMenus.map((menu) => (
                  <ListItem
                    key={menu.title}
                    disablePadding
                    sx={{
                      display: 'block',
                      borderRadius: '10px',
                    }}
                  >
                    <ListItemButton
                      component={Link}
                      to={`/${menu.icon}`}
                      onClick={() => handleDrawerClose()}
                      sx={[
                        { minHeight: 48, px: 2.5, borderRadius: '10px' },
                        open
                          ? { justifyContent: 'initial' }
                          : { justifyContent: 'center' },
                      ]}
                    >
                      <ListItemIcon
                        sx={[
                          { minWidth: 0, justifyContent: 'center' },
                          open ? { mr: 3 } : { mr: 'auto' },
                        ]}
                      >
                        {menu.icon === 'dashboard' ? (
                          <SpaceDashboardIcon />
                        ) : (
                          <SettingsIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={menu.title}
                        sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
                {open && (
                  <ListItem>
                    <Button
                      color="error"
                      variant="outlined"
                      sx={{ width: '100%' }}
                      onClick={handleClickDialogOpen}
                    >
                      ログアウト
                    </Button>
                  </ListItem>
                )}
              </List>
            </Drawer>
          )}
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: '90%', height: '100%' }}
          >
            <DrawerHeader />
            <Outlet />
          </Box>
          {mobile && <SimpleBottomNavigation />}
          <LogoutDialog open={dialogOpen} setOpen={setDialogOpen} />
        </Box>
      )}
    </>
  )
}
