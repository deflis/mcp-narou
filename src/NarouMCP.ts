import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import {
  BigGenre,
  BigGenreNotation,
  BuntaiParam,
  Fields,
  Genre,
  GenreNotation,
  NarouNovelFetch,
  NovelTypeParam,
  Order,
  R18Fields,
  R18Site,
  R18SiteNotation,
  RankingType,
  ranking,
  rankingHistory,
  search,
  searchR18,
  searchUser,
  UserOrder,
} from "narou/index";
import { z } from "zod";

const fetchWrapper: typeof fetch = (url) => {
  return fetch(url, {
    headers: {
      "User-Agent": "MCP-Narou/1.0",
    },
  });
};

const narouFetch = new NarouNovelFetch(fetchWrapper);

// 入力スキーマの定義
const GenreSchema = z.nativeEnum(Genre).optional().describe("ジャンル");
const BigGenreSchema = z.nativeEnum(BigGenre).optional().describe("大ジャンル");
const OrderSchema = z.nativeEnum(Order).optional().describe("並び順");
const NovelTypeSchema = z
  .nativeEnum(NovelTypeParam)
  .optional()
  .describe("小説タイプ");
const RankingTypeSchema = z
  .nativeEnum(RankingType)
  .optional()
  .describe("ランキング種別");
const R18SiteSchema = z.nativeEnum(R18Site).optional().describe("R18サイト");
const UserOrderSchema = z
  .nativeEnum(UserOrder)
  .optional()
  .describe("ユーザー検索並び順");
const BuntaiSchema = z.nativeEnum(BuntaiParam).optional().describe("文体");

// Human-readable field mappings
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

// 小説検索の入力スキーマ
const SearchNovelInputSchema = z.object({
  word: z.string().optional().describe("検索キーワード"),
  fields: FieldsSchema,
  genre: GenreSchema,
  bigGenre: BigGenreSchema,
  order: OrderSchema,
  novelType: NovelTypeSchema,
  limit: z.number().min(1).max(500).optional().describe("取得件数（1-500）"),
  start: z.number().min(1).optional().describe("取得開始位置"),
  ncode: z.string().optional().describe("Nコード"),
  isR15: z.boolean().optional().describe("R15作品を含む"),
  isBL: z.boolean().optional().describe("BL作品を含む"),
  isGL: z.boolean().optional().describe("GL作品を含む"),
  isZankoku: z.boolean().optional().describe("残酷な描写ありを含む"),
  isTensei: z.boolean().optional().describe("異世界転生を含む"),
  isTenni: z.boolean().optional().describe("異世界転移を含む"),
  minLength: z.number().optional().describe("最小文字数"),
  maxLength: z.number().optional().describe("最大文字数"),
  buntai: BuntaiSchema,
});

// ランキング検索の入力スキーマ
const RankingInputSchema = z.object({
  date: z.string().optional().describe("集計日(YYYY-MM-DD形式)"),
  rankingType: RankingTypeSchema,
  fields: FieldsSchema.optional().describe("取得するフィールド"),
  limit: z
    .number()
    .min(1)
    .max(300)
    .optional()
    .describe("取得件数（デフォルト・最大300）"),
  offset: z.number().min(0).max(299).optional().describe("取得開始位置"),
});

// R18検索の入力スキーマ
const SearchR18InputSchema = z.object({
  word: z.string().optional().describe("検索キーワード"),
  fields: R18FieldsSchema,
  r18Site: R18SiteSchema,
  order: OrderSchema,
  novelType: NovelTypeSchema,
  limit: z.number().min(1).max(500).optional().describe("取得件数（1-500）"),
  start: z.number().min(1).optional().describe("取得開始位置"),
});

// ユーザー検索の入力スキーマ
const SearchUserInputSchema = z.object({
  word: z.string().optional().describe("検索キーワード"),
  order: UserOrderSchema,
  limit: z.number().min(1).max(500).optional().describe("取得件数（1-500）"),
  start: z.number().min(1).optional().describe("取得開始位置"),
  minNovel: z.number().optional().describe("最小小説投稿数"),
  maxNovel: z.number().optional().describe("最大小説投稿数"),
  minReview: z.number().optional().describe("最小レビュー投稿数"),
  maxReview: z.number().optional().describe("最大レビュー投稿数"),
});

// ランキング履歴の入力スキーマ
const RankingHistoryInputSchema = z.object({
  ncode: z.string().describe("小説のNコード"),
});

export class NarouMCP extends McpAgent {
  server: McpServer = new McpServer({
    name: "Narou MCP Server",
    version: "0.1.0",
  });

  async init(): Promise<void> {
    this.server.registerTool(
      "get_novel",
      {
        title: "小説取得",
        description: "小説家になろうの小説を取得します。",
        inputSchema: z.object({
          ncode: z
            .string()
            .describe("小説のNコード")
            .min(1)
            .regex(/^[nN][0-9]{4}[a-zA-Z]{1,2}$/),
          fields: FieldsSchema,
        }).shape,
      },
      async ({ ncode, fields }) => {
        const builder = search(undefined, narouFetch).ncode(ncode);
        builder.fields(
          fields ?? [
            Fields.ncode,
            Fields.title,
            Fields.writer,
            Fields.keyword,
            Fields.genre,
            Fields.all_point,
            Fields.noveltype,
            Fields.length,
          ],
        );
        builder.opt("weekly");

        const result = await builder.execute();
        return {
          content: [
            {
              type: "text",
              text: result.values[0]
                ? JSON.stringify(
                    {
                      ...result.values[0],
                      url: `https://ncode.syosetu.com/${result.values[0].ncode}/`,
                      genreNotation: result.values[0].genre
                        ? GenreNotation[result.values[0].genre]
                        : undefined,
                      bigGenreNotation: result.values[0].biggenre
                        ? BigGenreNotation[result.values[0].biggenre]
                        : undefined,
                    },
                    null,
                    2,
                  )
                : "小説が見つかりませんでした。",
            },
          ],
        } as const;
      },
    );

    // 小説検索ツール
    this.server.registerTool(
      "search_novels",
      {
        title: "小説検索",
        description: "小説家になろうから小説を検索します。",
        inputSchema: SearchNovelInputSchema.shape,
      },
      async (input) => {
        const {
          word,
          fields,
          genre,
          bigGenre,
          order,
          novelType,
          limit,
          start,
          ncode,
          isR15,
          isBL,
          isGL,
          isZankoku,
          isTensei,
          isTenni,
          minLength,
          maxLength,
          buntai,
        } = input;

        const builder = search(undefined, narouFetch);

        if (word) builder.word(word);
        if (genre) builder.genre(genre);
        if (bigGenre) builder.bigGenre(bigGenre);
        if (order) builder.order(order);
        if (novelType) builder.type(novelType);
        if (limit) builder.limit(limit);
        if (start) builder.start(start);
        if (ncode) builder.ncode(ncode);
        if (isR15 !== undefined) builder.isR15(isR15);
        if (isBL !== undefined) builder.isBL(isBL);
        if (isGL !== undefined) builder.isGL(isGL);
        if (isZankoku !== undefined) builder.isZankoku(isZankoku);
        if (isTensei !== undefined) builder.isTensei(isTensei);
        if (isTenni !== undefined) builder.isTenni(isTenni);
        if (minLength !== undefined || maxLength !== undefined) {
          const lengthRange = [
            minLength ?? 0,
            maxLength ?? Number.MAX_SAFE_INTEGER,
          ];
          builder.length(lengthRange);
        }
        if (buntai) builder.buntai(buntai);

        builder.fields(
          fields ?? [
            Fields.ncode,
            Fields.title,
            Fields.writer,
            Fields.keyword,
            Fields.genre,
            Fields.all_point,
            Fields.noveltype,
            Fields.length,
          ],
        );
        builder.opt("weekly");

        const result = await builder.execute();
        return {
          content: [
            {
              type: "text",
              text: `検索結果: ${result.allcount}件中 ${result.start}〜${result.start + result.length - 1}件目`,
            },
            ...result.values.map(
              (novel) =>
                ({
                  type: "text",
                  text: JSON.stringify(
                    {
                      ...novel,
                      url: `https://ncode.syosetu.com/${novel.ncode}/`,
                      genreNotation: novel.genre
                        ? GenreNotation[novel.genre]
                        : undefined,
                      bigGenreNotation: novel.biggenre
                        ? BigGenreNotation[novel.biggenre]
                        : undefined,
                    },
                    null,
                    2,
                  ),
                }) as const,
            ),
          ],
        } as const;
      },
    );

    // ランキング取得ツール
    this.server.registerTool(
      "get_ranking",
      {
        title: "ランキング取得",
        description: "小説家になろうのランキングを取得します。",
        inputSchema: RankingInputSchema.shape,
      },
      async ({ date, rankingType, fields, limit, offset }) => {
        const builder = ranking(narouFetch);

        if (date) builder.date(new Date(date));
        if (rankingType) builder.type(rankingType);

        const result = await builder.executeWithFields(
          fields ?? [
            Fields.ncode,
            Fields.title,
            Fields.writer,
            Fields.keyword,
            Fields.genre,
            Fields.all_point,
            Fields.noveltype,
            Fields.length,
          ],
        );
        return {
          content: [
            {
              type: "text",
              text: date ? `集計日: ${date}` : "最新ランキング",
            },
            ...result.slice(offset ?? 0, (offset ?? 0) + (limit ?? 300)).map(
              (item) =>
                ({
                  type: "text",
                  text: JSON.stringify(
                    {
                      ...item,
                      url: item.ncode
                        ? `https://ncode.syosetu.com/${item.ncode}/`
                        : undefined,
                      genreNotation: item.genre
                        ? GenreNotation[item.genre]
                        : undefined,
                      bigGenreNotation: item.biggenre
                        ? BigGenreNotation[item.biggenre]
                        : undefined,
                    },
                    null,
                    2,
                  ),
                }) as const,
            ),
          ],
        } as const;
      },
    );

    // R18小説検索ツール
    this.server.registerTool(
      "search_r18_novels",
      {
        title: "R18小説検索",
        description: "R18小説を検索します。",
        inputSchema: SearchR18InputSchema.shape,
      },
      async (input) => {
        const { word, fields, r18Site, order, novelType, limit, start } = input;

        const builder = searchR18(undefined, narouFetch);

        if (word) builder.word(word);
        if (r18Site) builder.r18Site(r18Site);
        if (order) builder.order(order);
        if (novelType) builder.type(novelType);
        if (limit) builder.limit(limit);
        if (start) builder.start(start);

        builder.fields(
          fields ?? [
            R18Fields.ncode,
            R18Fields.title,
            R18Fields.writer,
            R18Fields.keyword,
            R18Fields.nocgenre,
            R18Fields.all_point,
            R18Fields.noveltype,
            R18Fields.length,
          ],
        );
        builder.opt("weekly");

        const result = await builder.execute();
        return {
          content: [
            {
              type: "text",
              text: `R18検索結果: ${result.allcount}件中 ${result.start}〜${result.start + result.length - 1}件目`,
            },
            ...result.values.map(
              (novel) =>
                ({
                  type: "text",
                  text: JSON.stringify(
                    {
                      ...novel,
                      url: novel.ncode
                        ? `https://novel18.syosetu.com/${novel.ncode}/`
                        : undefined,
                      site: novel.nocgenre
                        ? R18SiteNotation[novel.nocgenre]
                        : undefined,
                    },
                    null,
                    2,
                  ),
                }) as const,
            ),
          ],
        } as const;
      },
    );

    // ユーザー検索ツール
    this.server.registerTool(
      "search_users",
      {
        title: "ユーザー検索",
        description: "小説家になろうのユーザーを検索します。",
        inputSchema: SearchUserInputSchema.shape,
      },
      async (input) => {
        const {
          word,
          order,
          limit,
          start,
          minNovel,
          maxNovel,
          minReview,
          maxReview,
        } = input;

        const builder = searchUser(undefined, narouFetch);

        if (word) builder.word(word);
        if (order) builder.order(order);
        if (limit) builder.limit(limit);
        if (start) builder.start(start);
        if (minNovel !== undefined) builder.minNovel(minNovel);
        if (maxNovel !== undefined) builder.maxNovel(maxNovel);
        if (minReview !== undefined) builder.minReview(minReview);
        if (maxReview !== undefined) builder.maxReview(maxReview);

        const result = await builder.execute();
        return {
          content: [
            {
              type: "text",
              text: `ユーザー検索結果: ${result.allcount}件中 ${result.start}〜${result.start + result.length - 1}件目`,
            },
            ...result.values.map(
              (user) =>
                ({
                  type: "text",
                  text: JSON.stringify(user, null, 2),
                }) as const,
            ),
          ],
        } as const;
      },
    );

    // ランキング履歴取得ツール
    this.server.registerTool(
      "get_ranking_history",
      {
        title: "ランキング履歴取得",
        description: "指定した小説のランキング履歴を取得します。",
        inputSchema: RankingHistoryInputSchema.shape,
      },
      async (input) => {
        const { ncode } = input;

        const result = await rankingHistory(ncode, narouFetch);
        return {
          content: [
            {
              type: "text",
              text: `ランキング履歴結果: ${result.length}件`,
            },
            ...result.map(
              (history) =>
                ({
                  type: "text",
                  text: JSON.stringify(history, null, 2),
                }) as const,
            ),
          ],
        } as const;
      },
    );
  }
}
