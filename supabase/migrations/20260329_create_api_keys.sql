-- api_keys テーブル作成
-- Tinypost の外部連携用 API キー管理テーブル

CREATE TABLE IF NOT EXISTS api_keys (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name        TEXT        NOT NULL DEFAULT '新しいAPIキー',
  key_value   TEXT        UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  is_active   BOOLEAN     DEFAULT TRUE
);

-- RLS（行レベルセキュリティ）を有効化
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のAPIキーのみ管理可能
CREATE POLICY "ユーザーは自分のAPIキーのみ管理可能"
  ON api_keys FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
