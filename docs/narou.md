# Narou API 型定義リファレンス

## 基本的な使用方法

```typescript
import { search, ranking, rankingHistory, searchR18, searchUser } from "narou";
import { Genre, Order, NovelTypeParam, RankingType, R18Site } from "narou";
```

## 重要な列挙型と型定義

### Genre - ジャンル
```typescript
const Genre = {
  // 恋愛系
  RenaiIsekai: 101,           // 異世界〔恋愛〕
  RenaiGenjitsusekai: 102,    // 現実世界〔恋愛〕
  
  // ファンタジー系
  FantasyHigh: 201,           // ハイファンタジー〔ファンタジー〕
  FantasyLow: 202,            // ローファンタジー〔ファンタジー〕
  
  // 文芸系
  BungeiJyunbungei: 301,      // 純文学〔文芸〕
  BungeiHumanDrama: 302,      // ヒューマンドラマ〔文芸〕
  BungeiHistory: 303,         // 歴史〔文芸〕
  BungeiSuiri: 304,           // 推理〔文芸〕
  BungeiHorror: 305,          // ホラー〔文芸〕
  BungeiAction: 306,          // アクション〔文芸〕
  BungeiComedy: 307,          // コメディー〔文芸〕
  
  // SF系
  SfVrgame: 401,              // VRゲーム〔SF〕
  SfSpace: 402,               // 宇宙〔SF〕
  SfKuusoukagaku: 403,        // 空想科学〔SF〕
  SfPanic: 404,               // パニック〔SF〕
  
  // その他
  SonotaDouwa: 9901,          // 童話〔その他〕
  SonotaShi: 9902,            // 詩〔その他〕
  SonotaEssei: 9903,          // エッセイ〔その他〕
  SonotaReplay: 9904,         // リプレイ〔その他〕
  SonotaSonota: 9999,         // その他〔その他〕
  NonGenre: 9801,             // ノンジャンル〔ノンジャンル〕
};
```

### Order - ソート順序
```typescript
const Order = {
  // ポイント・評価系
  FavoriteNovelCount: "favnovelcnt",    // ブックマーク数の多い順
  ReviewCount: "reviewcnt",             // レビュー数の多い順
  HyokaDesc: "hyoka",                   // 総合ポイントの高い順
  HyokaAsc: "hyokaasc",                 // 総合ポイントの低い順
  ImpressionCount: "impressioncnt",     // 感想の多い順
  HyokaCountDesc: "hyokacnt",           // 評価者数の多い順
  HyokaCountAsc: "hyokacntasc",         // 評価者数の少ない順
  Weekly: "weekly",                     // 週間ユニークユーザの多い順
  
  // 期間別ポイント系
  DailyPoint: "dailypoint",             // 日間ポイントの高い順
  WeeklyPoint: "weeklypoint",           // 週間ポイントの高い順
  MonthlyPoint: "monthlypoint",         // 月間ポイントの高い順
  QuarterPoint: "quarterpoint",         // 四半期ポイントの高い順
  YearlyPoint: "yearlypoint",           // 年間ポイントの高い順
  
  // その他
  LengthDesc: "lengthdesc",             // 小説本文の文字数が多い順
  LengthAsc: "lengthasc",               // 小説本文の文字数が少ない順
  NCodeDesc: "ncodedesc",               // Nコードが新しい順
  New: "new",                           // 新着更新順
  Old: "old",                           // 古い順
  GeneralFirstUp: "generalfirstup",     // 初回掲載順
};
```

### NovelTypeParam - 小説タイプ
```typescript
const NovelTypeParam = {
  Short: "t",          // 短編
  RensaiNow: "r",      // 連載中
  RensaiEnd: "er",     // 完結済連載小説
  Rensai: "re",        // すべての連載小説(連載中および完結済)
  ShortAndRensai: "ter", // 短編と完結済連載小説
};
```

### RankingType - ランキング種別
```typescript
const RankingType = {
  Daily: "d",       // 日間
  Weekly: "w",      // 週間
  Monthly: "m",     // 月間
  Quarterly: "q",   // 四半期
};
```

### BigGenre - 大ジャンル
```typescript
const BigGenre = {
  Renai: 1,        // 恋愛
  Fantasy: 2,      // ファンタジー
  Bungei: 3,       // 文芸
  Sf: 4,           // SF
  Sonota: 99,      // その他
  NonGenre: 98,    // ノンジャンル
};
```

### R18Site - R18掲載サイト
```typescript
const R18Site = {
  Nocturne: 1,     // ノクターンノベルズ(男性向け)
  MoonLight: 2,    // ムーンライトノベルズ(女性向け)
  MoonLightBL: 3,  // ムーンライトノベルズ(BL)
  Midnight: 4,     // ミッドナイトノベルズ(大人向け)
};
```

### BuntaiParam - 文体指定
```typescript
const BuntaiParam = {
  NoJisageKaigyouOoi: 1,    // 字下げされておらず、連続改行が多い作品
  NoJisageKaigyoHutsuu: 2,  // 字下げされていないが、改行数は平均な作品
  JisageKaigyoOoi: 4,       // 字下げが適切だが、連続改行が多い作品
  JisageKaigyoHutsuu: 6,    // 字下げが適切でかつ改行数も平均な作品
};
```

## 検索結果の構造とインターフェース

### NarouSearchResult - 小説情報
```typescript
interface NarouSearchResult {
  // 基本情報
  ncode: string;                // Nコード
  title: string;                // 作品名
  userid: number;               // 作者のユーザID(数値)
  writer: string;               // 作者名
  story: string;                // あらすじ
  
  // ジャンル・カテゴリ
  biggenre: BigGenre;           // 大ジャンル
  genre: Genre;                 // ジャンル
  keyword: string;              // キーワード
  
  // 日時情報
  general_firstup: string;      // 初回掲載日 YYYY-MM-DD HH:MM:SS
  general_lastup: string;       // 最終掲載日 YYYY-MM-DD HH:MM:SS
  novelupdated_at: string;      // 小説の更新日時
  updated_at: string;           // 最終更新日時(システム用)
  
  // 作品属性
  novel_type: NovelType;        // 連載(1)/短編(2)
  noveltype: NovelType;         // 同上（互換性のため両方存在）
  end: End;                     // 短編・完結済(0)/連載中(1)
  general_all_no: number;       // 全掲載話数（短編は1）
  length: number;               // 小説文字数
  time: number;                 // 読了時間（分）
  
  // 評価・統計情報
  fav_novel_cnt: number;        // ブックマーク数
  impression_cnt: number;       // 感想数
  review_cnt: number;           // レビュー数
  all_point: number;            // 評価ポイント
  all_hyoka_cnt: number;        // 評価者数
  global_point: number;         // 総合得点(=(ブックマーク数×2)+評価点)
  sasie_cnt: number;            // 挿絵数
  kaiwaritu: number;            // 会話率
  weekly_unique: number;        // 週間ユニークユーザー数
  
  // 期間別ポイント
  daily_point: number;          // 日間ポイント
  weekly_point: number;         // 週間ポイント
  monthly_point: number;        // 月間ポイント
  quarter_point: number;        // 四半期ポイント
  yearly_point: number;         // 年間ポイント
  
  // 特殊フラグ
  isr15: BooleanNumber;         // R15フラグ
  isbl: BooleanNumber;          // ボーイズラブフラグ
  isgl: BooleanNumber;          // ガールズラブフラグ
  iszankoku: BooleanNumber;     // 残酷な描写ありフラグ
  istensei: BooleanNumber;      // 異世界転生フラグ
  istenni: BooleanNumber;       // 異世界転移フラグ
  isstop: BooleanNumber;        // 長期連載停止中フラグ
  
  // R18専用フィールド
  nocgenre?: R18Site;           // 掲載サイト（R18検索時のみ）
}
```

### NarouSearchResults - 検索結果コンテナ
```typescript
class NarouSearchResults<T, TKey extends keyof T> {
  allcount: number;             // 検索結果数
  limit: number;                // 結果表示上限数
  start: number;                // 結果表示開始数
  page: number;                 // 結果表示の現在ページ(=start/limit)
  length: number;               // 今回取得できた検索結果の数
  values: readonly Pick<T, TKey>[]; // 検索結果
}
```

### UserSearchResult - ユーザー情報
```typescript
interface UserSearchResult {
  userid: number;               // ユーザID
  name: string;                 // ユーザ名
  yomikata: string;             // ユーザ名のフリガナ
  name1st: string;              // ユーザ名のフリガナの頭文字
  novel_cnt: number;            // 小説投稿数
  review_cnt: number;           // レビュー投稿数
  novel_length: number;         // 小説累計文字数
  sum_global_point: number;     // 総合評価ポイントの合計
}
```

### RankingHistoryResult - ランキング履歴
```typescript
interface RankingHistoryResult {
  date: Date;                   // 日付
  pt: number;                   // ポイント
  rank: number;                 // 順位
  type: RankingType;            // ランキング種別
}
```

### NarouRankingResult - ランキング情報
```typescript
interface NarouRankingResult {
  ncode: string;  // Nコード
  rank: number;   // 順位
  pt: number;     // ポイント
}
```

## フィールド指定用定数

### Fields - 小説APIのofパラメータ用
```typescript
const Fields = {
  title: "t",              // 小説名
  ncode: "n",              // Nコード
  userid: "u",             // 作者のユーザID(数値)
  writer: "w",             // 作者名
  story: "s",              // 小説のあらすじ
  biggenre: "bg",          // 大ジャンル
  genre: "g",              // ジャンル
  keyword: "k",            // キーワード
  general_firstup: "gf",   // 初回掲載日
  general_lastup: "gl",    // 最終掲載日
  noveltype: "nt",         // 連載の場合は1、短編の場合は2
  end: "e",                // 短編小説と完結済小説は0、連載中は1
  general_all_no: "ga",    // 全掲載部分数
  length: "l",             // 小説文字数
  time: "ti",              // 読了時間(分単位)
  isstop: "i",             // 長期連載停止中
  isr15: "isr",            // R15フラグ
  isbl: "ibl",             // ボーイズラブフラグ
  isgl: "igl",             // ガールズラブフラグ
  iszankoku: "izk",        // 残酷な描写ありフラグ
  istensei: "its",         // 異世界転生フラグ
  istenni: "iti",          // 異世界転移フラグ
  global_point: "gp",      // 総合評価ポイント
  daily_point: "dp",       // 日間ポイント
  weekly_point: "wp",      // 週間ポイント
  monthly_point: "mp",     // 月間ポイント
  quarter_point: "qp",     // 四半期ポイント
  yearly_point: "yp",      // 年間ポイント
  fav_novel_cnt: "f",      // ブックマーク数
  impression_cnt: "imp",   // 感想数
  review_cnt: "r",         // レビュー数
  all_point: "a",          // 評価ポイント
  all_hyoka_cnt: "ah",     // 評価者数
  sasie_cnt: "sa",         // 挿絵の数
  kaiwaritu: "ka",         // 会話率
  novelupdated_at: "nu",   // 小説の更新日時
  updated_at: "ua",        // 最終更新日時
};
```

## Builder メソッド

### SearchBuilder / SearchBuilderR18 メソッド

#### 基本検索
- `.word(string)` - 検索語
- `.notword(string)` - 除外語
- `.ncode(string | string[])` - Nコード指定
- `.userId(number | number[])` - ユーザーID指定

#### ジャンル・カテゴリ
- `.genre(Genre | Genre[])` - ジャンル指定
- `.notGenre(Genre | Genre[])` - ジャンル除外
- `.bigGenre(BigGenre | BigGenre[])` - 大ジャンル指定
- `.notBigGenre(BigGenre | BigGenre[])` - 大ジャンル除外
- `.r18Site(R18Site | R18Site[])` - R18掲載サイト（R18のみ）
- `.notR18Site(R18Site | R18Site[])` - R18掲載サイト除外（R18のみ）

#### 作品属性
- `.type(NovelTypeParam)` - 小説タイプ（短編/連載中/完結済等）
- `.buntai(BuntaiParam | BuntaiParam[])` - 文体指定
- `.stop(StopParam)` - 連載停止状態

#### 文字数・時間
- `.length(number)` - 文字数指定
- `.length(min: number, max: number)` - 文字数範囲
- `.time(number)` - 読了時間指定
- `.time(min: number, max: number)` - 読了時間範囲
- `.kaiwaritu(number)` - 会話率指定
- `.kaiwaritu(min: number, max: number)` - 会話率範囲
- `.sasie(number)` - 挿絵数指定
- `.sasie(min: number, max: number)` - 挿絵数範囲

#### 日時指定
- `.lastUpdate(Date | string)` - 最終更新日時
- `.lastUpdate(from: Date, to: Date)` - 最終更新日時範囲
- `.lastNovelUpdate(Date | string)` - 小説更新日時
- `.lastNovelUpdate(from: Date, to: Date)` - 小説更新日時範囲

#### 特殊フィルター
- `.isR15(boolean)` - R15作品
- `.isBL(boolean)` - ボーイズラブ作品
- `.isGL(boolean)` - ガールズラブ作品
- `.isZankoku(boolean)` - 残酷な描写あり作品
- `.isTensei(boolean)` - 異世界転生作品
- `.isTenni(boolean)` - 異世界転移作品
- `.isStop(boolean)` - 長期連載停止中作品
- `.isPickup()` - ピックアップ作品
- `.isTT()` - TT作品

#### 検索対象指定
- `.byTitle(boolean)` - 作品名を検索対象とする
- `.byOutline(boolean)` - あらすじを検索対象とする
- `.byKeyword(boolean)` - キーワードを検索対象とする
- `.byAuthor(boolean)` - 作者名を検索対象とする

#### 出力制御
- `.order(Order)` - ソート順序
- `.limit(number)` - 取得件数（1-500）
- `.start(number)` - 取得開始位置
- `.page(number, count)` - ページネーション
- `.fields(string | string[])` - 出力フィールド指定
- `.gzip(GzipLevel)` - gzip圧縮レベル（1-5）

#### 実行
- `.execute()` - 検索実行

### RankingBuilder メソッド

- `.date(Date)` - 対象日指定
- `.type(RankingType)` - ランキング種別
- `.execute()` - ランキング取得実行
- `.executeWithFields()` - 小説詳細情報付きで実行

### UserSearchBuilder メソッド

#### 基本検索
- `.word(string)` - 検索語
- `.notword(string)` - 除外語
- `.userid(number)` - ユーザーID指定
- `.name1st(string)` - フリガナ頭文字指定

#### フィルター
- `.minNovel(number)` - 最小小説投稿数
- `.maxNovel(number)` - 最大小説投稿数
- `.minReview(number)` - 最小レビュー投稿数
- `.maxReview(number)` - 最大レビュー投稿数

#### 出力制御
- `.order(UserOrder)` - ソート順序
- `.limit(number)` - 取得件数
- `.start(number)` - 取得開始位置
- `.fields(string | string[])` - 出力フィールド指定
- `.gzip(GzipLevel)` - gzip圧縮レベル

#### 実行
- `.execute()` - 検索実行

