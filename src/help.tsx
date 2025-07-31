import type { FC } from "hono/jsx";

const Help: FC<{ origin?: string }> = ({
  origin = "https://mcp-narou.your-subdomain.workers.dev",
}) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Narou MCP Server</title>
        <style>
          {`
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              max-width: 1200px;
              margin: 0 auto;
              padding: 2rem;
              background-color: #fafafa;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 12px;
              box-shadow: 0 2px 12px rgba(0,0,0,0.1);
            }
            h1 {
              color: #2563eb;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 0.5rem;
            }
            h2 {
              color: #1e40af;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            h3 {
              color: #1e3a8a;
              margin-top: 1.5rem;
            }
            code {
              background: #f1f5f9;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'SF Mono', Monaco, 'Consolas', monospace;
            }
            pre {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 1rem;
              overflow-x: auto;
              font-family: 'SF Mono', Monaco, 'Consolas', monospace;
            }
            .endpoint {
              background: #ecfdf5;
              border: 1px solid #10b981;
              border-radius: 8px;
              padding: 1rem;
              margin: 1rem 0;
            }
            .tool-list {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 1rem;
              margin: 1rem 0;
            }
            .tool-item {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 1rem;
            }
            .tool-name {
              font-weight: bold;
              color: #1e40af;
              margin-bottom: 0.5rem;
            }
            .badge {
              display: inline-block;
              background: #2563eb;
              color: white;
              padding: 0.2rem 0.5rem;
              border-radius: 4px;
              font-size: 0.8rem;
              margin-left: 0.5rem;
            }
            ul {
              padding-left: 1.5rem;
            }
            li {
              margin-bottom: 0.5rem;
            }
          `}
        </style>
      </head>
      <body>
        <div class="container">
          <h1>小説家になろう MCP Server 🚀</h1>

          <p>
            このサーバーは<strong>小説家になろう</strong>のAPIをModel Context
            Protocol (MCP)経由で利用するためのCloudflare
            Workersベースのサーバーです。
            HonoフレームワークとMCP統合により、エッジランタイムで高速に動作します。
          </p>

          <div class="endpoint">
            <h2>🔗 MCPエンドポイント</h2>
            <p>
              <strong>URL:</strong>{" "}
              <a
                href="/mcp"
                style="text-decoration: none; color: #2563eb; font-weight: bold;"
              >
                <code>/mcp</code>
              </a>
            </p>
            <p>
              このエンドポイントでMCPプロトコル経由で小説家になろうのAPIにアクセスできます。
            </p>
          </div>

          <h2>🛠️ 利用可能なツール</h2>

          <div class="tool-list">
            <div class="tool-item">
              <div class="tool-name">
                get_novel <span class="badge">小説取得</span>
              </div>
              <p>
                単一小説の詳細情報を取得します。Nコードを指定して小説の詳細データを取得できます。
              </p>
            </div>

            <div class="tool-item">
              <div class="tool-name">
                search_novels <span class="badge">小説検索</span>
              </div>
              <p>
                包括的な小説検索機能。キーワード、ジャンル、作者、様々な条件で小説を検索できます。
              </p>
            </div>

            <div class="tool-item">
              <div class="tool-name">
                get_ranking <span class="badge">ランキング</span>
              </div>
              <p>
                小説ランキングを取得。日間・週間・月間・四半期ランキングに対応し、ジャンルフィルタリングも可能です。
              </p>
            </div>

            <div class="tool-item">
              <div class="tool-name">
                search_r18_novels <span class="badge">R18検索</span>
              </div>
              <p>
                R18小説の検索機能。ノクターン・ムーンライト・ミッドナイトノベルズに対応しています。
              </p>
            </div>

            <div class="tool-item">
              <div class="tool-name">
                search_users <span class="badge">ユーザー検索</span>
              </div>
              <p>
                作者（ユーザー）の検索機能。ユーザー名や投稿数などの条件で作者を検索できます。
              </p>
            </div>

            <div class="tool-item">
              <div class="tool-name">
                get_ranking_history <span class="badge">ランキング履歴</span>
              </div>
              <p>
                特定の小説のランキング履歴を取得。過去のランキング推移を確認できます。
              </p>
            </div>
          </div>

          <h2>📋 主な機能</h2>
          <ul>
            <li>
              <strong>高速検索:</strong>{" "}
              小説家になろうの膨大なデータベースから高速で小説を検索
            </li>
            <li>
              <strong>多様なフィルター:</strong>{" "}
              ジャンル、文字数、更新日時、評価など多彩な検索条件
            </li>
            <li>
              <strong>ランキング対応:</strong>{" "}
              各種ランキングデータの取得と履歴確認
            </li>
            <li>
              <strong>R18コンテンツ:</strong> 成人向けコンテンツの検索にも対応
            </li>
            <li>
              <strong>ユーザー情報:</strong> 作者情報の検索と統計データの取得
            </li>
            <li>
              <strong>リアルタイム:</strong> 最新の小説データとランキング情報
            </li>
          </ul>

          <h2>🔧 技術仕様</h2>

          <h3>使用技術</h3>
          <ul>
            <li>
              <strong>Runtime:</strong> Cloudflare Workers
              (エッジコンピューティング)
            </li>
            <li>
              <strong>Framework:</strong> Hono (高速Webフレームワーク)
            </li>
            <li>
              <strong>Protocol:</strong> Model Context Protocol (MCP)
            </li>
            <li>
              <strong>API:</strong> 小説家になろう公式API
            </li>
            <li>
              <strong>Validation:</strong> Zod (型安全なスキーマ検証)
            </li>
          </ul>

          <h3>パフォーマンス特徴</h3>
          <ul>
            <li>エッジランタイムによる低レイテンシ</li>
            <li>並列処理による高速データ取得</li>
            <li>効率的なデータキャッシュ</li>
            <li>TypeScript厳密モードによる型安全性</li>
          </ul>

          <h2>📖 使用例</h2>

          <h3>MCPクライアントでの接続</h3>
          <pre>{`{
  "mcpServers": {
    "narou": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "${origin}/mcp"
      ]
    }
  }
}`}</pre>

          <h3>小説検索の例</h3>
          <pre>{`// 異世界ファンタジー小説を検索
search_novels({
  "keyword": "異世界",
  "genre": [201, 202], // ハイファンタジー、ローファンタジー
  "order": "hyoka",    // 評価順
  "limit": 20
})`}</pre>

          <h2>🚀 Getting Started</h2>
          <p>
            このMCPサーバーはCloudflare Workers上で動作しており、
            <code>/mcp</code>エンドポイントを通じて Model Context
            Protocolクライアントから利用できます。詳細な使用方法については、
            各ツールのスキーマとパラメータをご確認ください。
          </p>

          <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b;">
            <p>
              Powered by Cloudflare Workers • Built with Hono • MCP Protocol
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Help;
