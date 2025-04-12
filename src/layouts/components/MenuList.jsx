import {
  Dashboard,
  AddBox,
  Person,
  Settings,
  HelpOutline,
  Notifications,
  AccountCircle,
  Logout,
} from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// アイコンを title でマッピング
const iconMap = {
  記事一覧: <Dashboard />,
  新規作成: <AddBox />,
  プロフィール: <Person />,
  設定: <Settings />,
  ヘルプ: <HelpOutline />,
  お知らせ: <Notifications />,
  アカウント: <AccountCircle />,
  ログアウト: <Logout />,
}

const MenuList = ({ setDialogOpen }) => {
  const navigate = useNavigate()
  const handleMenuClick = (item) => {
    if (item.onClick === 'logout') {
      setDialogOpen(true)
    } else if (typeof item.onClick === 'function') {
      item.onClick()
    }
  }

  const drawerMenus = [
    {
      title: '記事一覧',
      onClick: () => navigate('dashboard'),
    },
    {
      title: '新規作成',
      onClick: () => navigate('dashboard/register'),
    },
    {
      title: 'プロフィール',
      onClick: () => navigate('profile'),
    },
    {
      title: '設定',
      onClick: () => console.log('設定画面へ'),
    },
    {
      title: 'ヘルプ',
      onClick: () => alert('まだ準備中です'),
    },
    {
      title: 'お知らせ',
      onClick: () => console.log('お知らせを表示'),
    },
    {
      title: 'アカウント',
      onClick: () => console.log('アカウント管理へ'),
    },
    {
      title: 'ログアウト',
      onClick: 'logout', // 特別処理
    },
  ]
  return (
    <List
      sx={{
        width: '100%',
        borderRadius: '8px',
        marginTop: 2,
      }}
    >
      {drawerMenus.map((item) => (
        <ListItem key={item.title} disablePadding>
          <ListItemButton onClick={() => handleMenuClick(item)}>
            <ListItemIcon
              sx={{ color: item.title === 'ログアウト' ? 'error.main' : '' }}
            >
              {iconMap[item.title]}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              sx={{ color: item.title === 'ログアウト' ? 'error.main' : '' }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
MenuList.propTypes = {
  setDialogOpen: PropTypes.func,
}

export default MenuList
