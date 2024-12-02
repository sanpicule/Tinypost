import { Box, Stack } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Outlet } from 'react-router-dom'

import DataMessage from '@/components/DataMessage'
import PageHeader from '@/components/PageHeader'
import useResponsive from '@/hooks/useResponsive'

import useDashboard from '../hooks/useDashboard'

import AddPostButton from './AddPostButton'
import Filter from './Filter'
import PostCard from './PostCard'
import TableCustomBody from './TableBody'
import TableCustomHeader from './TableHeader'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const TruncatedCell = styled(StyledTableCell)({
  maxWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export default function CustomizedTables() {
  const {
    page,
    posts,
    rowsPerPage,
    isFetch,
    setIsFetch,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useDashboard()
  const { mobile } = useResponsive()

  const truncateText = (text, maxLength) => {
    if (text === null) {
      return ''
    } else {
      return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text
    }
  }

  return (
    <Stack sx={{ gap: mobile ? 1 : 4 }}>
      <PageHeader pageTitle="記事管理" />
      <Box sx={{ mt: 2, marginLeft: 'auto' }}>
        <AddPostButton />
      </Box>
      <Filter isFetch={isFetch} setIsFetch={setIsFetch}></Filter>
      {isFetch && <CircularProgress sx={{ mx: 'auto', mt: 4 }} />}
      {posts.length > 0 &&
        (!mobile ? (
          <Paper sx={{ p: mobile ? 0 : 2 }}>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={posts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableContainer
              component={Paper}
              sx={{ height: mobile ? 350 : '100%' }}
            >
              <Table
                sx={{ minWidth: mobile ? 0 : 700, tableLayout: 'fixed' }}
                aria-label="customized table"
              >
                <TableCustomHeader StyledTableCell={StyledTableCell} />
                <TableCustomBody
                  posts={posts}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  truncateText={truncateText}
                  StyledTableRow={StyledTableRow}
                  TruncatedCell={TruncatedCell}
                  StyledTableCell={StyledTableCell}
                />
              </Table>
            </TableContainer>
            <Outlet />
          </Paper>
        ) : (
          <Stack sx={{ marginBottom: '80px', marginTop: '20px', gap: 2 }}>
            {posts.map((post) => (
              <Box key={post.id}>
                <PostCard posts={posts} post={post} />
              </Box>
            ))}
            <Outlet />
          </Stack>
        ))}
      {posts.length === 0 && !isFetch && <DataMessage />}
    </Stack>
  )
}
