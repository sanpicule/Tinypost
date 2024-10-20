import { create } from 'zustand'

const useSnackbarOpen = create((set) => ({
  isOpen: false,
  message: '',
  type: '',
  openSnackbar: (message, type) => {
    set({ isOpen: true, message, type })
  },

  closeSnackbar: () => set({ isOpen: false }),
}))

export default useSnackbarOpen
