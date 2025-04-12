import { supabase } from '@lib/supabase'

const useSupabase = () => {
  // ログインユーザの取得
  const getLoginUser = async () => {
    const { data } = await supabase.auth.getUser()
    const user = data.user
    return user
  }
  // 全件取得
  const fetchPosts = async (keyword = '', label = 0) => {
    try {
      const user = await getLoginUser()

      let query = supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)

      // キーワードがある場合は部分一致検索を追加
      if (keyword.trim()) {
        query = query.ilike('title', `%${keyword}%`)
      }

      if (label) {
        const labelValue = parseInt(label, 10)
        if (!isNaN(labelValue) && (labelValue === 1 || labelValue === 2)) {
          query = query.eq('label', labelValue)
        }
      }

      const { data, error } = await query

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
  // 1件取得
  const fetchPost = async (id) => {
    try {
      const user = await getLoginUser()
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // 画像をアップロードして公開URLを取得する関数
  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `posts/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return urlData.publicUrl
  }
  // 記事作成
  const insertPost = async (newsData) => {
    try {
      const user = await getLoginUser()
      const { data, error } = await supabase
        .from('news')
        .insert({ ...newsData, email: user.email })
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
  // 記事更新用
  const updatePost = async (id, updateData) => {
    try {
      const { error } = await supabase
        .from('news')
        .update(updateData)
        .eq('id', id)
      if (error) throw error
    } catch (error) {
      return { data: null, error }
    }
  }
  // 記事削除
  const deletePost = async (id) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .delete()
        .eq('id', id)
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
  // プロフィールの更新
  const updateProfile = async (updates) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', session?.user?.id)

      if (error) {
        throw error
      }

      return { error: null }
    } catch (error) {
      console.error('Error updating user profile:', error)
      return { error }
    }
  }

  return {
    fetchPosts,
    fetchPost,
    uploadImage,
    insertPost,
    updatePost,
    deletePost,
    updateProfile,
  }
}

export default useSupabase
