import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import Help from "./help";
import { initializeNarouMcpServer } from "./NarouMCP";

const app = new Hono<{ Bindings: Env }>();

app.use(jsxRenderer());

// MCP エンドポイント
app.all("/mcp", async (c) => {
  const server = initializeNarouMcpServer();
  const transport = new StreamableHTTPTransport();
  await server.connect(transport);
  return transport.handleRequest(c);
});

// ヘルプ表示用エンドポイント
app.get("/", (c) => {
  const origin = c.req.header("host")
    ? `https://${c.req.header("host")}`
    : "https://mcp-narou.your-subdomain.workers.dev";
  return c.render(<Help origin={origin} />);
});

export default app;
