---
layout: markdown-page
title: git archive コマンドの使い方
---

git archive コマンドの使い方
=============

圧縮ファイルに出力する
----------

```
git archive --format=zip HEAD > hoge.zip
git archive --format=tar HEAD | bzip2 > hoge.tar.bz2
```

<dl>
	<dt>--format=<fmt></dt>
	<dd>
		<fmt>には "zip" または "tar" または "tar.gz" が指定可能。  
		指定しなければ "tar" で出力される。
	</dd>
</dl>


ディレクトリ、ファイルを指定する
-------------

```
git archive --format=zip HEAD hoge.txt fuga.ods readme.txt > output.zip
```

`.gitattributes` で除外指定することも可能。


フォルダ、ファイルをそのまま出力する
-------------

### フォルダ、ファイル未指定（カレントフォルダ配下が対象）

```
git archive --format=tar HEAD | tar -C ../export/ -xf -
```

### フォルダ指定

```
git archive --format=tar HEAD ./Python | tar -C ../export/ -xf -
```

### ファイル指定

```
git archive --format=tar HEAD ./Memo/001.png ./Memo/005.png | tar -C ../export/ -xf -
```


Memo:  
　コマンドでファイル名を指定するとき、ハイフンを指定すると標準入力（標準出力）として解釈してくれる。

用途:  
　特定の出力結果のファイルを引数とするコマンドに渡すとき、一時ファイルを作ることなく引数に受け渡す。
　などなど。。。
