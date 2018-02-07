---
lang: ja
pagetitle: 本番環境と開発Debug環境の打刻データを同期する
prev-entry-link: /synchronize-dakoku-5/index.html
prev-entry-name: 本番環境と開発Debug環境の打刻データを同期する
next-entry-link: /synchronize-dakoku-7/index.html
next-entry-name: 本番環境と開発Debug環境の打刻データを同期する
created-at: 2017-12-13T15:55:43+09:00
display-created-at: 2017.12.13
updated-at: 2017-12-15T11:46:46+09:00
display-updated-at: 2017.12.15
---

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://google.com/article"
  },
  "headline": "本番環境と開発Debug環境の打刻データを同期する",
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
   ],
  "datePublished": "2017-12-13T15:55:43+09:00",
  "dateModified": "2017-12-15T11:46:46+09:00",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
   "publisher": {
    "@type": "Organization",
    "name": "Google",
    "logo": {
      "@type": "ImageObject",
      "url": "https://google.com/logo.jpg"
    }
  },
  "description": "A most wonderful article"
}
</script>



打刻データ テーブル定義
-------------

| No | カラム名   | データ型 | 全体桁 | 小数桁 | NULL許容 | PrimaryKey |
|----|------------|----------|--------|--------|----------|------------|
| 1  | 従業員番号 | NUMBER   | 8      |        | N        | 1          |
| 2  | 打刻時刻   | DATE     |        |        | N        | 2          |
| 3  | 入出区分   | CHAR     | 1      |        | N        | 3          |
| 4  | レコーダNO | CHAR     | 2      |        | Y        |            |
| 5  | 収集時刻   | DATE     |        |        | Y        |            |
| 6  | 送信時刻   | DATE     |        |        | Y        |            |
| 7  | ステータス | CHAR     | 1      |        | Y        |            |


同期のタイミング
-------------

AQUA 打刻データを IWAUXHS の打刻データに取り込むバッチがある。  
それの起動時刻の1分後とする。（具体的には以下の時刻となる）

1. 1:07
1. 7:32
1. 9:27
1. 19:37
1. 21:27


処理概要
-------------

1. IWAUXHS の打刻データを全件検索。
1. IWAUXO の打刻データを全件削除。
1. IWAUXHS の打刻データの検索結果をすべて登録。


