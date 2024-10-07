import ContactMailIcon from '@mui/icons-material/ContactMail'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const AuthTitle = ({ auth, title, content = '' }) => {
  const getIconComponent = () => {
    switch (auth) {
      case 'login':
        return LockOpenIcon
      case 'signup':
        return HowToRegIcon
      case 'forget':
        return ContactMailIcon
      default:
        return LockOpenIcon
    }
  }

  const IconComponent = getIconComponent()

  return (
    <>
      <IconComponent
        color="inherit"
        sx={{
          mb: 2,
          width: '50px',
          height: '50px',
        }}
      />
      <Stack textAlign={'center'} sx={{ gap: 2 }}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {content && (
          <Typography variant="caption" textAlign={'center'}>
            {content.split('\n').map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
          </Typography>
        )}
      </Stack>
    </>
  )
}

AuthTitle.propTypes = {
  auth: PropTypes.oneOf(['login', 'signup', 'forget']).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

export default AuthTitle
