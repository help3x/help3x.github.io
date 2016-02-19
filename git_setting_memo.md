---
layout: default
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
