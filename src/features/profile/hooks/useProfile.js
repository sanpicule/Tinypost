import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'
import useLoginInfo from '@/store/useLoginInfo'
import useSnackbarOpen from '@/store/useSnackbarOpen'

const useProfile = () => {
  const { updateProfile, uploadImage } = useSupabase()
  const { user } = useLoginInfo()
  const [previewImage, setPreviewImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setUser } = useLoginInfo()
  const { openSnackbar } = useSnackbarOpen()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      avatar_url: '',
    },
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (user && user.avatar_url) {
      setPreviewImage(user.avatar_url)
    }
    if (user) {
      reset({
        full_name: user.full_name || '',
        email: user.email || '',
        avatar_url: user.picture || '',
      })
    }
  }, [reset])

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      let image_url = null

      if (data.avatar_url && data.avatar_url.length > 0) {
        const file = data.avatar_url[0]
        image_url = await uploadImage(file)
      } else {
        image_url = previewImage
      }

      await updateProfile({ ...data, avatar_url: image_url })
      setLoading(false)
      setUser({ ...data, avatar_url: image_url })

      navigate('/dashboard')
      openSnackbar('プロフィールが正常に更新されました', 'success')
    } catch (error) {
      setLoading(false)
      openSnackbar('プロフィールの更新に失敗しました', 'error')
      return error
    }
  }
  return {
    previewImage,
    control,
    errors,
    loading,
    handleSubmit,
    onSubmit,
    handleImageChange,
  }
}

export default useProfile
