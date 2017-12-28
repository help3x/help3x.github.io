''' 任意のフォルダ内にあるJPEGファイルを、任意のフォルダにコピーします。
''' コピーしたファイルの名前は、Exifの撮影日時をもとに yyyy-MM-dd HH.mm.ss になります。
''' JPEGファイル以外またはJPEGファイルであってもExifの撮影日時がないファイルは対象から除きます。
''' 
''' Usage:
''' CScript zak.vbs SrcFolder DestFolder
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
	'Note: 使い方 hoge.exe src dest
	
	Set fso = WScript.CreateObject("Scripting.FileSystemObject")
	
	'設定ファイルの読み込み
	Call ReadConfig()
	
	Dim params
	params = GetArgs()
	
	If fso.FolderExists(params(0)) = False Then
		WScript.Echo "Source folder is not found."
		WScript.Quit
	End If
	
	If fso.FolderExists(params(1)) = False Then
		WScript.Echo "Destination folder is not found."
		WScript.Quit
	End If
	
	Set srcDir = fso.GetFolder(params(0))
	Set destDir = fso.GetFolder(params(1))
	
	'同一フォルダの指定は禁止
	If srcDir.Path = destDir.Path Then
		WScript.Echo "元フォルダと先フォルダは、異なるフォルダにしてください。"
		WScript.Quit
	End If
	
	'先フォルダ内のファイルの名前をリストに格納
	Dim destFileNames
	Set destFileNames = WScript.CreateObject("System.Collections.ArrayList")
	Call SetFileNames(destDir, destFileNames)
	
	'作業用リストを生成
	Dim workNames
	Set workNames = destFileNames.Clone()
	
	'元フォルダ内のファイルでループ
	Dim fl
	For Each fl In srcDir.Files
		'拡張子を取得。JPEG画像（JPG）のみ許可
		Dim extension
		extension = fso.GetExtensionName(fl.Path)
		
		If UCase(extension) = "JPG" Then
			Dim exifDateTime
			exifDateTime = GetDateTimeOriginal(fl.Path)
			
			If exifDateTime <> "" Then
				'yyyy:MM:dd HH:mm:ss → yyyy-MM-dd HH.mm.ss
				Dim dateTimeText
				dateTimeText = Replace(Replace(exifDateTime, ":", "-", 1, 2), ":", ".", 1, 2)
				
				Dim baseName
				baseName = dateTimeText
				
				Dim fileCount
				fileCount = 0
				
				'変更後のファイル名を決める
				Dim destFilePath
				Dim newFileName
				Do While True
					newFileName = GetNewFileName(baseName, "jpg", fileCount)
					destFilePath = fso.BuildPath(destDir.Path, newFileName)
					
					If fso.FileExists(destFilePath) = False Then
						Exit Do
					End If
					
					fileCount = fileCount + 1
				Loop
				
				'ファイル名を変更して先フォルダにコピー（上書き禁止）
				Call fso.CopyFile(fl.Path, destFilePath, False)
			End If
		End If
	Next

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


