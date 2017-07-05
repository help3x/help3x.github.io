Web Starter Kit 事始め
=============

必要なもの
-------------

- Web Starter Kit 本体
- Node.js (バージョン 0.10.x 以上)
- Gulp (バージョン 3.9.x 以上)



環境構築
-------------

### Web Starter Kit のダウンロード

適当な場所に作業ディレクトリを作成し、そこにリポジトリのクローンを作成します。

```bash
>mkdir first-web-starter-kit

>cd first-web-starter-kit

>git clone https://github.com/google/web-starter-kit.git
```

```
C:\Work\first-web-starter-kit>git clone https://github.com/google/web-starter-ki
t.git
Cloning into 'web-starter-kit'...
remote: Counting objects: 10993, done.
remote: Total 10993 (delta 0), reused 0 (delta 0), pack-reused 10993
Receiving objects: 100% (10993/10993), 12.32 MiB | 293.00 KiB/s, done.
Resolving deltas: 100% (5861/5861), done.
Checking connectivity... done.
```



### Node.js のインストール

コマンドプロンプトで次のコマンドを実行します。

Node.js がインストールされていればバージョンが表示されます。

```
>node --version
v6.10.0
```

インストールされていなければエラーが表示されます。

```
>node --version
'node' は、内部コマンドまたは外部コマンド、
操作可能なプログラムまたはバッチ ファイルとして認識されていません。
```

インストールされていない、または指定されたバージョンより古ければ、[Node.js](https://nodejs.org/ja/)のウェブサイトから推奨版をダウンロードしてインストールします。  
2017年7月5日時点の推奨版は、v6.11.0 LTS でした。



### Gulp のインストール

コマンドプロンプトで次のコマンドを実行します。

```
>gulp --version
'gulp' は、内部コマンドまたは外部コマンド、
操作可能なプログラムまたはバッチ ファイルとして認識されていません。
```

インストールされていなければ、npmを使ってインストールします。  
実行するコマンドは以下のとおり。

```
>npm install --global gulp
```



### Web Starter Kit の依存パッケージをインストール

```
C:\Work\first-wsk\web-starter-kit>npm install
```

警告が出た。  
`sw-precache@3.2.0`は廃止予定だからアップデートしてということか？

```
C:\Work\first-wsk\web-starter-kit>npm install
npm WARN deprecated sw-precache@3.2.0: Please update to v5 or higher to resolve
an issue with redirected navigation responses. See https://github.com/GoogleChro
me/sw-precache/releases/tag/5.0.0
Assertion failed: new_time >= loop->time, file src\win\timer.c, line 37gistry.n
```

最新バージョンがあるかどうか確認します。

`npm outdated` コマンドを実行します。

```
C:\Work\first-wsk\web-starter-kit>npm outdated
Package                Current   Wanted   Latest  Location
apache-server-configs  MISSING   2.14.0   2.14.0
babel-core             MISSING   6.25.0   6.25.0
babel-preset-es2015    MISSING   6.24.1   6.24.1
browser-sync           MISSING  2.18.12  2.18.12
del                    MISSING    2.2.2    3.0.0
eslint-config-google   MISSING    0.3.0    0.8.0
gulp                   MISSING    3.9.1    3.9.1
gulp-autoprefixer      MISSING    3.1.1    4.0.0
gulp-babel             MISSING    6.1.2    6.1.2
gulp-cache             MISSING    0.4.6    0.4.6
gulp-concat            MISSING    2.6.1    2.6.1
gulp-cssnano           MISSING    2.1.2    2.1.2
gulp-eslint            MISSING    1.1.1    4.0.0
gulp-htmlmin           MISSING    2.0.0    3.0.0
gulp-if                MISSING    2.0.2    2.0.2
gulp-imagemin          MISSING    2.4.0    3.3.0
gulp-load-plugins      MISSING    1.5.0    1.5.0
gulp-newer             MISSING    1.3.0    1.3.0
gulp-sass              MISSING    2.3.2    3.1.0
gulp-size              MISSING    2.1.0    2.1.0
gulp-sourcemaps        MISSING   1.12.0    2.6.0
gulp-uglify            MISSING    1.5.4    3.0.0
gulp-useref            MISSING    3.1.2    3.1.2
psi                    MISSING    2.0.4    3.0.0
run-sequence           MISSING    1.2.2    2.0.0
sw-precache            MISSING    3.2.0    5.2.0
sw-toolbox             MISSING    3.6.0    3.6.0
```

package.jsonからsw-precacheを削除する。
その後、`npm install` で再インストールする。


npm update してみたら、sw-precache以外にも警告が出た。


```
C:\Work\first-web-starter-kit\web-starter-kit>npm update
npm WARN deprecated sw-precache@3.2.0: Please update to v5 or higher to resolve
an issue with redirected navigation responses. See https://github.com/GoogleChro
me/sw-precache/releases/tag/5.0.0
npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher
 to avoid a RegExp DoS issue
npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher
 to avoid a RegExp DoS issue
npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail o
n node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible
. Use 'npm ls graceful-fs' to find it in the tree.
npm WARN deprecated tough-cookie@2.2.2: ReDoS vulnerability parsing Set-Cookie h
ttps://nodesecurity.io/advisories/130
npm WARN deprecated lodash@1.0.2: lodash@<3.0.0 is no longer maintained. Upgrade
 to lodash@^4.0.0.
npm WARN lifecycle The node binary used for scripts is C:\Program Files\Nodist\b
in\node.exe but npm is using C:\Program Files\Nodist\v\6.10.0\node.exe itself. U
se the `--scripts-prepend-node-path` option to include the path for the node bin
ary npm was executed with.
npm WARN prefer global node-gyp@3.6.2 should be installed with -g

> node-sass@3.13.1 install C:\Work\first-web-starter-kit\web-starter-kit\node_mo
dules\node-sass
> node scripts/install.js

Downloading binary from https://github.com/sass/node-sass/releases/download/v3.1
3.1/win32-ia32-48_binding.node
Download complete .] - :
Binary saved to C:\Work\first-web-starter-kit\web-starter-kit\node_modules\node-
sass\vendor\win32-ia32-48\binding.node
Caching binary to C:\Users\q40061wa\AppData\Roaming\npm-cache\node-sass\3.13.1\w
in32-ia32-48_binding.node

> gifsicle@3.0.4 postinstall C:\Work\first-web-starter-kit\web-starter-kit\node_
modules\gifsicle
> node lib/install.js

  ‼ self signed certificate in certificate chain
  ‼ gifsicle pre-build test failed
  i compiling from source
  × RequestError: self signed certificate in certificate chain
    at ClientRequest.<anonymous> (C:\Work\first-web-starter-kit\web-starter-kit\
node_modules\got\index.js:74:21)
    at ClientRequest.g (events.js:291:16)
    at emitOne (events.js:96:13)
    at ClientRequest.emit (events.js:188:7)
    at TLSSocket.socketErrorListener (_http_client.js:310:9)
    at emitOne (events.js:96:13)
    at TLSSocket.emit (events.js:188:7)
    at emitErrorNT (net.js:1278:8)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)

> jpegtran-bin@3.2.0 postinstall C:\Work\first-web-starter-kit\web-starter-kit\n
ode_modules\jpegtran-bin
> node lib/install.js

  ‼ self signed certificate in certificate chain
  ‼ jpegtran pre-build test failed
  i compiling from source
  × RequestError: self signed certificate in certificate chain
    at ClientRequest.<anonymous> (C:\Work\first-web-starter-kit\web-starter-kit\
node_modules\got\index.js:74:21)
    at ClientRequest.g (events.js:291:16)
    at emitOne (events.js:96:13)
    at ClientRequest.emit (events.js:188:7)
    at TLSSocket.socketErrorListener (_http_client.js:310:9)
    at emitOne (events.js:96:13)
    at TLSSocket.emit (events.js:188:7)
    at emitErrorNT (net.js:1278:8)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)

> optipng-bin@3.1.4 postinstall C:\Work\first-web-starter-kit\web-starter-kit\no
de_modules\optipng-bin
> node lib/install.js

  ‼ self signed certificate in certificate chain
  ‼ optipng pre-build test failed
  i compiling from source
  × RequestError: self signed certificate in certificate chain
    at ClientRequest.<anonymous> (C:\Work\first-web-starter-kit\web-starter-kit\
node_modules\got\index.js:74:21)
    at ClientRequest.g (events.js:291:16)
    at emitOne (events.js:96:13)
    at ClientRequest.emit (events.js:188:7)
    at TLSSocket.socketErrorListener (_http_client.js:310:9)
    at emitOne (events.js:96:13)
    at TLSSocket.emit (events.js:188:7)
    at emitErrorNT (net.js:1278:8)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)

> node-sass@3.13.1 postinstall C:\Work\first-web-starter-kit\web-starter-kit\nod
e_modules\node-sass
> node scripts/build.js

Binary found at C:\Work\first-web-starter-kit\web-starter-kit\node_modules\node-
sass\vendor\win32-ia32-48\binding.node
Testing binary
Binary is fine
C:\Work\first-web-starter-kit\web-starter-kit
+-- apache-server-configs@2.14.0
+-- babel-core@6.25.0
+-- babel-preset-es2015@6.24.1
+-- browser-sync@2.18.12
+-- del@2.2.2
+-- eslint-config-google@0.3.0
+-- gulp@3.9.1
+-- gulp-autoprefixer@3.1.1
+-- gulp-babel@6.1.2
+-- gulp-cache@0.4.6
+-- gulp-concat@2.6.1
+-- gulp-cssnano@2.1.2
+-- gulp-eslint@1.1.1
+-- gulp-htmlmin@2.0.0
+-- gulp-if@2.0.2
+-- gulp-imagemin@2.4.0
+-- gulp-load-plugins@1.5.0
+-- gulp-newer@1.3.0
+-- gulp-sass@2.3.2
+-- gulp-size@2.1.0
+-- gulp-sourcemaps@1.12.0
+-- gulp-uglify@1.5.4
+-- gulp-useref@3.1.2
+-- psi@2.0.4
+-- run-sequence@1.2.2
+-- sw-precache@3.2.0
`-- sw-toolbox@3.6.0

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\ch
okidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@
1.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"
})
```

コマンドが通らなくなった？！

```
C:\Work\first-web-starter-kit\web-starter-kit>npm outdated
Assertion failed: new_time >= loop->time, file src\win\timer.c, line 37
```


とりあえず問題は置いておいて、開発をしてみる。

ローカルサーバーの起動

```
>gulp serve
```

ブラウザが起動してサンプル？が表示された。


実稼動向けのバージョンをビルドする

単純な`gulp`コマンドを実行します。

```
>gulp
```


ビルドの主なタスク

1. Sassをコンパイルする。
1. JavaScriptでJSHintを実行する。
1. HTMLファイルを検査し、JavaScriptを圧縮する。
1. JPEGおよびPNG画像のメタデータを取り除く。SVGの場合、不要な属性や空白、コメントが削除される。
1. アプリのフォントをビルドディレクトリにコピーする。
1. ルートディレクトリから任意のファイルをコピーする。



実稼動向けのビルドをテストする

```
>gulp serve:dist
```





```
C:\Work\first-wsk\web-starter-kit>npm install
npm WARN deprecated sw-precache@3.2.0: Please update to v5 or higher to resolve
an issue with redirected navigation responses. See https://github.com/GoogleChro
me/sw-precache/releases/tag/5.0.0
npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher
 to avoid a RegExp DoS issue
npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher
 to avoid a RegExp DoS issue
npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail o
n node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible
. Use 'npm ls graceful-fs' to find it in the tree.
[       ...........] \ fetchMetadata: sill mapToRegistry uri https://registry.n
```

