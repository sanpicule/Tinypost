import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import Dashboard from '@/features/dashboard/components/Dashboard'
import ForgetPassword from '@/features/fogetPassword/components/ForgetPassword'
import Login from '@/features/login/components/Login'
import Signup from '@/features/signup/components/Signup'
import LayoutAppBar from '@/layouts/LayoutAppBar'

import PrivateRoute from './PrivateRoute'

const RouteProvider = () => {
  return (
    <Router>
      <Routes>
        {/* ルートパスを /dashboard にリダイレクト */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/dashboard" replace />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<ForgetPassword />} />

        {/* LayoutAppBar を必要なルートでラップ */}
        <Route element={<LayoutAppBar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<div>設定画面</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RouteProvider
