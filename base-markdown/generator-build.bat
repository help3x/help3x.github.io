@echo off

rem ----------------------------------------
rem VC# Compilerを使ったコンパイル
rem ----------------------------------------

rem 変数設定
rem set HOGE="VALUE"

rem バッチファイルが存在するフォルダをカレントにする
rem pushd %0\..

rem コンパイル
csc /platform:x86 /target:exe /codepage:65001 /r:YamlDotNet.dll /r:System.Web.Razor.dll /r:RazorEngine.dll CSharpCsc2nd.cs Builder.cs YamlMetaData.cs MyContent.cs

rem 終了
