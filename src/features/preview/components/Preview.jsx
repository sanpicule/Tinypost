import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import FormatText from '@/features/dashboard/components/FormatText'
import useResponsive from '@/hooks/useResponsive'

import usePreview from '../hooks/usePreview'

const Preview = () => {
  const data = usePreview()
  const { mobile } = useResponsive()
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
          戻る
        </Button>
      </Box>
      <Box
        sx={{
          fontFamily: 'Noto Serif JP, serif',
          paddingBottom: '80px',
          marginTop: '24px',
          paddingLeft: !mobile && '10%',
        }}
      >
        <Typography
          sx={{
            margin: 0,
            fontSize: mobile ? '12px' : '18px',
            fontWeight: 'lighter',
          }}
        >
          {data.post[0]?.created_at.split('T')[0].replace(/-/g, '.')}
        </Typography>
        <h1 style={{ margin: 0, fontSize: mobile && '24px' }}>
          {data.post[0]?.title}
        </h1>
        {data.post[0]?.image_url && (
          <Box sx={{ width: '100%', marginTop: '32px' }}>
            <img
              src={data.post[0]?.image_url}
              alt="Preview"
              style={{
                width: mobile ? '100%' : '40%',
                borderRadius: '10px',
              }}
            />
          </Box>
        )}
        <Box>
          <FormatText text={data.post[0]?.body} />
        </Box>
      </Box>
    </>
  )
}

export default Preview
