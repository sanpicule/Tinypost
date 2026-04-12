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

  const isPublic = post.public

  return (
    <Card
      sx={{
        borderRadius: '16px',
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(37,99,235,0.12)',
          borderColor: 'primary.light',
        },
      }}
    >
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Stack direction="column" gap={1.5}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: isPublic
                    ? theme.palette.public.main
                    : theme.palette.notPublic.main,
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  fontSize: '11px',
                  color: isPublic ? 'public.main' : 'notPublic.main',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {isPublic ? '公開中' : '非公開'}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: mobile ? '0.95rem' : '1rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                color: 'text.primary',
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
          mt={2}
          pt={1.5}
          sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        >
          <Chip
            label={post.label === 1 ? 'お知らせ' : '料理教室'}
            sx={{
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
              fontSize: '11px',
              px: 0.5,
              fontWeight: 600,
              color: '#fff',
              height: 22,
            }}
            size="small"
          />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
            {`${formatDate(post.created_at)} 投稿`}
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
