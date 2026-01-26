import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useLoginInfo from '@/store/useLoginInfo'
import { supabase } from '@lib/supabase.js'

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const navigate = useNavigate()

  const { setUser, clearUser } = useLoginInfo()

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const user = session?.user
    setIsLogin(!!user)
    if (user) {
      const res = await getProfile(user.id)
      setUser(res)
    } else {
      clearUser()
      navigate('/login')
    }
    setLoading(false)
  }

  useEffect(() => {
    // セッションの変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsLogin(false)
        clearUser()
        navigate('/login')
      }
    })

    // 初期セッションチェック
    checkSession()

    // クリーンアップ
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const getProfile = async (id) => {
    try {
      if (!id) {
        throw new Error('User ID is undefined')
      }
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }
      return data
    } catch (error) {
      console.error('Error loading user profile:', error.message)
      return null
    }
  }

  const handleLogOut = async () => {
    setLogoutLoading(true)
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error(error)
    } else {
      clearUser()
      navigate('/login')
      setLogoutLoading(false)
    }
  }

  return { isLogin, loading, logoutLoading, handleLogOut, checkSession }
}

export default useAuth
