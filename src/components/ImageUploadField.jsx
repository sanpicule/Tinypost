import DeleteIcon from '@mui/icons-material/Delete'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {
  Box,
  Paper,
  Typography,
  Stack,
  IconButton,
  styled,
} from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const DropZoneWrapper = styled(Paper)(({ theme, isDragActive }) => {
  const isDark = theme.palette.mode === 'dark'

  return {
    border: `2px dashed ${isDark ? '#555' : '#ccc'}`,
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    backgroundColor:
      isDragActive === 'true'
        ? isDark
          ? '#333'
          : '#f0f0f0'
        : isDark
          ? '#212121'
          : '#fafafa',
    borderColor:
      isDragActive === 'true'
        ? theme.palette.primary.main
        : isDark
          ? '#555'
          : '#ccc',
  }
})

const ImageUploadField = ({ value, onChange }) => {
  const [preview, setPreview] = useState(null)
  const { mode } = useColorScheme()
  const isDark = mode === 'dark'

  useEffect(() => {
    if (value && value[0]) {
      const file = value[0]
      const url = URL.createObjectURL(file)
      setPreview(url)

      // クリーンアップ
      return () => URL.revokeObjectURL(url)
    }
  }, [value])

  const onDrop = useCallback(
    (acceptedFiles) => {
      onChange(acceptedFiles)
    },
    [onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  })

  const handleRemove = () => {
    onChange([])
    setPreview(null)
  }

  return (
    <Stack spacing={2}>
      <DropZoneWrapper {...getRootProps()} isDragActive={String(isDragActive)}>
        <input {...getInputProps()} />
        <UploadFileIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="subtitle1" color="textSecondary">
          ここに画像をドラッグ&ドロップするか、クリックして選択してください
        </Typography>
      </DropZoneWrapper>

      {preview && (
        <Box
          sx={{
            position: 'relative',
            maxWidth: 300,
            mx: 'auto',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
          }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{ width: '100%', display: 'block' }}
          />
          <IconButton
            onClick={handleRemove}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: isDark ? 'rgba(50,50,50,0.8)' : 'rgba(255,255,255,0.8)',
              '&:hover': {
                bgcolor: isDark ? 'rgba(70,70,70,1)' : 'rgba(255,255,255,1)',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Stack>
  )
}
ImageUploadField.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
}

export default ImageUploadField
