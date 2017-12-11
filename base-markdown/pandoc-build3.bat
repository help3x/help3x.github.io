@echo off

rem ----------------------------------------
rem PandocによるMarkdown→HTMLの変換
rem ----------------------------------------

rem 変数設定
rem set HOGE="VALUE"

rem バッチファイルが存在するフォルダをカレントにする
pushd %0\..

rem 変換
pandoc -f markdown -t html5 -o %2 --data-dir=. -c css/style.css -s --self-contained %1

rem 終了
