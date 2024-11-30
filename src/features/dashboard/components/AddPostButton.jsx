import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AddPostButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      sx={{ borderRadius: '5px', width: '100%' }}
      variant="contained"
      onClick={() => navigate('./register')}
      startIcon={<AddIcon />}
    >
      新規作成
    </Button>
  )
}

export default AddPostButton
