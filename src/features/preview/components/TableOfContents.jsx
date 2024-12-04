import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

import useResponsive from '@/hooks/useResponsive'

const TableOfContents = ({ content }) => {
  const isMarkdown = content && content.includes('#')
  const { mobile } = useResponsive()
  const headers = useMemo(() => {
    if (!content) return []

    const headerRegex = /^(#{1,2})\s+(.+)$/gm
    const matches = [...content.matchAll(headerRegex)]

    return matches.map((match) => ({
      level: match[1].length,
      text: match[2].trim(),
    }))
  }, [content])

  const renderTableOfContents = () => {
    if (headers.length === 0) return null

    const createNestedList = (currentLevel) => {
      const currentLevelHeaders = headers.filter(
        (h) => h.level === currentLevel,
      )

      if (currentLevelHeaders.length === 0) return null

      return (
        <ul
          style={{
            listStyleType: 'none',
            paddingLeft: `${(currentLevel - 1) * 20}px`,
          }}
        >
          {currentLevelHeaders.map((header, index) => (
            <li
              key={index}
              style={{
                marginBottom: '8px',
                color: '#696969',
                fontSize: mobile && '0.8rem',
              }}
            >
              {header.text}
              {renderNestedHeaders(header.level + 1)}
            </li>
          ))}
        </ul>
      )
    }

    const renderNestedHeaders = (level) => {
      if (level > 6) return null
      return createNestedList(level)
    }

    return renderNestedHeaders(1)
  }

  return (
    <>
      {isMarkdown && (
        <Box
          sx={{
            padding: 2,
            border: '1px',
            borderStyle: 'solid',
            borderColor: '#696969',
            borderRadius: 4,
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <Typography
            component="h2"
            sx={{
              marginTop: 0,
              marginBottom: '16px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            目次
          </Typography>
          {renderTableOfContents()}
        </Box>
      )}
    </>
  )
}

TableOfContents.propTypes = {
  content: PropTypes.string,
}

export default TableOfContents
