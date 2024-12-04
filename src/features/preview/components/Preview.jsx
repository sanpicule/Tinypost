import { Box, Button, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import remarkGfm from 'remark-gfm'

import useResponsive from '@/hooks/useResponsive'

import usePreview from '../hooks/usePreview'

import TableOfContents from './TableOfContents'

const Preview = () => {
  const data = usePreview()
  const { mobile } = useResponsive()
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
          戻る
        </Button>
      </Box>
      <Box
        sx={{
          fontFamily: 'Noto Serif JP, serif',
          paddingBottom: '80px',
          marginTop: '24px',
          width: mobile ? '100%' : '60%',
          marginX: 'auto',
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
        <TableOfContents content={data.post[0]?.body} />
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
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: 'auto',
            '& img': {
              width: '100%',
              height: 'auto',
              borderRadius: 2,
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.post[0]?.body}
          </ReactMarkdown>
        </Box>
      </Box>
    </>
  )
}

export default Preview
