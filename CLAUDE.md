# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Rules

Please respond in Japanese.

When in doubt, keep it simple. Follow the Keep it simple, stupid (KISS) principle by avoiding complex solutions and writing simple, clear code.

## Project Overview

This is a Cloudflare Workers project for creating an MCP (Model Context Protocol) server that interfaces with 小説家になろう (Narou) - a Japanese web novel platform. The project uses Hono as the web framework and integrates with MCP through `@hono/mcp` for seamless protocol handling.

## Key Dependencies

- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `@hono/mcp`: Hono middleware for MCP integration
- `hono`: Fast web framework for edge runtimes
- `narou`: NPM package for interfacing with the Narou API
- `zod`: Schema validation library
- `wrangler`: Cloudflare Workers CLI tool

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run start

# Run all checks (type generation, type checking, linting, tests)
pnpm run checks

# Individual commands:
pnpm run cf-typegen      # Generate TypeScript types for Cloudflare bindings
pnpm run check-types     # Run TypeScript type checking
pnpm run lint            # Run Biome linter
pnpm run lint:fix        # Fix linting issues
pnpm run format          # Format code with Biome
pnpm run test            # Run tests with Vitest
pnpm run test:watch      # Run tests in watch mode
pnpm run test:coverage   # Run tests with coverage

# Deploy to Cloudflare Workers
pnpm run deploy
```

## Architecture

The project uses a modern Hono-based architecture for Cloudflare Workers:

1. **Main Worker** (`src/index.ts`): Hono application that handles HTTP routing
   - `/mcp` endpoint: MCP protocol handler using `@hono/mcp`
   - `/` endpoint: Health check endpoint
   - Uses `StreamableHTTPTransport` for MCP communication

2. **MCP Server Implementation** (`src/NarouMCP.ts`): 
   - `initializeNarouMcpServer()` function that configures MCP tools
   - Direct integration with `narou` package API
   - Comprehensive tool set for Narou API operations

3. **MCP Tools Implemented**:
   - `get_novel`: 小説取得 (単一小説の詳細情報)
   - `search_novels`: 小説検索 (包括的な検索機能)
   - `get_ranking`: ランキング取得 (ジャンルフィルタリング対応)
   - `search_r18_novels`: R18小説検索
   - `search_users`: ユーザー検索
   - `get_ranking_history`: ランキング履歴取得

4. **Schema Validation** (`src/schemas.ts`): 
   - Zod schemas for all tool input validation
   - Type-safe parameter handling

## Cloudflare Workers Specifics

- The project uses ES modules and TypeScript (ES2021 target)
- Environment bindings are configured in `wrangler.jsonc`
- TypeScript strict mode is enabled for type safety
- Uses Hono framework optimized for edge runtimes
- MCP integration through HTTP streaming transport

## Code Style and Formatting

- **Formatter**: Biome with 2-space indentation
- **Linter**: Biome (configuration in `biome.json`)
- **TypeScript**: Strict mode enabled
- Files to format/lint: `**/*.{js,jsx,ts,tsx}`

## Testing

- **Test Framework**: Vitest with `@cloudflare/vitest-pool-workers`
- **Configuration**: `defineWorkersConfig` in `vitest.config.ts` with Cloudflare Workers environment
- **Test Location**: Tests are in `tests/` directory with `.test.ts` extension
- **Environment**: Tests use `env` from `cloudflare:test` module
- **Testing Pattern**: Use `app.request(path, {}, env)` for Hono application testing
- Run `pnpm run test` before committing changes

### Test Writing Guidelines

- Import `env` from `cloudflare:test` and pass it as the third argument to `app.request()`
- Test basic HTTP responses rather than complex MCP protocol interactions
- Focus on endpoint availability and basic response structure
- Example:
  ```typescript
  import { env } from "cloudflare:test";
  import app from "../src/index.js";
  
  const res = await app.request("/", {}, env);
  expect(res.status).toBe(200);
  ```

## Type Safety

- Always run `pnpm run cf-typegen` after modifying `wrangler.jsonc` to regenerate environment types
- Use `pnpm run check-types` to verify TypeScript compilation
- The `Env` interface is automatically generated and includes all Cloudflare bindings

## Commit Helper Agent

This project recommends using the `commit-helper` agent to create commit messages.

Before committing, always:
1. Run `pnpm run checks` to ensure all checks pass
2. Remove unnecessary console logs and temporary code
3. Add tests for new features

## Additional Notes

@docs/commit.md
@docs/testing.md
@docs/narou.md
