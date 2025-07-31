import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  BigGenreNotation,
  Fields,
  GenreNotation,
  NarouNovelFetch,
  R18Fields,
  R18SiteNotation,
  ranking,
  rankingHistory,
  search,
  searchR18,
  searchUser,
} from "narou/index";
import { z } from "zod";
import {
  FieldsSchema,
  RankingHistoryInputSchema,
  RankingInputSchema,
  SearchNovelInputSchema,
  SearchR18InputSchema,
  SearchUserInputSchema,
} from "./schemas.js";

const fetchWrapper: typeof fetch = (url) => {
  return fetch(url, {
    headers: {
      "User-Agent": "MCP-Narou/1.0",
    },
  });
};

const narouFetch = new NarouNovelFetch(fetchWrapper);

export function initializeNarouMcpServer(server: McpServer): McpServer {
  server.registerTool(
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
  server.registerTool(
    "search_novels",
    {
      title: "小説検索",
      description: "小説家になろうから小説を検索します。",
      inputSchema: SearchNovelInputSchema.shape,
    },
    async ({
      // 基本検索
      word,
      notword,
      ncode,
      userId,

      // ジャンル・カテゴリ
      genre,
      notGenre,
      bigGenre,
      notBigGenre,

      // 作品属性
      novelType,
      buntai,

      // 文字数・時間・統計値
      minLength,
      maxLength,
      minTime,
      maxTime,
      minKaiwaritu,
      maxKaiwaritu,
      minSasie,
      maxSasie,

      // 日時指定
      lastUpdateFrom,
      lastUpdateTo,
      lastNovelUpdateFrom,
      lastNovelUpdateTo,

      // 特殊フィルター
      isR15,
      isBL,
      isGL,
      isZankoku,
      isTensei,
      isTenni,
      isStop,
      isPickup,
      isTT,

      // 検索対象指定
      byTitle,
      byOutline,
      byKeyword,
      byAuthor,

      // 出力制御
      fields,
      order,
      limit,
      start,
    }) => {
      const builder = search(undefined, narouFetch);

      // 基本検索
      if (word) builder.word(word);
      if (notword) builder.notWord(notword);
      if (ncode) builder.ncode(ncode);
      if (userId) builder.userId(userId);

      // ジャンル・カテゴリ
      if (genre) builder.genre(genre);
      if (notGenre) builder.notGenre(notGenre);
      if (bigGenre) builder.bigGenre(bigGenre);
      if (notBigGenre) builder.notBigGenre(notBigGenre);

      // 作品属性
      if (novelType) builder.type(novelType);
      if (buntai) builder.buntai(buntai);

      // 文字数・時間・統計値
      if (minLength !== undefined || maxLength !== undefined) {
        const lengthRange = [
          minLength ?? 0,
          maxLength ?? Number.MAX_SAFE_INTEGER,
        ];
        builder.length(lengthRange);
      }
      if (minTime !== undefined || maxTime !== undefined) {
        const timeRange = [minTime ?? 0, maxTime ?? Number.MAX_SAFE_INTEGER];
        builder.time(timeRange);
      }
      if (minKaiwaritu !== undefined && maxKaiwaritu !== undefined) {
        builder.kaiwaritu(minKaiwaritu, maxKaiwaritu);
      } else if (minKaiwaritu !== undefined) {
        builder.kaiwaritu(minKaiwaritu);
      }
      if (minSasie !== undefined || maxSasie !== undefined) {
        const sasieRange = [minSasie ?? 0, maxSasie ?? Number.MAX_SAFE_INTEGER];
        builder.sasie(sasieRange);
      }

      // 日時指定
      if (lastUpdateFrom && lastUpdateTo) {
        builder.lastUpdate(new Date(lastUpdateFrom), new Date(lastUpdateTo));
      } else if (lastUpdateFrom) {
        builder.lastUpdate(lastUpdateFrom);
      }
      if (lastNovelUpdateFrom && lastNovelUpdateTo) {
        builder.lastNovelUpdate(
          new Date(lastNovelUpdateFrom),
          new Date(lastNovelUpdateTo),
        );
      } else if (lastNovelUpdateFrom) {
        builder.lastNovelUpdate(lastNovelUpdateFrom);
      }

      // 特殊フィルター
      if (isR15 !== undefined) builder.isR15(isR15);
      if (isBL !== undefined) builder.isBL(isBL);
      if (isGL !== undefined) builder.isGL(isGL);
      if (isZankoku !== undefined) builder.isZankoku(isZankoku);
      if (isTensei !== undefined) builder.isTensei(isTensei);
      if (isTenni !== undefined) builder.isTenni(isTenni);
      if (isStop !== undefined) builder.isStop(isStop);
      if (isPickup) builder.isPickup();
      if (isTT) builder.isTT();

      // 検索対象指定
      if (byTitle !== undefined) builder.byTitle(byTitle);
      if (byOutline !== undefined) builder.byOutline(byOutline);
      if (byKeyword !== undefined) builder.byKeyword(byKeyword);
      if (byAuthor !== undefined) builder.byAuthor(byAuthor);

      // 出力制御
      if (order) builder.order(order);
      if (limit) builder.limit(limit);
      if (start) builder.start(start);

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
  server.registerTool(
    "get_ranking",
    {
      title: "ランキング取得",
      description: "小説家になろうのランキングを取得します。",
      inputSchema: RankingInputSchema.shape,
    },
    async ({ date, rankingType, fields, genre, bigGenre, limit, offset }) => {
      const builder = ranking(narouFetch);

      if (date) builder.date(new Date(date));
      if (rankingType) builder.type(rankingType);

      // ジャンルフィルタリングを行う場合は genre/biggenre フィールドを含める
      const requiredFields = fields ?? [
        Fields.ncode,
        Fields.title,
        Fields.writer,
        Fields.keyword,
        Fields.genre,
        Fields.all_point,
        Fields.noveltype,
        Fields.length,
      ];

      // ジャンルフィルタリングが指定されている場合は必要なフィールドを追加
      const fieldsWithGenre = [...requiredFields];
      if (genre && !fieldsWithGenre.includes(Fields.genre)) {
        fieldsWithGenre.push(Fields.genre);
      }
      if (bigGenre && !fieldsWithGenre.includes(Fields.biggenre)) {
        fieldsWithGenre.push(Fields.biggenre);
      }

      let result = await builder.executeWithFields(fieldsWithGenre);

      // ジャンルフィルタリングを適用
      if (genre || bigGenre) {
        result = result.filter((item) => {
          if (genre && item.genre !== genre) return false;
          if (bigGenre && item.biggenre !== bigGenre) return false;
          return true;
        });
      }

      return {
        content: [
          {
            type: "text",
            text: `${date ? `集計日: ${date}` : "最新ランキング"}${genre || bigGenre ? ` (ジャンルフィルタ適用後: ${result.length}件)` : ""}`,
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
  server.registerTool(
    "search_r18_novels",
    {
      title: "R18小説検索",
      description: "R18小説を検索します。",
      inputSchema: SearchR18InputSchema.shape,
    },
    async ({ word, fields, r18Site, order, novelType, limit, start }) => {
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
  server.registerTool(
    "search_users",
    {
      title: "ユーザー検索",
      description: "小説家になろうのユーザーを検索します。",
      inputSchema: SearchUserInputSchema.shape,
    },
    async ({
      // 基本検索
      word,
      notword,
      userId,
      name1st,

      // フィルター
      minNovel,
      maxNovel,
      minReview,
      maxReview,

      // 出力制御
      fields,
      order,
      limit,
      start,
    }) => {
      const builder = searchUser(undefined, narouFetch);

      // 基本検索
      if (word) builder.word(word);
      if (notword) builder.notWord(notword);
      if (userId !== undefined) builder.userId(userId);
      if (name1st) builder.name1st(name1st);

      // フィルター
      if (minNovel !== undefined) builder.minNovel(minNovel);
      if (maxNovel !== undefined) builder.maxNovel(maxNovel);
      if (minReview !== undefined) builder.minReview(minReview);
      if (maxReview !== undefined) builder.maxReview(maxReview);

      // 出力制御
      if (fields) builder.fields(fields);
      if (order) builder.order(order);
      if (limit) builder.limit(limit);
      if (start) builder.start(start);

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
  server.registerTool(
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

  return server;
}
