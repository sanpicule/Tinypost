import { Box, Button, Skeleton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import SimplePreview from '@/components/SimplePreview'
import useResponsive from '@/hooks/useResponsive'

import usePreview from '../hooks/usePreview'

import TableOfContents from './TableOfContents'

const Preview = () => {
  const data = usePreview()
  const { mobile } = useResponsive()
  const navigate = useNavigate()

  const renderContent = () => {
    if (data.isFetch) {
      return (
        <Box
          sx={{
            paddingBottom: '80px',
            marginTop: '24px',
            width: mobile ? '100%' : '60%',
            marginX: 'auto',
          }}
        >
          <Skeleton animation="wave" width="40%" />
          <Skeleton animation="wave" width="40%" />
          <Skeleton
            animation="wave"
            width={mobile ? '100%' : '40%'}
            height="300px"
          />
          <Skeleton animation="wave" width="100%" />
          <Skeleton animation="wave" width="100%" />
          <Skeleton animation="wave" width="100%" />
        </Box>
      )
    }

    if (!data.post || data.post.length === 0) {
      return (
        <Box
          sx={{
            paddingBottom: '80px',
            marginTop: '24px',
            width: mobile ? '100%' : '60%',
            marginX: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 2,
            }}
          >
            記事が見つかりませんでした
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
            }}
          >
            この記事は存在しないか、削除された可能性があります。
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard')}
            sx={{
              borderRadius: 2,
            }}
          >
            ダッシュボードに戻る
          </Button>
        </Box>
      )
    }

    return (
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
          <SimplePreview content={data.post[0]?.body} />
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
          戻る
        </Button>
      </Box>
      {renderContent()}
    </>
  )
}

export default Preview
