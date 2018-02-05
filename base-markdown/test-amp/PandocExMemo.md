---
lang: ja
pagetitle: Markdownの変換
date: 2018-02-01
css:
#  - "/css/normalize.min.css"
  - "https://unpkg.com/purecss@1.0.0/build/pure-min.css"
  - "https://unpkg.com/purecss@1.0.0/build/grids-responsive-min.css"
  - "/css/style.min.css"
---


ループで変換かける処理は必要。

home  
+-- input  
`-- output

Test \
↓ \
![Picture-1](/url/of/lalune.jpg)
![Picture-2](/url/of/lalune.jpg "テキスト")
![Picture-3](/url/of/lalune.jpg "テキスト"){.iimage-class}
![Picture-4](/url/of/lalune.jpg "テキスト"){#image-id .iimage-class}
![Picture-5](/url/of/lalune.jpg){foo="bar"}　←こうやって書けば任意の属性を指定できる。

<!-- -->
!!!!-[これはキャプションです](/url/of/image.png "タイトル")
!!!!-[これはキャプションです](/url/of/image.png "タイトル")
<!-- -->

inputの中をなめて種別を判別する。
　・Article（*.mdは要変換）
　・Page（*.mdは要変換）
　・StaticFile（単なるコピー）

*.md
  -> Article or Page

Article
: 入力元のファイル名が yyyyMMdd_Title.md or yyyyMMddHHmm_Title.md であること。  
  出力先は Title/index.html となる。  
  重複する出力先があるときはエラー。  
  次のいずれかに該当するとき、そのファイルはスキップする（Pageとしても扱わない）。
 \
- ファイル名の yyyyMMdd が存在しない日付である。
- ファイル名の HHmm が指定されているが、存在しない時刻である。

<!-- -->

Page
: 入力元と同じ階層を保って出力先に書き出す。  
  Articleではない*.mdファイルはすべてこちらで扱う。

<!-- -->

Other
  -> StaticFile


pandoc コマンド

```
> pandoc -f markdown-auto_identifiers -t {0} -s -o {1} {2} {3} {4}
```
<!-- class="pure-table" -->
| No | 説明 |
|----|------|
|  0 | 出力フォーマットまたはカスタムWriterの指定。未指定時は `html5` |
|  1 | 出力先のファイル |
|  2 | テンプレートファイル `--template=FILE` |
|  3 | テンプレート変数 KEY に対する値 VAL の設定（複数可）。 `-V` KEY[=VAL] KEYだけ指定したときはtrueが設定される。 |
|  4 | 入力元のファイル |

YAMLメタデータブロックで個別に指定が必要なもの

0, 2, 



テンプレート変数

| 変数名 | 説明 |
|--------|------|
| title-prefix |  |
| pagetitle |  |
| title-suffix |  |
| folder-name | AMP文書を作るときに指定。別バージョンは作らないので自分と同じURLを入れる。 |
| keywords | meta keywords に指定する内容　※複数記載可能。 |
| description | meta description に指定する内容 |
| site-name | Webサイトの名前 |
| body | ページのコンテンツ |
| next-entry-name |  |
| next-entry-link |  |
| prev-entry-name |  |
| prev-entry-link |  |



- カスタムWriterに頼るのはやめる。
- 汎用テーブルにされたら困るものは、あらかじめ table 要素を使って書く。
- `<table>`タグに`style`属性が指定されたら消す。  
  テーブル内の文字列が長くなったりすると、次のようになることがある。  
  `<table style="width:64%;">`  
  `(<table)( style="(.*?)")`の正規表現で探して`$1`で置換する。
- `<colgroup>`タグは消し去る。子要素の`<col>`タグも消し去る。  
  上記と同様の理由で自動で付けられることがあるため。

    ```html
    <colgroup>
    <col style="width: 19%" />
    <col style="width: 44%" />
    </colgroup>
    ```

- `<tr class="header">`、`<tr class="odd">`、`<tr class="even">` は属性を取り除き `<tr>` にする。 \
  正規表現で探すなら `<tr( class="(header|odd|even)"?)>`、もっとシンプルにやるなら `<tr (.*?)>` でもよい。
- AMP HTML にするのであれば `<img ` は `<amp-img ` にする。



コマンドサンプル

```
> pandoc -f markdown-auto_identifiers -t html5 -s -o .\dist\index.html --template=C:\test\default-article.html -V prev-entry-link=/prev/index.html -V next-entry-link=/next/index.html -V prev-entry-name=前の記事 -V next-entry-name="next article title"  C:\test\PandocExMemo.md
```

```
> python C:\test\python\set_css_contents.py "C:\test\dist\index.html" "{{custom-css}}" "C:\test\style.min.css"
```



- [Sassで作るレスポンシブに対応したVertical Rhythm](https://qiita.com/manabuyasuda/items/f3988bdc40aa0a5cfa19){target="_blank"}


Bourbon とは。

軽量なSassのツール群のこと。
特徴は以下。

- 依存性がない。
- 人が読みやすい。
- 軽量である。


Modular Scale
: ある基準値に黄金比等の比率をかけ、タイポグラフィやレイアウトのスケールを決める手法です。

まずは比率と基本値を決める。
通常、基本値はテキストのフォントサイズまたは1emです。

この基本サイズが黄金比などの比率と対になり、この割合を共有する値のスケールを作成する。


使い方

まずは基本サイズと比率を指定し、スケールを定義する。

```css
$modularscale: (
  base: 16px,
  ratio: $augmented-fourth
);
```

`ms(n)`関数で値を取得する。

```css
h4 {
  font-size: ms(3);
}
```


比率

いくつかの比率は、あらかじめ定義されている。
規定値は `$fifth` 。

以下抜粋。詳細はreadmeを参照のこと。

| 定義 | 比率 | 数値 |
|------|------|------|
| $fifth | 2:3 | 1.5 |
| $augmented-fourth | 1:√2 | 1.414 |





amp-list の使い方

Setup

`amp-list` および `amp-mustache` コンポーネントを読み込みます。

```html
<script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
```

```html
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
```

使い方

`amp-list`のコンテンツは、src属性で定義されたJSON CORSエンドポイントによって提供される。  
URLのプロトコルは`HTTPS`にします。  
レスポンスは、配列を含むJSONオブジェクトにしなければなりません。

```
{
  "items": [
    {
      "title": "amp-carousel",
      "url": "https://ampbyexample.com/components/amp-carousel"
    },
    ...
  ]
}
```

リストのコンテンツは、amp-austacheテンプレートを使用してレンダリングされます。  
テンプレートは、idまたはネストされた要素を使用して指定できます。

```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="https://ampbyexample.com/json/examples.json"
  class="m1">
  <template type="amp-mustache"
    id="amp-template-id">
    <div>
      <a href="{{url}}">{{title}}</a>
    </div>
  </template>
</amp-list>
```








![altに入る文字列]("src属性" "title属性")


ISO8601形式の日付文字列を日付型に変換するには、`dateutil.parser`モジュールを使います。  
日付型を日付文字列に変換するには、`format`関数を使います。

```python
>>> import dateutil.parser
>>> parsedDate = dateutil.parser.parse("2015-02-05T09:00:00+09:00")
>>> parsedDate
datetime.datetime(2015, 2, 5, 9, 0, tzinfo=tzoffset(None, 32400))
>>> "{0:%Y-%m-%d %H:%M:%S}".format(parsedDate)
'2015-02-05 09:00:00'
>>> "{0:%Y.%m.%d}".format(parsedDate)
'2015.02.05'
```



```python
>>> import json
>>> parsedJson = json.loads('{"datePublished":"2015-02-05T13:15:29+09:00", "author": { "name": "John Doe" }}')
>>> parsedJson
{u'author': {u'name': u'John Doe'}, u'datePublished': u'2015-02-05T13:15:29+09:00'}
>>> parsedJson["datePublished"]
u'2015-02-05T13:15:29+09:00'
```







