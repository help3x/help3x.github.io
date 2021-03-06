Option Explicit

Dim fso
Dim maxDepth
Dim maxDepthPath
Dim filelist

Call Main()


'''
''' スクリプトのエントリポイントです。
'''
Sub Main()

	'初期化
	'
	Set fso = WScript.CreateObject("Scripting.FileSystemObject")
	maxDepth = 0
	maxDepthPath = ""
	Set filelist = WScript.CreateObject("System.Collections.ArrayList")

	'指定されたフォルダが存在するなら探索を開始する
	'
	Dim rootDirPath
	rootDirPath = GetRootDirectoryPath()

	If Len(rootDirPath) = 0 Then
		WScript.Echo "Please specify the root directory."
		WScript.Quit
	End If
	If fso.FolderExists(rootDirPath) = False Then
		WScript.Echo "Folder not found: " & rootDirPath
		WScript.Quit
	End If

	WScript.Echo "Specified root directory: " & rootDirPath

	'一番深いファイル階層を設定
	Call SetMaxFileDepth(fso.GetFolder(rootDirPath), 1)
	WScript.Echo "File hierarchy depth: " & maxDepth

	'ファイル階層情報を格納する
	Call SetFileHierarchy(fso.GetFolder(rootDirPath), 1)

	'ファイル階層情報を出力する
	Call WriteFileHierarchy(rootDirPath)

End Sub


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
		
		tsvText = tsvText & String(maxDepth - hrchy.Depth + 1, vbTab) & hrchy.Extension & vbTab & hrchy.Size
		
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


'''
''' 探索のルートフォルダを取得します。
'''
Function GetRootDirectoryPath()

	Dim dom
	Set dom = WScript.CreateObject("MSXML2.DOMDocument")

	If dom.load("AppConfig.xml") Then
		Dim nodeList
		'Set nodeList = dom.documentElement.selectNodes("/books/item/title")
		Set nodeList = dom.documentElement.selectNodes("/configuration/rootDirectory")
		
		Dim obj
		For Each obj In nodeList
			GetRootDirectoryPath = obj.text
			Exit For
		Next
	End If

	Set dom = Nothing

End Function



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
End Class



