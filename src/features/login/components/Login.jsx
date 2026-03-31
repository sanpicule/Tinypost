import { Box, Stack, Typography } from '@mui/material'

import AuthGoogleButton from '@/components/AuthGoogleButton'

const PAGE_BG = 'linear-gradient(135deg, #060a1f 0%, #1a237e 55%, #2d3a8c 100%)'

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: PAGE_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        p: 2,
      }}
    >
      {/* 装飾用要素 */}
      <Box sx={{ position: 'absolute', top: 60, left: 80, width: 70, height: 70, borderRadius: '18px', border: '3px solid rgba(0,220,255,0.4)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', top: 120, right: 120, width: 90, height: 90, borderRadius: '22px', border: '3px solid rgba(0,220,255,0.25)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: 80, left: 60, width: 80, height: 80, borderRadius: '20px', border: '3px solid rgba(100,150,255,0.2)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: 100, right: 70, width: 60, height: 60, borderRadius: '16px', border: '2px solid rgba(0,220,255,0.15)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: -140, left: -60, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ログインカード */}
      <Box
        sx={{
          background: 'rgba(255,255,255,0.97)',
          borderRadius: '24px',
          p: { xs: '36px 28px', sm: '48px 44px' },
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          sx={{ height: 80, width: 80, mb: 3 }}
          alt="TinyPost ロゴ"
          src="/images/favion.ico"
        />
        <Typography sx={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', mb: 1 }}>
          TinyPost
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#64748b', mb: 4, lineHeight: 1.7 }}>
          Googleアカウントでログインして
          <br />
          投稿を管理しよう
        </Typography>

        <Stack alignItems="center">
          <AuthGoogleButton />
        </Stack>
      </Box>
    </Box>
  )
}
