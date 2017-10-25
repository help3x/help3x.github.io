# Metalsmith でドキュメント管理

## 開発環境の構築

package.jsonを作る。

```
npm init
```

必要なパッケージをローカルにダウンロードする。

```
npm install --save metalsmith
```

`metalsmith.json` を作る。
ソースファイルを`src`フォルダに、生成物を`build`フォルダ配下に保存する設定。

```
{
  "source": "src",
  "destination": "build",
  "metadata": {
    "title": "First",
    "description": "My First Site."
  }
}
```

ソースフォルダ `src` を作る。

ソースフォルダ内にサンプルファイルを一つ置く。
ファイル名は何でもいい。たとえばfirst.txt。

```
---
title: First title
date: 2017-10-25
---

An informative article.
```

試しにビルドしてみる。

```
node_modules\.bin\metalsmith.cmd
```

成功した。

```
Metalsmith · successfully built to C:\Work\metalsmith\first\build
```

現時点のフォルダ階層は次のようになっている。

/(project-root)
  |-- src
  |     `-- first.txt
  |-- node_modules
  |     |-- .bin
  |     |-- :
  |-- build
  |     `-- first.txt　← src の first.txt を元に生成されたファイル
  |-- metalsmith.json
  `-- package.json

ひとまず動作することは確認できた。
何にもプラグインを入れていないので、フロントメーターが消えたファイルが出力されているだけだが。





いくつかプラグインを入れてみる。

* [metalsmith-markdown](https://www.npmjs.com/package/metalsmith-markdown)
* [metalsmith-permalinks](https://www.npmjs.com/package/metalsmith-permalinks)
* [metalsmith-templates](https://www.npmjs.com/package/metalsmith-templates)
* [handlebars](https://www.npmjs.com/package/handlebars)

```
npm install --save metalsmith-markdown
npm install --save metalsmith-permalinks
npm install --save metalsmith-templates
npm install --save handlebars
```

permalinksがインストールできない。

```
npm ERR! Windows_NT 6.1.7601
npm ERR! argv "C:\\Program Files\\Nodist\\v\\6.10.0\\node.exe" "C:\\Program File
s\\Nodist\\npmv\\4.0.5\\bin\\npm-cli.js" "install" "--save" "metalsmith-permalin
ks"
npm ERR! node v6.10.0
npm ERR! npm  v4.0.5
npm ERR! code SELF_SIGNED_CERT_IN_CHAIN

npm ERR! self signed certificate in certificate chain
npm ERR!
npm ERR! If you need help, you may report this error at:
npm ERR!     <https://github.com/npm/npm/issues>

npm ERR! Please include the following file with any support request:
npm ERR!     C:\Work\metalsmith\first\npm-debug.log
```


オレオレ証明書を使わないようにすれば解決するらしい。  
http://blog.npmjs.org/post/78085451721/npms-self-signed-certificate-is-no-more

⇒ダメだった。解決しない。


こっちのページで解決した。  
https://blog.yug1224.com/archives/563d9b67bf652a600632d01e

> httpsのレジストリに対して、SSL鍵のバリデーションを行っていることが原因らしいので、一旦この設定を false にすると npm install が成功するようになる。npm install 後には true に戻しておく。

```
$ npm config set strict-ssl false
$ npm install
$ npm config set strict-ssl true
```

`metalsmith.json` を編集する。

```
{
  "source": "src",
  "destination": "build",
  "metadata": {
    "title": "First",
    "description": "My First Site."
  },
  "plugins": {
    "metalsmith-markdown": {},
    "metalsmith-permalinks": {
      "pattern": ":title"
    },
    "metalsmith-templates": {
      "engine": "handlebars"
    }
  }
}
```

## リンク

* [静的サイトジェネレータMetalSmith](http://d.hatena.ne.jp/badatmath/20140426/1398495275)
