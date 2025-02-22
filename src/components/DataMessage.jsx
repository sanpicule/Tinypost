import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import { Box, Stack, Typography } from '@mui/material'

import AddPostButton from '@/features/dashboard/components/AddPostButton'
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
            表示できる記事がありません。 <br></br>
            下記ボタンより新規作成してください。
          </Typography>
        </>
      ) : (
        <Typography sx={{ color: 'gray' }}>
          表示できる記事がありません。 下記ボタンより新規作成してください。
        </Typography>
      )}
      <Box sx={{ mt: 2, width: '150px' }}>
        <AddPostButton />
      </Box>
    </Stack>
  )
}

export default DataMessage
