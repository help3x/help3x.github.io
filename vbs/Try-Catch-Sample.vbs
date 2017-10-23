'================================================================================
' VBScriptでTryCatch風にエラーハンドリングするサンプル
'================================================================================
Option Explicit


Call Main()


'''
''' スクリプトのエントリーポイントです。
'''
Sub Main()
	Call Catch()

	Dim resultCode
	resultCode = Err.Number		'Catchプロシージャでエラーがあったかどうか調べる

	If Err.Number <> 0 Then
		'異常終了
		WScript.Echo Err.Number & ": " & Err.Description & vbCrLf & Err.Source
	Else
		'正常終了
	End If

	WScript.Quit resultCode
End Sub


Sub Try()
	'
	'TODO: ここに処理を書く
	'
	Dim a
	a = 1 / 0				'試しにゼロ除算エラーを発生させる。
End Sub


Sub Catch()
	On Error Resume Next	'←このプロシージャ内でのみエラーを無視する。
	Call Try()				'よってTryプロシージャで何かエラーが発生してもそのまま処理は続行する。
End Sub


