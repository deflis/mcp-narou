import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import app from "../src/index.tsx";

describe("Narou MCP Server", () => {
  it("should return help page", async () => {
    const res = await app.request("/", {}, env);

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");

    const html = await res.text();
    expect(html).toContain("小説家になろう MCP Server");
    expect(html).toContain("MCPエンドポイント");
    expect(html).toContain("/mcp");
  });

  it("should return 404 for unknown paths", async () => {
    const res = await app.request("/unknown", {}, env);
    expect(res.status).toBe(404);
  });
});
