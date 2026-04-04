import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'x-api-key, Content-Type',
}

export default async function handler(req, res) {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => res.setHeader(key, value))

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { id } = req.query
  const apiKey = req.headers['x-api-key'] ?? req.query.apikey

  if (!apiKey) {
    return res.status(401).json({
      error: 'API key is required.',
      hint: 'Pass your API key via the x-api-key request header.',
    })
  }

  if (!id) {
    return res.status(400).json({ error: 'Article ID is required.' })
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // APIキーを検証してユーザーIDを取得
    const { data: keyRecord, error: keyError } = await supabase
      .from('api_keys')
      .select('user_id, is_active')
      .eq('key_value', apiKey)
      .single()

    if (keyError || !keyRecord) {
      return res.status(401).json({ error: 'Invalid API key.' })
    }

    if (!keyRecord.is_active) {
      return res.status(403).json({ error: 'This API key has been disabled.' })
    }

    // 指定IDの公開記事を取得（APIキーのオーナーに属するもののみ）
    const { data: article, error: articleError } = await supabase
      .from('news')
      .select('id, title, body, created_at, label, image_url')
      .eq('id', id)
      .eq('user_id', keyRecord.user_id)
      .eq('public', true)
      .single()

    if (articleError || !article) {
      return res.status(404).json({ error: 'Article not found.' })
    }

    return res.status(200).json({ data: article })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}
