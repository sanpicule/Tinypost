import { Box, Button } from '@mui/material'

import useGoogleLogin from '../hooks/useGoogleLogin'

const AuthGoogleButton = () => {
  const { handleGoogleSignIn } = useGoogleLogin()
  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outlined"
      color="inherit"
      startIcon={
        <Box
          component="img"
          sx={{
            height: 40,
            width: 40,
          }}
          alt="Googleアイコン"
          src={'/images/googleIcon.png'}
        />
      }
      sx={{
        borderRadius: '30px',
        textTransform: 'none',
      }}
    >
      Googleアカウントでログインする
    </Button>
  )
}

export default AuthGoogleButton
