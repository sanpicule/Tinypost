import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Stack } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import ChangeColorTheme from '@/components/ChangeColorTheme'
import LogoutButton from '@/components/LogoutButton'
import LogoutDialog from '@/components/LogoutDialog'
import useAuth from '@/hooks/useAuth'
import useResponsive from '@/hooks/useResponsive'
import useLoginInfo from '@/store/useLoginInfo'

import MenuList from './components/MenuList'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeIn,
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
  justifyContent: 'space-between',
  paddingLeft: '20px',
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.easeOut,
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

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      {isLogin && (
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
          }}
        >
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ paddingX: '10px' }}
            >
              <Toolbar>
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
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  gap={1}
                  onClick={() => navigate('./dashboard?label=0')}
                  sx={{ cursor: 'pointer' }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: mobile ? 35 : 50,
                      width: mobile ? 35 : 50,
                    }}
                    alt="The house from the offer."
                    src="/images/favion.ico"
                  />
                  <Typography sx={{ fontSize: mobile ? '18px' : '24px' }}>
                    TinyPost
                  </Typography>
                </Stack>
              </Toolbar>
              {isLogin && (
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  gap={mobile ? 1 : 2}
                >
                  <LogoutButton />
                  <ChangeColorTheme />
                  <Avatar
                    alt="ユーザアイコン画像"
                    src={userInfo?.avatar_url}
                    onClick={() => navigate('/profile')}
                    sx={{
                      height: mobile ? 35 : 50,
                      width: mobile ? 35 : 50,
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
          {mobile ? (
            <MuiDrawer
              variant="temporary"
              open={open}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              <DrawerHeader>
                <Typography fontSize="large" fontWeight="bold">
                  メニュー
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <MenuList
                setDialogOpen={setDialogOpen}
                onClose={handleDrawerClose}
              />
            </MuiDrawer>
          ) : (
            <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                <Typography fontSize="large" fontWeight="bold">
                  メニュー
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <MenuList
                setDialogOpen={setDialogOpen}
                onClose={handleDrawerClose}
              />
            </Drawer>
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: '90%',
              height: '100%',
              marginLeft: mobile ? 0 : open ? `${drawerWidth}px` : '64px',
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }}
          >
            <DrawerHeader />
            <Outlet />
          </Box>
          <LogoutDialog open={dialogOpen} setOpen={setDialogOpen} />
        </Box>
      )}
    </>
  )
}
