import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '@lib/supabase'

const useDashboard = () => {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const navigate = useNavigate()
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
    console.log(data)
    if (error) console.log('Error fetching posts:', error)
    else {
      setPosts(data)
    }
  }

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
    handleDeleteDialog,
    handleEditNavigate,
    handleRegisterNavigate,
    handleChangePage,
    handleChangeRowsPerPage,
  }
}

export default useDashboard
