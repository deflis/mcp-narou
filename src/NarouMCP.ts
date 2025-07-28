import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
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
      async ({
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
      }) => {
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
    this.server.registerTool(
      "search_users",
      {
        title: "ユーザー検索",
        description: "小説家になろうのユーザーを検索します。",
        inputSchema: SearchUserInputSchema.shape,
      },
      async ({
        word,
        order,
        limit,
        start,
        minNovel,
        maxNovel,
        minReview,
        maxReview,
      }) => {
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
