import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import app from "../src/index.js";

describe("Narou MCP Server", () => {
  it("should return health check response", async () => {
    const res = await app.request("/", {}, env);

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");

    const json = await res.json();
    expect(json).toEqual({
      message: "Narou MCP Server is running",
      endpoint: "/mcp",
    });
  });

  it("should return 404 for unknown paths", async () => {
    const res = await app.request("/unknown", {}, env);
    expect(res.status).toBe(404);
  });
});
