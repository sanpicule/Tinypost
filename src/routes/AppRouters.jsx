import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Dashboard from '@/features/dashboard/components/Dashboard'
import Login from '@/features/login/components/Login'
import Signup from '@/features/signup/components/Signup'
import Layout from '@/layouts/Layout'

import PrivateRoute from './PrivateRoute'

const RouteProvider = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default RouteProvider
