## 環境

- Windows 7 Professional Service Pack 1
- node.js v6.10.0
- npm 4.0.5


## 環境構築

package.jsonの作成
`-y`オプションを外すと対話形式で作るようになる。

```
> npm init -y
```


`gulp`と`gulp-sass`をローカルにインストール

```
> npm install --save-dev gulp
> npm install --save-dev gulp-sass
```

`--save-dev`/`-D`オプション
package.jsonの "devDependencies" にパッケージ名とバージョンを追記する。


## Sassのコンパイル

gulpのsassタスクを実行します。  
sassタスクで指定したフォルダ（今回の場合はcssフォルダ）に、コンパイル結果のcssファイルが出力されます。

```
> gulp sass
```

実行結果

```
C:\Work\first-sass>gulp sass
[10:03:48] Using gulpfile C:\Work\first-sass\gulpfile.js
[10:03:48] Starting 'sass'...
[10:03:48] Finished 'sass' after 29 ms
```





次はCSSの圧縮と一つにまとめる方法。

[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
: CSSを圧縮します。

[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
: JavaScriptを圧縮します。今回はインストールしません。

[gulp-rename](https://www.npmjs.com/package/gulp-rename)
: ファイル名を変更します。


gulpfile.js

```javascript
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

// CSS圧縮
// extnameでもsuffixでもどちらでも *.min.css になる。
gulp.task('minify-css', function () {
  return gulp.src("css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
//      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css/'));
});
```



[gulp-concat](https://www.npmjs.com/package/gulp-concat)
: 複数のファイルを一つにまとめる。

[del](https://github.com/sindresorhus/del)
: ファイル/フォルダを削除する。

[gulp-replace](https://www.npmjs.com/package/gulp-replace)
: ファイル内の文字列を置換する。  
マルチバイト文字が含まれたSassファイルをgulp-sassでコンパイルすると、ファイルの先頭に自動で `@charset "UTF-8";` が追加されます。  
必要ないため削除します。

[run-sequence](https://www.npmjs.com/package/run-sequence)
: 指定した順序でタスクを実行する。





gulp.task()の中で return しないと Finish が表示されなかった。

return なし

```
C:\Work\first-sass>gulp clean
[11:02:48] Using gulpfile C:\Work\first-sass\gulpfile.js
[11:02:48] Starting 'clean'...
```

return あり

```
C:\Work\first-sass>gulp clean
[11:03:09] Using gulpfile C:\Work\first-sass\gulpfile.js
[11:03:09] Starting 'clean'...
[11:03:09] Finished 'clean' after 6.22 ms
```





```
> python set_css_contents.py ..\base-markdown\test\index.html "{{custom-css}}" ..\base-markdown\test\style.min.css
```

```
> pandoc -f markdown -t .\amphtml.lua -s --template=.\default-article.html -o .\index.html .\20170428-synchronize-dakoku-2.md
```

