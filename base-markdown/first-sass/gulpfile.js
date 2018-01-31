// gulp 等々のモジュールを読み込む
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var del = require('del');
var runSequence = require('run-sequence');

// return は Promise または Stream オブジェクトを使うタスクの場合に付けるらしい。

// Task sass
gulp.task('sass', function () {
  // gulp.src でソースファイルの指定
  // sassフォルダ内のすべての *.scss ファイル
  // gulp.dest で出力先フォルダを指定
//  return gulp.src('./sass/**/*.scss')
  return gulp.src(['./sass/**/*.scss', '!./sass/**/sample.scss'])
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(replace(/@charset "UTF-8";/g, ''))
    .pipe(gulp.dest('./css'));
});

// outputStyle は4種類
// nested
//   既定のスタイル。Sassの階層をインデントで残し、ネストされているような見た目で出力する。
// expanded
//   可視性が高いスタイル。ルールセットとプロパティを1行ずつ改行する。
// compact
//   セレクタとプロパティをシングルラインにする。改行はルールセットごとにされる。
// compressed
//   インデントや改行、コメントをすべて取り除く。

// Task sass:watch
// Sassファイルを監視し、変更されると自動でコンパイルする。
// gulp.watch の第一引数で監視するフォルダ、第二引数で実行するタスクを指定する。
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// CSS圧縮
// extnameでもsuffixでもどちらでも *.min.css になる。
gulp.task('minify-css', function () {
//  return gulp.src("css/*.css")
  return gulp.src("dist/css/*.css")
    .pipe(cleanCss())
    .pipe(rename({
//      extname: '.min.css'
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css/'));
});

// ファイルをまとめる
gulp.task('concat-css', function () {
//  return gulp.src(["css/*.css", "dist/css/*.css"])
  return gulp.src("css/*.css")
    .pipe(concat("style.css"))
    .pipe(gulp.dest("dist/css/"));
});

// Clean
gulp.task('clean', function (cb) {
//  return del('dist');
  return del(['dist', 'css/*.css', '!css/normalize.*']);
});

// ビルド Clean -> Compile Sass -> Concat CSS -> Minify Css
gulp.task('build', function (callback) {
  runSequence('clean', 'sass', 'concat-css', 'minify-css', callback);
});
