import { useTheme } from '@mui/material'
import { Card, CardContent, Chip, Stack, Typography, Box } from '@mui/material'
import PropTypes from 'prop-types'

import DotsMenu from '@/components/DotsMenu'
import useResponsive from '@/hooks/useResponsive'

const PostCard = ({ posts, post }) => {
  const { mobile } = useResponsive()
  const theme = useTheme()
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '16px',
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        ':hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent
        sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Stack direction="column" gap={2}>
            <Chip
              label={post.public ? '公開中' : '非公開'}
              sx={{
                width: '70px',
                fontSize: mobile && '0.65rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor:
                  theme.palette[post.public ? 'public' : 'notPublic'].main,
              }}
              size="small"
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {post.title}
            </Typography>
          </Stack>
          <DotsMenu posts={posts} post={post} />
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
        >
          <Chip
            label={post.label === 1 ? 'お知らせ' : '料理教室'}
            sx={{
              borderRadius: 1,
              backgroundColor: '#4d4d4d',
              fontSize: '0.65rem',
              px: 0.5,
              fontWeight: 500,
              color: '#fff',
            }}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            {`${formatDate(post.created_at)} に投稿`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
PostCard.propTypes = {
  posts: PropTypes.array,
  post: PropTypes.object,
}

export default PostCard
