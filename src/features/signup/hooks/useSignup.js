import { useState } from 'react'

import { supabase } from '@lib/supabase.js'

const useSignup = () => {
  const [isError, setIsError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Resendの設定を行った後にコメントアウトを外す
    // https://zenn.dev/hayato94087/articles/53c0c759a23a19
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    console.log(data)
    if (error) {
      setIsError(true)
    }
  }
  return {
    isError,
    email,
    password,
    showPassword,
    setPassword,
    setEmail,
    handleClickShowPassword,
    handleSubmit,
  }
}

export default useSignup
