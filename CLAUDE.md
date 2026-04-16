# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

TinyPost は Supabase をバックエンドに使う記事管理 SPA。オーナーがブラウザで記事を作成・編集・公開し、発行した APIキー経由で外部アプリが公開記事を取得できる。React 18 + Vite + JavaScript（TypeScript ではない）で構築。

## よく使うコマンド

| コマンド | 用途 |
|---------|------|
| `npm run dev` | Vite のみ起動（`http://localhost:5173`）。**API は動かない** |
| `npm run dev:api` | `vercel dev` 起動（`http://localhost:3000`）。フロント + `api/` のサーバーレス関数が両方動く |
| `npm run build` | 本番ビルド（`vite build`） |
| `npm run build:test` / `build:production` | モード指定ビルド |
| `npm run preview` | ビルド成果物のプレビュー |
| `npm run lint` / `lint:fix` | ESLint（flat config, `eslint.config.js`） |
| `npm run format` | Prettier 整形 |
| `npm run test` | Vitest（`src/**/*.test.js`） |
| `npm run test:ui` | Vitest の GUI |
| `npm run generate-pwa-assets` | `public/images/favion.ico` を元に PWA アイコン一式を再生成 |

単体テストのみ：`npx vitest run src/test/sum.test.js` のようにファイル指定。

## 二系統の実行モードに注意

フロントエンドの UI だけを触るなら `npm run dev` で十分だが、`api/tinypost/articles/*` を触る／APIキー認証を通す検証を行う場合は `npm run dev:api` でなければソースコードがそのまま返ってしまう。詳細は [docs/api_test.md](docs/api_test.md)。

`vercel dev` は `.env.local` に加えて **Vercel プロジェクト側に登録された環境変数**も要求する。`SUPABASE_URL` と `SUPABASE_SERVICE_ROLE_KEY` が Vercel プロジェクトに無いと `Server configuration error` になる。

## 環境変数

`.env.local` 一本で管理。

| 変数 | 参照元 | 用途 |
|------|--------|------|
| `VITE_SUPABASE_URL` | ブラウザ（`lib/supabase.js`） | Supabase クライアント |
| `VITE_SUPABASE_ANON_KEY` | ブラウザ | 匿名キー（RLS 経由） |
| `SUPABASE_URL` | サーバーレス関数（`api/tinypost/articles/*`） | 同上 |
| `SUPABASE_SERVICE_ROLE_KEY` | サーバーレス関数 | **RLS をバイパス**する強力なキー。外部 API 用 |

`VITE_` 付きはブラウザに公開される。`.env*` は一切 git コミットしない（`.gitignore` 済み）。

## アーキテクチャ全体像

```
ブラウザ (React SPA)                          外部アプリ
   │                                            │
   │ anon key + RLS                             │ x-api-key ヘッダ
   ▼                                            ▼
Supabase (auth / news / api_keys / Storage)   Vercel Serverless
                ▲                             (api/tinypost/articles/*)
                │ service_role（RLS バイパス）  │
                └──────────────────────────────┘
```

- **フロント**：Supabase anon key で直接クエリ。`news` と `api_keys` テーブルには RLS があり `auth.uid() = user_id` で自分のデータにのみアクセスできる（[supabase/migrations/](supabase/migrations/)）。
- **公開 API**：`api/tinypost/articles/index.js`（一覧）と `api/tinypost/articles/[id].js`（1件）の 2 ハンドラ。`x-api-key`（または `?apikey=`）→ `api_keys` テーブル照合 → `is_active` 確認 → `user_id` 取得 → `news` から `public = true` の記事を返す、という共通フロー。service_role キーで RLS をバイパスするため、認可ロジックはハンドラ内の `.eq('user_id', keyRecord.user_id)` に依存している。変更時は必ずこのスコープを保つこと。
- **API リファレンス**：[docs/spec/api.md](docs/spec/api.md)。`body` は HTML 文字列（Tiptap の出力）なので呼び出し側は DOMPurify 等でサニタイズする前提。

## フロントエンド構造

- **エントリ**：[src/main.jsx](src/main.jsx) → `ColorModeProvider`（MUI テーマ切替）→ `App` → [src/routes/AppRouters.jsx](src/routes/AppRouters.jsx)。
- **ルーティング**：React Router v6。`/` は [src/routes/PrivateRoute.jsx](src/routes/PrivateRoute.jsx) でセッション確認後 `/dashboard` にリダイレクト。`/login` 以外は `LayoutAppBar` 配下。
- **feature ベース**：`src/features/<feature>/{components,hooks}` に画面単位でまとめる（`dashboard`, `account`, `login`, `profile`）。横断的な UI 部品は [src/components/](src/components/)、横断フックは [src/hooks/](src/hooks/)。
- **Supabase 呼び出しの集約**：DB/ストレージ操作はほぼ全て [src/hooks/useSupabase.js](src/hooks/useSupabase.js) に集約（`fetchPosts`, `insertPost`, `uploadImage`, `fetchApiKeys`, `createApiKey` など）。新規のテーブル操作はここに追加する。認証だけは [src/hooks/useAuth.js](src/hooks/useAuth.js) が担当。
- **グローバル状態**：Zustand。[src/store/useLoginInfo.js](src/store/useLoginInfo.js) はログインユーザーを localStorage に永続化。[src/store/useSnackbarOpen.js](src/store/useSnackbarOpen.js) は共通 Snackbar 用。
- **UI**：MUI v6 + Emotion。リッチテキストは Tiptap（[src/features/dashboard/components/RichTextEditor.jsx](src/features/dashboard/components/RichTextEditor.jsx)）で HTML として保存・表示する。仕様は [docs/spec/rich_text_editor.md](docs/spec/rich_text_editor.md)。
- **パスエイリアス**：`@/` → `src/`、`@lib/` → `lib/`、`@public/` → `public/`。[vite.config.js](vite.config.js) / [jsconfig.json](jsconfig.json) / [eslint.config.js](eslint.config.js) の 3 か所に同じ定義があり、変更時は 3 つとも揃える必要がある。

## コーディング規約

- Prettier：セミコロンなし・シングルクォート（[.prettierrc](.prettierrc)）。ESLint の `prettier/prettier` ルールで強制されるため lint を通すだけで整う。
- import 順：builtin → external → internal → parent → sibling → index、グループ間に空行、アルファベット順（ESLint `import/order`）。`@/mui/**` と `@/components/ui/**` は internal 内で先頭に来る。
- 未使用 import は warn（`unused-imports/no-unused-imports`）。未使用変数はエラー（`_` 始まりは除外）。
- PropTypes 使用（TS ではないため）。

## PWA

`vite-plugin-pwa` で PWA 化済み。設定は [vite.config.js](vite.config.js) の `VitePWA({...})` ブロック。

- **更新戦略**：`registerType: 'autoUpdate'`。新 SW は自動適用されるためユーザー向けの更新 UI は無し。挙動を変えるなら `prompt` にして `virtual:pwa-register/react` で UI を追加する。
- **SW の dev 無効**：`devOptions.enabled: false`。`npm run dev` では SW は動かない。検証は `npm run build && npm run preview` で行う。
- **API はキャッシュしない**：`/api/` と `*.supabase.co` は `NetworkOnly` で明示的に SW をバイパス。記事データや認証が古くなる事故を防ぐ目的なので、このルールは崩さない。
- **アイコン**：`public/images/pwa-*.png`, `maskable-icon-512x512.png`, `apple-touch-icon-180x180.png`, `favicon.ico`。元画像は `public/images/favion.ico`（実体は PNG）。差し替えたら `npm run generate-pwa-assets` で再生成し、生成結果はコミットする（ビルド時には再生成しない）。生成設定は [pwa-assets.config.js](pwa-assets.config.js)。
- **マニフェスト**：ビルド時に `dist/manifest.webmanifest` として出力。`name` / `theme_color` / `background_color` 等を変える場合は `vite.config.js` 側を編集。

## テスト

Vitest。テストファイルは [src/test/](src/test/) 配下に `*.test.js` で置く。手順は [docs/unit_test.md](docs/unit_test.md)。

## Git / コミット

- 既定ブランチ：`develop`（PR のベース）／ローカル作業は `master`。
- コミットメッセージ：プレフィックスは英語（`feat:`, `fix:`, `chore:` 等）、本文は日本語（グローバル設定に従う）。
- `.env*` と `.vercel/` はコミットしない。`.claude/` も同様。
