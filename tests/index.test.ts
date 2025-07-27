import { describe, expect, it } from "vitest";
// Could import any other source file/function here
import worker from "../src/index.js";

declare module "cloudflare:test" {
  // Controls the type of `import("cloudflare:test").env`
  interface ProvidedEnv extends Env {}
}

describe("Narou MCP worker", () => {
  it("should respond to /sse endpoint", async () => {
    const request = new Request("http://localhost/sse");
    const response = await worker.fetch(
      request,
      {} as Env,
      {} as ExecutionContext,
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/event-stream");
  });

  it("should respond to /mcp endpoint", async () => {
    const request = new Request("http://localhost/mcp");
    const response = await worker.fetch(
      request,
      {} as Env,
      {} as ExecutionContext,
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });

  it("should return 404 for unknown endpoints", async () => {
    const request = new Request("http://localhost/unknown");
    const response = await worker.fetch(
      request,
      {} as Env,
      {} as ExecutionContext,
    );
    expect(response.status).toBe(404);
  });
});
