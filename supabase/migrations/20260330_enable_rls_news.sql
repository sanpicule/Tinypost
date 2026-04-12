-- news テーブルの行レベルセキュリティ（RLS）設定
-- ログインユーザーが自分の記事のみ操作できるよう制限する
--
-- ※ api/articles.js は SUPABASE_SERVICE_ROLE_KEY を使用するため
--   RLS を有効にしても外部API経由の公開記事取得は引き続き正常に動作する

-- RLS を有効化
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 自分の記事のみ取得可能
CREATE POLICY "ユーザーは自分の記事のみ取得可能"
  ON news FOR SELECT
  USING (auth.uid() = user_id);

-- 自分の記事のみ作成可能
CREATE POLICY "ユーザーは自分の記事のみ作成可能"
  ON news FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 自分の記事のみ更新可能
CREATE POLICY "ユーザーは自分の記事のみ更新可能"
  ON news FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 自分の記事のみ削除可能
CREATE POLICY "ユーザーは自分の記事のみ削除可能"
  ON news FOR DELETE
  USING (auth.uid() = user_id);
