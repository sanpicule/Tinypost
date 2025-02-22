import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

import useResponsive from '@/hooks/useResponsive'

const PageHeader = ({ pageTitle }) => {
  const { mobile } = useResponsive()
  return (
    <Stack direction={'row'} alignItems={'center'} sx={{ mt: 2 }}>
      <Typography
        variant={mobile ? 'h5' : 'h4'}
        sx={{ width: '100%', fontWeight: 'bold' }}
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
