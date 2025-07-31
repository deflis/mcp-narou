import {
  type BigGenre,
  BigGenreNotation,
  BuntaiParam,
  Fields,
  type Genre,
  GenreNotation,
  NovelTypeParam,
  Order,
  R18Fields,
  type R18Site,
  R18SiteNotation,
  RankingType,
  UserOrder,
} from "narou/index";
import { z } from "zod";

// Human-readable genre mappings using GenreNotation
export const GenreMapping = Object.fromEntries(
  Object.entries(GenreNotation).map(([key, value]) => [value, Number(key)]),
) as Record<string, Genre>;

// Human-readable big genre mappings using BigGenreNotation
export const BigGenreMapping = Object.fromEntries(
  Object.entries(BigGenreNotation).map(([key, value]) => [value, Number(key)]),
) as Record<string, BigGenre>;

// 入力スキーマの定義
export const GenreSchema = z
  .enum(
    Object.keys(GenreMapping) as [
      keyof typeof GenreMapping,
      ...(keyof typeof GenreMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? GenreMapping[val] : undefined))
  .describe("ジャンル");

export const BigGenreSchema = z
  .enum(
    Object.keys(BigGenreMapping) as [
      keyof typeof BigGenreMapping,
      ...(keyof typeof BigGenreMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? BigGenreMapping[val] : undefined))
  .describe("大ジャンル");

// Human-readable order mappings
export const OrderMapping = {
  ブックマーク数の多い順: Order.FavoriteNovelCount,
  レビュー数の多い順: Order.ReviewCount,
  総合ポイントの高い順: Order.HyokaDesc,
  総合ポイントの低い順: Order.HyokaAsc,
  感想の多い順: Order.ImpressionCount,
  評価者数の多い順: Order.HyokaCountDesc,
  評価者数の少ない順: Order.HyokaCountAsc,
  週間ユニークユーザの多い順: Order.Weekly,
  小説本文の文字数が多い順: Order.LengthDesc,
  小説本文の文字数が少ない順: Order.LengthAsc,
  Nコードが新しい順: Order.NCodeDesc,
  新着更新順: Order.New,
  古い順: Order.Old,
  日間ポイントの高い順: Order.DailyPoint,
  週間ポイントの高い順: Order.WeeklyPoint,
  月間ポイントの高い順: Order.MonthlyPoint,
  四半期ポイントの高い順: Order.QuarterPoint,
  年間ポイントの高い順: Order.YearlyPoint,
  初回掲載順: Order.GeneralFirstUp,
} as const;

export const OrderSchema = z
  .enum(
    Object.keys(OrderMapping) as [
      keyof typeof OrderMapping,
      ...(keyof typeof OrderMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? OrderMapping[val] : undefined))
  .describe("並び順");

// Human-readable novel type mappings
export const NovelTypeMapping = {
  短編: NovelTypeParam.Short,
  連載中: NovelTypeParam.RensaiNow,
  完結済連載小説: NovelTypeParam.RensaiEnd,
  すべての連載小説: NovelTypeParam.Rensai,
  短編と完結済連載小説: NovelTypeParam.ShortAndRensai,
} as const;

export const NovelTypeSchema = z
  .enum(
    Object.keys(NovelTypeMapping) as [
      keyof typeof NovelTypeMapping,
      ...(keyof typeof NovelTypeMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? NovelTypeMapping[val] : undefined))
  .describe("小説タイプ");

// Human-readable ranking type mappings
export const RankingTypeMapping = {
  日間: RankingType.Daily,
  週間: RankingType.Weekly,
  月間: RankingType.Monthly,
  四半期: RankingType.Quarterly,
} as const;

export const RankingTypeSchema = z
  .enum(
    Object.keys(RankingTypeMapping) as [
      keyof typeof RankingTypeMapping,
      ...(keyof typeof RankingTypeMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? RankingTypeMapping[val] : undefined))
  .describe("ランキング種別");

// Human-readable R18 site mappings using R18SiteNotation
export const R18SiteMapping = Object.fromEntries(
  Object.entries(R18SiteNotation).map(([key, value]) => [value, Number(key)]),
) as Record<string, R18Site>;

export const R18SiteSchema = z
  .enum(
    Object.keys(R18SiteMapping) as [
      keyof typeof R18SiteMapping,
      ...(keyof typeof R18SiteMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? R18SiteMapping[val] : undefined))
  .describe("R18サイト");

// Human-readable user order mappings
export const UserOrderMapping = {
  ユーザIDの新しい順: UserOrder.New,
  小説投稿数の多い順: UserOrder.NovelCount,
  レビュー投稿数の多い順: UserOrder.ReviewCount,
  小説累計文字数の多い順: UserOrder.NovelLength,
  総合評価ポイントの合計の多い順: UserOrder.SumGlobalPoint,
  ユーザIDの古い順: UserOrder.Old,
} as const;

export const UserOrderSchema = z
  .enum(
    Object.keys(UserOrderMapping) as [
      keyof typeof UserOrderMapping,
      ...(keyof typeof UserOrderMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? UserOrderMapping[val] : undefined))
  .describe("ユーザー検索並び順");

// Human-readable buntai mappings
export const BuntaiMapping = {
  "字下げなし+改行多い": BuntaiParam.NoJisageKaigyouOoi,
  "字下げなし+改行普通": BuntaiParam.NoJisageKaigyoHutsuu,
  "字下げあり+改行多い": BuntaiParam.JisageKaigyoOoi,
  "字下げあり+改行普通": BuntaiParam.JisageKaigyoHutsuu,
} as const;

export const BuntaiSchema = z
  .enum(
    Object.keys(BuntaiMapping) as [
      keyof typeof BuntaiMapping,
      ...(keyof typeof BuntaiMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? BuntaiMapping[val] : undefined))
  .describe("文体");

// Human-readable field mappings
export const FieldsMapping = {
  小説名: Fields.title,
  Nコード: Fields.ncode,
  作者のユーザID: Fields.userid,
  作者名: Fields.writer,
  あらすじ: Fields.story,
  大ジャンル: Fields.biggenre,
  ジャンル: Fields.genre,
  キーワード: Fields.keyword,
  初回掲載日: Fields.general_firstup,
  最終掲載日: Fields.general_lastup,
  小説タイプ: Fields.noveltype,
  連載状態: Fields.end,
  全掲載部分数: Fields.general_all_no,
  文字数: Fields.length,
  読了時間: Fields.time,
  長期連載停止中: Fields.isstop,
  R15: Fields.isr15,
  ボーイズラブ: Fields.isbl,
  ガールズラブ: Fields.isgl,
  残酷な描写あり: Fields.iszankoku,
  異世界転生: Fields.istensei,
  異世界転移: Fields.istenni,
  総合評価ポイント: Fields.global_point,
  日間ポイント: Fields.daily_point,
  週間ポイント: Fields.weekly_point,
  月間ポイント: Fields.monthly_point,
  四半期ポイント: Fields.quarter_point,
  年間ポイント: Fields.yearly_point,
  ブックマーク数: Fields.fav_novel_cnt,
  感想数: Fields.impression_cnt,
  レビュー数: Fields.review_cnt,
  評価ポイント: Fields.all_point,
  評価者数: Fields.all_hyoka_cnt,
  挿絵の数: Fields.sasie_cnt,
  会話率: Fields.kaiwaritu,
  小説の更新日時: Fields.novelupdated_at,
  最終更新日時: Fields.updated_at,
} as const;

export const FieldsSchema = z
  .array(
    z.enum(
      Object.keys(FieldsMapping) as [
        keyof typeof FieldsMapping,
        ...(keyof typeof FieldsMapping)[],
      ],
    ),
  )
  .optional()
  .default([
    "Nコード",
    "小説名",
    "作者名",
    "キーワード",
    "ジャンル",
    "評価ポイント",
    "小説タイプ",
    "文字数",
  ])
  .transform((val) => val?.map((key) => FieldsMapping[key]))
  .describe("取得するフィールド");

// Human-readable R18 field mappings
export const R18FieldsMapping = {
  小説名: R18Fields.title,
  Nコード: R18Fields.ncode,
  作者のユーザID: R18Fields.userid,
  作者名: R18Fields.writer,
  あらすじ: R18Fields.story,
  掲載サイト: R18Fields.nocgenre,
  キーワード: R18Fields.keyword,
  初回掲載日: R18Fields.general_firstup,
  最終掲載日: R18Fields.general_lastup,
  小説タイプ: R18Fields.noveltype,
  連載状態: R18Fields.end,
  全掲載部分数: R18Fields.general_all_no,
  文字数: R18Fields.length,
  読了時間: R18Fields.time,
  長期連載停止中: R18Fields.isstop,
  ボーイズラブ: R18Fields.isbl,
  ガールズラブ: R18Fields.isgl,
  残酷な描写あり: R18Fields.iszankoku,
  異世界転生: R18Fields.istensei,
  異世界転移: R18Fields.istenni,
  総合評価ポイント: R18Fields.global_point,
  日間ポイント: R18Fields.daily_point,
  週間ポイント: R18Fields.weekly_point,
  月間ポイント: R18Fields.monthly_point,
  四半期ポイント: R18Fields.quarter_point,
  年間ポイント: R18Fields.yearly_point,
  R18ブックマーク数: R18Fields.fav_novel_cnt,
  感想数: R18Fields.impression_cnt,
  レビュー数: R18Fields.review_cnt,
  評価ポイント: R18Fields.all_point,
  評価者数: R18Fields.all_hyoka_cnt,
  挿絵の数: R18Fields.sasie_cnt,
  会話率: R18Fields.kaiwaritu,
  小説の更新日時: R18Fields.novelupdated_at,
  最終更新日時: R18Fields.updated_at,
} as const;

export const R18FieldsSchema = z
  .array(
    z.enum(
      Object.keys(R18FieldsMapping) as [
        keyof typeof R18FieldsMapping,
        ...(keyof typeof R18FieldsMapping)[],
      ],
    ),
  )
  .optional()
  .default([
    "Nコード",
    "小説名",
    "作者名",
    "キーワード",
    "掲載サイト",
    "評価ポイント",
    "小説タイプ",
    "文字数",
  ])
  .transform((val) => val?.map((key) => R18FieldsMapping[key]))
  .describe("R18検索用の取得フィールド");

// 小説検索の入力スキーマ
export const SearchNovelInputSchema = z.object({
  // 基本検索
  word: z.string().optional().describe("検索キーワード"),
  notword: z.string().optional().describe("除外キーワード"),
  ncode: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .describe("Nコード（単一または配列）"),
  userId: z
    .union([z.number(), z.array(z.number())])
    .optional()
    .describe("ユーザーID（単一または配列）"),

  // ジャンル・カテゴリ
  genre: GenreSchema,
  notGenre: GenreSchema.describe("除外ジャンル").optional(),
  bigGenre: BigGenreSchema,
  notBigGenre: BigGenreSchema.describe("除外大ジャンル").optional(),

  // 作品属性
  novelType: NovelTypeSchema,
  buntai: BuntaiSchema,

  // 文字数・時間・統計値
  minLength: z.number().optional().describe("最小文字数"),
  maxLength: z.number().optional().describe("最大文字数"),
  minTime: z.number().optional().describe("最小読了時間（分）"),
  maxTime: z.number().optional().describe("最大読了時間（分）"),
  minKaiwaritu: z.number().optional().describe("最小会話率（%）"),
  maxKaiwaritu: z.number().optional().describe("最大会話率（%）"),
  minSasie: z.number().optional().describe("最小挿絵数"),
  maxSasie: z.number().optional().describe("最大挿絵数"),

  // 日時指定
  lastUpdateFrom: z
    .string()
    .optional()
    .describe("最終更新日時開始（YYYY-MM-DD HH:MM:SS）"),
  lastUpdateTo: z
    .string()
    .optional()
    .describe("最終更新日時終了（YYYY-MM-DD HH:MM:SS）"),
  lastNovelUpdateFrom: z
    .string()
    .optional()
    .describe("小説更新日時開始（YYYY-MM-DD HH:MM:SS）"),
  lastNovelUpdateTo: z
    .string()
    .optional()
    .describe("小説更新日時終了（YYYY-MM-DD HH:MM:SS）"),

  // 特殊フィルター
  isR15: z.boolean().optional().describe("R15作品を含む"),
  isBL: z.boolean().optional().describe("BL作品を含む"),
  isGL: z.boolean().optional().describe("GL作品を含む"),
  isZankoku: z.boolean().optional().describe("残酷な描写ありを含む"),
  isTensei: z.boolean().optional().describe("異世界転生を含む"),
  isTenni: z.boolean().optional().describe("異世界転移を含む"),
  isStop: z.boolean().optional().describe("長期連載停止中作品を含む"),
  isPickup: z.boolean().optional().describe("ピックアップ作品のみ"),
  isTT: z.boolean().optional().describe("異世界転生・転移作品のみ"),

  // 検索対象指定
  byTitle: z
    .boolean()
    .optional()
    .describe("作品名を検索対象とする")
    .default(true),
  byOutline: z
    .boolean()
    .optional()
    .describe("あらすじを検索対象とする")
    .default(true),
  byKeyword: z
    .boolean()
    .optional()
    .describe("キーワードを検索対象とする")
    .default(true),
  byAuthor: z
    .boolean()
    .optional()
    .describe("作者名を検索対象とする")
    .default(true),

  // 出力制御
  fields: FieldsSchema,
  order: OrderSchema.default("新着更新順"),
  limit: z.number().min(1).max(500).default(20).describe("取得件数（1-500）"),
  offset: z.number().min(0).default(0).describe("取得開始位置（0ベース）"),
});

// ランキング検索の入力スキーマ
export const RankingInputSchema = z.object({
  date: z.string().optional().describe("集計日(YYYY-MM-DD形式)"),
  rankingType: RankingTypeSchema,
  fields: FieldsSchema.describe("取得するフィールド"),
  genre: GenreSchema,
  bigGenre: BigGenreSchema,
  limit: z.number().min(1).max(300).default(10).describe("取得件数"),
  offset: z.number().min(0).max(299).default(0).describe("取得開始位置"),
});

// R18検索の入力スキーマ
export const SearchR18InputSchema = z.object({
  word: z.string().optional().describe("検索キーワード"),
  fields: R18FieldsSchema,
  r18Site: R18SiteSchema,
  order: OrderSchema.default("新着更新順"),
  novelType: NovelTypeSchema,
  limit: z.number().min(1).max(500).default(20).describe("取得件数（1-500）"),
  offset: z.number().min(0).default(0).describe("取得開始位置（0ベース）"),
});

// ユーザーフィールドマッピング
export const UserFieldsMapping = {
  ユーザーID: "u",
  ユーザー名: "n",
  ユーザー名のフリガナ: "y",
  ユーザー名のフリガナの頭文字: "1",
  小説投稿数: "nc",
  レビュー投稿数: "rc",
  小説累計文字数: "nl",
  総合評価ポイントの合計: "sg",
} as const;

export const UserFieldsSchema = z
  .array(
    z.enum(
      Object.keys(UserFieldsMapping) as [
        keyof typeof UserFieldsMapping,
        ...(keyof typeof UserFieldsMapping)[],
      ],
    ),
  )
  .optional()
  .transform((val) => val?.map((key) => UserFieldsMapping[key]))
  .describe("ユーザー検索用の取得フィールド");

// ユーザー検索の入力スキーマ
export const SearchUserInputSchema = z.object({
  // 基本検索
  word: z.string().optional().describe("検索キーワード"),
  notword: z.string().optional().describe("除外キーワード"),
  userId: z.number().optional().describe("ユーザーID"),
  name1st: z.string().optional().describe("ユーザー名フリガナの頭文字"),

  // フィルター
  minNovel: z.number().optional().describe("最小小説投稿数"),
  maxNovel: z.number().optional().describe("最大小説投稿数"),
  minReview: z.number().optional().describe("最小レビュー投稿数"),
  maxReview: z.number().optional().describe("最大レビュー投稿数"),

  // 出力制御
  fields: UserFieldsSchema,
  order: UserOrderSchema.default("ユーザIDの新しい順"),
  limit: z.number().min(1).max(500).default(20).describe("取得件数（1-500）"),
  offset: z.number().min(0).default(0).describe("取得開始位置（0ベース）"),
});

// ランキング履歴の入力スキーマ
export const RankingHistoryInputSchema = z.object({
  ncode: z.string().describe("小説のNコード"),
  limit: z
    .number()
    .min(1)
    .optional()
    .default(50)
    .describe("取得件数制限（デフォルト：50件）"),
  offset: z
    .number()
    .min(0)
    .optional()
    .default(0)
    .describe("取得開始位置（デフォルト：0）"),
  rankingType: RankingTypeSchema.describe("特定のランキングタイプのみ取得"),
  dateFrom: z.string().optional().describe("集計日開始（YYYY-MM-DD形式）"),
  dateTo: z.string().optional().describe("集計日終了（YYYY-MM-DD形式）"),
});
