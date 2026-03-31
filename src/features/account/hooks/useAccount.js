import { useEffect, useState } from 'react'

import useSupabase from '@/hooks/useSupabase'
import useLoginInfo from '@/store/useLoginInfo'
import useSnackbarOpen from '@/store/useSnackbarOpen'

const MAX_API_KEYS = 10

const generateApiKey = () => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return 'tp_' + Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

const maskKey = (key) => {
  if (!key || key.length < 8) return key
  return key.slice(0, 7) + '****...****' + key.slice(-4)
}

const useAccount = () => {
  const [apiKeys, setApiKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [newKeyName, setNewKeyName] = useState('新しいAPIキー')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  const userId = useLoginInfo((state) => state.user?.id)
  const { fetchApiKeys, createApiKey, deleteApiKey } = useSupabase()
  const { openSnackbar } = useSnackbarOpen()

  useEffect(() => {
    if (userId) {
      loadApiKeys()
    }
  }, [userId])  // user オブジェクトではなく ID のみを監視（参照変化による無限ループを防ぐ）

  const loadApiKeys = async () => {
    setLoading(true)
    const { data, error } = await fetchApiKeys(userId)
    if (error) {
      // テーブル未作成（404）の場合はエラーを出さず空配列で表示
      console.error('fetchApiKeys:', error?.message ?? error)
    }
    setApiKeys(data || [])
    setLoading(false)
  }

  const handleCreate = async () => {
    if (!newKeyName.trim()) return
    if (apiKeys.length >= MAX_API_KEYS) {
      openSnackbar(`APIキーは最大${MAX_API_KEYS}件までです`, 'error')
      return
    }

    setCreateLoading(true)
    const keyValue = generateApiKey()
    const { error } = await createApiKey(userId, newKeyName.trim(), keyValue)

    if (error) {
      openSnackbar('APIキーの発行に失敗しました', 'error')
    } else {
      // DBから再取得してIDを確実に取得する
      await loadApiKeys()
      setNewlyCreatedKey(keyValue)
      setDialogOpen(false)
      setNewKeyName('新しいAPIキー')
    }
    setCreateLoading(false)
  }

  const handleDeleteRequest = (id) => {
    setDeleteTargetId(id)
    setConfirmDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    const { error } = await deleteApiKey(deleteTargetId)
    if (error) {
      openSnackbar('削除に失敗しました', 'error')
    } else {
      setApiKeys((prev) => prev.filter((k) => k.id !== deleteTargetId))
      openSnackbar('APIキーを削除しました', 'success')
    }
    setConfirmDialogOpen(false)
    setDeleteTargetId(null)
  }

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      openSnackbar('クリップボードにコピーしました', 'success')
    } catch {
      openSnackbar('コピーに失敗しました', 'error')
    }
  }

  const getEndpointUrl = () => 'https://tinypost-three.vercel.app/api/articles'

  return {
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
  }
}

export default useAccount
