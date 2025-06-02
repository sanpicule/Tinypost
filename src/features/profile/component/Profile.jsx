import EditIcon from '@mui/icons-material/Edit'
import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import PageHeader from '@/components/PageHeader'
import useResponsive from '@/hooks/useResponsive'

import useProfile from '../hooks/useProfile'

const Profile = () => {
  const { mobile } = useResponsive()
  const navigate = useNavigate()
  const {
    previewImage,
    control,
    errors,
    loading,
    handleSubmit,
    onSubmit,
    handleImageChange,
  } = useProfile()

  return (
    <Stack
      sx={{ width: mobile ? '100%' : '80%', mt: 4 }}
      justifyContent={'center'}
      mx="auto"
    >
      <PageHeader pageTitle="プロフィール" />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 6 }}>
        <Typography fontWeight={'bold'}>プロフィール画像</Typography>
        <Box sx={{ position: 'relative', display: 'inline-block', mt: 2 }}>
          <Avatar
            alt="プロフィール編集"
            src={previewImage}
            sx={{
              width: mobile ? '100px' : '150px',
              height: mobile ? '100px' : '150px',
              zIndex: 1,
              backgroundColor: 'background.lightBlue',
            }}
          />
          <Controller
            name="avatar_url"
            control={control}
            render={({ field }) => (
              <Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={(e) => {
                    handleImageChange(e)
                    field.onChange(e.target.files)
                  }}
                />
                <label htmlFor="raised-button-file">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: mobile ? '30px' : '35px',
                      height: mobile ? '30px' : '35px',
                      borderRadius: '50%',
                      boxShadow: 1,
                      bgcolor: 'primary.main',
                      zIndex: 10,
                      '&:hover': {
                        backgroundColor: 'background.lightBlue',
                      },
                    }}
                  >
                    <EditIcon fontSize="small" sx={{ color: 'text.main' }} />
                  </IconButton>
                </label>
              </Box>
            )}
          />
        </Box>

        <Controller
          name="full_name"
          control={control}
          rules={{ required: '表示名は必須です' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="表示名"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: 2,
                  },
                },
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: 'メールアドレスは必須です' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="メールアドレス"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              aria-readonly
              disabled={true}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: 2,
                  },
                },
              }}
            />
          )}
        />
        <Stack
          direction={mobile ? 'column' : 'row'}
          sx={{
            mt: 4,
            width: '100%',
            gap: 1,
            marginLeft: 'auto',
            pb: 10,
          }}
        >
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 2 }}
          >
            戻る
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
            sx={{ borderRadius: 2 }}
          >
            プロフィールを更新する
          </LoadingButton>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 2 }}
          >
            戻る
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Profile
