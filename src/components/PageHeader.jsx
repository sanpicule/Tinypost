import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const PageHeader = ({ pageTitle }) => {
  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Typography sx={{ width: '100%', fontSize: '24px', fontWeight: 600 }}>
        {pageTitle}
      </Typography>
    </Stack>
  )
}

PageHeader.propTypes = {
  pageTitle: PropTypes.string,
}

export default PageHeader
