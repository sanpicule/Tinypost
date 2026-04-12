# TinyPost Public API リファレンス

## 概要

TinyPost の公開 API は、APIキーで認証された外部アプリケーションが記事データを取得できる REST API です。  
すべてのエンドポイントは `GET` メソッドのみ対応しており、`x-api-key` ヘッダーで認証します。

**Base URL**

| 環境 | URL |
|------|-----|
| ローカル開発 | `http://localhost:<PORT>/api`（起動時にターミナルで確認） |
| 本番 | `https://your-project.vercel.app/api` |

> ⚠️ **ローカル開発時の注意**
> 
> `npm run dev`（Viteのみ）ではAPIは動作しません。必ず以下のコマンドで起動してください：
> ```bash
> npm run dev:api  # vercel dev が起動する
> ```
> 起動時にターミナルに表示される `Ready! Available at http://localhost:XXXX` のポートを使用してください。  
> ポート3000・3001が使用中の場合、自動で別のポートに切り替わります。

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
| `GET` | `/api/tinypost/articles` | 公開記事の一覧を取得 |
| `GET` | `/api/tinypost/articles/:id` | 指定IDの公開記事を1件取得 |

---

## GET /api/tinypost/articles

APIキーに紐づくユーザーの公開記事を一覧で返します。作成日時の降順で返却されます。

### リクエスト

```
GET /api/tinypost/articles
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

## GET /api/tinypost/articles/:id

指定した ID の公開記事を1件返します。  
APIキーのオーナーに属する公開記事のみ取得できます。

### リクエスト

```
GET /api/tinypost/articles/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
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
| `body` | `string` | 記事本文（**HTML形式**のリッチテキスト） |
| `created_at` | `string (ISO 8601)` | 作成日時（UTC） |
| `label` | `number \| null` | ラベル識別子 |
| `image_url` | `string \| null` | サムネイル画像 URL |

> ⚠️ **`body` フィールドについて**
>
> `body` フィールドは **HTML形式** のリッチテキストです。  
> 太字・見出し・コードブロック・リストなどのフォーマットがHTMLタグとして含まれます。  
> 表示する際は下記の「リッチテキストの表示方法」を参照してください。

---

## リッチテキスト（`body`）の表示方法

`body` は HTML 文字列として返されます。呼び出し側では以下の方法で表示してください。

### 含まれる可能性のある HTML タグ

| タグ | 説明 |
|------|------|
| `<p>` | 段落 |
| `<h1>` `<h2>` `<h3>` | 見出し |
| `<strong>` | 太字 |
| `<em>` | 斜体 |
| `<u>` | 下線 |
| `<s>` | 打ち消し線 |
| `<ul>` `<ol>` `<li>` | リスト |
| `<code>` | インラインコード |
| `<pre><code>` | コードブロック |
| `<blockquote>` | 引用 |
| `<hr>` | 水平線 |

### JavaScript（React）での表示例

```jsx
// ⚠️ XSS対策として DOMPurify で必ずサニタイズしてください
import DOMPurify from 'dompurify'

const ArticleBody = ({ body }) => {
  const clean = DOMPurify.sanitize(body)
  return (
    <div
      className="article-body"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
```

```bash
npm install dompurify
```

### Next.js での表示例

```jsx
import DOMPurify from 'isomorphic-dompurify'

export default function ArticlePage({ article }) {
  return (
    <article>
      <h1>{article.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.body)
        }}
      />
    </article>
  )
}
```

```bash
npm install isomorphic-dompurify
```

### 推奨スタイル（CSS）

コードブロック・引用などを適切に表示するために、以下のような CSS を適用してください。

```css
.article-body {
  line-height: 1.7;
  font-size: 1rem;
}

.article-body h1 { font-size: 1.75em; font-weight: 700; margin: 0.5em 0; }
.article-body h2 { font-size: 1.4em;  font-weight: 700; margin: 0.5em 0; }
.article-body h3 { font-size: 1.15em; font-weight: 700; margin: 0.5em 0; }

.article-body p { margin: 0 0 0.75em 0; }
.article-body p:last-child { margin-bottom: 0; }

.article-body code {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.875em;
  background-color: #f0f0f0;
  padding: 2px 4px;
  border-radius: 4px;
  color: #c7254e;
}

.article-body pre {
  background-color: #1e1e1e;
  color: #d4d4d4;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.article-body pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}

.article-body blockquote {
  border-left: 4px solid #90caf9;
  padding-left: 1rem;
  margin-left: 0;
  color: #666;
  font-style: italic;
}

.article-body ul { padding-left: 1.5rem; list-style-type: disc; }
.article-body ol { padding-left: 1.5rem; }
.article-body li { margin-bottom: 0.25rem; }

.article-body hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1.5rem 0;
}
```

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
curl "https://your-project.vercel.app/api/tinypost/articles" \
  -H "x-api-key: tp_xxxxxxxxxx"

# 記事一覧取得（最新3件）
curl "https://your-project.vercel.app/api/tinypost/articles?limit=3" \
  -H "x-api-key: tp_xxxxxxxxxx"

# 記事1件取得
curl "https://your-project.vercel.app/api/tinypost/articles/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" \
  -H "x-api-key: tp_xxxxxxxxxx"
```

### JavaScript (fetch)

```js
const API_KEY = 'tp_xxxxxxxxxx'
const BASE_URL = 'https://your-project.vercel.app/api'

// 記事一覧取得（全件）
const listResponse = await fetch(`${BASE_URL}/tinypost/articles`, {
  headers: { 'x-api-key': API_KEY },
})
const { data, count } = await listResponse.json()

// 記事一覧取得（最新5件）
const limitedResponse = await fetch(`${BASE_URL}/tinypost/articles?limit=5`, {
  headers: { 'x-api-key': API_KEY },
})
const { data: latest } = await limitedResponse.json()

// 記事1件取得
const articleId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
const articleResponse = await fetch(`${BASE_URL}/tinypost/articles/${articleId}`, {
  headers: { 'x-api-key': API_KEY },
})
const { data: article } = await articleResponse.json()
```

---

## 関連ドキュメント

| ファイル | 説明 |
|---------|------|
| `docs/spec/api_key_management.md` | APIキー管理機能の仕様 |
| `api/tinypost/articles/index.js` | 記事一覧エンドポイントの実装 |
| `api/tinypost/articles/[id].js` | 記事1件取得エンドポイントの実装 |
