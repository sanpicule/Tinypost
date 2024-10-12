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
      <Button variant="contained" color="secondary" onClick={() => navigate()}>
        ＋ 記事を作成する
      </Button>
    </Stack>
  )
}

AddPostButton.propTypes = {
  navigate: PropTypes.func,
}

export default AddPostButton
