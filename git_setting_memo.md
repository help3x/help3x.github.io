---
layout: markdown-page
title: gitメモ
---

## Gitの設定を一覧表示する

### すべてのユーザーとすべてのリポジトリに対する設定
```
$ git config --system --list
```

### 特定のユーザーに対する設定
```
$ git config --global --list
```

## Git の特定の設定を表示する
```
$ git config <キー名>
```

例: user.name を表示する  

```
$ git config user.name
```

## 改行コードの自動変換をしない
```
$ git config core.autocrlf false
```

## プロキシの設定
```
$ git config http.proxy http://hoge.com:8080/
$ git config https.proxy http://hoge.com:8080/
```

## 無視するフォルダ／ファイルの定義

`.gitignore` ファイルを作成し、以下のパターンに従い定義する。

### コメント

`#` 以降の文字はコメントになる。

### フォルダ

```
hoge\
```

フォルダ名が hoge であれば無視する。

### ファイル

```
fuga
```

ファイル名が fuga であれば無視する。

### 拡張子

```
*.txt
```

拡張子が `txt` であれば無視する。

