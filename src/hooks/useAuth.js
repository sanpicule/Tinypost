import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '@lib/supabase.js'

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setIsLogin(!!session?.user)
      console.log(session?.user.user_metadata)
      setUserInfo(session?.user.user_metadata)
      setLoading(false)
    }
    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLogin(!!session?.user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogOut = async () => {
    setLogoutLoading(true)
    const { error } = await supabase.auth.signOut()

    if (error) {
      // Snackbarなどの対応が必要
      console.log(error)
    } else {
      navigate('/login')
      setLogoutLoading(false)
    }
  }

  return { isLogin, loading, logoutLoading, userInfo, handleLogOut }
}

export default useAuth
