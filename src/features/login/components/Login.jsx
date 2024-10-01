import { Box, Container, Stack, Link } from '@mui/material'

import AuthFormField from '@/components/AuthFormField'
import AuthGoogleButton from '@/components/AuthGoogleButton'
import AuthLoadingButton from '@/components/AuthLoadingButton'
import AuthTitle from '@/components/AuthTitle'

import useLogin from '../hooks/useLogin'

export default function Login() {
  const {
    email,
    password,
    showPassword,
    setEmail,
    setPassword,
    handleClickShowPassword,
    handleSubmit,
  } = useLogin()

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
        <AuthTitle auth={'login'} title={'ログイン'} />
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
          <AuthLoadingButton buttonContent={'ログイン'} />
          <Stack sx={{ mt: 2, gap: 1 }}>
            <Link href="#" variant="body2">
              パスワードを忘れた場合
            </Link>
            <Link href="./register" variant="body2">
              {'アカウントをお持ちでない方はこちら'}
            </Link>
          </Stack>
        </Box>
        <Box
          sx={{
            borderTop: '0.5px solid gray',
            width: '100%',
            padding: 2,
            mt: 4,
          }}
        />
        <AuthGoogleButton />
      </Box>
    </Container>
  )
}
