import PropTypes from 'prop-types'
import React from 'react'

const SimplePreview = ({ content }) => {
  if (!content) {
    return null
  }

  // 改行を<br>タグに変換
  const formattedContent = content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ))

  return <div className="whitespace-pre-wrap">{formattedContent}</div>
}

export default SimplePreview
SimplePreview.propTypes = {
  content: PropTypes.string.isRequired,
}
