import { useState } from 'react'

import { supabase } from '@lib/supabase'

const useGoogleLogin = () => {
  const [isError, setIsError] = useState(false)

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) {
      setIsError(true)
    }
  }
  return {
    isError,
    handleGoogleSignIn,
  }
}

export default useGoogleLogin
