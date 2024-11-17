import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { IconButton, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DotsMenu = ({ posts, post }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteDialog = () => {
    const selectedRow = posts.find((row) => row.id === post.id)
    handleClose()
    navigate(`./delete/${post.id}`, {
      state: { data: selectedRow, open: true },
    })
  }
  const handleEditNavigate = () => {
    const selectedRow = posts.find((row) => row.id === post.id)
    handleClose()
    navigate(`./edit/${post.id}`, { state: { data: selectedRow, open: true } })
  }
  const handlePreviewNavigate = () => {
    handleClose()
    navigate(`./preview/${post.id}`)
  }

  return (
    <div>
      <IconButton
        id="dots-button"
        aria-controls={open ? 'dots-button' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="dots-button"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handlePreviewNavigate} sx={{ gap: 1 }}>
          <RemoveRedEyeIcon />
          <Typography>プレビューを見る</Typography>
        </MenuItem>
        <MenuItem onClick={handleEditNavigate} sx={{ gap: 1 }}>
          <EditIcon />
          <Typography>編集する</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteDialog} sx={{ gap: 1 }}>
          <DeleteIcon color="error" />
          <Typography color="error">削除する</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}

DotsMenu.propTypes = {
  posts: PropTypes.array,
  post: PropTypes.object,
}

export default DotsMenu
