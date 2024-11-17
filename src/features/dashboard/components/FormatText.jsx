import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

import useResponsive from '@/hooks/useResponsive'

const FormatText = ({ text }) => {
  const { mobile } = useResponsive()
  if (!text) return null

  const textWithBreaks = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ))

  return (
    <Typography
      sx={{
        marginTop: '48px',
        fontFamily: 'Noto Serif JP, serif',
        width: mobile ? '100%' : '80%',
        letterSpacing: '4px',
        lineHeight: !mobile && '180%',
      }}
    >
      {textWithBreaks}
    </Typography>
  )
}

FormatText.propTypes = {
  text: PropTypes.string,
}

export default FormatText
