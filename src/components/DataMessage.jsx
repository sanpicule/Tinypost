import InfoIcon from '@mui/icons-material/Info'
import { Stack, Typography } from '@mui/material'

import useCustomTheme from '@public/useCustomTheme'

const DataMessage = () => {
  const { theme } = useCustomTheme()
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{
        gap: 2,
        p: 2,
        border: `1px solid ${theme.palette.error.main}`,
        borderRadius: '10px',
        mt: 2,
      }}
    >
      <InfoIcon color="error" />
      <Typography color="error">
        表示できるデータがありません。記事を作成してください
      </Typography>
    </Stack>
  )
}

export default DataMessage
