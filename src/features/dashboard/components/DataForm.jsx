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

import ImageUploadField from '@/components/ImageUploadField'
import PageHeader from '@/components/PageHeader'
import useResponsive from '@/hooks/useResponsive'

import useDataForm from '../hooks/useDataForm'
import RichTextEditor from './RichTextEditor'

const DataForm = () => {
  const { id, control, loading, errors, onSubmit, navigate, handleSubmit } =
    useDataForm()
  const { mobile } = useResponsive()

  return (
    <Stack sx={{ width: mobile ? '100%' : '80%', mt: 4, px: mobile ? 2 : 0 }} mx="auto">
      <PageHeader pageTitle={id ? '記事編集' : '記事登録'} />
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 4, gap: 2 }}
      >
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          )}
        />
        <Controller
          name="body"
          control={control}
          rules={{ required: '本文は必須です' }}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              label="本文"
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
              <Select
                {...field}
                labelId="post-label"
                label="種類を選択する"
                sx={{ borderRadius: 2 }}
              >
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
          defaultValue={[]}
          render={({ field }) => (
            <ImageUploadField value={field.value} onChange={field.onChange} />
          )}
        />
        <Stack
          direction={mobile ? 'column' : 'row'}
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
            color="primary"
            loading={loading}
            sx={{ borderRadius: 2 }}
          >
            {id ? '保存' : '作成'}
          </LoadingButton>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 2 }}
          >
            戻る
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DataForm
