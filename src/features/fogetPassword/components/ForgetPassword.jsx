import { Box, Container, TextField } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import AuthLoadingButton from '@/components/AuthLoadingButton'
import AuthTitle from '@/components/AuthTitle'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')

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
        <AuthTitle
          auth={'forget'}
          title={'パスワード再設定'}
          content={
            'パスワードの再設定を行います。\n登録したメールアドレスを入力してください。'
          }
        />
        <Box
          component="form"
          onSubmit={(e) => console.log(e)}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
            }}
          />
          <AuthLoadingButton buttonContent={'送信'} />
        </Box>
        <Box sx={{ width: '100%', mt: 2 }}>
          <Link to="/login" sx={{ textAlign: 'left', display: 'block' }}>
            ログインする
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default ForgetPassword
