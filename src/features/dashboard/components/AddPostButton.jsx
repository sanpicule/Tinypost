import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AddPostButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      variant="contained"
      onClick={() => navigate('./register')}
      sx={{
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
        boxShadow: '0 4px 15px rgba(37,99,235,0.35)',
        px: 2.5,
        fontWeight: 600,
        '&:hover': {
          background: 'linear-gradient(135deg, #1250a0 0%, #2196f3 100%)',
          boxShadow: '0 6px 20px rgba(37,99,235,0.45)',
        },
      }}
    >
      投稿する
    </Button>
  )
}

export default AddPostButton
