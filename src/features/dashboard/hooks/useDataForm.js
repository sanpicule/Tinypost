import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'
import useSnackbarOpen from '@/store/useSnackbarOpen'

const useDataForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { uploadImage, updatePost, insertPost } = useSupabase()
  const location = useLocation()
  const data = location.state?.data
  const { openSnackbar } = useSnackbarOpen()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title || '',
      body: data?.body || '',
      public: data?.public || false,
      label: data?.label || 1,
      image: null,
    },
  })

  useEffect(() => {
    if (data && data?.image_url) {
      setPreviewImage(data?.image_url)
    }
  }, [data, data?.image_url])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      let image_url = null

      // 画像がアップロードされている場合
      if (data.image && data.image.length > 0) {
        const file = data.image[0]
        image_url = await uploadImage(file)
      } else {
        // アップロードされていない場合
        image_url = previewImage
      }

      const postData = {
        title: data.title,
        body: data.body.replace(/\r\n/g, '\n'), // Windowsの改行を統一
        public: data.public,
        label: data.label,
        image_url: image_url,
      }

      if (id) {
        // 更新の場合
        await updatePost(id, postData)
        setLoading(false)
        navigate('/dashboard')
        openSnackbar('投稿を更新しました', 'success')
      } else {
        // 新規作成の場合
        await insertPost(postData)
        setLoading(false)
        navigate('/dashboard')
        openSnackbar('新しい投稿を作成しました', 'success')
      }
    } catch (error) {
      setLoading(false)
      openSnackbar(
        id ? '投稿の更新に失敗しました' : '投稿の作成に失敗しました',
        'error',
      )
    }
  }
  return {
    id,
    control,
    loading,
    errors,
    previewImage,
    onSubmit,
    navigate,
    handleSubmit,
    handleImageChange,
  }
}

export default useDataForm
