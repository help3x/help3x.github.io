''' 
''' スクリプトの実行には ImageMagicK が必要です。
''' 
Option Explicit

Dim fso
Dim srcDir
Dim myConfig


'メイン処理実行
Call Main()


Set srcDir = Nothing
Set fso = Nothing


'''
''' スクリプトのエントリーポイントです。
'''
Sub Main
	'Note: 使い方 hoge.exe src
	
	Set fso = WScript.CreateObject("Scripting.FileSystemObject")
	
	'設定ファイルの読み込み
	Call ReadConfig()
	
	Dim params
	params = GetArgs()
	
	If fso.FolderExists(params(0)) = False Then
		WScript.Echo "Source folder is not found."
		WScript.Quit
	End If
	
	Set srcDir = fso.GetFolder(params(0))
	
	Dim shell
	Set shell = WScript.CreateObject("Shell.Application")
	
	Dim fldr
	Set fldr = shell.NameSpace(srcDir.Path)
	
	Dim fl
	For Each fl In srcDir.Files
		'拡張子を取得。JPEG画像（JPG）のみ許可
		Dim extension
		extension = fso.GetExtensionName(fl.Path)
		
		If UCase(extension) = "JPG" Then
			Dim exifDateTime
			exifDateTime = GetDateTimeOriginal(fl.Path)
			
			If exifDateTime <> "" Then
				'yyyy:MM:dd HH:mm:ss → yyyy-MM-dd HH:mm:ss
				Dim dateTimeText
				dateTimeText = Replace(exifDateTime, ":", "-", 1, 2)
				
				Dim modifiedDateTime
				modifiedDateTime = CDate(dateTimeText)
				
				Dim targetFile
				Set targetFile = fldr.ParseName(fl.Name)
				
				targetFile.ModifyDate = modifiedDateTime
			End If
		End If
	Next
	
	Set shell = Nothing

End Sub


'''
''' コマンドライン引数を取得します。
'''
Function GetArgs()
	Dim params(0)

	Dim args
	Set args = WScript.Arguments
	
	If args.Count = 1 Then
		params(0) = args(0)
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


