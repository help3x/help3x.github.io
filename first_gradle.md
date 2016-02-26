---
layout: markdown-page
title: Windows7 で Gradle を使う
---

# {{page.title}}

## Gradleのインストール

[gradle.org](http://gradle.org/) の [Download ページ](http://gradle.org/gradle-download/)からファイルをダウンロード  
(この時点での Gradle の最新バージョンは 2.11 )

ダウンロードしたファイルを任意の場所に解凍  
(例えば、C:\app\q40061wa\gradle-2.11)

環境変数「GRADLE_HOME」に解凍したフォルダを設定

環境変数「PATH」に「%GRADLE_HOME%\bin」を追加

コマンドプロンプトを開いて、次のコマンドを実行。

```
C:\>gradle -v
```

こんな表示がされればOK。

```
------------------------------------------------------------
Gradle 2.11
------------------------------------------------------------

Build time:   2016-02-08 07:59:16 UTC
Build number: none
Revision:     584db1c7c90bdd1de1d1c4c51271c665bfcba978

Groovy:       2.4.4
Ant:          Apache Ant(TM) version 1.9.3 compiled on December 23 2013
JVM:          1.8.0_45 (Oracle Corporation 25.45-b02)
OS:           Windows 7 6.1 x86
```


## 基本的な使い方

ビルドに関する設定は「build.gradle」ファイルに記述する。  
Gradle を実行するには、「gradle」コマンドを使う。

Gradle用のフォルダを作成し、そこに移動する。

```
C:\>mkdir gradle_projects\first

C:\>cd gradle_projects\first
```

移動したフォルダの直下に「build.gradle」ファイルを作成する。  
ファイルの内容は以下。

```
task task01 {
    doLast {
        println 'Hello Gradle'
    }
}
```


gradle コマンドで task01 タスクを実行してみる。  
(build.gradleファイルがあるディレクトリをカレントディレクトリにしてから実行します)

```
C:\gradle_projects\first>gradle task01
:task01
Hello Gradle

BUILD SUCCESSFUL

Total time: 2.632 secs
```

タスク「task02」を増やす

```
task task01 {
    doLast {
        println 'Hello Gradle'
    }
}

// このように省略した書き方でもOKです
task task02 << {
    println 'Hello Gradle2'
}
```

gradleコマンドでtask02を指定すれば、task02を実行させることができる。

```
C:\gradle_projects\first>gradle task02
:task02
Hello Gradle2

BUILD SUCCESSFUL

Total time: 2.812 secs
```

