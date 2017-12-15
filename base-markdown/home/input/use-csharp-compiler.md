---
lang: ja
pagetitle: Visual C# Compiler を使ってみる
template: amp-2col.html
---

# Visual C# Compiler を使ってみる

## コンパイル

ソースファイルのコンパイルには、`csc`コマンドを使います。

開発者コマンドプロンプトを使うとパスが通っているので、コンパイラを探す手間が省けます。
（開発者コマンドプロンプトは Visual Studio をインストールするとショートカットが作られます）


### `csc`コマンドの入力イメージ

```
csc /platform:x86 /out:<生成する実行ファイル> /target:<target> /codepage:65001 <ソースファイル>
```


### コンパイラオプション

`csc /?`でコマンドの書式とコンパイラオプションが確認できます。

/out:<file>
:   出力するバイナリファイルの名前を指定します。  
    指定しないときはソースファイルの名前が使われます。  
    たとえば、ソースファイルが `hoge.cs` だとしたら `hoge.exe` が生成されます。

/target:<target>
:   生成するファイルの種類を指定します。  
    
    * `/target:exe` - コンソール実行可能ファイル
    * `/target:winexe` - Windows 実行可能ファイル
    * `/target:library` - ライブラリ

/platform:<platform>
:   コードが実行されるプラットフォームを指定します。  
    x86、Itanium、x64、anycpu が指定できます（規定値は anycpu）。

/codepage:<id>
:   指定されたコードページを使ってソースファイルを開きます。
    ソースファイルのコードがShift_JISであれば、何も指定しなくてよいです。



