import { Box, Container, Stack, Link } from '@mui/material'

import AuthFormField from '@/components/AuthFormField'
import AuthLoadingButton from '@/components/AuthLoadingButton'
import AuthTitle from '@/components/AuthTitle'

import useSignup from '../hooks/useSignup'

export default function Signup() {
  const {
    email,
    password,
    showPassword,
    setPassword,
    setEmail,
    handleClickShowPassword,
    handleSubmit,
  } = useSignup()
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AuthTitle auth={'signup'} title={'アカウントを登録して始める'} />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: '100%' }}
        >
          <AuthFormField
            email={email}
            password={password}
            showPassword={showPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            handleClickShowPassword={handleClickShowPassword}
          />
          <AuthLoadingButton buttonContent={'登録'} />
          <Stack direction="row" sx={{ mt: 2, gap: 1 }}>
            <Link href="#" variant="body2">
              パスワードを忘れた場合
            </Link>
            <Link href="./login" variant="body2">
              {'ログインする'}
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}
