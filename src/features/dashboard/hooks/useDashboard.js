import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'

const useDashboard = () => {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isFetch, setIsFetch] = useState(true)
  const navigate = useNavigate()
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
  }, [])

  const handleDeleteDialog = (id) => {
    const selectedRow = posts.find((row) => row.id === id)
    navigate(`./delete/${id}`, { state: { data: selectedRow, open: true } })
  }
  const handleEditNavigate = (id) => {
    const selectedRow = posts.find((row) => row.id === id)
    navigate(`./edit/${id}`, { state: { data: selectedRow, open: true } })
  }

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
    handleDeleteDialog,
    handleEditNavigate,
    handleRegisterNavigate,
    handleChangePage,
    handleChangeRowsPerPage,
  }
}

export default useDashboard
