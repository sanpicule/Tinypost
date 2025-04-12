import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AddPostButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      sx={{ borderRadius: 2, boxShadow: 'none' }}
      variant="contained"
      onClick={() => navigate('./register')}
    >
      投稿する
    </Button>
  )
}

export default AddPostButton
