import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'
import PropTypes from 'prop-types'

const AuthFormField = ({
  email,
  password,
  showPassword,
  setEmail,
  setPassword,
  handleClickShowPassword,
}) => {
  return (
    <>
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
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="パスワード"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2,
          }}
        />
        <IconButton
          onClick={handleClickShowPassword}
          sx={{
            position: 'absolute',
            right: 10,
            top: '30%',
          }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Box>
    </>
  )
}

AuthFormField.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  showPassword: PropTypes.bool,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  handleClickShowPassword: PropTypes.func,
}

export default AuthFormField
