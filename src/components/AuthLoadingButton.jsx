import LoadingButton from '@mui/lab/LoadingButton'
import PropTypes from 'prop-types'

const AuthLoadingButton = ({ buttonContent }) => {
  return (
    <LoadingButton
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {buttonContent}
    </LoadingButton>
  )
}

AuthLoadingButton.propTypes = {
  buttonContent: PropTypes.string,
}

export default AuthLoadingButton
