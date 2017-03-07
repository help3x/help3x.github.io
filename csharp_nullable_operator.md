---
layout: markdown-page
title: C# Null 許容型の比較
---

C# Null 許容型の比較
=============

MSDN より
-------------

> 2 つの null 許容型を比較したときに、一方の null 許容型の値が null でもう一方がそれ以外の場合は、!= (等しくない) を除くすべての比較が false と評価されます。 ある比較から返される結果が false であっても、逆のケースから返される結果が true とは限りません。 次の例では、10 は null より大きくも小さくも等しくもありません。 num1 != num2 のみが true です。


つまり、こういうこと
-------------

| num1 | num2 | operator | result |
|:----:|:----:|:--------:|:------:|
|  10  | null |    ==    |  false |
|  10  | null |    !=    |  true  |
|  10  | null |     <    |  false |
|  10  | null |    <=    |  false |
|  10  | null |     >    |  false |
|  10  | null |    >=    |  false |


参考
-------------

[Null 許容型の使用 (C# プログラミング ガイド)](https://msdn.microsoft.com/ja-jp/library/2cf62fcy.aspx)

