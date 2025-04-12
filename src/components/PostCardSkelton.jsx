import { Card, CardContent, Skeleton, Stack } from '@mui/material'

import useResponsive from '@/hooks/useResponsive'

const PostCardSkelton = () => {
  const { mobile } = useResponsive()

  return (
    <Stack gap={2} marginTop={4}>
      {[...Array(mobile ? 2 : 3)].map((_, i) => (
        <Card
          key={i}
          variant="outlined"
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Skeleton animation="wave" sx={{ width: '60px', height: '30px' }} />
            <Skeleton animation="wave" height={50} width="100%" />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton animation="wave" height={40} width={70} />
              <Skeleton animation="wave" height={10} width={70} />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}

export default PostCardSkelton
