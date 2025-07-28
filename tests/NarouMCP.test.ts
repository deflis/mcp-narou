import { Fields, R18Fields } from "narou/index";
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
