import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.jsonc" },
      },
    },
    deps: {
      // CommonJS モジュールのデフォルトエクスポートを正しく処理する
      interopDefault: true,
      optimizer: {
        ssr: {
          include: ["ajv"],
        },
      },
    },
  },
});
