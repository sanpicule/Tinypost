import InfoIcon from '@mui/icons-material/Info'
import { Stack, Typography } from '@mui/material'

const DataMessage = () => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{
        gap: 2,
        p: 2,
        border: '1px solid #BF3C30',
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
