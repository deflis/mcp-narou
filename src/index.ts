import { StreamableHTTPTransport } from "@hono/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Hono } from "hono";
import { initializeNarouMcpServer } from "./NarouMCP";

const app = new Hono<{ Bindings: Env }>();

// MCP エンドポイント
app.all("/mcp", async (c) => {
  const server = initializeNarouMcpServer(
    new McpServer({
      name: "Narou MCP Server",
      version: "1.0.0",
    }),
  );
  const transport = new StreamableHTTPTransport();
  await server.connect(transport);
  return transport.handleRequest(c);
});

// ヘルスチェック用エンドポイント
app.get("/", (c) => {
  return c.json({
    message: "Narou MCP Server is running",
    endpoint: "/mcp",
  });
});

export default app;
