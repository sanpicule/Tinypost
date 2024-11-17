import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

const FormatText = ({ text }) => {
  if (!text) return null

  const textWithBreaks = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ))

  return <Typography sx={{ marginTop: '48px' }}>{textWithBreaks}</Typography>
}

FormatText.propTypes = {
  text: PropTypes.string,
}

export default FormatText
