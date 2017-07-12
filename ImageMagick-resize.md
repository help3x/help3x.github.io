﻿ImageMagickを使って画像をリサイズする
=============

実行環境
-------------

- Windows 7 Professional Service Pack 1  (Microsoft Windows [Version 6.1.7601])
- ImageMagick 7.0.6-0 Q16 x86 2017-06-11


文法
-------------

convert.exe -resize [Size Options] src-file dest-file


サイズ指定のオプション
-------------

50%		高さと幅を元画像の50%に指定
60x30%		高さを元画像の60%に、幅を元画像の30%に指定。（縦横比は保持しない）
640		幅を640とし、高さを自動調整（縦横比を保持する）
x480		高さを480とし、幅を自動調整（縦横比を保持する）
720x480		指定した高さと幅に納まる最大サイズに自動調整（縦横比を保持する）
720x480^	指定した高さと幅の最小値に自動調整（縦横費を保持する）
720x480!	指定した高さと幅に変更（縦横比は保持しない）
720x480< (*)	元画像の高さと幅が、指定した高さと幅より小さい場合にリサイズする（縦横比を保持する）。そうでない場合はもとの画像がそのまま出力される。
720x480> (*)	元画像の高さと幅が、指定した高さと幅より大きい場合にリサイズする（縦横比を保持する）。そうでない場合はもとの画像がそのまま出力される。

*:
"<" または ">" はリダイレクト記号なので、指定するときはエスケープが必要です。
エスケープの方法は、コマンドプロンプトの場合、リダイレクト記号の前に "^" を指定します。
