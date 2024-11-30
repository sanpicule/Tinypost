import Brightness1Icon from '@mui/icons-material/Brightness1'
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

import DotsMenu from '@/components/DotsMenu'
import useCustomTheme from '@public/useCustomTheme'

const PostCard = ({ posts, post }) => {
  const { theme } = useCustomTheme()

  const truncateText = (text) => {
    if (text.length <= 100) {
      return text
    }
    return text.substring(0, 100) + '...'
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月は0ベースなので+1
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  return (
    <Card sx={{ borderRadius: '10px' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="180"
        image={`${post.image_url}`}
      />
      <CardContent>
        {post.label === 1 ? (
          <Chip
            variant="outlined"
            label="お知らせ"
            sx={{
              borderColor: theme.palette.background.news,
              color: theme.palette.background.news,
            }}
          />
        ) : (
          <Chip
            variant="outlined"
            label="料理教室"
            sx={{
              borderColor: theme.palette.background.cooking,
              color: theme.palette.background.cooking,
            }}
          />
        )}
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Stack direction="row" gap={1} alignItems="center">
            <Brightness1Icon
              sx={{
                width: '10px',
                color: post.public
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              }}
            />
            <Typography sx={{ fontSize: '12px' }}>
              {post.public ? '公開中' : '非公開'}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: '12px' }}>
            {`${formatDate(post.created_at)}に投稿済み`}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
          <Stack alignItems="flex-end">
            <DotsMenu posts={posts} post={post} />
          </Stack>
        </Stack>
        <Typography sx={{ mt: 2 }}>{truncateText(post.body)}</Typography>
      </CardContent>
    </Card>
  )
}
PostCard.propTypes = {
  posts: PropTypes.array,
  post: PropTypes.object,
}

export default PostCard
