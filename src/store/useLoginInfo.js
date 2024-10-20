import { create } from 'zustand'

const useLoginInfo = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  setUser: (userData) => {
    set({ user: userData })
    localStorage.setItem('user', JSON.stringify(userData))
  },
  clearUser: () => {
    set({ user: null })
    localStorage.removeItem('user')
  },
}))

export default useLoginInfo
