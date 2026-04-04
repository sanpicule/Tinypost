# TinyPost Public API リファレンス

## 概要

TinyPost の公開 API は、APIキーで認証された外部アプリケーションが記事データを取得できる REST API です。  
すべてのエンドポイントは `GET` メソッドのみ対応しており、`x-api-key` ヘッダーで認証します。

**Base URL**

```
https://your-project.vercel.app/api
```

---

## 認証

すべてのリクエストに APIキーが必要です。

### ヘッダーで指定（推奨）

```
x-api-key: tp_xxxxxxxxxxxxxxxxxx
```

### クエリパラメーターで指定

```
?apikey=tp_xxxxxxxxxxxxxxxxxx
```

> APIキーは TinyPost のアカウントページから発行できます。  
> フォーマット：`tp_` + 64文字の16進数

---

## エンドポイント一覧

| メソッド | パス | 説明 |
|--------|------|------|
| `GET` | `/api/articles` | 公開記事の一覧を取得 |
| `GET` | `/api/articles/:id` | 指定IDの公開記事を1件取得 |

---

## GET /api/articles

APIキーに紐づくユーザーの公開記事を一覧で返します。作成日時の降順で返却されます。

### リクエスト

```
GET /api/articles
x-api-key: tp_xxxxxxxxxxxxxxxxxx
```

### クエリパラメーター

| パラメーター | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `limit` | `number` | ❌ | 取得件数の上限（1以上の整数）。省略時は全件取得 |

### レスポンス

#### 200 OK

```json
{
  "data": [
    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "title": "記事タイトル",
      "body": "記事本文（Markdown）",
      "created_at": "2026-01-01T00:00:00.000Z",
      "label": 1,
      "image_url": "https://example.com/image.png"
    }
  ],
  "count": 1
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `data` | `Article[]` | 記事オブジェクトの配列 |
| `count` | `number` | 取得件数 |

---

## GET /api/articles/:id

指定した ID の公開記事を1件返します。  
APIキーのオーナーに属する公開記事のみ取得できます。

### リクエスト

```
GET /api/articles/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
x-api-key: tp_xxxxxxxxxxxxxxxxxx
```

### パスパラメーター

| パラメーター | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `id` | `string (UUID)` | ✅ | 取得する記事の ID |

### レスポンス

#### 200 OK

```json
{
  "data": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "title": "記事タイトル",
    "body": "記事本文（Markdown）",
    "created_at": "2026-01-01T00:00:00.000Z",
    "label": 1,
    "image_url": "https://example.com/image.png"
  }
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `data` | `Article` | 記事オブジェクト |

#### 404 Not Found

```json
{
  "error": "Article not found."
}
```

以下のいずれかの場合に返ります：
- 指定した ID の記事が存在しない
- 記事が非公開（`public: false`）
- 記事が別のユーザーに属している

---

## Article オブジェクト

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | `string (UUID)` | 記事の一意識別子 |
| `title` | `string` | 記事タイトル |
| `body` | `string` | 記事本文（Markdown 形式） |
| `created_at` | `string (ISO 8601)` | 作成日時（UTC） |
| `label` | `number \| null` | ラベル識別子 |
| `image_url` | `string \| null` | サムネイル画像 URL |

---

## 共通エラーレスポンス

すべてのエラーレスポンスは以下の形式です：

```json
{
  "error": "エラーメッセージ"
}
```

| ステータス | `error` | 説明 |
|-----------|--------|------|
| `400` | `Article ID is required.` | パスパラメーターが未指定 |
| `400` | `limit must be a positive integer.` | `limit` に1未満または非整数が指定された |
| `401` | `API key is required.` | `x-api-key` ヘッダーが未指定 |
| `401` | `Invalid API key.` | APIキーが存在しないか無効 |
| `403` | `This API key has been disabled.` | APIキーが無効化されている |
| `404` | `Article not found.` | 指定IDの記事が存在しない・非公開・別ユーザー所有 |
| `405` | `Method Not Allowed` | `GET` 以外のメソッドが使用された |
| `500` | `Server configuration error.` | サーバー環境変数の設定不備 |
| `500` | `Failed to fetch articles.` | Supabase への接続エラー |
| `500` | `Internal server error.` | 予期しないサーバーエラー |

---

## 使用例

### cURL

```bash
# 記事一覧取得
curl "https://your-project.vercel.app/api/articles" \
  -H "x-api-key: tp_xxxxxxxxxx"

# 記事一覧取得（最新3件）
curl "https://your-project.vercel.app/api/articles?limit=3" \
  -H "x-api-key: tp_xxxxxxxxxx"

# 記事1件取得
curl "https://your-project.vercel.app/api/articles/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" \
  -H "x-api-key: tp_xxxxxxxxxx"
```

### JavaScript (fetch)

```js
const API_KEY = 'tp_xxxxxxxxxx'
const BASE_URL = 'https://your-project.vercel.app/api'

// 記事一覧取得（全件）
const listResponse = await fetch(`${BASE_URL}/articles`, {
  headers: { 'x-api-key': API_KEY },
})
const { data, count } = await listResponse.json()

// 記事一覧取得（最新5件）
const limitedResponse = await fetch(`${BASE_URL}/articles?limit=5`, {
  headers: { 'x-api-key': API_KEY },
})
const { data: latest } = await limitedResponse.json()

// 記事1件取得
const articleId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
const articleResponse = await fetch(`${BASE_URL}/articles/${articleId}`, {
  headers: { 'x-api-key': API_KEY },
})
const { data: article } = await articleResponse.json()
```

---

## 関連ドキュメント

| ファイル | 説明 |
|---------|------|
| `docs/spec/api_key_management.md` | APIキー管理機能の仕様 |
| `docs/api_test.md` | ローカル環境でのテスト手順 |
| `api/articles.js` | 記事一覧エンドポイントの実装 |
| `api/articles/[id].js` | 記事1件取得エンドポイントの実装 |
