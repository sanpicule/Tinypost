import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: { main: '#2563EB', light: '#60a5fa', dark: '#1d4ed8' },
        secondary: { main: '#7c3aed' },
        public: { main: '#10b981' },
        notPublic: { main: '#ef4444' },
        background: {
          default: '#eef2ff',
          paper: '#ffffff',
          cancel: '#e2e8f0',
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: { main: '#3b82f6', light: '#60a5fa', dark: '#1d4ed8' },
        secondary: { main: '#a78bfa' },
        public: { main: '#10b981' },
        notPublic: { main: '#ef4444' },
        background: {
          default: '#1e293b',
          paper: '#0f172a',
          cancel: '#334155',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans JP", "Helvetica Neue", Arial, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
})

export default theme
