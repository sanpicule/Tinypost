import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import useAuth from '@/hooks/useAuth'

const useProfile = () => {
  const { userInfo } = useAuth()
  const [previewImage, setPreviewImage] = useState(null)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      image: '',
    },
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.picture) {
      setPreviewImage(userInfo.picture)
    }
    if (userInfo) {
      reset({
        name: userInfo.name || '',
        email: userInfo.email || '',
        image: userInfo.picture || '',
      })
    }
  }, [userInfo, reset])

  const onSubmit = async (data) => {
    // 未実装
    console.log(data)
  }
  return {
    previewImage,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleImageChange,
  }
}

export default useProfile
