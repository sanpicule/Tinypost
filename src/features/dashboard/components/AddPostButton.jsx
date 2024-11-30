import { Button, Stack } from '@mui/material'
import PropTypes from 'prop-types'

const AddPostButton = ({ navigate }) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'flex-end'}
      sx={{
        width: '100%',
        gap: 1,
        marginLeft: 'auto',
      }}
    >
      <Button
        sx={{ borderRadius: '20px' }}
        variant="outlined"
        onClick={() => navigate()}
      >
        ＋ 新規作成
      </Button>
    </Stack>
  )
}

AddPostButton.propTypes = {
  navigate: PropTypes.func,
}

export default AddPostButton
