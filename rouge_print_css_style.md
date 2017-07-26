---
layout: markdown-page
title: rougeのシンタックスハイライト用のCSSファイルを取得する方法
highlighter: true
---

# {{page.title}}

rougify コマンドで取得できるらしい。  
まずは、rougify コマンドの使い方を見てみる。

```
C:\>rougify help style
usage: rougify style [<theme-name>] [<options>]

Print CSS styles for the given theme.  Extra options are
passed to the theme.  Theme defaults to thankful_eyes.

options:
  --scope       (default: .highlight) a css selector to scope by

available themes:
  base16, base16.dark, base16.monokai, base16.monokai.light, base16.solarized, b
ase16.solarized.dark, colorful, github, molokai, monokai, monokai.sublime, thank
ful_eyes
```

次のコマンドでスタイルを取得できる。

```
rougify style [<テーマ名>] [<オプション>]
```

デフォルトのテーマを出力する。

```
C:\>rougify style > <出力先ファイルパス>
```

指定したテーマを出力する。  
利用可能なテーマは「available themes:」に表示される。  
以下は「github」のテーマを出力する例。

```
C:\>rougify style github > <出力先ファイルパス>
```
