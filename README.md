# 小説家になろう MCP サーバー

小説家になろう（Narou）API を Model Context Protocol (MCP) で利用するための Cloudflare Workers サーバーです。Hono フレームワークを使用して構築されており、小説検索、ランキング取得、ユーザー検索などの機能を提供します。

## 機能

- 📚 小説検索（キーワード、ジャンル、作者などによる詳細検索）
- 📈 ランキング取得（日間・週間・月間ランキング、ジャンルフィルタ対応）
- 👤 ユーザー検索（作者検索機能）
- 🔞 R18小説検索（成人向けコンテンツ）
- 📊 ランキング履歴取得
- ⚡️ Cloudflare Workers による高速レスポンス
- 🔄 MCP プロトコル対応

## 前提条件

- Cloudflare アカウント
- Node.js (18以上推奨)
- pnpm パッケージマネージャー

## クイックスタート

1. リポジトリをクローン:

```bash
git clone https://github.com/deflis/mcp-narou.git
cd mcp-narou
```

2. 依存関係をインストール:

```bash
pnpm install
```

3. 開発サーバーを起動:

```bash
pnpm run start
```

4. デプロイ:

```bash
pnpm run deploy
```

## プロジェクト構造

```
├── src/
│   ├── index.ts       # Hono アプリケーションのメインエントリーポイント
│   ├── NarouMCP.ts    # MCP ツールの定義と実装
│   └── schemas.ts     # Zod スキーマ定義
├── tests/
│   ├── index.test.ts  # アプリケーションのテスト
│   └── schema.test.ts # スキーマのテスト
├── docs/
│   ├── commit.md      # コミットルール
│   ├── testing.md     # テストガイドライン
│   └── narou.md       # Narou API リファレンス
├── wrangler.jsonc     # Cloudflare Workers 設定
└── vitest.config.ts   # Vitest 設定
```

## 提供される MCP ツール

### `get_novel` - 小説取得
指定されたNコードの小説詳細情報を取得します。

**パラメータ:**
- `ncode`: 小説のNコード（例: "n9669bk"）
- `fields`: 取得するフィールド（オプション）

### `search_novels` - 小説検索
包括的な小説検索機能を提供します。

**主要パラメータ:**
- `word`: 検索キーワード
- `genre`: ジャンル指定
- `novelType`: 小説種別（短編/連載中/完結済み）
- `order`: ソート順序
- `limit`: 取得件数

### `get_ranking` - ランキング取得
小説家になろうのランキングを取得します。

**パラメータ:**
- `rankingType`: ランキング種別（日間・週間・月間・四半期）
- `genre`: ジャンルフィルタ
- `date`: 対象日（オプション）

### `search_r18_novels` - R18小説検索
成人向け小説の検索機能です。

### `search_users` - ユーザー検索
小説家になろうのユーザー（作者）を検索します。

### `get_ranking_history` - ランキング履歴取得
指定した小説のランキング履歴を取得します。

## 開発

### 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm run start

# 全チェックの実行（型生成、型チェック、lint、テスト）
pnpm run checks

# 個別コマンド
pnpm run cf-typegen      # Cloudflare バインディングの型生成
pnpm run check-types     # TypeScript 型チェック
pnpm run lint            # Biome lint
pnpm run lint:fix        # lint 問題の自動修正
pnpm run format          # コードフォーマット
pnpm run test            # テスト実行
pnpm run test:watch      # ウォッチモードでテスト実行
pnpm run test:coverage   # カバレッジ付きテスト実行

# デプロイ
pnpm run deploy
```

### MCP クライアントでの使用

このサーバーは MCP プロトコルに対応しており、Claude Desktop、MCP Client などの MCP 対応クライアントから利用できます。

**接続方法:**
```json
{
  "mcpServers": {
    "narou": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-fetch", "http://your-deployed-url/mcp"]
    }
  }
}
```

## 技術スタック

- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **MCP Integration**: @hono/mcp
- **API**: 小説家になろう API (narou package)
- **Schema Validation**: Zod
- **Testing**: Vitest with Cloudflare Workers pool
- **Language**: TypeScript

## 参考資料

- [小説家になろう](https://syosetu.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## ライセンス

MIT
