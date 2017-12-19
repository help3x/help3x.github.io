---
lang: ja
pagetitle: JScript.NET 事始め
created-at: 2017-11-27T11:33:18Z
updated-at: 2017-11-27T15:06:56Z
---

# JScript.NET 事始め

## JScript.NET とは



## コンパイル

ソースファイルのコンパイルには、`jsc`コマンドを使います。

開発者コマンドプロンプトを使うとパスが通っているので、コンパイラを探す手間が省けます。
（開発者コマンドプロンプトは Visual Studio をインストールするとショートカットが作られます）

`jsc`コマンドの入力イメージ

```
jsc /platform:x86 /out:<生成する実行ファイル> /codepage:65001<ソースファイル>
```

`jsc /?`でコマンドの書式とコンパイラオプションが確認できます。

/out:<file>
:   出力するバイナリファイルの名前を指定する。

/platform:<platform>
:   コードが実行されるプラットフォームを指定する。  
    x86、Itanium、x64、Any CPU が指定できる（規定値は Any CPU）。

/codepage:<id>
:   指定されたコードページを使ってソースファイルを開く。
    ソースファイルのコードがShift_JISであれば、何も指定しなくてよい。



