import { useNavigate } from 'react-router-dom'

import { supabase } from '@lib/supabase.js'

const useDashboard = () => {
  const navigate = useNavigate()
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      // Snackbarなどの対応が必要
      console.log(error)
    } else {
      navigate('/login')
    }
  }
  return {
    handleLogOut,
  }
}

export default useDashboard
