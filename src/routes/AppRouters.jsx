import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import Dashboard from '@/features/dashboard/components/Dashboard'
import DataForm from '@/features/dashboard/components/DataForm'
import DeleteDialog from '@/features/dashboard/components/DeleteDialog'
import Login from '@/features/login/components/Login'
import Preview from '@/features/preview/components/Preview'
import Profile from '@/features/profile/component/Profile'
import LayoutAppBar from '@/layouts/LayoutAppBar'

import PrivateRoute from './PrivateRoute'

const RouteProvider = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/dashboard" replace />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route element={<LayoutAppBar />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="delete/:id" element={<DeleteDialog />} />
          </Route>
          <Route path="/dashboard/preview/:id" element={<Preview />} />
          <Route path="/dashboard/edit/:id" element={<DataForm />} />
          <Route path="/dashboard/register" element={<DataForm />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RouteProvider
