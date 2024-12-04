import { Box, Tab, Tabs, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import useResponsive from '@/hooks/useResponsive'

const MarkdownEditor = ({ control, errors, getValues, watch }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const { mobile } = useResponsive()

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: mobile ? 'column' : 'row',
        gap: 2,
      }}
    >
      {mobile ? (
        <>
          {/* タブメニュー */}
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="編集" />
            <Tab label="プレビュー" />
          </Tabs>
          {/* タブの内容 */}
          <Box>
            {tabIndex === 0 && (
              <Controller
                name="body"
                control={control}
                rules={{
                  required: '本文は必須です',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="本文"
                    variant="outlined"
                    multiline
                    fullWidth
                    maxRows={10}
                    margin="normal"
                    error={!!errors.body}
                    helperText={errors.body?.message}
                    sx={{
                      flex: 1,
                      '& .MuiInputBase-root': {
                        height: 'auto',
                        maxHeight: '300px',
                        alignItems: 'flex-start',
                      },
                      '& .MuiInputBase-input': {
                        height: 'calc(100% - 16px)',
                        overflow: 'auto',
                      },
                    }}
                  />
                )}
              />
            )}
            {tabIndex === 1 && (
              <Box
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  p: 2,
                  overflowY: 'auto',
                  height: 'auto',
                  maxHeight: '300px',
                  '& img': {
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                  },
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {getValues('body')}
                </ReactMarkdown>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <>
          {/* PC表示 */}
          <Controller
            name="body"
            control={control}
            rules={{
              required: '本文は必須です',
            }}
            render={({ field }) => (
              <TextField
                sx={{
                  flex: 1,
                  '& .MuiInputBase-root': {
                    height: 'auto',
                    maxHeight: '500px',
                    alignItems: 'flex-start',
                  },
                  '& .MuiInputBase-input': {
                    height: 'calc(100% - 16px)',
                    overflow: 'auto',
                    maxHeight: '500px',
                  },
                }}
                {...field}
                label="本文"
                variant="outlined"
                multiline
                fullWidth
                maxRows={20}
                error={!!errors.body}
                helperText={errors.body?.message}
              />
            )}
          />
          <Box
            sx={{
              flex: 1,
              border: '1px solid #ddd',
              borderRadius: 1,
              p: 2,
              overflowY: 'auto',
              height: 'auto',
              maxHeight: '500px',
              '& img': {
                width: '100%',
                height: 'auto',
                borderRadius: 2,
              },
              '& p': {
                margin: '0px',
              },
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {watch('body')}
            </ReactMarkdown>
          </Box>
        </>
      )}
    </Box>
  )
}

MarkdownEditor.propTypes = {
  control: PropTypes.object,
  errors: PropTypes.object,
  getValues: PropTypes.func,
  watch: PropTypes.func,
}

export default MarkdownEditor
