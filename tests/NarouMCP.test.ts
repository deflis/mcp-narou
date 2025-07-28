import {
  BigGenre,
  BuntaiParam,
  Fields,
  Genre,
  NovelTypeParam,
  Order,
  R18Fields,
  R18Site,
  RankingType,
  UserOrder,
} from "narou/index";
import { describe, expect, it } from "vitest";
import {
  BigGenreSchema,
  BuntaiSchema,
  FieldsMapping,
  FieldsSchema,
  GenreSchema,
  NovelTypeSchema,
  OrderSchema,
  R18FieldsMapping,
  R18FieldsSchema,
  R18SiteSchema,
  RankingTypeSchema,
  UserOrderSchema,
} from "../src/schemas.js";

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
