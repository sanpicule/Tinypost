import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'

const usePreview = () => {
  const { id } = useParams()
  const [isFetch, setIsFetch] = useState(false)
  const [post, setPost] = useState({})
  const { fetchPost } = useSupabase()

  useEffect(() => {
    setIsFetch(true)
    const getPosts = async () => {
      const { data, error } = await fetchPost(id)
      if (data) {
        setPost(data)
        setIsFetch(false)
      } else {
        console.error(error)
      }
    }
    getPosts()
  }, [])

  return {
    id,
    isFetch,
    post,
  }
}

export default usePreview
