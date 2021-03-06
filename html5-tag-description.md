---
layout: markdown-page
title: HTML5 タグ 雑録
---

html5 タグ

◇ Root

html
	HTML文書であることを示す。


◇ Sections

body
	文章全体を示す。
	htmlタグ内に一つだけ配置する。

section
	一つのセクションであることを示す。
	セクションは章や節を表すので、見出しを付ける。
	汎用的なセクションを表すのだが、定義が漠然としているので使いどころが分かりにくい。

nav
	ナビゲーションを示す。
	サイト内での主要なナビゲーション（ヘッダーメニューやサイドメニューなど）に対して使う。

article
	記事を示す。
	雑誌や新聞の記事、ブログのエントリなどに使う。
	articleを入れ子にするとき、子のarticleには親のarticleに関連した内容を書く必要がある。
	（たとえば、親articleがブログのエントリ、子articleはそのコメント）

	Tips:
	　article要素を使うかどうかの判断基準
	　　⇒そのコンテンツが単独のフィードのエントリーとしてふさわしいかどうか。

aside
	余談・補足情報を示す。

header
	ヘッダー

footer
	フッター

address
	連絡先、問い合わせ先


参考
=============

- [HTML5リファレンス](http://www.htmq.com/html5/)
- [[HTML5] 新要素まとめ【2014/2/14版勧告候補】 - Qiita](http://qiita.com/maccotsan/items/20c6ea274b0190dc2c05)


Tumblr API
=============

### 最初にやること

アプリケーションを登録して独自のAPIキー（OAuth コンシューマーキー）を取得する。


キーと呼ばれるものが複数あるが、どれをいつ使えばいいのだろうか。
　⇒これらはTumblr固有のものではなくOAuthに関連するものだった。
　　ここのページがわかりやすい。
　　[OAuthプロトコルの中身をざっくり解説してみるよ](http://yuroyoro.hatenablog.com/entry/20100506/1273137673)

- コンシューマーキー
	- コンシューマーを表す一意のキー。
	- OAuthに関連するすべてのProviderへのリクエストで必要になるパラメータ。
- コンシューマー・シークレット
	- 電子署名に使う。
	- OAuth通信で送信するパラメータが改ざんされていないかを確認するための署名を生成するもの。いわば秘密鍵。
- アクセストークン
	- API呼び出しに必要になる値。
	- APIへのアクセス権となる。
- アクセストークン・シークレット
	- アクセストークンの電子署名に使う。
	- アクセストークン毎に発行される値。API呼び出し時にはこの値を含めたキーにより署名を生成する。

ということで、シークレットは他人に漏らさないように。


OAuthとは。
ユーザーがとあるサービスAにサービスBを経由して安全に接続するための認証手段。

ユーザーはサービスAで使っているユーザー名やパスワードを、サービスBに明かさず接続できるようになる。

“OAuthとは認可のためのプロトコルで、認証のためのプロトコルではない”

認証（authentication）
	身元を判断するために個人やプロセスが提示する資格情報の検証。
認可（authorization）
	何かを行う、またはある場所に存在するための権限を個人に与えること。

例:
	認証はアプリへのログイン。
	認可はログインしたユーザーがアプリで何ができるのかを決める。


OAuth＝認可伝達プロトコル
　サービスAで認可されたことをサービスBに伝達するプロトコル。
　あくまで、認証ではなく認可の伝達であるため、ユーザーとサービスAの秘密情報（アカウントやパスワードなど）は、サービスBに渡されない。


APIはメソッドに応じた3つのレベルの認証を使用する。

1. None
	認証なし。
2. APIキー
	OAuthコンシューマーキーを使う。
3. OAuth
	OAuth 1.0a プロトコルに適合する署名付きリクエストが必要。

	HMAC-SHA1署名メソッドを使ってAuthorizationヘッダーを介しパラメータを受け入れる。
	
	エンドポイント
		Request-token URL
		https://www.tumblr.com/oauth/request_token 

		Authorize URL
		https://www.tumblr.com/oauth/authorize 

		Access-token URL
		https://www.tumblr.com/oauth/access_token 


