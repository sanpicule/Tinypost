import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const PageHeader = ({ pageTitle }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography
        sx={{
          width: '100%',
          fontSize: '22px',
          fontWeight: 700,
          color: 'text.primary',
          letterSpacing: '-0.3px',
        }}
      >
        {pageTitle}
      </Typography>
    </Stack>
  )
}

PageHeader.propTypes = {
  pageTitle: PropTypes.string,
}

export default PageHeader
