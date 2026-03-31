import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import ChangeColorTheme from '@/components/ChangeColorTheme'
import LogoutButton from '@/components/LogoutButton'
import LogoutDialog from '@/components/LogoutDialog'
import useAuth from '@/hooks/useAuth'
import useResponsive from '@/hooks/useResponsive'
import useLoginInfo from '@/store/useLoginInfo'

import MenuList from './components/MenuList'

const SIDEBAR_BG = 'linear-gradient(180deg, #080e2c 0%, #0f1845 100%)'
const PAGE_BG = 'linear-gradient(135deg, #060a1f 0%, #1a237e 55%, #2d3a8c 100%)'

export default function LayoutAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const userInfo = useLoginInfo((state) => state.user)
  const { mobile } = useResponsive()
  const { isLogin, checkSession } = useAuth()
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: '28px 16px' }}>
      {/* ロゴ */}
      <Stack
        direction="row"
        alignItems="center"
        gap={1.5}
        sx={{ mb: 4, px: 1, cursor: 'pointer' }}
        onClick={() => { navigate('/dashboard'); setMobileOpen(false) }}
      >
        <Box component="img" src="/images/favion.ico" sx={{ height: 40, width: 40 }} />
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '20px', letterSpacing: '0.5px' }}>
          TinyPost
        </Typography>
      </Stack>

      {/* メニュー */}
      <Box sx={{ flex: 1 }}>
        <MenuList onClose={() => setMobileOpen(false)} />
      </Box>

      {/* ユーザー情報（下部） */}
      <Box sx={{ pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Stack direction="row" alignItems="center" gap={1.5} sx={{ px: 1 }}>
          <Avatar
            src={userInfo?.avatar_url}
            onClick={() => { navigate('/profile'); setMobileOpen(false) }}
            sx={{ cursor: 'pointer', width: 36, height: 36, '&:hover': { opacity: 0.8 } }}
          />
          <Typography noWrap sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500, flex: 1 }}>
            {userInfo?.full_name || 'ユーザー'}
          </Typography>
          <Box sx={{ '& .MuiIconButton-root': { color: 'rgba(255,255,255,0.65)', '&:hover': { color: 'white' } } }}>
            <ChangeColorTheme />
          </Box>
          <Box sx={{ '& .MuiIconButton-root': { color: 'rgba(255,255,255,0.65)', '&:hover': { color: 'white' } } }}>
            <LogoutButton />
          </Box>
        </Stack>
      </Box>
    </Box>
  )

  return (
    <>
      {isLogin && (
        <Box
          sx={{
            minHeight: '100vh',
            background: PAGE_BG,
            display: 'flex',
            alignItems: mobile ? 'flex-start' : 'center',
            justifyContent: 'center',
            p: mobile ? 0 : 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CssBaseline />

          {/* 装飾用アウトライン要素 */}
          {!mobile && (
            <>
              <Box sx={{ position: 'absolute', top: 50, left: 70, width: 65, height: 65, borderRadius: '18px', border: '3px solid rgba(0,220,255,0.4)', pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', top: 110, right: 110, width: 85, height: 85, borderRadius: '22px', border: '3px solid rgba(0,220,255,0.25)', pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', bottom: 70, left: 50, width: 75, height: 75, borderRadius: '20px', border: '3px solid rgba(100,150,255,0.2)', pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', bottom: 90, right: 60, width: 55, height: 55, borderRadius: '16px', border: '2px solid rgba(0,220,255,0.15)', pointerEvents: 'none' }} />
              {/* グローオーブ */}
              <Box sx={{ position: 'absolute', top: -120, right: -120, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', bottom: -160, left: -60, width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
            </>
          )}

          {mobile ? (
            /* モバイルレイアウト */
            <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
              {/* モバイルトップバー */}
              <Box
                sx={{
                  position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200,
                  background: SIDEBAR_BG,
                  boxShadow: '0 2px 20px rgba(0,0,0,0.35)',
                  height: 64,
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, height: '100%' }}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'white' }}>
                      <MenuIcon />
                    </IconButton>
                    <Box component="img" src="/images/favion.ico" sx={{ height: 32, width: 32, cursor: 'pointer' }} onClick={() => navigate('/dashboard')} />
                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>TinyPost</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Box sx={{ '& .MuiIconButton-root': { color: 'rgba(255,255,255,0.8)' } }}>
                      <ChangeColorTheme />
                    </Box>
                    <Avatar src={userInfo?.avatar_url} onClick={() => navigate('/profile')} sx={{ width: 34, height: 34, cursor: 'pointer' }} />
                  </Stack>
                </Stack>
              </Box>

              {/* コンテンツ */}
              <Box component="main" sx={{ flex: 1, pt: '64px', bgcolor: 'background.default', minHeight: '100vh' }}>
                <Outlet />
              </Box>

              {/* モバイルドロワー */}
              <MuiDrawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                  '& .MuiDrawer-paper': {
                    width: 280,
                    background: SIDEBAR_BG,
                    border: 'none',
                  },
                }}
              >
                {sidebarContent}
              </MuiDrawer>
            </Box>
          ) : (
            /* デスクトップレイアウト */
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: 'calc(100vh - 48px)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* サイドバー */}
              <Box sx={{ width: 240, background: SIDEBAR_BG, flexShrink: 0 }}>
                {sidebarContent}
              </Box>

              {/* メインコンテンツ */}
              <Box component="main" sx={{ flex: 1, bgcolor: 'background.default', overflowY: 'auto' }}>
                <Outlet />
              </Box>
            </Box>
          )}

          <LogoutDialog open={dialogOpen} setOpen={setDialogOpen} />
        </Box>
      )}
    </>
  )
}
