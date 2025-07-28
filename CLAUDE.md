# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Rules

Please respond in Japanese.

When in doubt, keep it simple. Follow the Keep it simple, stupid (KISS) principle by avoiding complex solutions and writing simple, clear code.

## Project Overview

This is a Cloudflare Workers project for creating an MCP (Model Context Protocol) server that interfaces with 小説家になろう (Narou) - a Japanese web novel platform. The project uses Cloudflare Durable Objects for state management and the MCP SDK for protocol implementation.

## Key Dependencies

- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `agents`: Agent framework
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

The project follows Cloudflare Workers' Durable Objects pattern:

1. **Main Worker** (`src/index.ts`): Entry point that handles HTTP requests and delegates to Durable Objects
2. **Durable Objects** (`MyDurableObject` class): Stateful instances that can persist data and handle complex operations
   - Currently implements a simple `sayHello` RPC method
   - Configured in `wrangler.jsonc` with SQLite storage
3. **MCP Integration**: The server should implement MCP protocol handlers to expose Narou search functionality as tools

## Implementation Approach for MCP Server

When implementing the Narou MCP server:

1. Replace the default fetch handler with MCP server initialization using `@modelcontextprotocol/sdk`
2. Use the `narou` package to interface with the Narou API
3. Implement MCP tools for:
   - Searching novels by keywords, genre, tags
   - Fetching novel details and metadata
   - Getting chapter information
   - Managing bookmarks/favorites (using Durable Objects for persistence)
4. Use Zod schemas to validate input parameters for each tool
5. Use Durable Objects for:
   - Caching frequently accessed data
   - User-specific state (bookmarks, reading history)
   - Rate limiting per user

## Cloudflare Workers Specifics

- The project uses ES modules and TypeScript (ES2021 target)
- Environment bindings are configured in `wrangler.jsonc`
- Durable Objects are defined with migrations for schema changes (currently at v1)
- TypeScript strict mode is enabled for type safety
- Observability is enabled for monitoring

## Code Style and Formatting

- **Formatter**: Biome with 2-space indentation
- **Linter**: Biome (configuration in `biome.json`)
- **TypeScript**: Strict mode enabled
- Files to format/lint: `**/*.{js,jsx,ts,tsx}`

## Testing

- **Test Framework**: Vitest with Cloudflare Workers pool
- **Test Location**: Tests should be placed alongside source files with `.test.ts` extension
- Run `pnpm run test` before committing changes

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

Narou Library LLM texts: [docs/narou.md](docs/narou.md)