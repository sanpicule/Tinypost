import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'

const useDataForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { uploadImage, insertPost } = useSupabase()
  const location = useLocation()
  const data = location.state?.data

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

      if (id) {
        // #TODO 未実装
        setLoading(false)
        console.log('編集')
      } else {
        await insertPost({
          title: data.title,
          body: data.body,
          public: data.public,
          label: data.label,
          image_url: image_url,
        })
        setLoading(false)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setLoading(false)
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
