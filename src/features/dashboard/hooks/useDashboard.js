import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'

const useDashboard = () => {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isFetch, setIsFetch] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const { fetchPosts } = useSupabase()
  useEffect(() => {
    const getPosts = async () => {
      const { data, error } = await fetchPosts()
      if (data) {
        setPosts(data)
        setIsFetch(false)
      } else {
        console.error(error)
      }
    }
    getPosts()
  }, [pathname])

  const handleRegisterNavigate = () => {
    navigate('./register')
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return {
    page,
    posts,
    rowsPerPage,
    isFetch,
    handleRegisterNavigate,
    handleChangePage,
    handleChangeRowsPerPage,
  }
}

export default useDashboard
