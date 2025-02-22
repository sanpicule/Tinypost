import { Box, Container, Typography } from '@mui/material'

import AuthGoogleButton from '@/components/AuthGoogleButton'

export default function Login() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100,
          }}
          alt="The house from the offer."
          src="/images/favion.ico"
        />
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginTop: 4 }}>
          TinyPostで投稿しよう！
        </Typography>
        <Box marginTop={4}>
          <AuthGoogleButton />
        </Box>
      </Box>
    </Container>
  )
}
