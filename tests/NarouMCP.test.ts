import {
  BigGenre,
  BigGenreNotation,
  BuntaiParam,
  Fields,
  Genre,
  GenreNotation,
  NovelTypeParam,
  Order,
  R18Fields,
  R18Site,
  R18SiteNotation,
  RankingType,
  UserOrder,
} from "narou/index";
import { describe, expect, it } from "vitest";
import { z } from "zod";

// Human-readable field mappings from NarouMCP.ts
const FieldsMapping = {
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

const FieldsSchema = z
  .array(
    z.enum(
      Object.keys(FieldsMapping) as [
        keyof typeof FieldsMapping,
        ...(keyof typeof FieldsMapping)[],
      ],
    ),
  )
  .optional()
  .transform((val) => val?.map((key) => FieldsMapping[key]))
  .describe("取得するフィールド");

// Human-readable R18 field mappings
const R18FieldsMapping = {
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

const R18FieldsSchema = z
  .array(
    z.enum(
      Object.keys(R18FieldsMapping) as [
        keyof typeof R18FieldsMapping,
        ...(keyof typeof R18FieldsMapping)[],
      ],
    ),
  )
  .optional()
  .transform((val) => val?.map((key) => R18FieldsMapping[key]))
  .describe("R18検索用の取得フィールド");

describe("Human-readable field schemas", () => {
  describe("FieldsSchema", () => {
    it("should accept human-readable field names", () => {
      const input = ["小説名", "作者名", "文字数"];
      const result = FieldsSchema.parse(input);

      expect(result).toEqual([Fields.title, Fields.writer, Fields.length]);
    });

    it("should accept undefined and return undefined", () => {
      const result = FieldsSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid field names", () => {
      const allFieldNames = Object.keys(
        FieldsMapping,
      ) as (keyof typeof FieldsMapping)[];
      const result = FieldsSchema.parse(allFieldNames);

      expect(result).toHaveLength(allFieldNames.length);
      expect(result).toContain(Fields.title);
      expect(result).toContain(Fields.updated_at);
    });

    it("should reject invalid field names", () => {
      expect(() => FieldsSchema.parse(["無効なフィールド"])).toThrow();
    });
  });

  describe("R18FieldsSchema", () => {
    it("should accept human-readable R18 field names", () => {
      const input = ["小説名", "掲載サイト", "R18ブックマーク数"];
      const result = R18FieldsSchema.parse(input);

      expect(result).toEqual([
        R18Fields.title,
        R18Fields.nocgenre,
        R18Fields.fav_novel_cnt,
      ]);
    });

    it("should accept undefined and return undefined", () => {
      const result = R18FieldsSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid R18 field names", () => {
      const allFieldNames = Object.keys(
        R18FieldsMapping,
      ) as (keyof typeof R18FieldsMapping)[];
      const result = R18FieldsSchema.parse(allFieldNames);

      expect(result).toHaveLength(allFieldNames.length);
      expect(result).toContain(R18Fields.title);
      expect(result).toContain(R18Fields.nocgenre);
      expect(result).toContain(R18Fields.updated_at);
    });

    it("should reject invalid R18 field names", () => {
      expect(() => R18FieldsSchema.parse(["無効なフィールド"])).toThrow();
    });
  });
});

// Human-readable genre mappings using GenreNotation
const GenreMapping = Object.fromEntries(
  Object.entries(GenreNotation).map(([key, value]) => [value, Number(key)]),
) as Record<string, Genre>;

const GenreSchema = z
  .enum(
    Object.keys(GenreMapping) as [
      keyof typeof GenreMapping,
      ...(keyof typeof GenreMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? GenreMapping[val] : undefined))
  .describe("ジャンル");

// Human-readable big genre mappings using BigGenreNotation
const BigGenreMapping = Object.fromEntries(
  Object.entries(BigGenreNotation).map(([key, value]) => [value, Number(key)]),
) as Record<string, BigGenre>;

const BigGenreSchema = z
  .enum(
    Object.keys(BigGenreMapping) as [
      keyof typeof BigGenreMapping,
      ...(keyof typeof BigGenreMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? BigGenreMapping[val] : undefined))
  .describe("大ジャンル");

// Human-readable buntai mappings from NarouMCP.ts
const BuntaiMapping = {
  "字下げなし+改行多い": BuntaiParam.NoJisageKaigyouOoi,
  "字下げなし+改行普通": BuntaiParam.NoJisageKaigyoHutsuu,
  "字下げあり+改行多い": BuntaiParam.JisageKaigyoOoi,
  "字下げあり+改行普通": BuntaiParam.JisageKaigyoHutsuu,
} as const;

const BuntaiSchema = z
  .enum(
    Object.keys(BuntaiMapping) as [
      keyof typeof BuntaiMapping,
      ...(keyof typeof BuntaiMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? BuntaiMapping[val] : undefined))
  .describe("文体");

describe("Human-readable genre schemas", () => {
  describe("GenreSchema", () => {
    it("should accept human-readable genre names", () => {
      const result = GenreSchema.parse("異世界〔恋愛〕");
      expect(result).toBe(Genre.RenaiIsekai);
    });

    it("should accept undefined and return undefined", () => {
      const result = GenreSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid genre names", () => {
      const result1 = GenreSchema.parse("現実世界〔恋愛〕");
      expect(result1).toBe(Genre.RenaiGenjitsusekai);

      const result2 = GenreSchema.parse("ハイファンタジー〔ファンタジー〕");
      expect(result2).toBe(Genre.FantasyHigh);

      const result3 = GenreSchema.parse("純文学〔文芸〕");
      expect(result3).toBe(Genre.BungeiJyunbungei);
    });

    it("should reject invalid genre names", () => {
      expect(() => GenreSchema.parse("無効なジャンル")).toThrow();
    });
  });

  describe("BigGenreSchema", () => {
    it("should accept human-readable big genre names", () => {
      const result = BigGenreSchema.parse("恋愛");
      expect(result).toBe(BigGenre.Renai);
    });

    it("should accept undefined and return undefined", () => {
      const result = BigGenreSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid big genre names", () => {
      const result1 = BigGenreSchema.parse("ファンタジー");
      expect(result1).toBe(BigGenre.Fantasy);

      const result2 = BigGenreSchema.parse("文芸");
      expect(result2).toBe(BigGenre.Bungei);

      const result3 = BigGenreSchema.parse("SF");
      expect(result3).toBe(BigGenre.Sf);
    });

    it("should reject invalid big genre names", () => {
      expect(() => BigGenreSchema.parse("無効な大ジャンル")).toThrow();
    });
  });

  describe("BuntaiSchema", () => {
    it("should accept human-readable buntai names", () => {
      const result = BuntaiSchema.parse("字下げなし+改行多い");
      expect(result).toBe(BuntaiParam.NoJisageKaigyouOoi);
    });

    it("should accept undefined and return undefined", () => {
      const result = BuntaiSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid buntai names", () => {
      const result1 = BuntaiSchema.parse("字下げなし+改行普通");
      expect(result1).toBe(BuntaiParam.NoJisageKaigyoHutsuu);

      const result2 = BuntaiSchema.parse("字下げあり+改行多い");
      expect(result2).toBe(BuntaiParam.JisageKaigyoOoi);

      const result3 = BuntaiSchema.parse("字下げあり+改行普通");
      expect(result3).toBe(BuntaiParam.JisageKaigyoHutsuu);
    });

    it("should reject invalid buntai names", () => {
      expect(() => BuntaiSchema.parse("無効な文体")).toThrow();
    });
  });
});

// Human-readable order mappings
const OrderMapping = {
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

const OrderSchema = z
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
const NovelTypeMapping = {
  短編: NovelTypeParam.Short,
  連載中: NovelTypeParam.RensaiNow,
  完結済連載小説: NovelTypeParam.RensaiEnd,
  すべての連載小説: NovelTypeParam.Rensai,
  短編と完結済連載小説: NovelTypeParam.ShortAndRensai,
} as const;

const NovelTypeSchema = z
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
const RankingTypeMapping = {
  日間: RankingType.Daily,
  週間: RankingType.Weekly,
  月間: RankingType.Monthly,
  四半期: RankingType.Quarterly,
} as const;

const RankingTypeSchema = z
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
const R18SiteMapping = Object.fromEntries(
  Object.entries(R18SiteNotation).map(([key, value]) => [value, Number(key)]),
) as Record<string, R18Site>;

const R18SiteSchema = z
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
const UserOrderMapping = {
  ユーザIDの新しい順: UserOrder.New,
  小説投稿数の多い順: UserOrder.NovelCount,
  レビュー投稿数の多い順: UserOrder.ReviewCount,
  小説累計文字数の多い順: UserOrder.NovelLength,
  総合評価ポイントの合計の多い順: UserOrder.SumGlobalPoint,
  ユーザIDの古い順: UserOrder.Old,
} as const;

const UserOrderSchema = z
  .enum(
    Object.keys(UserOrderMapping) as [
      keyof typeof UserOrderMapping,
      ...(keyof typeof UserOrderMapping)[],
    ],
  )
  .optional()
  .transform((val) => (val ? UserOrderMapping[val] : undefined))
  .describe("ユーザー検索並び順");

describe("Human-readable enum schemas", () => {
  describe("OrderSchema", () => {
    it("should accept human-readable order names", () => {
      const result = OrderSchema.parse("ブックマーク数の多い順");
      expect(result).toBe(Order.FavoriteNovelCount);
    });

    it("should accept undefined and return undefined", () => {
      const result = OrderSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid order names", () => {
      const result1 = OrderSchema.parse("新着更新順");
      expect(result1).toBe(Order.New);

      const result2 = OrderSchema.parse("日間ポイントの高い順");
      expect(result2).toBe(Order.DailyPoint);
    });

    it("should reject invalid order names", () => {
      expect(() => OrderSchema.parse("無効な並び順")).toThrow();
    });
  });

  describe("NovelTypeSchema", () => {
    it("should accept human-readable novel type names", () => {
      const result = NovelTypeSchema.parse("短編");
      expect(result).toBe(NovelTypeParam.Short);
    });

    it("should accept undefined and return undefined", () => {
      const result = NovelTypeSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid novel type names", () => {
      const result1 = NovelTypeSchema.parse("連載中");
      expect(result1).toBe(NovelTypeParam.RensaiNow);

      const result2 = NovelTypeSchema.parse("完結済連載小説");
      expect(result2).toBe(NovelTypeParam.RensaiEnd);
    });

    it("should reject invalid novel type names", () => {
      expect(() => NovelTypeSchema.parse("無効な小説タイプ")).toThrow();
    });
  });

  describe("RankingTypeSchema", () => {
    it("should accept human-readable ranking type names", () => {
      const result = RankingTypeSchema.parse("日間");
      expect(result).toBe(RankingType.Daily);
    });

    it("should accept undefined and return undefined", () => {
      const result = RankingTypeSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid ranking type names", () => {
      const result1 = RankingTypeSchema.parse("週間");
      expect(result1).toBe(RankingType.Weekly);

      const result2 = RankingTypeSchema.parse("月間");
      expect(result2).toBe(RankingType.Monthly);
    });

    it("should reject invalid ranking type names", () => {
      expect(() => RankingTypeSchema.parse("無効なランキング種別")).toThrow();
    });
  });

  describe("R18SiteSchema", () => {
    it("should accept human-readable R18 site names", () => {
      const result = R18SiteSchema.parse("ノクターンノベルズ(男性向け)");
      expect(result).toBe(R18Site.Nocturne);
    });

    it("should accept undefined and return undefined", () => {
      const result = R18SiteSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid R18 site names", () => {
      const result1 = R18SiteSchema.parse("ムーンライトノベルズ(女性向け)");
      expect(result1).toBe(R18Site.MoonLight);

      const result2 = R18SiteSchema.parse("ミッドナイトノベルズ(大人向け)");
      expect(result2).toBe(R18Site.Midnight);
    });

    it("should reject invalid R18 site names", () => {
      expect(() => R18SiteSchema.parse("無効なR18サイト")).toThrow();
    });
  });

  describe("UserOrderSchema", () => {
    it("should accept human-readable user order names", () => {
      const result = UserOrderSchema.parse("ユーザIDの新しい順");
      expect(result).toBe(UserOrder.New);
    });

    it("should accept undefined and return undefined", () => {
      const result = UserOrderSchema.parse(undefined);
      expect(result).toBeUndefined();
    });

    it("should transform all valid user order names", () => {
      const result1 = UserOrderSchema.parse("小説投稿数の多い順");
      expect(result1).toBe(UserOrder.NovelCount);

      const result2 = UserOrderSchema.parse("総合評価ポイントの合計の多い順");
      expect(result2).toBe(UserOrder.SumGlobalPoint);
    });

    it("should reject invalid user order names", () => {
      expect(() => UserOrderSchema.parse("無効なユーザー検索並び順")).toThrow();
    });
  });
});
