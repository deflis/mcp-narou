# Narou API Wrapper - LLM Documentation

This is a TypeScript library that provides a fluent interface wrapper for the Narou (小説家になろう) developer APIs.
It supports both Node.js (using fetch) and browser environments (using JSONP).

Generated on: 2025-07-04T19:05:30.391Z

## README

# 📚 node-narou

[![npm version](https://badge.fury.io/js/narou.svg)](https://badge.fury.io/js/narou)
[![Node.js CI](https://github.com/deflis/node-narou/actions/workflows/nodejs-test.yml/badge.svg)](https://github.com/deflis/node-narou/actions/workflows/nodejs-test.yml)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/deflis/node-narou)

[なろうデベロッパー](https://dev.syosetu.com/)の API を fluent interface で利用できる TypeScript ライブラリです。
A TypeScript wrapper library for Narou Developer APIs with fluent interface.

## ✨ 特徴

- 🔗 **メソッドチェーン対応**: 直感的な fluent interface で API を操作
- 🌐 **マルチ環境対応**: Node.js とブラウザの両方で動作
- 📝 **TypeScript 完全対応**: 型安全性と IntelliSense サポート
- 🔀 **デュアル実装**: fetch (Node.js) と JSONP (ブラウザ) を自動選択
- 📚 **全 API カバー**: なろうデベロッパーの全 API に対応

## 🚀 対応 API

| API | 説明 | 関数 |
|-----|------|------|
| [なろう小説 API](https://dev.syosetu.com/man/api/) | 小説の検索・絞り込み | `search()` |
| [なろう小説ランキング API](https://dev.syosetu.com/man/rankapi/) | ランキング取得 | `ranking()` |
| [なろう殿堂入り API](https://dev.syosetu.com/man/rankinapi/) | ランキング履歴取得 | `rankingHistory()` |
| [なろう R18 小説 API](https://dev.syosetu.com/xman/api/) | 18禁小説検索 | `searchR18()` |
| [なろうユーザ検索 API](https://dev.syosetu.com/man/userapi/) | ユーザー検索 | `searchUser()` |

## 📦 インストール

```bash
# 推奨: pnpm
pnpm add narou

# または
npm install narou
yarn add narou
```

## 🚀 クイックスタート

### Node.js での使用

```typescript
import { search, ranking } from "narou";
import { Genre, Order, RankingType } from "narou";

// 異世界恋愛小説を検索
const result = await search("異世界")
  .genre(Genre.RenaiIsekai)
  .order(Order.FavoriteNovelCount)
  .limit(10)
  .execute();

console.log(`${result.allcount}件の小説が見つかりました`);
```

### ブラウザでの使用

```typescript
// ブラウザでは専用のインポートを使用（JSONP対応）
import { search } from "narou/browser";

const result = await search("魔法").execute();
```

## 📖 詳細な API ドキュメント

- **🔗 [完全な API ドキュメント](https://deflis.github.io/node-narou/)** - TypeDoc で生成された詳細なドキュメント
- **🤖 [LLM 向けドキュメント](https://deflis.github.io/node-narou/llms.txt)** - AI/LLM が理解しやすい形式のドキュメント（TypeDoc JSON から自動生成）

## 📝 使用例

```typescript
import { search, ranking, rankingHistory, searchR18 } from "narou";
import {
  Genre,
  GenreNotation,
  Order,
  NovelTypeParam,
  RankingType,
  R18Site,
  R18SiteNotation,
} from "narou";

// なろう小説 API
const searchResult = await search("word")
  .genre(Genre.RenaiIsekai) // 異世界〔恋愛〕
  .order(Order.FavoriteNovelCount) // ブックマーク数の多い順
  .type(NovelTypeParam.RensaiNow) // 連載中
  .execute();

console.log(searchResult.allcount);

for (const novel of searchResult.values) {
  console.log(novel.title);
  console.log(novel.ncode);
  console.log(GenreNotation[novel.genre]); // 値から名前を取得できるヘルパーもあります
}

// なろう小説ランキング API
const rankingResult = await ranking()
  .date(new Date("2023-04-01"))
  .type(RankingType.Daily)
  .execute();

for (const novel of rankingResult) {
  console.log(novel.ncode);
  console.log(novel.rank);
  console.log(novel.pt);
}

// なろう小説ランキング API となろう小説 API を組み合わせたヘルパーもあります
const rankingResultWithDetail = await ranking()
  .date(new Date("2023-04-01"))
  .type(RankingType.Daily)
  .executeWithFields();

for (const novel of rankingResultWithDetail) {
  console.log(novel.ncode);
  console.log(novel.rank);
  console.log(novel.pt);
  console.log(novel.title);
}

// なろう殿堂入り API
const rankingHistoryResult = await rankingHistory("**NCODE**");

for (const history of rankingHistoryResult) {
  console.log(history.type);
  console.log(history.date);
  console.log(history.pt);
  console.log(history.rank);
}

// 18禁小説 API
const searchR18Result = await searchR18("word")
  .r18Site(R18Site.Nocturne) // ノクターン
  .order(Order.FavoriteNovelCount) // ブックマーク数の多い順
  .type(NovelTypeParam.RensaiNow) // 連載中
  .execute();

console.log(searchR18Result.allcount);

for (const novel of searchR18Result.values) {
  console.log(novel.title);
  console.log(novel.ncode);
  console.log(R18SiteNotation[novel.nocgenre]); // 値から名前を取得できるヘルパーもあります
}
```

## 🛠️ 開発

このプロジェクトでは pnpm を使用しています。

```bash
# 依存関係のインストール
pnpm install

# ビルド
pnpm run build

# テスト実行
pnpm run test

# 型チェック
pnpm run check

# ドキュメント生成（TypeDoc + llms.txt）
pnpm run docs
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成: `git checkout -b my-new-feature`
3. 変更をコミット: `git commit -am 'Add some feature'`
4. ブランチにプッシュ: `git push origin my-new-feature`
5. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。


## Package Information

```json
{
  "name": "narou",
  "version": "1.2.0",
  "description": "Narou API Wrapper",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/deflis/node-narou.git"
  },
  "license": "MIT",
  "author": "deflis <deflis@gmail.com>",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "node": {
        "import": "./dist/index.js",
        "require": "./dist/index.cjs"
      },
      "browser": {
        "import": "./dist/index.browser.js",
        "require": "./dist/index.browser.cjs"
      },
      "default": "./dist/index.js"
    },
    "./browser": {
      "types": "./dist/index.browser.d.ts",
      "import": "./dist/index.browser.js",
      "require": "./dist/index.browser.cjs",
      "default": "./dist/index.browser.js"
    },
    "./utils/*": {
      "types": "./dist/utils/*.d.ts",
      "import": "./dist/utils/*.js",
      "require": "./dist/utils/*.cjs",
      "default": "./dist/utils/*.js"
    },
    "./*": {
      "types": "./dist/*.d.ts",
      "import": "./dist/*.js",
      "require": "./dist/*.cjs",
      "default": "./dist/*.js"
    }
  },
  "main": "dist/index.cjs",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "src",
    "package.json",
    "pnpm-lock.yaml",
    "README.md"
  ],
  "scripts": {
    "build": "run-z check build:tsc",
    "build:tsc": "tsup ./src",
    "check": "run-z check:lint,check:build,test",
    "check:lint": "eslint src/** test/**",
    "check:build": "tsc --noEmit",
    "prepack": "run-z format build",
    "format": "eslint --fix src/** test/**",
    "test": "vitest run",
    "docs": "run-z docs:clean docs:typedoc docs:json docs:llms",
    "docs:clean": "pnpm dlx rimraf docs",
    "docs:typedoc": "pnpm dlx typedoc --out ./docs src/index.ts",
    "docs:json": "pnpm dlx typedoc --json docs/api.json src/index.ts",
    "docs:llms": "node scripts/generate-llms-txt.js"
  },
  "devDependencies": {
    "@swc/core": "^1.11.29",
    "@types/node": "^24.0.8",
    "@typescript-eslint/eslint-plugin": "^8.31.1",
    "@typescript-eslint/parser": "^8.31.1",
    "@vitest/coverage-v8": "^3.1.2",
    "date-fns": "^4.1.0",
    "eslint": "^9.25.1",
    "eslint-config-prettier": "^10.1.2",
    "eslint-plugin-prettier": "^5.2.6",
    "globals": "^16.0.0",
    "msw": "^2.7.5",
    "prettier": "^3.5.3",
    "run-z": "^2.1.0",
    "tsup": "^8.4.0",
    "typescript": "^5.8.3",
    "vitest": "^3.1.2"
  },
  "engines": {
    "node": ">=16.0.0",
    "pnpm": ">=8"
  },
  "module": "dist/index.js",
  "packageManager": "pnpm@10.10.0"
}

```

## API Documentation

# Classes

## NarouNovelFetch

なろう小説APIへのリクエストを実行する

### Methods

### execute

**Signature:** `execute(params: NarouParams, endpoint: string): Promise`

**Parameters:**
- `params: NarouParams` - クエリパラメータ
- `endpoint: string` - APIエンドポイント

### executeNovel

**Signature:** `executeNovel(params: SearchParams): Promise`

**Parameters:**
- `params: SearchParams` - クエリパラメータ

### executeNovel18

**Signature:** `executeNovel18(params: SearchParams): Promise`

**Parameters:**
- `params: SearchParams` - クエリパラメータ

### executeRanking

**Signature:** `executeRanking(params: RankingParams): Promise`

**Parameters:**
- `params: RankingParams` - クエリパラメータ

### executeRankingHistory

**Signature:** `executeRankingHistory(params: RankingHistoryParams): Promise`

**Parameters:**
- `params: RankingHistoryParams` - クエリパラメータ

### executeSearch

**Signature:** `executeSearch(params: SearchParams, endpoint: string): Promise`

**Parameters:**
- `params: SearchParams` - クエリパラメータ
- `endpoint: string` - APIエンドポイント

### executeUserSearch

**Signature:** `executeUserSearch(params: UserSearchParams): Promise`

**Parameters:**
- `params: UserSearchParams` - クエリパラメータ

## NarouNovelJsonp

なろう小説APIへのリクエストを実行する

### Methods

### execute

**Signature:** `execute(params: NarouParams, endpoint: string): Promise`

**Parameters:**
- `params: NarouParams` - クエリパラメータ
- `endpoint: string` - APIエンドポイント

### executeNovel

**Signature:** `executeNovel(params: SearchParams): Promise`

**Parameters:**
- `params: SearchParams` - クエリパラメータ

### executeNovel18

**Signature:** `executeNovel18(params: SearchParams): Promise`

**Parameters:**
- `params: SearchParams` - クエリパラメータ

### executeRanking

**Signature:** `executeRanking(params: RankingParams): Promise`

**Parameters:**
- `params: RankingParams` - クエリパラメータ

### executeRankingHistory

**Signature:** `executeRankingHistory(params: RankingHistoryParams): Promise`

**Parameters:**
- `params: RankingHistoryParams` - クエリパラメータ

### executeSearch

**Signature:** `executeSearch(params: SearchParams, endpoint: string): Promise`

**Parameters:**
- `params: SearchParams` - クエリパラメータ
- `endpoint: string` - APIエンドポイント

### executeUserSearch

**Signature:** `executeUserSearch(params: UserSearchParams): Promise`

**Parameters:**
- `params: UserSearchParams` - クエリパラメータ

## NarouSearchResults

なろう小説API検索結果

### Properties

- `allcount: number` - 検索結果数
- `length: number` - 今回取得できた検索結果の数
- `limit: number` - 結果表示上限数
- `page: number` - 結果表示の現在ページ(=start/limit)
- `start: number` - 結果表示開始数
- `values: unknown` - 検索結果

## NovelSearchBuilderBase

### Properties

- `api: NarouNovel` - NarouNovel インスタンス
- `params: SearchParams` - クエリパラメータ

### Methods

### buntai

**Signature:** `buntai(buntai: BuntaiParam | unknown): this`

**Parameters:**
- `buntai: BuntaiParam | unknown` - 文体コード、または文体コードの配列

### byAuthor

**Signature:** `byAuthor(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、作者名を検索対象とする (デフォルト: true)

### byKeyword

**Signature:** `byKeyword(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、キーワードを検索対象とする (デフォルト: true)

### byOutline

**Signature:** `byOutline(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、あらすじを検索対象とする (デフォルト: true)

### byTitle

**Signature:** `byTitle(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、作品名を検索対象とする (デフォルト: true)

### execute

**Signature:** `execute(): Promise`

### gzip

**Signature:** `gzip(level: GzipLevel): this`

**Parameters:**
- `level: GzipLevel` - gzip圧縮レベル(1～5)

### isBL

**Signature:** `isBL(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、ボーイズラブ作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isGL

**Signature:** `isGL(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、ガールズラブ作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isPickup

**Signature:** `isPickup(): this`

### isStop

**Signature:** `isStop(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、長期連載停止中のみ取得する (デフォルト: true)。falseの場合、長期連載停止中を除外する。

### isTenni

**Signature:** `isTenni(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、異世界転移作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isTensei

**Signature:** `isTensei(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、異世界転生作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isTT

**Signature:** `isTT(): this`

### isZankoku

**Signature:** `isZankoku(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、残酷な描写あり作品を抽出する (デフォルト: true)。falseの場合、除外する。

### kaiwaritu

**Signature:** `kaiwaritu(num: number): this`

**Parameters:**
- `num: number` - 会話率(%)

**Signature:** `kaiwaritu(min: number, max: number): this`

**Parameters:**
- `min: number` - 最低会話率(%)
- `max: number` - 最高会話率(%)

### lastNovelUpdate

**Signature:** `lastNovelUpdate(date: string): this`

**Parameters:**
- `date: string` - 作品の更新日時 (YYYYMMDDhhmmss形式またはUNIXタイムスタンプ)

**Signature:** `lastNovelUpdate(from: number, to: number): this`

**Parameters:**
- `from: number` - 開始日時 (UNIXタイムスタンプ)
- `to: number` - 終了日時 (UNIXタイムスタンプ)

**Signature:** `lastNovelUpdate(from: Date, to: Date): this`

**Parameters:**
- `from: Date` - 開始日時 (Dateオブジェクト)
- `to: Date` - 終了日時 (Dateオブジェクト)

### lastUpdate

**Signature:** `lastUpdate(date: string): this`

**Parameters:**
- `date: string` - 最終更新日時 (YYYYMMDDhhmmss形式またはUNIXタイムスタンプ)

**Signature:** `lastUpdate(from: number, to: number): this`

**Parameters:**
- `from: number` - 開始日時 (UNIXタイムスタンプ)
- `to: number` - 終了日時 (UNIXタイムスタンプ)

**Signature:** `lastUpdate(from: Date, to: Date): this`

**Parameters:**
- `from: Date` - 開始日時 (Dateオブジェクト)
- `to: Date` - 終了日時 (Dateオブジェクト)

### length

**Signature:** `length(length: number | unknown): this`

**Parameters:**
- `length: number | unknown` - 文字数、または[最小文字数, 最大文字数]

### limit

**Signature:** `limit(num: number): this`

**Parameters:**
- `num: number` - 取得件数 (1-500)

### ncode

**Signature:** `ncode(ncodes: string | unknown): this`

**Parameters:**
- `ncodes: string | unknown` - Nコード、またはNコードの配列

### notWord

**Signature:** `notWord(word: string): this`

**Parameters:**
- `word: string` - 除外語

### order

**Signature:** `order(order: Order): this`

**Parameters:**
- `order: Order` - 出力順序

### page

**Signature:** `page(no: number, count: number): this`

**Parameters:**
- `no: number` - ページ番号 (0-)
- `count: number` - 1ページあたりの件数 (デフォルト: 20)

### sasie

**Signature:** `sasie(num: number | unknown): this`

**Parameters:**
- `num: number | unknown` - 挿絵数、または[最小挿絵数, 最大挿絵数]

### set

**Signature:** `set(obj: SearchParams): this`

**Parameters:**
- `obj: SearchParams` - セットするパラメータ

### start

**Signature:** `start(num: number): this`

**Parameters:**
- `num: number` - 取得開始位置 (1-)

### time

**Signature:** `time(num: number | unknown): this`

**Parameters:**
- `num: number | unknown` - 読了時間(分)、または[最小読了時間, 最大読了時間]

### type

**Signature:** `type(type: NovelTypeParam): this`

**Parameters:**
- `type: NovelTypeParam` - 小説タイプ (t: 短編, r: 連載中, er: 完結済連載小説, ter: 短編と完結済連載小説, re: 連載中と完結済連載小説)

### unset

**Signature:** `unset(key: unknown): this`

**Parameters:**
- `key: unknown` - 削除するパラメータのキー

### word

**Signature:** `word(word: string): this`

**Parameters:**
- `word: string` - 検索語

### array2string

**Signature:** `array2string(n: T | unknown): Join`

**Parameters:**
- `n: T | unknown` - 文字列または数値の配列、あるいは単一の文字列または数値

### distinct

**Signature:** `distinct(array: unknown): T[]`

**Parameters:**
- `array: unknown` - 配列

## RankingBuilder

なろう小説ランキングAPIのヘルパークラス。

ランキング種別や日付を指定してランキングデータを取得します。
また、取得したランキングデータに含まれるNコードを元に、
なろう小説APIを利用して詳細な小説情報を取得することも可能です。

 RankingBuilder

### Properties

- `api: NarouNovel` - API実行クラスのインスタンス
- `date$: Date` - ランキング集計対象の日付
- `params: Partial` - 初期クエリパラメータ
- `type$: RankingType` - ランキング種別

### Methods

### date

**Signature:** `date(date: Date): RankingBuilder`

**Parameters:**
- `date: Date` - 集計対象の日付

### execute

**Signature:** `execute(): Promise`

### executeWithFields

ランキングAPIを実行し、取得したNコードを元になろう小説APIで詳細情報を取得して結合します。

**Signature:** `executeWithFields(): Promise`

**Signature:** `executeWithFields(fields: TFields | TFields[]): Promise`

**Parameters:**
- `fields: TFields | TFields[]` - 取得するフィールドの配列

**Signature:** `executeWithFields(fields: never[], opt: "weekly" | "weekly"[]): Promise`

**Parameters:**
- `fields: never[]` -
- `opt: "weekly" | "weekly"[]` - オプショナルな取得フィールド (`weekly` など)

**Signature:** `executeWithFields(fields: TFields | TFields[], opt: "weekly" | "weekly"[]): Promise`

**Parameters:**
- `fields: TFields | TFields[]` - 取得するフィールドの配列
- `opt: "weekly" | "weekly"[]` - オプショナルな取得フィールド (`weekly` など)

### gzip

**Signature:** `gzip(level: GzipLevel): RankingBuilder`

**Parameters:**
- `level: GzipLevel` - gzip圧縮レベル(1～5)

### type

**Signature:** `type(type: RankingType): RankingBuilder`

**Parameters:**
- `type: RankingType` - ランキング種別

## SearchBuilder

検索ヘルパー
 SearchBuilder

### Properties

- `api: NarouNovel` - NarouNovel インスタンス
- `params: SearchParams` - クエリパラメータ

### Methods

### bigGenre

**Signature:** `bigGenre(genre: BigGenre | unknown): this`

**Parameters:**
- `genre: BigGenre | unknown` - 大ジャンルコード、または大ジャンルコードの配列

### buntai

**Signature:** `buntai(buntai: BuntaiParam | unknown): this`

**Parameters:**
- `buntai: BuntaiParam | unknown` - 文体コード、または文体コードの配列

### byAuthor

**Signature:** `byAuthor(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、作者名を検索対象とする (デフォルト: true)

### byKeyword

**Signature:** `byKeyword(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、キーワードを検索対象とする (デフォルト: true)

### byOutline

**Signature:** `byOutline(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、あらすじを検索対象とする (デフォルト: true)

### byTitle

**Signature:** `byTitle(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、作品名を検索対象とする (デフォルト: true)

### execute

**Signature:** `execute(): Promise`

### fields

**Signature:** `fields(fields: TFields | unknown): SearchBuilder`

**Parameters:**
- `fields: TFields | unknown` - 出力するフィールド名、またはフィールド名の配列

### genre

**Signature:** `genre(genre: Genre | unknown): this`

**Parameters:**
- `genre: Genre | unknown` - ジャンルコード、またはジャンルコードの配列

### gzip

**Signature:** `gzip(level: GzipLevel): this`

**Parameters:**
- `level: GzipLevel` - gzip圧縮レベル(1～5)

### isBL

**Signature:** `isBL(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、ボーイズラブ作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isGL

**Signature:** `isGL(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、ガールズラブ作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isPickup

**Signature:** `isPickup(): this`

### isR15

**Signature:** `isR15(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、R15作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isStop

**Signature:** `isStop(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、長期連載停止中のみ取得する (デフォルト: true)。falseの場合、長期連載停止中を除外する。

### isTenni

**Signature:** `isTenni(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、異世界転移作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isTensei

**Signature:** `isTensei(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、異世界転生作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isTT

**Signature:** `isTT(): this`

### isZankoku

**Signature:** `isZankoku(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、残酷な描写あり作品を抽出する (デフォルト: true)。falseの場合、除外する。

### kaiwaritu

**Signature:** `kaiwaritu(num: number): this`

**Parameters:**
- `num: number` - 会話率(%)

**Signature:** `kaiwaritu(min: number, max: number): this`

**Parameters:**
- `min: number` - 最低会話率(%)
- `max: number` - 最高会話率(%)

### lastNovelUpdate

**Signature:** `lastNovelUpdate(date: string): this`

**Parameters:**
- `date: string` - 作品の更新日時 (YYYYMMDDhhmmss形式またはUNIXタイムスタンプ)

**Signature:** `lastNovelUpdate(from: number, to: number): this`

**Parameters:**
- `from: number` - 開始日時 (UNIXタイムスタンプ)
- `to: number` - 終了日時 (UNIXタイムスタンプ)

**Signature:** `lastNovelUpdate(from: Date, to: Date): this`

**Parameters:**
- `from: Date` - 開始日時 (Dateオブジェクト)
- `to: Date` - 終了日時 (Dateオブジェクト)

### lastUpdate

**Signature:** `lastUpdate(date: string): this`

**Parameters:**
- `date: string` - 最終更新日時 (YYYYMMDDhhmmss形式またはUNIXタイムスタンプ)

**Signature:** `lastUpdate(from: number, to: number): this`

**Parameters:**
- `from: number` - 開始日時 (UNIXタイムスタンプ)
- `to: number` - 終了日時 (UNIXタイムスタンプ)

**Signature:** `lastUpdate(from: Date, to: Date): this`

**Parameters:**
- `from: Date` - 開始日時 (Dateオブジェクト)
- `to: Date` - 終了日時 (Dateオブジェクト)

### length

**Signature:** `length(length: number | unknown): this`

**Parameters:**
- `length: number | unknown` - 文字数、または[最小文字数, 最大文字数]

### limit

**Signature:** `limit(num: number): this`

**Parameters:**
- `num: number` - 取得件数 (1-500)

### ncode

**Signature:** `ncode(ncodes: string | unknown): this`

**Parameters:**
- `ncodes: string | unknown` - Nコード、またはNコードの配列

### notBigGenre

**Signature:** `notBigGenre(genre: BigGenre | unknown): this`

**Parameters:**
- `genre: BigGenre | unknown` - 除外する大ジャンルコード、または大ジャンルコードの配列

### notGenre

**Signature:** `notGenre(genre: Genre | unknown): this`

**Parameters:**
- `genre: Genre | unknown` - 除外するジャンルコード、またはジャンルコードの配列

### notWord

**Signature:** `notWord(word: string): this`

**Parameters:**
- `word: string` - 除外語

### opt

**Signature:** `opt(option: TFields | unknown): SearchBuilder`

**Parameters:**
- `option: TFields | unknown` - 出力するオプションフィールド名、またはオプションフィールド名の配列

### order

**Signature:** `order(order: Order): this`

**Parameters:**
- `order: Order` - 出力順序

### page

**Signature:** `page(no: number, count: number): this`

**Parameters:**
- `no: number` - ページ番号 (0-)
- `count: number` - 1ページあたりの件数 (デフォルト: 20)

### sasie

**Signature:** `sasie(num: number | unknown): this`

**Parameters:**
- `num: number | unknown` - 挿絵数、または[最小挿絵数, 最大挿絵数]

### set

**Signature:** `set(obj: SearchParams): this`

**Parameters:**
- `obj: SearchParams` - セットするパラメータ

### start

**Signature:** `start(num: number): this`

**Parameters:**
- `num: number` - 取得開始位置 (1-)

### time

**Signature:** `time(num: number | unknown): this`

**Parameters:**
- `num: number | unknown` - 読了時間(分)、または[最小読了時間, 最大読了時間]

### type

**Signature:** `type(type: NovelTypeParam): this`

**Parameters:**
- `type: NovelTypeParam` - 小説タイプ (t: 短編, r: 連載中, er: 完結済連載小説, ter: 短編と完結済連載小説, re: 連載中と完結済連載小説)

### unset

**Signature:** `unset(key: unknown): this`

**Parameters:**
- `key: unknown` - 削除するパラメータのキー

### userId

**Signature:** `userId(ids: number | unknown): this`

**Parameters:**
- `ids: number | unknown` - ユーザID、またはユーザIDの配列

### word

**Signature:** `word(word: string): this`

**Parameters:**
- `word: string` - 検索語

### array2string

**Signature:** `array2string(n: T | unknown): Join`

**Parameters:**
- `n: T | unknown` - 文字列または数値の配列、あるいは単一の文字列または数値

### distinct

**Signature:** `distinct(array: unknown): T[]`

**Parameters:**
- `array: unknown` - 配列

## SearchBuilderBase

### Properties

- `api: NarouNovel` - NarouNovel インスタンス
- `params: TParams` - クエリパラメータ

### Methods

### gzip

**Signature:** `gzip(level: GzipLevel): this`

**Parameters:**
- `level: GzipLevel` - gzip圧縮レベル(1～5)

### limit

**Signature:** `limit(num: number): this`

**Parameters:**
- `num: number` - 取得件数 (1-500)

### order

**Signature:** `order(order: TOrder): this`

**Parameters:**
- `order: TOrder` - 出力順序

### page

**Signature:** `page(no: number, count: number): this`

**Parameters:**
- `no: number` - ページ番号 (0-)
- `count: number` - 1ページあたりの件数 (デフォルト: 20)

### set

**Signature:** `set(obj: TParams): this`

**Parameters:**
- `obj: TParams` - セットするパラメータ

### start

**Signature:** `start(num: number): this`

**Parameters:**
- `num: number` - 取得開始位置 (1-)

### unset

**Signature:** `unset(key: unknown): this`

**Parameters:**
- `key: unknown` - 削除するパラメータのキー

### array2string

**Signature:** `array2string(n: T | unknown): Join`

**Parameters:**
- `n: T | unknown` - 文字列または数値の配列、あるいは単一の文字列または数値

### distinct

**Signature:** `distinct(array: unknown): T[]`

**Parameters:**
- `array: unknown` - 配列

## SearchBuilderR18

18禁API検索ヘルパー
 SearchBuilderR18

### Properties

- `api: NarouNovel` - NarouNovel インスタンス
- `params: SearchParams` - クエリパラメータ

### Methods

### buntai

**Signature:** `buntai(buntai: BuntaiParam | unknown): this`

**Parameters:**
- `buntai: BuntaiParam | unknown` - 文体コード、または文体コードの配列

### byAuthor

**Signature:** `byAuthor(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、作者名を検索対象とする (デフォルト: true)

### byKeyword

**Signature:** `byKeyword(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、キーワードを検索対象とする (デフォルト: true)

### byOutline

**Signature:** `byOutline(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、あらすじを検索対象とする (デフォルト: true)

### byTitle

**Signature:** `byTitle(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、作品名を検索対象とする (デフォルト: true)

### execute

**Signature:** `execute(): Promise`

### fields

**Signature:** `fields(fields: TFields | unknown): SearchBuilderR18`

**Parameters:**
- `fields: TFields | unknown` - 出力するR18フィールド名、またはR18フィールド名の配列

### gzip

**Signature:** `gzip(level: GzipLevel): this`

**Parameters:**
- `level: GzipLevel` - gzip圧縮レベル(1～5)

### isBL

**Signature:** `isBL(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、ボーイズラブ作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isGL

**Signature:** `isGL(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、ガールズラブ作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isPickup

**Signature:** `isPickup(): this`

### isStop

**Signature:** `isStop(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、長期連載停止中のみ取得する (デフォルト: true)。falseの場合、長期連載停止中を除外する。

### isTenni

**Signature:** `isTenni(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、異世界転移作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isTensei

**Signature:** `isTensei(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、異世界転生作品を抽出する (デフォルト: true)。falseの場合、除外する。

### isTT

**Signature:** `isTT(): this`

### isZankoku

**Signature:** `isZankoku(bool: boolean): this`

**Parameters:**
- `bool: boolean` - trueの場合、残酷な描写あり作品を抽出する (デフォルト: true)。falseの場合、除外する。

### kaiwaritu

**Signature:** `kaiwaritu(num: number): this`

**Parameters:**
- `num: number` - 会話率(%)

**Signature:** `kaiwaritu(min: number, max: number): this`

**Parameters:**
- `min: number` - 最低会話率(%)
- `max: number` - 最高会話率(%)

### lastNovelUpdate

**Signature:** `lastNovelUpdate(date: string): this`

**Parameters:**
- `date: string` - 作品の更新日時 (YYYYMMDDhhmmss形式またはUNIXタイムスタンプ)

**Signature:** `lastNovelUpdate(from: number, to: number): this`

**Parameters:**
- `from: number` - 開始日時 (UNIXタイムスタンプ)
- `to: number` - 終了日時 (UNIXタイムスタンプ)

**Signature:** `lastNovelUpdate(from: Date, to: Date): this`

**Parameters:**
- `from: Date` - 開始日時 (Dateオブジェクト)
- `to: Date` - 終了日時 (Dateオブジェクト)

### lastUpdate

**Signature:** `lastUpdate(date: string): this`

**Parameters:**
- `date: string` - 最終更新日時 (YYYYMMDDhhmmss形式またはUNIXタイムスタンプ)

**Signature:** `lastUpdate(from: number, to: number): this`

**Parameters:**
- `from: number` - 開始日時 (UNIXタイムスタンプ)
- `to: number` - 終了日時 (UNIXタイムスタンプ)

**Signature:** `lastUpdate(from: Date, to: Date): this`

**Parameters:**
- `from: Date` - 開始日時 (Dateオブジェクト)
- `to: Date` - 終了日時 (Dateオブジェクト)

### length

**Signature:** `length(length: number | unknown): this`

**Parameters:**
- `length: number | unknown` - 文字数、または[最小文字数, 最大文字数]

### limit

**Signature:** `limit(num: number): this`

**Parameters:**
- `num: number` - 取得件数 (1-500)

### ncode

**Signature:** `ncode(ncodes: string | unknown): this`

**Parameters:**
- `ncodes: string | unknown` - Nコード、またはNコードの配列

### notWord

**Signature:** `notWord(word: string): this`

**Parameters:**
- `word: string` - 除外語

### opt

**Signature:** `opt(option: TFields | unknown): SearchBuilderR18`

**Parameters:**
- `option: TFields | unknown` - 出力するオプションフィールド名、またはオプションフィールド名の配列

### order

**Signature:** `order(order: Order): this`

**Parameters:**
- `order: Order` - 出力順序

### page

**Signature:** `page(no: number, count: number): this`

**Parameters:**
- `no: number` - ページ番号 (0-)
- `count: number` - 1ページあたりの件数 (デフォルト: 20)

### r18Site

**Signature:** `r18Site(sites: R18Site | unknown): SearchBuilderR18`

**Parameters:**
- `sites: R18Site | unknown` - R18サイトコード、またはR18サイトコードの配列 (1: ノクターンノベルズ, 2: ムーンライトノベルズ(男性向け), 3: ムーンライトノベルズ(BL), 4: ミッドナイトノベルズ)

### sasie

**Signature:** `sasie(num: number | unknown): this`

**Parameters:**
- `num: number | unknown` - 挿絵数、または[最小挿絵数, 最大挿絵数]

### set

**Signature:** `set(obj: SearchParams): this`

**Parameters:**
- `obj: SearchParams` - セットするパラメータ

### start

**Signature:** `start(num: number): this`

**Parameters:**
- `num: number` - 取得開始位置 (1-)

### time

**Signature:** `time(num: number | unknown): this`

**Parameters:**
- `num: number | unknown` - 読了時間(分)、または[最小読了時間, 最大読了時間]

### type

**Signature:** `type(type: NovelTypeParam): this`

**Parameters:**
- `type: NovelTypeParam` - 小説タイプ (t: 短編, r: 連載中, er: 完結済連載小説, ter: 短編と完結済連載小説, re: 連載中と完結済連載小説)

### unset

**Signature:** `unset(key: unknown): this`

**Parameters:**
- `key: unknown` - 削除するパラメータのキー

### word

**Signature:** `word(word: string): this`

**Parameters:**
- `word: string` - 検索語

### xid

**Signature:** `xid(ids: number | unknown): SearchBuilderR18`

**Parameters:**
- `ids: number | unknown` - X-ID、またはX-IDの配列

### array2string

**Signature:** `array2string(n: T | unknown): Join`

**Parameters:**
- `n: T | unknown` - 文字列または数値の配列、あるいは単一の文字列または数値

### distinct

**Signature:** `distinct(array: unknown): T[]`

**Parameters:**
- `array: unknown` - 配列

# Interfaces

## NarouRankingResult

ランキングAPIの結果

### Properties

- `ncode: string` - Nコード
- `pt: number` - ポイント
- `rank: number` - 順位

## NarouSearchResult

小説情報

### Properties

- `all_hyoka_cnt: number` - 評価者数
- `all_point: number` - 評価ポイント
- `biggenre: BigGenre` - 大ジャンル
- `daily_point: number` - 日間ポイント
ランキング集計時点から過去24時間以内で新たに登録されたブックマークや評価が対象
- `end: End` - 短編小説と完結済小説は0となっています。連載中は1です。
- `fav_novel_cnt: number` - ブックマーク数
- `general_all_no: number` - 全掲載話数です。短編の場合は1です。
- `general_firstup: string` - 初回掲載日 YYYY-MM-DD HH:MM:SSの形式
- `general_lastup: string` - 最終掲載日 YYYY-MM-DD HH:MM:SSの形式
- `genre: Genre` - ジャンル
- `global_point: number` - 総合得点(=(ブックマーク数×2)+評価点)
- `impression_cnt: number` - 感想数
- `isbl: BooleanNumber` - 登録必須キーワードに「ボーイズラブ」が含まれる場合は1、それ以外は0です。
- `isgl: BooleanNumber` - 登録必須キーワードに「ガールズラブ」が含まれる場合は1、それ以外は0です。
- `isr15: BooleanNumber` - 登録必須キーワードに「R15」が含まれる場合は1、それ以外は0です。
- `isstop: BooleanNumber` - 長期連載中は1、それ以外は0です。
- `istenni: BooleanNumber` - 登録必須キーワードに「異世界転移」が含まれる場合は1、それ以外は0です。
- `istensei: BooleanNumber` - 登録必須キーワードに「異世界転生」が含まれる場合は1、それ以外は0です。
- `iszankoku: BooleanNumber` - 登録必須キーワードに「残酷な描写あり」が含まれる場合は1、それ以外は0です。
- `kaiwaritu: number` - 会話率
- `keyword: string` - キーワード
- `length: number` - 小説文字数です。スペースや改行は文字数としてカウントしません。
- `monthly_point: number` - 月間ポイント
ランキング集計時点から過去30日以内で新たに登録されたブックマークや評価が対象
- `ncode: string` - Nコード
- `nocgenre: R18Site` - 掲載サイト
- `novel_type: NovelType` - 連載の場合は1、短編の場合は2
- `noveltype: NovelType` - 連載の場合は1、短編の場合は2
- `novelupdated_at: string` - 小説の更新日時
- `quarter_point: number` - 四半期ポイント
ランキング集計時点から過去90日以内で新たに登録されたブックマークや評価が対象
- `review_cnt: number` - レビュー数
- `sasie_cnt: number` - 挿絵の数
- `story: string` - 小説のあらすじ
- `time: number` - 読了時間(分単位)です。読了時間は小説文字数÷500を切り上げした数値です。
- `title: string` - 小説名
- `updated_at: string` - 最終更新日時
システム用で小説更新時とは関係ありません
- `userid: number` - 作者のユーザID(数値)
- `weekly_point: number` - 週間ポイント
ランキング集計時点から過去7日以内で新たに登録されたブックマークや評価が対象
- `weekly_unique: number` - 週間ユニークユーザー数
- `writer: string` - 作者名
- `yearly_point: number` - 年間ポイント
ランキング集計時点から過去365日以内で新たに登録されたブックマークや評価が対象

## ParamsBase

すべてのAPIで共通のクエリパラメータ

### Properties

- `gzip?: GzipLevel` - gzip圧縮してgzipファイルとして返します。
gzip圧縮レベルを1～5で指定できます。
転送量上限を減らすためにも推奨
- `out?: "json" | "jsonp"` - 出力形式を指定
本ライブラリはJSONとJSONPのみ対応

## ParamsBaseWithOrder

検索APIで共通のクエリパラメータ

### Properties

- `gzip?: GzipLevel` - gzip圧縮してgzipファイルとして返します。
gzip圧縮レベルを1～5で指定できます。
転送量上限を減らすためにも推奨
- `lim?: number` - 最大出力数を指定できます。指定しない場合は20件になります。
- `of?: string` - 出力する項目を個別に指定できます。未指定時は全項目出力されます。
転送量軽減のため、このパラメータの使用が推奨されます。
- `order?: TOrder` - 出力順序を指定できます。
- `out?: "json" | "jsonp"` - 出力形式を指定
本ライブラリはJSONとJSONPのみ対応
- `st?: number` - 表示開始位置の指定です。

## RankingHistoryParams

すべてのAPIで共通のクエリパラメータ

### Properties

- `gzip?: GzipLevel` - gzip圧縮してgzipファイルとして返します。
gzip圧縮レベルを1～5で指定できます。
転送量上限を減らすためにも推奨
- `ncode: string` -
- `out?: "json" | "jsonp"` - 出力形式を指定
本ライブラリはJSONとJSONPのみ対応

## RankingHistoryRawResult

### Properties

- `pt: number` -
- `rank: number` -
- `rtype: unknown | unknown | unknown | unknown` -

## RankingHistoryResult

### Properties

- `date: Date` -
- `pt: number` -
- `rank: number` -
- `type: RankingType` -

## RankingParams

すべてのAPIで共通のクエリパラメータ

### Properties

- `gzip?: GzipLevel` - gzip圧縮してgzipファイルとして返します。
gzip圧縮レベルを1～5で指定できます。
転送量上限を減らすためにも推奨
- `out?: "json" | "jsonp"` - 出力形式を指定
本ライブラリはJSONとJSONPのみ対応
- `rtype: unknown | unknown | unknown | unknown` -

## SearchParams

メソッドにパラメータを指定する際のヘルパー。

### Properties

- `biggenre?: BigGenre | Join` -
- `buntai?: BuntaiParam | Join` -
- `ex?: BooleanNumber` -
- `genre?: Genre | Join` -
- `gzip?: GzipLevel` - gzip圧縮してgzipファイルとして返します。
gzip圧縮レベルを1～5で指定できます。
転送量上限を減らすためにも推奨
- `isbl?: BooleanNumber` -
- `isgl?: BooleanNumber` -
- `ispickup?: 1` -
- `isr15?: BooleanNumber` -
- `istenni?: BooleanNumber` -
- `istensei?: BooleanNumber` -
- `istt?: BooleanNumber` -
- `iszankoku?: BooleanNumber` -
- `kaiwaritu?: string | number` -
- `keyword?: BooleanNumber` -
- `lastup?: string` -
- `lastupdate?: string` -
- `length?: number | Join` -
- `lim?: number` - 最大出力数を指定できます。指定しない場合は20件になります。
- `maxlen?: number` -
- `maxtime?: number` -
- `minlen?: number` -
- `mintime?: number` -
- `ncode?: string` -
- `nocgenre?: R18Site | Join` -
- `notbiggenre?: BigGenre | Join` -
- `notbl?: BooleanNumber` -
- `notgenre?: Genre | Join` -
- `notgl?: BooleanNumber` -
- `notnocgenre?: R18Site | Join` -
- `notr15?: BooleanNumber` -
- `nottenni?: BooleanNumber` -
- `nottensei?: BooleanNumber` -
- `notword?: string` -
- `notzankoku?: BooleanNumber` -
- `of?: string` - 出力する項目を個別に指定できます。未指定時は全項目出力されます。
転送量軽減のため、このパラメータの使用が推奨されます。
- `opt?: Join` -
- `order?: Order` - 出力順序を指定できます。
- `out?: "json" | "jsonp"` - 出力形式を指定
本ライブラリはJSONとJSONPのみ対応
- `sasie?: string | number` -
- `st?: number` - 表示開始位置の指定です。
- `stop?: StopParam` -
- `time?: string | number` -
- `title?: BooleanNumber` -
- `type?: NovelTypeParam` -
- `userid?: number | Join` -
- `wname?: BooleanNumber` -
- `word?: string` -
- `xid?: number | Join` -

## UserSearchParams

ユーザー検索パラメータ

### Properties

- `gzip?: GzipLevel` - gzip圧縮してgzipファイルとして返します。
gzip圧縮レベルを1～5で指定できます。
転送量上限を減らすためにも推奨
- `lim?: number` - 最大出力数を指定できます。指定しない場合は20件になります。
- `maxnovel?: number` - 抽出するユーザの小説投稿数の上限を指定できます。小説投稿件数が指定された数値以下のユーザを抽出します。
- `maxreview?: number` - 抽出するユーザのレビュー投稿数の上限を指定できます。レビュー投稿件数が指定された数値以下のユーザを抽出します。
- `minnovel?: number` - 抽出するユーザの小説投稿数の下限を指定できます。小説投稿件数が指定された数値以上のユーザを抽出します。
- `minreview?: number` - 抽出するユーザのレビュー投稿数の下限を指定できます。レビュー投稿件数が指定された数値以上のユーザを抽出します。
- `name1st?: string` - 抽出するユーザのユーザ名のフリガナの頭文字を指定できます。頭文字はユーザ名のフリガナをひらがなに変換し、最初の1文字が「ぁ」～「ん」の場合に対象となります。
- `notword?: string` - 含みたくない単語を指定できます。スペースで区切ることにより含ませない単語を増やせます。部分一致で除外されます。除外の対象はユーザ名とユーザ名のフリガナです。
- `of?: string` - 出力する項目を個別に指定できます。未指定時は全項目出力されます。
転送量軽減のため、このパラメータの使用が推奨されます。
- `order?: UserOrder` - 出力順序を指定できます。
- `out?: "json" | "jsonp"` - 出力形式を指定
本ライブラリはJSONとJSONPのみ対応
- `st?: number` - 表示開始位置の指定です。
- `userid?: number` - ユーザIDで抽出可能。
- `word?: string` - 単語を指定できます。半角または全角スペースで区切るとAND抽出になります。部分一致でHITします。検索の対象はユーザ名とユーザ名のフリガナです。

## UserSearchResult

ユーザ情報

### Properties

- `name: string` - ユーザ名
- `name1st: string` - ユーザ名のフリガナの頭文字
ひらがな以外の場合はnullまたは空文字となります。
- `novel_cnt: number` - 小説投稿数
- `novel_length: number` - 小説累計文字数
スペースや改行は文字数としてカウントしません。
- `review_cnt: number` - レビュー投稿数
- `sum_global_point: number` - 総合評価ポイントの合計
投稿済小説でそれぞれ獲得した総合評価ポイントの合計です。
- `userid: number` - ユーザID
- `yomikata: string` - ユーザ名のフリガナ

# Functions

### formatRankingHistory

**Signature:** `formatRankingHistory(rankin: RankingHistoryRawResult): RankingHistoryResult`

**Parameters:**
- `rankin: RankingHistoryRawResult` - フォーマットする生のランキング履歴データ

### ranking

**Signature:** `ranking(api: NarouNovel): RankingBuilder`

**Parameters:**
- `api: NarouNovel` -

### rankingHistory

**Signature:** `rankingHistory(ncode: string, api: NarouNovel): Promise`

**Parameters:**
- `ncode: string` - 小説のNコード
- `api: NarouNovel` -

### search

**Signature:** `search(word?: string, api: NarouNovel): SearchBuilder`

**Parameters:**
- `word?: string` - 検索ワード
- `api: NarouNovel` -

### searchR18

**Signature:** `searchR18(word?: string, api: NarouNovel): SearchBuilderR18`

**Parameters:**
- `word?: string` - 検索ワード
- `api: NarouNovel` -

### searchUser

**Signature:** `searchUser(word?: string, api: NarouNovel): UserSearchBuilder`

**Parameters:**
- `word?: string` - 検索ワード
- `api: NarouNovel` -



## Supported APIs

This library wraps the following Narou developer APIs:

- [なろう小説 API](https://dev.syosetu.com/man/api/) - Novel search API
- [なろう小説ランキング API](https://dev.syosetu.com/man/rankapi/) - Novel ranking API
- [なろう殿堂入り API](https://dev.syosetu.com/man/rankinapi/) - Ranking history API
- [なろう R18 小説 API](https://dev.syosetu.com/xman/api/) - R18 novel search API
- [なろうユーザ検索 API](https://dev.syosetu.com/man/userapi/) - User search API

## Architecture

The library uses a builder pattern with fluent interfaces for API construction.
It provides dual environment support through different entry points:

- `src/index.ts` - Node.js entry point using fetch
- `src/index.browser.ts` - Browser entry point using JSONP

The core architecture includes:
- Abstract base classes for builders
- Environment-specific API implementations
- Type-safe field selection with TypeScript generics
- Comprehensive test coverage with MSW mocking

## Usage Examples

```typescript
import { search, ranking, rankingHistory, searchR18 } from "narou";

// Basic search
const results = await search("異世界")
  .genre(Genre.RenaiIsekai)
  .order(Order.FavoriteNovelCount)
  .execute();

// Ranking
const ranking = await ranking()
  .date(new Date())
  .type(RankingType.Daily)
  .execute();

// R18 search
const r18Results = await searchR18("word")
  .r18Site(R18Site.Nocturne)
  .execute();
```
