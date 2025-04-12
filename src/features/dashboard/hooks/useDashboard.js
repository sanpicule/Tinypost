import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import useSupabase from '@/hooks/useSupabase'

const useDashboard = () => {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const searchLabel = searchParams.get('label')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isFetch, setIsFetch] = useState(true)
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const { fetchPosts } = useSupabase()
  console.log(searchParams.get('label'))
  useEffect(() => {
    setIsFetch(true)
    const getPosts = async () => {
      const { data, error } = await fetchPosts(keyword, searchLabel)
      if (data) {
        setPosts(data)
        setIsFetch(false)
      } else {
        console.error(error)
      }
    }

    getPosts()
  }, [searchParams])

  const handleRegisterNavigate = () => {
    navigate('./register')
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleSearchSubmit = () => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('keyword', keyword)
    setSearchParams(newParams)
  }

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value)
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
    searchParams,
    keyword,
    setSearchParams,
    setIsFetch,
    setPosts,
    handleRegisterNavigate,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeKeyword,
    handleSearchSubmit,
  }
}

export default useDashboard
