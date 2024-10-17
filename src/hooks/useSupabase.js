import { supabase } from '@lib/supabase'

const useSupabase = () => {
  // 全件取得
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
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
      const { data, error } = await supabase
        .from('news')
        .insert(newsData)
        .single()
      if (error) throw error
      return { data, error: null }
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

  return {
    fetchPosts,
    uploadImage,
    insertPost,
    deletePost,
  }
}

export default useSupabase
