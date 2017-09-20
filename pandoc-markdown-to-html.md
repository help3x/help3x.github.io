C:\Users\>pandoc --version
pandoc 1.19.2.1
Compiled with pandoc-types 1.17.0.4, texmath 0.9, skylighting 0.1.1.4
Default user data directory: C:\Users\q40061wa\AppData\Roaming\pandoc
Copyright (C) 2006-2016 John MacFarlane
Web:  http://pandoc.org
This is free software; see the source for copying conditions.
There is no warranty, not even for merchantability or fitness
for a particular purpose.



標準出力に出力。

C:\Projects\人員配置モニタ\Works1>pandoc -f markdown -t html opm-environment.md

ファイルに出力。

C:\Projects\人員配置モニタ\Works1>pandoc -f markdown -t html opm-environment.md > opm-environment.html


C:\Users\q40061wa\AppData\Roaming>cd "C:\Users\q40061wa\AppData\Roaming\pandoc"
指定されたパスが見つかりません。

C:\Users\q40061wa\AppData\Roaming>mkdir "C:\Users\q40061wa\AppData\Roaming\pando
c"

C:\Users\q40061wa\AppData\Roaming>cd "C:\Users\q40061wa\AppData\Roaming\pandoc"

C:\Users\q40061wa\AppData\Roaming\pandoc>mkdir templates

C:\Users\q40061wa\AppData\Roaming\pandoc>cd templates

C:\Users\q40061wa\AppData\Roaming\pandoc\templates>pandoc -D html5 > mytemplate.
html

C:\Projects\人員配置モニタ\Works1>pandoc -f markdown -t html5 opm-environment.md -s -o opm-environment.html

-f 入力形式
-t 出力形式
-s 1つのファイルでHTMLとして完結するように出力
-o 出力ファイル名

-s を付けないと Markdown として入力した内容だけが出力される。
（htmlタグとかbodyタグといったものは出力されない）



独自のテンプレートを使うには。

```
C:\Projects\人員配置モニタ\Works1>pandoc -f markdown -t html5 --template=mytemplate.html opm-environment.md -s -o opm-environment.html
```

`--template`オプションでテンプレートのファイルを指定する。



変数に値を格納するには。

`-M`オプションに`KEY[=VAL]`の形式で指定する。
値`VAL`が指定されていないときは、boolean値の`true`と見なされる。

```
C:\Projects\人員配置モニタ\Works1>pandoc -f markdown -t html5 --template=mytemplate.html -M lang=ja opm-environment.md -s -o opm-environment.html
```

複数指定するときは`-M`を複数指定する。

```
C:\Projects\人員配置モニタ\Works1>pandoc -f markdown -t html5 --template=mytemplate.html -M lang=ja -M Key2=Val2 -M Key3=Val3 opm-environment.md -s -o opm-environment.html
```



仕組み

InputFile
↓
Convert[InputFile to pandoc AST] ... Reader
↓
Convert[pandoc AST to OutputFile] ... Writer
↓
OutputFile


## textile を変換する

### html 変換

```
C:\>pandoc -s -S first.textile -f textile -t html5 -o first.html
```

```
C:\>pandoc -s -S hoge.textile -f textile -t html5 --template=mytemplate.html -M lang=ja -o hoge.html
```

### Markdown 変換

```
C:\>pandoc -s -S first.textile -f textile -t markdown -o first.md
```

