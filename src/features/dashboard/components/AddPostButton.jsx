import AddIcon from '@mui/icons-material/Add'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import useResponsive from '@/hooks/useResponsive'

const AddPostButton = () => {
  const mobile = useResponsive()
  const navigate = useNavigate()
  return (
    <Button
      sx={{ borderRadius: '30px', width: '100%' }}
      variant="outlined"
      onClick={() => navigate('./register')}
      startIcon={mobile ? null : <AddIcon />}
    >
      <Typography sx={{ fontSize: '12px' }}>新規作成</Typography>
    </Button>
  )
}

export default AddPostButton
