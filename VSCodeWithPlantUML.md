PlantUML (jebbs.plantuml)
=============

Visual Studio Code の拡張機能
Visual Studio Code で PlantUML の図を生成/プレビューすることが可能になる。

デフォルトで Alt-D キーでプレビュー。
コマンドパレットにエクスポートとプレビューのコマンドを登録する。

1つのファイルで複数の図を管理する。  
並行処理でのエクスポートをサポートする。

エクスポートするには、コマンドパレットで次のコマンドを検索して実行する。

- PlantUML: Export Current Diagram
- PlantUML: Export Current File Diagrams.
- PlantUML: Export Workspace Diagrams.

↓ 日本語で表示される。

- PlantUML: カーソル位置のダイアグラムをエクスポート
- PlantUML: ファイル内のダイアグラムをエクスポート
- PlantUML: ワークスペース内のダイアグラムをエクスポート


URLを生成するには次のコマンドを実行する。

- PlantUML: Generate URL for Current Diagram
- PlantUML: Generate URLs for Current File Diagrams.

↓ 日本語で表示される。

- PlantUML: カーソル位置のダイアグラムをURLに変換
- PlantUML: ファイル内のダイアグラムをURLに変換

デフォルトではマークダウン画像スニペットが生成される。
TODO: マークダウン画像スニペットとは？

ファイル内のすべての図を表示するには、Ctrl+Shift+O キーを押下します。  
ダイアグラムに名前を付けることができます。  
以下の例だと "diagram_name" の部分が名前になります。

```
@startuml diagram_name
sudoku
@enduml
```


インストール
-------------

Ctrl+P キーを押下し、次のコマンドを入力して実行します。

```
ext install plantuml
```


必要条件
-------------

プラグインを使うためには、次のものがインストールされている必要があります。

- Java (JRE): PlantUML 本体を実行するために必要。
- Graphviz: PlantUML が図の位置を計算するために利用する。

※JavaおよびGraphvizのbinディレクトリのパスを通しておくこと。
