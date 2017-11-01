@echo off

rem ----------------------------------------
rem PandocによるMarkdown→HTMLの変換
rem ----------------------------------------

rem 変数設定
rem set HOGE="VALUE"

rem バッチファイルが存在するフォルダをカレントにする
pushd %0\..

rem 変換
pandoc -f markdown -t html5 -o %2 --data-dir=. --template=my-template -c html5reset-1.6.1.css -c my-style.css -s --self-contained %1

rem 終了
pause
