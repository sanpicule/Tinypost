import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'

import PageHeader from '@/components/PageHeader'

import useDataForm from '../hooks/useDataForm'

const DataForm = () => {
  const {
    id,
    control,
    loading,
    errors,
    previewImage,
    onSubmit,
    navigate,
    handleSubmit,
    handleImageChange,
  } = useDataForm()
  return (
    <>
      <PageHeader pageTitle={id ? '記事編集' : '記事登録'} />
      {id && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to={`/dashboard/preview/${id}`}>
            <Button
              variant="outlined"
              sx={{ mt: 4 }}
              startIcon={<RemoveRedEyeIcon />}
            >
              プレビューを見る
            </Button>
          </Link>
        </Box>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Controller
          name="public"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="公開する"
            />
          )}
        />
        <Controller
          name="title"
          control={control}
          rules={{ required: 'タイトルは必須です' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="タイトル"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
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
              maxRows={10}
              fullWidth
              margin="normal"
              error={!!errors.body}
              helperText={errors.body?.message}
            />
          )}
        />
        <Controller
          name="label"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.label}>
              <InputLabel id="post-label">種類を選択する</InputLabel>
              <Select {...field} labelId="post-label" label="種類を選択する">
                <MenuItem value={1}>お知らせ</MenuItem>
                <MenuItem value={2}>料理教室</MenuItem>
              </Select>
              {errors.role && (
                <Typography color="error" variant="caption">
                  {errors.label.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <Box>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={(e) => {
                  handleImageChange(e)
                  field.onChange(e.target.files)
                }}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  画像をアップロードする
                </Button>
              </label>
              {previewImage && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                </Box>
              )}
            </Box>
          )}
        />
        <Stack
          sx={{
            mt: 4,
            width: '100%',
            gap: 1,
            marginLeft: 'auto',
            pb: 10,
          }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            color="secondary"
            loading={loading}
          >
            {id ? '保存' : '作成'}
          </LoadingButton>
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            color="inherit"
          >
            戻る
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default DataForm
