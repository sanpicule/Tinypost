import { useState, useEffect } from 'react'

import { supabase } from '@lib/supabase.js'

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({})

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

  return { isLogin, loading, userInfo }
}

export default useAuth
