Option Explicit

Dim fso
Dim maxDepth
Dim maxDepthPath
Dim filelist
Dim srcDir
Dim myConfig

Call Main()


'''
''' スクリプトのエントリポイントです。
'''
Sub Main()
    WScript.Echo "Start: " & Now

    '初期化
    '
    Set fso = WScript.CreateObject("Scripting.FileSystemObject")
    maxDepth = 0
    maxDepthPath = ""
    Set filelist = WScript.CreateObject("System.Collections.ArrayList")

	'設定ファイルの読み込み
	Call ReadConfig()

    '指定されたフォルダが存在するなら探索を開始する
    '
	Dim params
	params = GetArgs()
	
	If fso.FolderExists(params(0)) = False Then
		WScript.Echo "Source folder is not found."
		WScript.Quit
	End If
    Set srcDir = fso.GetFolder(params(0))

    WScript.Echo "Specified root directory: " & srcDir.Path

    '一番深いファイル階層を設定
    Call SetMaxFileDepth(fso.GetFolder(srcDir.Path), 1)
    WScript.Echo "File hierarchy depth: " & maxDepth

    'ファイル階層情報を格納する
    Call SetFileHierarchy(fso.GetFolder(srcDir.Path), 1)

    'ファイル階層情報を出力する
    Call WriteFileHierarchy(srcDir.Path)

    WScript.Echo "End: " & Now
End Sub


'''
''' コマンドライン引数を取得します。
'''
Function GetArgs()
	Dim params(1)

	Dim args
	Set args = WScript.Arguments
	
	If args.Count = 1 Then
		params(0) = args(0)
	End If
	
	GetArgs = params
	
End Function


'''
''' ファイル階層情報を格納します。
'''
Sub SetFileHierarchy(targetDir, currentDepth)
    
    'まずは自分自身のフォルダの階層情報を追加
    Dim hierarchyInfo
    Set hierarchyInfo = New FileHierarchyInfo
    hierarchyInfo.Depth = currentDepth
    hierarchyInfo.Name = targetDir.Name
    hierarchyInfo.Path = targetDir.Path
    filelist.Add hierarchyInfo
    
    ' まずはカレントフォルダのファイルを探す
    Dim fl
    For Each fl In targetDir.Files
        Dim flHrchyInf
        Set flHrchyInf = New FileHierarchyInfo
        flHrchyInf.Depth = currentDepth + 1
        flHrchyInf.Name = fl.Name
        flHrchyInf.Path = fl.Path
        flHrchyInf.Size = fl.Size
        flHrchyInf.Extension = fso.GetExtensionName(flHrchyInf.Path)

        '初期化
        flHrchyInf.DateTimeOriginal = ""
        flHrchyInf.ExifImageWidth = ""
        flHrchyInf.ExifImageLength = ""
        flHrchyInf.Make = ""
        flHrchyInf.Model = ""
        
        '画像ファイルであれば追加情報を格納
        If UCase(flHrchyInf.Extension) = "JPG" Then
            flHrchyInf.DateTimeOriginal = GetDateTimeOriginal(flHrchyInf.Path)
            flHrchyInf.Make = GetMaker(flHrchyInf.Path)
            flHrchyInf.Model = GetModel(flHrchyInf.Path)
        End If

        filelist.Add flHrchyInf
    Next
    
    ' それからサブフォルダを探す
    Dim fldr
    For Each fldr In targetDir.SubFolders
        Call SetFileHierarchy(fldr, currentDepth + 1)
    Next
    
End Sub


'''
''' ファイル階層情報をファイルに出力します。
'''
Sub WriteFileHierarchy(rootDirPath)

    Dim tsvText
    tsvText = ""
    
    Dim hrchyCnt
    hrchyCnt = 0
    
    Dim hrchy
    For hrchyCnt = 0 To filelist.Count - 1
        Set hrchy = filelist(hrchyCnt)
        If hrchyCnt = 0 Then
            tsvText = rootDirPath
        Else
            tsvText = tsvText & String(hrchy.Depth - 1, vbTab) & hrchy.Name
        End If
        
        tsvText = tsvText & String(maxDepth - hrchy.Depth + 1, vbTab) & hrchy.Extension & vbTab & hrchy.Size & vbTab & hrchy.DateTimeOriginal & vbTab & hrchy.Make & vbTab & hrchy.Model
        
        'レコード区切りはCRLF
        tsvText = tsvText & vbCrLf
    Next
    
    Dim ts
    Set ts = fso.CreateTextFile("C:/Work/TestHierarchy.csv", True)
    ts.WriteLine tsvText
    ts.Close
    Set ts = Nothing
    
End Sub


'''
''' 探索するルートフォルダから見て一番深いファイル階層を設定します。
'''
Sub SetMaxFileDepth(targetFldr, currentDepth)

    Dim tempDepth
    tempDepth = 0
    
    'フォルダ内にファイルがなければ現在の階層レベルを設定
    'ファイルがあれば現在の階層レベル + 1を設定
    If targetFldr.Files.Count = 0 Then
        tempDepth = currentDepth
    ElseIf targetFldr.Files.Count > 0 Then
        tempDepth = currentDepth + 1
    End If

    If maxDepth < tempDepth Then
        maxDepth = tempDepth
        maxDepthPath = targetFldr.Path
    End If

    'サブフォルダを探す
    Dim fldr
    For Each fldr In targetFldr.SubFolders
        Call SetMaxFileDepth(fldr, currentDepth + 1)
    Next

End Sub


' '''
' ''' 探索のルートフォルダを取得します。
' '''
' Function GetRootDirectoryPath()

'     Dim dom
'     Set dom = WScript.CreateObject("MSXML2.DOMDocument")

'     If dom.load("AppConfig.xml") Then
'         Dim nodeList
'         Set nodeList = dom.documentElement.selectNodes("/configuration/rootDirectory")
        
'         Dim obj
'         For Each obj In nodeList
'             GetRootDirectoryPath = obj.text
'             Exit For
'         Next
'     End If

'     Set dom = Nothing

' End Function


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
''' ファイル階層情報を格納します。
'''
Class FileHierarchyInfo
    ' 階層
    Public Depth

    ' フォルダ／ファイル名称
    Public Name

    ' パス
    Public Path

    ' 拡張子
    Public Extension

    ' サイズ（バイト単位）
    Public Size

    '撮影日時
    Public DateTimeOriginal

    '幅
    Public ExifImageWidth

    '高さ
    Public ExifImageLength

    'カメラの製造元
    Public Make

    'カメラのモデル
    Public Model
End Class


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
	
    stdOutText = Trim(stdOutText)
    If Len(stdOutText) > 0 Then
        'yyyy:MM:dd HH:mm:ss ⇒ yyyy-MM-dd HH:mm:ss
        stdOutText = Replace(stdOutText, ":", "-", 1, 2)
    End If

	GetDateTimeOriginal = stdOutText
	
End Function


'''
''' Exifのカメラの製造元を取得します。
'''
Function GetMaker(imagePath)

	Dim shell
	Set shell = WScript.CreateObject("WScript.Shell")
	
	Dim commandText
	commandText = myConfig.ImageMagicKDirectory & "\identify.exe -format ""%[exif:Make]"" """ & imagePath & """"
	
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
	
	GetMaker = Trim(stdOutText)
	
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
