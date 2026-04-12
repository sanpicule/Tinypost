# APIキー管理 仕様書

## 概要

TinyPost の記事データを外部アプリケーションから取得するための APIキー管理機能。
アカウントページでAPIキーの発行・削除・確認ができる。

---

## アーキテクチャ

```
外部アプリ
  │
  │  GET /api/articles
  │  Header: x-api-key: tp_xxxx
  ▼
Vercel Serverless Function（/api/articles.js）
  │
  │  1. api_keys テーブルでキーを検証（service role key で RLS バイパス）
  │  2. user_id を取得
  │  3. news テーブルから公開記事を取得
  ▼
Supabase（PostgreSQL）
```

---

## Supabase テーブル定義

### `api_keys` テーブル（✅ 要作成 → `supabase/migrations/20260329_create_api_keys.sql` 参照）

```sql
CREATE TABLE api_keys (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name        TEXT        NOT NULL DEFAULT '新しいAPIキー',
  key_value   TEXT        UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  is_active   BOOLEAN     DEFAULT TRUE
);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ユーザーは自分のAPIキーのみ管理可能"
  ON api_keys FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

## 環境変数

### フロントエンド（`VITE_` prefix）
| 変数名 | 説明 |
|--------|------|
| `VITE_SUPABASE_URL` | Supabase プロジェクト URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon キー |

### バックエンド（Vercel Functions 用）
| 変数名 | 説明 |
|--------|------|
| `SUPABASE_URL` | Supabase プロジェクト URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role キー（RLS をバイパス） |

> `SUPABASE_SERVICE_ROLE_KEY` は絶対にフロントエンドに露出させないこと（`VITE_` prefix 不可）

---

## APIエンドポイント

### `GET /api/articles`

#### 認証
| ヘッダー | 値 |
|----------|----|
| `x-api-key` | 発行したAPIキー |

クエリパラメーターでの指定も可：`?apikey=YOUR_KEY`

#### レスポンス

**200 OK**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "記事タイトル",
      "body": "記事本文（Markdown）",
      "created_at": "2024-01-01T00:00:00Z",
      "label": 1,
      "image_url": "https://..."
    }
  ],
  "count": 1
}
```

**401 Unauthorized** - APIキー未指定 or 無効
**403 Forbidden** - APIキーが無効化済み
**405 Method Not Allowed** - GET 以外のメソッド
**500 Internal Server Error**

---

## APIキーの仕様

| 項目 | 内容 |
|------|------|
| フォーマット | `tp_` + 64文字の16進数 |
| 生成場所 | クライアントサイド（`crypto.getRandomValues`）|
| 保存先 | Supabase `api_keys` テーブル |
| 表示 | 発行直後のみ全体表示。以降はマスク表示 |
| 上限 | 1ユーザー最大10件 |

---

## ローカル開発

```bash
# フロントエンドのみ
npm run dev

# フロントエンド + Vercel Functions（APIも含む）
npm run dev:api
```

`.env.local` に `SUPABASE_URL` と `SUPABASE_SERVICE_ROLE_KEY` を設定すること。
