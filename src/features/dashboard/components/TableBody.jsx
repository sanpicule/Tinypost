import Brightness1Icon from '@mui/icons-material/Brightness1'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Chip,
  IconButton,
  Stack,
  TableBody,
  Tooltip,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

import useFormatDate from '@/hooks/useFormatDate'
import useResponsive from '@/hooks/useResponsive'
import useCustomTheme from '@public/useCustomTheme'

const TableCustomBody = ({
  posts,
  page,
  rowsPerPage,
  truncateText,
  TruncatedCell,
  StyledTableRow,
  StyledTableCell,
  handleEditNavigate,
  handleDeleteDialog,
}) => {
  const { formatDate } = useFormatDate()
  const { mobile, tab } = useResponsive()
  const { theme } = useCustomTheme()
  return (
    <TableBody>
      {posts
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((post) => (
          <StyledTableRow key={post.id}>
            <TruncatedCell align="left">
              <Stack direction={'row'} alignItems={'center'} sx={{ gap: 1 }}>
                <Brightness1Icon
                  sx={{
                    width: '10px',
                    color: post.public
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                  }}
                />
                {!mobile && (
                  <Typography>{post.public ? '公開中' : '未公開'}</Typography>
                )}
              </Stack>
            </TruncatedCell>
            <Tooltip title={post.title}>
              <TruncatedCell align="left">
                {truncateText(post.title, 50)}
              </TruncatedCell>
            </Tooltip>
            <Tooltip title={post.body}>
              <TruncatedCell align="left">
                {truncateText(post.body, 50)}
              </TruncatedCell>
            </Tooltip>
            {!mobile && (
              <>
                <TruncatedCell align="left">
                  {truncateText(post.image_url, 20)}
                </TruncatedCell>
                <TruncatedCell align="left">
                  {post.label === 1 ? (
                    <Chip
                      label="お知らせ"
                      sx={{
                        backgroundColor: 'background.news',
                        color: '#fff',
                      }}
                    />
                  ) : (
                    <Chip
                      label="料理教室"
                      sx={{
                        backgroundColor: 'background.cooking',
                        color: '#fff',
                      }}
                    />
                  )}
                </TruncatedCell>
                <TruncatedCell align="left">
                  {formatDate(post.created_at)}
                </TruncatedCell>
              </>
            )}
            <StyledTableCell align="left">
              <Tooltip title="編集">
                <IconButton onClick={() => handleEditNavigate(post.id)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="削除">
                <IconButton
                  onClick={() => handleDeleteDialog(post.id)}
                  sx={{ ml: tab ? 0 : 2 }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  )
}

TableCustomBody.propTypes = {
  posts: PropTypes.array,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  truncateText: PropTypes.func,
  TruncatedCell: PropTypes.elementType.isRequired,
  StyledTableRow: PropTypes.elementType.isRequired,
  StyledTableCell: PropTypes.elementType.isRequired,
  handleEditNavigate: PropTypes.func,
  handleDeleteDialog: PropTypes.func,
}

export default TableCustomBody
