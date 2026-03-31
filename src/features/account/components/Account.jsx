import AddIcon from '@mui/icons-material/Add'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import KeyIcon from '@mui/icons-material/Key'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

import PageHeader from '@/components/PageHeader'
import useResponsive from '@/hooks/useResponsive'

import useAccount from '../hooks/useAccount'

const CODE_BG = 'rgba(8, 14, 44, 0.06)'

const CodeBlock = ({ children, onCopy }) => (
  <Box
    sx={{
      bgcolor: CODE_BG,
      borderRadius: '10px',
      p: 2,
      fontFamily: '"Fira Code", "Consolas", monospace',
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      position: 'relative',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    {children}
    {onCopy && (
      <Tooltip title="コピー">
        <IconButton
          size="small"
          onClick={onCopy}
          sx={{ position: 'absolute', top: 6, right: 6 }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Box>
)

const Account = () => {
  const { mobile } = useResponsive()
  const {
    apiKeys,
    loading,
    createLoading,
    newKeyName,
    setNewKeyName,
    dialogOpen,
    setDialogOpen,
    newlyCreatedKey,
    setNewlyCreatedKey,
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleCreate,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleCopy,
    getEndpointUrl,
    maskKey,
  } = useAccount()

  const formatDate = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <Stack sx={{ width: mobile ? '100%' : '90%', mt: 4, px: mobile ? 2 : 0, pb: 8 }} mx="auto">
      <PageHeader pageTitle="アカウント" />

      {/* APIキー管理セクション */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Stack direction="row" alignItems="center" gap={1}>
          <KeyIcon sx={{ color: 'primary.main' }} />
          <Typography fontWeight={700} fontSize="16px">
            APIキー管理
          </Typography>
        </Stack>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
            boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
            '&:hover': { background: 'linear-gradient(135deg, #1250a0 0%, #2196f3 100%)' },
          }}
        >
          新しいキーを発行
        </Button>
      </Stack>

      {/* キー一覧 */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Stack p={3} gap={2}>
              {[1, 2].map((i) => <Skeleton key={i} height={48} />)}
            </Stack>
          ) : apiKeys.length === 0 ? (
            <Stack alignItems="center" p={5} gap={1}>
              <KeyIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
              <Typography color="text.secondary" fontSize="14px">
                APIキーがありません。「新しいキーを発行」から発行してください。
              </Typography>
            </Stack>
          ) : (
            apiKeys.map((key, index) => (
              <Box key={key.id}>
                <Stack
                  direction={mobile ? 'column' : 'row'}
                  alignItems={mobile ? 'flex-start' : 'center'}
                  justifyContent="space-between"
                  px={3}
                  py={2}
                  gap={1}
                >
                  <Stack gap={0.5}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography fontWeight={600} fontSize="14px">
                        {key.name}
                      </Typography>
                      <Chip
                        label="有効"
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '10px',
                          fontWeight: 600,
                          bgcolor: 'rgba(16,185,129,0.12)',
                          color: 'public.main',
                        }}
                      />
                    </Stack>
                    <Typography
                      fontFamily='"Fira Code","Consolas",monospace'
                      fontSize="12px"
                      color="text.secondary"
                    >
                      {maskKey(key.key_value)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography fontSize="12px" color="text.disabled">
                      {formatDate(key.created_at)}
                    </Typography>
                    <Tooltip title="エンドポイントURLをコピー">
                      <IconButton size="small" onClick={() => handleCopy(getEndpointUrl())}>
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="削除">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteRequest(key.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
                {index < apiKeys.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </CardContent>
      </Card>

      {/* API使用方法 */}
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        <Typography fontWeight={700} fontSize="16px">
          API使用方法
        </Typography>
      </Stack>
      <Card>
        <CardContent>
          <Stack gap={3}>
            <Box>
              <Typography fontSize="13px" fontWeight={600} mb={1} color="text.secondary">
                エンドポイント
              </Typography>
              <CodeBlock onCopy={() => handleCopy(getEndpointUrl())}>
                {'GET ' + getEndpointUrl()}
              </CodeBlock>
            </Box>
            <Box>
              <Typography fontSize="13px" fontWeight={600} mb={1} color="text.secondary">
                必須ヘッダー
              </Typography>
              <CodeBlock>
                {`x-api-key: YOUR_API_KEY`}
              </CodeBlock>
            </Box>
            <Alert severity="info" sx={{ borderRadius: '10px', fontSize: '13px' }}>
              公開中（public = true）の記事のみ取得できます。非公開記事は返却されません。
            </Alert>
          </Stack>
        </CardContent>
      </Card>

      {/* 新規発行ダイアログ */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{ paper: { sx: { borderRadius: '16px', p: 1, width: '400px', maxWidth: '95%' } } }}
      >
        <DialogTitle fontWeight={700}>新しいAPIキーを発行</DialogTitle>
        <DialogContent>
          <Typography fontSize="13px" color="text.secondary" mb={2}>
            キーに分かりやすい名前を付けてください（例: 「本番環境」「ブログサイト」）
          </Typography>
          <TextField
            autoFocus
            label="キー名"
            fullWidth
            size="small"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit" sx={{ borderRadius: '8px' }}>
            キャンセル
          </Button>
          <LoadingButton
            onClick={handleCreate}
            loading={createLoading}
            variant="contained"
            disabled={!newKeyName.trim()}
            sx={{
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
              boxShadow: 'none',
            }}
          >
            発行する
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* 発行完了ダイアログ（一度のみ） */}
      <Dialog
        open={!!newlyCreatedKey}
        slotProps={{ paper: { sx: { borderRadius: '16px', p: 1, width: '500px', maxWidth: '95%' } } }}
      >
        <DialogTitle fontWeight={700}>APIキーを発行しました</DialogTitle>
        <DialogContent>
          <Alert
            severity="warning"
            icon={<WarningAmberIcon />}
            sx={{ mb: 2, borderRadius: '10px', fontSize: '13px' }}
          >
            このキーはこの画面を閉じると二度と表示されません。必ずコピーして保管してください。
          </Alert>
          <CodeBlock onCopy={() => handleCopy(newlyCreatedKey)}>
            {newlyCreatedKey}
          </CodeBlock>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setNewlyCreatedKey(null)}
            sx={{ borderRadius: '8px', background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)', boxShadow: 'none' }}
          >
            コピーして閉じる
          </Button>
        </DialogActions>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        slotProps={{ paper: { sx: { borderRadius: '16px', p: 1 } } }}
      >
        <DialogTitle fontWeight={700}>APIキーの削除</DialogTitle>
        <DialogContent>
          <DialogContentText fontSize="14px">
            このAPIキーを削除しますか？削除後は使用できなくなります。
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setConfirmDialogOpen(false)} color="inherit" sx={{ borderRadius: '8px' }}>
            キャンセル
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: '8px', boxShadow: 'none' }}
          >
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default Account
