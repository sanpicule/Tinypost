# リッチテキストエディタ仕様書

## 概要

記事本文（`body`）をリッチテキストとして編集・保存できる機能。  
WYSIWYGエディタとして **Tiptap** を採用し、HTML形式でデータベースに保存する。

---

## 使用ライブラリ

| ライブラリ | バージョン | 役割 |
|-----------|-----------|------|
| `@tiptap/react` | ^2.x | TiptapのReact統合 |
| `@tiptap/pm` | ^2.x | ProseMirrorのピア依存 |
| `@tiptap/starter-kit` | ^2.x | 基本拡張機能セット（bold, italic, code block, list等） |
| `@tiptap/extension-underline` | ^2.x | 下線サポート |
| `@tiptap/extension-placeholder` | ^2.x | プレースホルダーテキスト |

---

## データ形式

### DB保存形式

`body` フィールドに **HTML文字列** として保存する。

```html
<!-- 例 -->
<h2>見出し</h2>
<p>通常のテキストと<strong>太字</strong>と<em>斜体</em>が混在できます。</p>
<ul>
  <li>リストアイテム1</li>
  <li>リストアイテム2</li>
</ul>
<pre><code>const hello = "コードブロック"</code></pre>
```

### 変更点

- 旧形式：プレーンテキスト（改行のみ）
- 新形式：HTML文字列（リッチテキスト）

---

## 対応フォーマット

| 機能 | キーボードショートカット |
|------|----------------------|
| 太字 | `Ctrl+B` |
| 斜体 | `Ctrl+I` |
| 下線 | `Ctrl+U` |
| 打ち消し線 | - |
| 見出し1 / 2 / 3 | - |
| 箇条書きリスト | - |
| 番号付きリスト | - |
| インラインコード | - |
| コードブロック | - |
| 引用 | - |
| 水平線 | - |
| 元に戻す | `Ctrl+Z` |
| やり直す | `Ctrl+Y` |

---

## コンポーネント

### `RichTextEditor.jsx`

**場所：** `src/features/dashboard/components/RichTextEditor.jsx`

**Props：**

| Prop | 型 | 必須 | 説明 |
|------|----|------|------|
| `value` | `string` | ❌ | エディタの初期値（HTML文字列） |
| `onChange` | `function` | ✅ | 変更時のコールバック。引数にHTML文字列が渡される |
| `error` | `boolean` | ❌ | エラー状態 |
| `helperText` | `string` | ❌ | エラーメッセージなど補助テキスト |
| `label` | `string` | ❌ | フィールドラベル |

**使用例（react-hook-form）：**

```jsx
import { Controller } from 'react-hook-form'
import RichTextEditor from './RichTextEditor'

<Controller
  name="body"
  control={control}
  rules={{ required: '本文は必須です' }}
  render={({ field }) => (
    <RichTextEditor
      value={field.value}
      onChange={field.onChange}
      label="本文"
      error={!!errors.body}
      helperText={errors.body?.message}
    />
  )}
/>
```

---

## API への影響

`body` フィールドのフォーマットが変わるため、API利用者はHTML形式として扱う必要がある。  
詳細は `docs/spec/api.md` の「リッチテキスト（body）の表示方法」セクションを参照。

---

## セキュリティ

- API経由で取得した `body` をブラウザで表示する際は **必ず DOMPurify などでサニタイズ** すること
- Tiptap自体はホワイトリスト方式の拡張機能のみ使用しているため、エディタ内でのXSS挿入リスクは低い
- ただし呼び出し側での表示時にはサニタイズを必ず実施すること
