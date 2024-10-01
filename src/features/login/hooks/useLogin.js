import { useState } from 'react'

const useLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
  }

  return {
    email,
    password,
    showPassword,
    setEmail,
    setPassword,
    handleClickShowPassword,
    handleSubmit,
  }
}

export default useLogin
