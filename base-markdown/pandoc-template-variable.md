---
lang: ja
pagetitle: テンプレートについて
date: 2018-01-30
---

## 変数とは

変数を使うとテンプレートの任意の場所に、指定した内容を含めることができます。
変数に設定する内容は、YAMLメタデータブロックまたはコマンドラインの`-V`/`--variable`オプションを使って指定します。


## 変数の使い方

変数名に使える文字は、英数字、`-`、`_` です。  
テンプレートに入力するときは、変数名を `$` 記号で囲みます。

たとえば、変数 `title` をテンプレートに含めるときは、次のようにします。  
こうすることで`$title$`の部分が任意の値に置き換わります。

`$`自体をテンプレートで使いたいときは、`$$`とします。

```html
<title>$title$</title>
```


### 条件分岐

`if`～`endif`を使って条件分岐することができます。

次のように書くと、変数 variable が null でないときは X が、nul のときは Y が出力されます。  
`$else`セクションは任意なので省略できます。

```html
$if(variable)$
X
$else$
Y
$endif$
```


### 繰り返し

変数が複数の値を持つとき、`for`～`endfor`を使うと、その変数が持つ値を一つずつ取得できます。

```html
$for(author)$
<meta name="author" content="$author$" />
$endfor$
```

`sep`でセパレータを指定できます。  
次の場合、セパレータとしてカンマが出力されます。

```html
$if(keywords)$
    <meta name="keywords" content="$for(keywords)$$keywords$$sep$, $endfor$">
$endif$
```


### コメント

`$--`の後に続く行の内容はコメントとされ、無視されます。

```html
$-- null でなければ出力
$if(variable1)$
  <span>$variable1$</span>
$endif$

$-- 繰り返し出力
<ul>
$for(variable2)$
  <li>$variable2$</li>
$endfor$
</ul>
```


## 参考

- [テンプレートについて](https://pandoc.org/MANUAL.html#templates)
