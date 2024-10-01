import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth.js'

const PrivateRoute = ({ children }) => {
  const { isLogin, loading } = useAuth()

  if (loading) {
    return <div>読み込み中...</div>
  }

  return isLogin ? children : <Navigate to="/login" replace />
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateRoute
