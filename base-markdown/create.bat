@echo off

rem ----------------------------------------
rem ImageMagickによる画像生成
rem ----------------------------------------

rem 変数設定
set IMK="C:\Users\q40061wa\Downloads\ImageMagick\ImageMagick-7.0.6-0-portable-Q16-x86"

rem バッチファイルが存在するフォルダをカレントにする
pushd %0\..

rem   -size 2048x1536
rem   -gravity center ^


%IMK%\convert.exe ^
  -size 512 ^
  -pointsize 48 ^
  label:"Photographed by J. Sem" ^
  img01-2.jpg

%IMK%\convert.exe ^
  -size 100x60 ^
  xc:skyblue ^
  -fill white ^
  -stroke black ^
  -font Times-New-Roman ^
  -pointsize 48 ^
  -gravity center ^
  -draw "text 0,0 \"Hello\"" ^
  img01-3.jpg

%IMK%\convert.exe ^
  -size 320x100 ^
  xc:lightblue ^
  -font "Yu-Gothic-Medium-&-Yu-Gothic-UI-Regular" ^
  -pointsize 72 ^
  -fill white ^
  -stroke black ^
  -strokewidth 3 ^
  -annotate +25+65 "Hello" ^
  img01-4.jpg

rem グラデーションにする -tile

%IMK%\convert.exe ^
  -size 180x60 ^
  xc:none ^
  -tile gradient:#ffffff-#f8c749 ^
  -pointsize 50 ^
  -stroke #c0c0ff ^
  -strokewidth 2 ^
  -draw "text 0,45 \"Sample\" " ^
  img01-5.png

rem 単色塗りつぶし -fill white

%IMK%\convert.exe ^
  -size 180x60 ^
  xc:none ^
  -fill white ^
  -pointsize 50 ^
  -stroke #c0c0ff ^
  -strokewidth 2 ^
  -draw "text 0,45 \"Sample\" " ^
  img01-6.png

rem convertでも合成できるらしい

%IMK%\convert.exe ^
  -composite resize.jpg img01-5.png ^
  -gravity SouthEast ^
  -geometry 540x180+20+20 ^
  output.jpg

rem -geometry 重ねる画像の位置を決める。指定方法は、縦の大きさ×横の大きさ×基準値からのx座標＋基準値からのy座標」
rem 上記の場合、基準値は -gravity SouthEast で画像の右下。そこから20pxのところに540x180のサイズで配置するという意味。

rem compositeを使う方法が王道のようです。

%IMK%\composite.exe ^
  -dissolve 40% ^
  -gravity SouthEast ^
  -geometry 540x+30+30 ^
  img01-5.png ^
  resize.jpg ^
  output2.jpg
