%CONV% -pointsize 300 -gravity south -font "Yu-Mincho-Regular" -annotate 0 "aaaaaa" -fill red "C:\Work\ResizeTest\2017-07-03_132844.png" "C:\Work\after.png"

%CONV% -pointsize 56 -gravity Center -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -annotate 0 "© 2017 TOSHIBA" -fill "rgba(128,128,128,0.1)" -stroke "rgba(128,128,128,0.1)" "C:\Work\ResizeTest\2017-07-03_132844.png" "C:\Work\after.png"

Better
%CONV% -pointsize 56 -gravity Center -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -annotate 0 "© 2017 TOSHIBA" -fill "rgba(96,96,96,0.1)" -stroke "rgba(96,96,96,0.1)" "C:\Work\ResizeTest\2017-07-03_132844.png" "C:\Work\after-2.png"


-pointsize	文字の大きさ
-gravity	文字の位置
-font		フォント
-annotate	文字の傾きと文字列
-fill		文字の色

%CONV% -size 360x60 xc:white -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -gravity center -fill gray -draw "font-size 58 text 0,0 '影付き'" -blur 10x10 ( -size 360x60 xc:none -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -gravity center -fill gold -draw "font-size 58 text 0,0 '影付き'" ) -compose over -composite C:\Work\test4.png

%CONV% -size 360x70 xc:white -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -gravity center -fill gray -draw "font-size 58 text 0,0 '© 2017 JSC'" -blur 10x10 ( -size 360x70 xc:none -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -gravity center -fill "rgba(192,192,192,0.5)" -draw "font-size 58 text 0,0 '© 2017 JSC'" ) -compose over -composite C:\Work\test4.png


うまくいかない
%CONV% -gravity center -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -pointsize 72 -draw "text 35,70 '© 2017 JSC'" -channel RGBA -gaussian 0x6 -fill "rgb(229,229,229)" -stroke "rgba(0,0,0,0.3)" -draw "text 30,65 '© 2017 JSC'" "C:\Work\ResizeTest\2017-07-03_132844.png" "C:\Work\test3.png"


%CONV% -size 1300x85 xc:transparent -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -pointsize 72 -draw "text 35,70 '© 2017 JSC'" -channel RGBA -gaussian 0x6 -fill "rgb(229,229,229)" -stroke "rgba(0,0,0,0.3)" -draw "text 30,65 '© 2017 JSC'" C:\Work\logo-test3.png


%CONV%
	-size 1300x85 
	xc:transparent 
	-font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" 
	-pointsize 72 
	-draw "text 35,70 '© 2017 JSC'" 
	-channel RGBA 
	-gaussian 0x6 
	-fill "rgb(229,229,229)" 
	-stroke "rgba(0,0,0,0.3)" 
	-draw "text 30,65 '© 2017 JSC'" 
	"C:\Work\test3.png"



文字の色
は
色の名前かカラーコード（クォーテーションで囲む）で指定する。

[Color Names @ ImageMagick](http://www.imagemagick.org/script/color.php)

-fill red

とか

-fill "#ff0000"

とか

-fill "rgb(255,0,0)"

とか

-fill "rgba(255,0,0,0.5)"

とか



使えるフォントの一覧を表示する

convert.exe -list font

Font: に続く文字を font オプションに指定する。

```
>convert.exe -list font

Path: Windows Fonts
  Font: Arial
    family: Arial
    style: Normal
    stretch: Normal
    weight: 400
    glyphs: c:\windows\fonts\arial.ttf
  Font: Arial-Black
    family: Arial
    style: Normal
    stretch: Normal
    weight: 900
    glyphs: c:\windows\fonts\ariblk.ttf
　：
（略）
　：
```



[Image Magickで文字を描く](http://blog.livedoor.jp/leaf_hiro/archives/51526900.html)


PNG画像を読み込み、ウォーターマークテキストを追加してから、リサイズして、JPEG画像として出力する。

```
C:\>echo %CONV%
C:\Users\hoge\Downloads\ImageMagick\ImageMagick-7.0.6-0-portable-Q16-x86\convert.exe

C:\>%CONV% -pointsize 56 -gravity Center -font "Meiryo-&-Meiryo-Italic-&-Meiryo-UI-&-Meiryo-UI-Italic" -annotate 0 "© 2017 TOSHIBA" -fill "rgba(96,96,96,0.1)" -stroke "rgba(96,96,96,0.1)" "C:\Work\ResizeTest\2017-07-03_132844.png" -resize 640 -quality 75 "C:\Work\after-2.jpg"
```

Exifの画像の向きに合わせて画像を回転する。

Orientation

jpegの中のOrientationという属性に、一桁の数値が入っていて、

それぞれ、方向を示していて、以下の回転操作が必要。
•１：そのまま
•２：水平反転
•３：180度回転
•４：180度回転して水平反転
•５：時計回りに90度回転して水平反転
•６：時計回りに90度回転
•７：時計回りに270度回転して水平反転
•８：時計回りに270度回転

※水平反転が必要になるケースは、おそらく、自撮りする時に、左右反転してると思われる（未確認だが）

詳しくは、以下。
•http://hsm.on.coocan.jp/digicame-exif.htm


-auto-orient オプションを使う。

[もうサムネイルで泣かないための ImageMagick ノウハウ集](http://blog.cybozu.io/entry/2016/01/06/080000)

