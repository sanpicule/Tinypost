import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import useResponsive from '@/hooks/useResponsive'

const DataMessage = () => {
  const { mobile } = useResponsive()
  const navigate = useNavigate()

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        gap: 3,
        p: 4,
        mt: mobile ? 4 : 8,
        minHeight: mobile ? '50vh' : '60vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <NotListedLocationIcon
          sx={{
            fontSize: mobile ? '60px' : '80px',
            color: 'text.secondary',
            opacity: 0.7,
          }}
        />
        <Typography
          variant={mobile ? 'h6' : 'h5'}
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            textAlign: 'center',
          }}
        >
          記事が見つかりません
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            opacity: 0.8,
            textAlign: 'center',
            maxWidth: '400px',
            mb: 2,
          }}
        >
          記事がまだ投稿されていないか、すべての記事が非公開になっている可能性があります。
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/dashboard/register')}
        sx={{
          borderRadius: 2,
          px: 4,
          py: 1,
        }}
      >
        新規記事を作成
      </Button>
    </Stack>
  )
}

export default DataMessage
