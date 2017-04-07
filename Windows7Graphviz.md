Windows7へのGraphvizのインストール
=============

ファイルのダウンロード
-------------

1. Graphviz のウェブサイト（[http://www.graphviz.org/](http://www.graphviz.org/)）にアクセスする。
1. 左サイドメニューの Download をクリックする。
1. 画面を下にスクロールし、Agree をクリックする。
1. 左サイドメニューの Download より windows をクリックする。
1. 画面中ほどまでスクロールし、current stable release より graphviz-{version}.zip をクリックしてダウンロードする。<br>（{version}にはバージョンが入る。2017年4月7日時点では 2.38 だった）


インストール
-------------

1. ダウンロードしたファイルを解凍する。
1. graphviz-{version} フォルダが生成される。<br>そのフォルダ内の release フォルダを適当な場所（たとえば、C:\graphviz）にコピーする。
1. bin フォルダ（上記の例だと C:\graphviz\release\bin）のパスを通す。


インストールの確認
-------------

コマンドをプロンプトを起動して、次のコマンドを実行する。  
graphvizのバージョンが表示されればインストールは成功している。

```bash
C:\Users\hoge>dot -V
dot - graphviz version 2.38.0 (20140413.2041)
```

