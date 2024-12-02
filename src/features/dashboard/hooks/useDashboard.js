import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'

const useDashboard = () => {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams()
  const searchLabel = searchParams.get('label')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isFetch, setIsFetch] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const { fetchPosts, fetchFilterPosts } = useSupabase()
  useEffect(() => {
    setPosts([])
    const getPosts = async () => {
      const { data, error } = await fetchPosts()
      if (data) {
        setPosts(data)
        setIsFetch(false)
      } else {
        console.error(error)
      }
    }
    const getFilterPosts = async (item) => {
      const { data, error } = await fetchFilterPosts(item)
      if (data) {
        setPosts(data)
        setIsFetch(false)
      } else {
        console.error(error)
      }
    }
    if (searchLabel == 0) {
      getPosts()
    } else {
      getFilterPosts(searchLabel)
    }
  }, [pathname, searchParams])

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
    setIsFetch,
    handleRegisterNavigate,
    handleChangePage,
    handleChangeRowsPerPage,
  }
}

export default useDashboard
