''' 
''' スクリプトの実行には ImageMagicK が必要です。
''' 
Option Explicit

Dim fso
Dim srcDir
Dim destDir
Dim myConfig


'メイン処理実行
Call Main()


Set srcDir = Nothing
Set destDir = Nothing
Set fso = Nothing



'''
''' スクリプトのエントリーポイントです。
'''
Sub Main
	'Note: 使い方 hoge.exe src ModelName
	
	Set fso = WScript.CreateObject("Scripting.FileSystemObject")
	
	'設定ファイルの読み込み
	Call ReadConfig()
	
	Dim params
	params = GetArgs()
	
	If fso.FolderExists(params(0)) = False Then
		WScript.Echo "Source folder is not found."
		WScript.Quit
	End If
	
	If FileNameIsValid(params(1)) = False Then
		WScript.Echo "次の半角文字は使えません。" & vbCrLf & "\ / : * ? "" < > |"
		WScript.Quit
	End If

	Set srcDir = fso.GetFolder(params(0))

	Dim targetModel
	targetModel = params(1)

	Dim destDirPath
	destDirPath = fso.BuildPath(srcDir.Path, targetModel)
	If fso.FolderExists(destDirPath) Then
		Set destDir = fso.GetFolder(destDirPath)
	Else
		Set destDir = fso.CreateFolder(destDirPath)
	End If
	
	'元フォルダ内のファイルでループ
	Dim fl
	For Each fl In srcDir.Files
		'拡張子を取得。JPEG画像（JPG）のみ許可
		Dim extension
		extension = fso.GetExtensionName(fl.Path)
		
		If UCase(extension) = "JPG" Then
			Dim exifModel
			exifModel = GetModel(fl.Path)

			'狙ったモデルと同一であればファイルを移動
			If UCase(exifModel) = UCase(targetModel) Then
				Call MoveFile(fl.Path, destDir.Path)
				If Err.Number <> 0 Then
					WScript.Echo "Move failure: " & fl.Name
				End If
			End If
		End If
	Next

End Sub


''' 
''' ファイルを移動します。
''' 
Sub MoveFile(src, dest)
	On Error Resume Next
	If Right(dest, 1) <> "\" Then
		dest = dest & "\"
	End If
	Call fso.MoveFile(src, dest)
End Sub

'''
''' 新しいファイル名を取得します。
'''
Function GetNewFileName(baseName, extension, seq)
	
	If seq < 1 Then
		GetNewFileName = baseName & "." & extension
	Else
		GetNewFileName = baseName & "-" & seq & "." & extension
	End If
	
End Function


'''
''' フォルダ内のファイル名をリストに格納します。
''' 格納するファイル名は小文字に変換されます。
'''
Sub SetFileNames(fldr, list)
	If fldr Is Nothing Then
		Exit Sub
	End If
	
	Dim fl
	For Each fl In fldr.Files
		list.Add LCase(fl.Name)
	Next
	
End Sub


'''
''' コマンドライン引数を取得します。
'''
Function GetArgs()
	Dim params(1)

	Dim args
	Set args = WScript.Arguments
	
	'Dim i
	'For i = 0 To args.Count - 1
	'	WScript.Echo args(i)
	'Next
	
	If args.Count = 2 Then
		params(0) = args(0)
		params(1) = args(1)
	End If
	
	GetArgs = params
	
End Function


'''
''' Exifの撮影日時を取得します。
'''
Function GetDateTimeOriginal(imagePath)

	Dim shell
	Set shell = WScript.CreateObject("WScript.Shell")
	
	Dim commandText
	commandText = myConfig.ImageMagicKDirectory & "\identify.exe -format ""%[exif:DateTimeOriginal]"" """ & imagePath & """"
	
	Dim exec
	Set exec = shell.Exec(commandText)
	
	'ジョブの実行が完了するまで待機
	Do While exec.Status = 0
		WScript.Sleep 100
	Loop
	
	Dim stdOutText
	If exec.StdOut.AtEndOfStream = False Then
		stdOutText = stdOutText & exec.StdOut.ReadLine()
	End If
	
	GetDateTimeOriginal = Trim(stdOutText)
	
End Function


'''
''' Exifのカメラのモデルを取得します。
'''
Function GetModel(imagePath)

	Dim shell
	Set shell = WScript.CreateObject("WScript.Shell")
	
	Dim commandText
	commandText = myConfig.ImageMagicKDirectory & "\identify.exe -format ""%[exif:Model]"" """ & imagePath & """"
	
	Dim exec
	Set exec = shell.Exec(commandText)
	
	'ジョブの実行が完了するまで待機
	Do While exec.Status = 0
		WScript.Sleep 100
	Loop
	
	Dim stdOutText
	If exec.StdOut.AtEndOfStream = False Then
		stdOutText = stdOutText & exec.StdOut.ReadLine()
	End If
	
	GetModel = Trim(stdOutText)
	
End Function


'''
''' 設定ファイルを読み込みます。
'''
Function ReadConfig()

	Set myConfig = New MyAppConfig

	Dim dom
	Set dom = WScript.CreateObject("MSXML2.DOMDocument")

	If dom.load("AppConfig.xml") Then
		Dim nodeList
		Set nodeList = dom.documentElement.selectNodes("/configuration/imageMagicK/directory")
		
		Dim obj
		For Each obj In nodeList
			myConfig.ImageMagicKDirectory = obj.text
			Exit For
		Next
	End If

	Set dom = Nothing

End Function


Class MyAppConfig

	'ImageMagicKのディレクトリ
	Public ImageMagicKDirectory

End Class


''' 
''' ファイル名として有効かどうか判定します。
''' 
Function FileNameIsValid(fileName)

	Dim re
	Set re = WScript.CreateObject("VBScript.RegExp")
	re.Pattern = "\\|/|:|\*|\?|""|<|>|\|"

	FileNameIsValid = Not re.Test(fileName)

	Set re = Nothing

End Function
