# APIエンドポイント ローカルテスト手順

## なぜ `vercel dev` を使うのか

`api/articles.js` は Vercel のサーバーレス関数として実装されています。  
サーバーレス関数は通常の Node.js スクリプトとは異なり、**Vercel のランタイムが `handler` 関数を呼び出す**仕組みになっています。

```
// Vercel 専用の形式
export default async function handler(req, res) { ... }
```

そのため、フロントエンド専用の `npm run dev`（Vite）では API を実行できず、  
`api/articles.js` のソースコードがそのままレスポンスとして返ってしまいます。

**`vercel dev` を使うと、ローカルでも Vercel と同じランタイムが起動し、サーバーレス関数が正しく実行されます。**

---

## プロジェクト構成

```
Tinypost/
├── api/
│   ├── articles.js          # サーバーレス関数（GET /api/articles）
│   └── articles/
│       └── [id].js          # サーバーレス関数（GET /api/articles/:id）
├── src/                     # フロントエンド（React）
├── .env.local               # 環境変数（唯一の env ファイル）
├── vercel.json              # Vercel の設定
└── package.json
```

### 環境変数の役割（`.env.local`）

| 変数名 | 用途 |
|--------|------|
| `VITE_SUPABASE_URL` | フロントエンド（React）から Supabase に接続 |
| `VITE_SUPABASE_ANON_KEY` | フロントエンドの認証・データ取得 |
| `SUPABASE_URL` | サーバーレス関数（`api/articles.js`）から Supabase に接続 |
| `SUPABASE_SERVICE_ROLE_KEY` | サーバーレス関数用。RLS を無視して全データにアクセスできる強力なキー |

> `VITE_` プレフィックスがある変数はブラウザに公開されます。  
> サーバー側（`api/`）では `process.env` 経由でアクセスするため `VITE_` は不要です。

---

## ローカルでの起動手順

### 前提条件

- Vercel CLI がインストール済み（`devDependencies` に含まれているため `npm install` 済みなら使用可能）
- `.vercel/project.json` が存在する（プロジェクトのリンクが完了している）

リンクが済んでいるか確認：

```bash
cat .vercel/project.json
# {"projectId":"...","orgId":"...","projectName":"tinypost"} と表示されれば OK
```

未リンクの場合のみ実行：

```bash
npx vercel login   # GitHub アカウントでログイン
npx vercel link    # プロジェクトとリンク（「上書きしますか？」は No を選択）
```

---

### ⚠️ 重要：Vercel の環境変数設定が必要

`vercel dev` は `.env.local` だけでなく、**Vercel プロジェクトに登録された環境変数も参照します**。  
サーバーレス関数（`api/articles.js`）が使う `SUPABASE_URL` と `SUPABASE_SERVICE_ROLE_KEY` は  
**Vercel 側にも登録しないと `Server configuration error` になります。**

#### CLI で登録する場合

```bash
npx vercel env add SUPABASE_URL
# 入力: https://jvrnjjriavjmdtjgnnzc.supabase.co
# 環境: Development / Production / Preview すべて選択

npx vercel env add SUPABASE_SERVICE_ROLE_KEY
# 入力: Supabase ダッシュボード → Settings → API → service_role キー
# 環境: Development / Production / Preview すべて選択
```

#### ダッシュボードで登録する場合

1. [Vercel Dashboard](https://vercel.com/dashboard) を開く
2. プロジェクト `tinypost` を選択
3. **Settings** → **Environment Variables**
4. 以下の2つを追加：

   | Name | Value | 環境 |
   |------|-------|------|
   | `SUPABASE_URL` | `https://jvrnjjriavjmdtjgnnzc.supabase.co` | Development / Production / Preview |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase の service_role キー | Development / Production / Preview |

5. 登録後、`vercel dev` を**再起動**する

> ⚠️ `vercel link` 実行時に「`.env.local` を上書きしますか？」と聞かれた場合は **No** を選択してください。  
> 上書きすると `SUPABASE_URL` と `SUPABASE_SERVICE_ROLE_KEY` が `.env.local` から削除されます。

---

### 起動

```bash
npm run dev:api
```

起動後にアクセスできる URL：

| 用途 | URL |
|------|-----|
| フロントエンド | `http://localhost:3000` |
| 記事一覧 API | `http://localhost:3000/api/articles` |
| 記事1件取得 API | `http://localhost:3000/api/articles/:id` |

> `vercel dev` はポート `3000` を使います。`npm run dev`（Vite）の `5173` とは異なります。

---

## API のテスト方法

### 事前準備：APIキーの発行

1. `http://localhost:3000` にアクセスしてログイン
2. **アカウント** ページを開く
3. 「新しいキーを発行」ボタンをクリック
4. 表示された `tp_xxxx...` の文字列をコピーして保管する

> ⚠️ このダイアログを閉じると二度と表示されません。必ずコピーしてください。

---

### cURL でのテスト

```bash
curl "http://localhost:3000/api/articles" \
  -H "x-api-key: tp_ここにAPIキーを貼り付け"
```

成功時のレスポンス：

```json
{
  "data": [
    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "title": "記事タイトル",
      "body": "記事本文",
      "created_at": "2026-03-30T12:00:00.000Z",
      "label": 1,
      "image_url": "https://..."
    }
  ],
  "count": 1
}
```

クエリパラメータでの代替指定：

```bash
curl "http://localhost:3000/api/articles?apikey=tp_xxxxxxxxxx..."
```

---

### 記事1件取得 (`GET /api/articles/:id`)

一覧取得レスポンスに含まれる `id`（UUID）を使ってリクエストします。

```bash
curl "http://localhost:3000/api/articles/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" \
  -H "x-api-key: tp_ここにAPIキーを貼り付け"
```

成功時のレスポンス：

```json
{
  "data": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "title": "記事タイトル",
    "body": "記事本文",
    "created_at": "2026-03-30T12:00:00.000Z",
    "label": 1,
    "image_url": "https://..."
  }
}
```

存在しない・非公開・別ユーザーの記事を指定した場合：

```json
{ "error": "Article not found." }
```

---

### Insomnia / Postman でのテスト

#### 記事一覧

| 項目 | 値 |
|------|-----|
| メソッド | `GET` |
| URL | `http://localhost:3000/api/articles` |
| Header キー | `x-api-key` |
| Header 値 | `tp_xxxxxxxxxx...`（発行したAPIキー） |

#### 記事1件取得

| 項目 | 値 |
|------|-----|
| メソッド | `GET` |
| URL | `http://localhost:3000/api/articles/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| Header キー | `x-api-key` |
| Header 値 | `tp_xxxxxxxxxx...`（発行したAPIキー） |

---

## エラー一覧

| ステータス | メッセージ | 原因 |
|-----------|-----------|------|
| `401` | `API key is required.` | `x-api-key` ヘッダーが未指定 |
| `401` | `Invalid API key.` | APIキーが存在しないか無効 |
| `403` | `This API key has been disabled.` | APIキーが無効化されている |
| `404` | `Article not found.` | 記事が存在しない・非公開・別ユーザー所有 |
| `500` | `Server configuration error.` | Vercel に `SUPABASE_URL` または `SUPABASE_SERVICE_ROLE_KEY` が未登録 |
| `500` | `Failed to fetch articles.` | Supabase への接続エラー |

---

## よくあるトラブル

### `npm run dev` で叩くとソースコードが返ってくる

Vite はサーバーレス関数を実行できないため、`api/articles.js` がそのまま返ります。  
**必ず `npm run dev:api` を使用してください。**

### `Server configuration error` が返ってくる

Vercel プロジェクトの環境変数に `SUPABASE_URL` と `SUPABASE_SERVICE_ROLE_KEY` が未登録です。  
上記「⚠️ 重要：Vercel の環境変数設定が必要」の手順を実施して `vercel dev` を再起動してください。

### ポート 3000 が使用中

```bash
npx vercel dev --listen 3001
# http://localhost:3001/api/articles でアクセス
```

---

## 関連ファイル

| ファイル | 説明 |
|---------|------|
| `api/articles.js` | 記事一覧 APIエンドポイントの実装 |
| `api/articles/[id].js` | 記事1件取得 APIエンドポイントの実装 |
| `.env.local` | 環境変数（唯一の env ファイル） |
| `vercel.json` | Vercel の設定（SPA リライトルール） |
| `docs/spec/api.md` | API リファレンス（IF定義） |
| `supabase/migrations/20260329_create_api_keys.sql` | `api_keys` テーブルのスキーマ |
