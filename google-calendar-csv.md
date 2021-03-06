---
layout: markdown-page
title: Google カレンダーへの予定の読み込み
---

Google カレンダーへの予定の読み込み
=============

CSV ファイルでのヘッダーと予定の形式
-------------

次のリストにある最初の 2 つのヘッダーのみ必須です。残りのヘッダーは省略できます。

重要: 以下に示すように、ヘッダーは英語で表記する必要があります。予定の詳細にカンマを含める場合（下記の例では説明の欄）、そのテキストを引用符で囲んでください。

|ヘッダー|必須|説明|例|
|:----|:---:|:----|:----|
|Subject|必須|予定の名前。|期末試験|
|Start Date|必須|予定の開始日。|05/30/2020|
|Start Time|－|予定の開始時刻。|10:00 AM|
|End Date|－|予定の終了日。|05/30/2020|
|End Time|－|予定の終了時刻。|1:00 PM|
|All Day Event|－|終日の予定であるかどうかを指定します。終日の予定の場合は「True」、そうでない場合は「False」と入力します。|False|
|Description|－|予定の説明やメモ。|"選択式問題 50 問と論文 2,000 字"|
|Location|－|予定の場所。|"614 教室"|
|Private|－|予定を限定公開にするかどうかを指定します。限定公開の場合は「True」、限定公開でない場合は「False」と入力します。|True|

•Subject
予定の名前（必須）。
 例: 期末試験
•Start Date
予定の開始日（必須）。
 例: 05/30/2020
•Start Time
予定の開始時刻。
 例: 10:00 AM
•End Date
予定の終了日。
 例: 05/30/2020
•End Time
予定の終了時刻。
 例: 1:00 PM
•All Day Event
終日の予定であるかどうかを指定します。終日の予定の場合は「True」、そうでない場合は「False」と入力します。
 例: False
•Description
予定の説明やメモ。
 例: "選択式問題 50 問と論文 2,000 字" 
•Location
予定の場所。
 例: "614 教室"
•Private
予定を限定公開にするかどうかを指定します。限定公開の場合は「True」、限定公開でない場合は「False」と入力します。
 例: True

上記の例では、2020 年 5 月 30 日の午前 10 時から午後 1 時までの予定「期末試験」が作成されます。場所は「614 教室」、説明は「選択式問題 50 問と論文 2,000 字」で、限定公開となります。


出典: [Google カレンダーへの予定の読み込み](https://support.google.com/calendar/answer/37118?hl=ja)
