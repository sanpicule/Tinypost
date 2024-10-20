import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth.js'

const PrivateRoute = ({ children }) => {
  const { isLogin, loading, checkSession } = useAuth()

  useEffect(() => {
    checkSession()
  }, [])

  if (loading) {
    return <div>読み込み中...</div>
  }

  return isLogin ? children : <Navigate to="/login" replace />
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateRoute
