import { Button } from '@mui/material'

import useDashboard from '../hooks/useDashboard'

const Dashboard = () => {
  const { handleLogOut } = useDashboard()
  return (
    // 未実装
    <div>
      ここはダッシュボードです。
      <Button onClick={handleLogOut}>ログアウト</Button>
    </div>
  )
}

export default Dashboard
