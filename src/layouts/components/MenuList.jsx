import {
  Dashboard,
  AddBox,
  Person,
  AccountCircle,
} from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'

const iconMap = {
  記事一覧: <Dashboard />,
  新規作成: <AddBox />,
  プロフィール: <Person />,
  アカウント: <AccountCircle />,
}

const drawerMenus = [
  { title: '記事一覧', path: '/dashboard', onClick: (nav) => nav('/dashboard') },
  { title: '新規作成', path: '/dashboard/register', onClick: (nav) => nav('/dashboard/register') },
  { title: 'プロフィール', path: '/profile', onClick: (nav) => nav('/profile') },
  { title: 'アカウント', path: '/account', onClick: (nav) => nav('/account') },
]

const MenuList = ({ onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (item) => {
    if (!item.path) return false
    if (item.path === '/dashboard') {
      return (
        location.pathname === '/dashboard' ||
        (location.pathname.startsWith('/dashboard/') &&
          !location.pathname.startsWith('/dashboard/register') &&
          !location.pathname.startsWith('/dashboard/edit'))
      )
    }
    return location.pathname.startsWith(item.path)
  }

  const handleMenuClick = (item) => {
    if (typeof item.onClick === 'function') {
      item.onClick(navigate)
    }
    onClose?.()
  }

  return (
    <List sx={{ p: 0 }}>
      {drawerMenus.map((item) => {
        const active = isActive(item)

        return (
          <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleMenuClick(item)}
              sx={{
                borderRadius: '12px',
                py: 1.2,
                px: 1.5,
                background: active
                  ? 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)'
                  : 'transparent',
                boxShadow: active ? '0 4px 15px rgba(37,99,235,0.4)' : 'none',
                '&:hover': {
                  background: active
                    ? 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)'
                    : 'rgba(255,255,255,0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: active ? 'white' : 'rgba(255,255,255,0.55)',
                }}
              >
                {iconMap[item.title]}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  color: active ? 'white' : 'rgba(255,255,255,0.7)',
                }}
              />
              {active && (
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white', ml: 1, flexShrink: 0 }} />
              )}
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

MenuList.propTypes = {
  setDialogOpen: PropTypes.func,
  onClose: PropTypes.func,
}

export default MenuList
