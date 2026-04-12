import { Box, Button } from '@mui/material'

import useGoogleLogin from '../hooks/useGoogleLogin'

const AuthGoogleButton = () => {
  const { handleGoogleSignIn } = useGoogleLogin()
  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outlined"
      startIcon={
        <Box
          component="img"
          sx={{ height: 22, width: 22 }}
          alt="Googleアイコン"
          src="/images/googleIcon.png"
        />
      }
      sx={{
        borderRadius: '12px',
        textTransform: 'none',
        px: 3,
        py: 1.3,
        fontSize: '14px',
        fontWeight: 600,
        color: '#1e293b',
        borderColor: '#e2e8f0',
        bgcolor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        '&:hover': {
          borderColor: '#2563EB',
          bgcolor: '#f8faff',
          boxShadow: '0 4px 12px rgba(37,99,235,0.15)',
        },
      }}
    >
      Googleアカウントでログイン
    </Button>
  )
}

export default AuthGoogleButton
