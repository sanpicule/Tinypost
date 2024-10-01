import HowToRegIcon from '@mui/icons-material/HowToReg'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

const AuthTitle = ({ auth, title }) => {
  return (
    <>
      {auth === 'login' ? (
        <LockOpenIcon
          color="inherit"
          sx={{
            mb: 2,
            width: '50px',
            height: '50px',
          }}
        />
      ) : (
        <HowToRegIcon
          color="inherit"
          sx={{
            mb: 2,
            width: '50px',
            height: '50px',
          }}
        />
      )}
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </>
  )
}

AuthTitle.propTypes = {
  auth: PropTypes.string,
  title: PropTypes.string,
}

export default AuthTitle
