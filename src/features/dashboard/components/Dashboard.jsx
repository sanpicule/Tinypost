import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import DataMessage from '@/components/DataMessage'
import PageHeader from '@/components/PageHeader'
import PostCardSkelton from '@/components/PostCardSkelton'
import useResponsive from '@/hooks/useResponsive'

import useDashboard from '../hooks/useDashboard'

import AddPostButton from './AddPostButton'
import Filter from './Filter'
import PostCard from './PostCard'

export default function CustomizedTables() {
  const {
    posts,
    isFetch,
    keyword,
    handleChangeKeyword,
    searchParams,
    setSearchParams,
    handleSearchSubmit,
  } = useDashboard()
  const { mobile } = useResponsive()

  return (
    <Stack
      sx={{ width: mobile ? '100%' : '80%', mt: 4 }}
      justifyContent={'center'}
      mx="auto"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <PageHeader pageTitle="記事一覧" />
        <AddPostButton />
      </Stack>
      <Filter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleChangeKeyword={handleChangeKeyword}
        handleSearchSubmit={handleSearchSubmit}
        keyword={keyword}
      />
      <>
        {isFetch && <PostCardSkelton />}
        {!isFetch && posts.length > 0 && (
          <Box
            sx={{
              gap: 2,
              marginBottom: '80px',
              marginTop: 1,
            }}
          >
            {posts.map((post) => (
              <Box key={post.id}>
                <PostCard posts={posts} post={post} isFetch={isFetch} />
              </Box>
            ))}
          </Box>
        )}
      </>
      {posts.length === 0 && !isFetch && <DataMessage />}
      <Outlet />
    </Stack>
  )
}
