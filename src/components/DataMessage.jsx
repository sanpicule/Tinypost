import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import { Stack, Typography } from '@mui/material'

import useResponsive from '@/hooks/useResponsive'

const DataMessage = () => {
  const { mobile } = useResponsive()
  return (
    <Stack
      alignItems={'center'}
      sx={{
        gap: 2,
        p: 2,
        mt: mobile ? 0 : 8,
      }}
    >
      {mobile ? (
        <>
          <NotListedLocationIcon sx={{ fontSize: '50px' }} color="disabled" />
          <Typography sx={{ color: 'gray', textAlign: 'center' }}>
            表示できる記事が見つかりません。
          </Typography>
        </>
      ) : (
        <Typography sx={{ color: 'gray' }}>
          表示できる記事が見つかりません。
        </Typography>
      )}
    </Stack>
  )
}

export default DataMessage
