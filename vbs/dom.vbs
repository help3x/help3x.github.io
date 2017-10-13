Option Explicit

Dim fso
Dim maxDepth
Dim maxDepthPath
Dim filelist

Call Main()


'''
''' �X�N���v�g�̃G���g���|�C���g�ł��B
'''
Sub Main()

	'������
	'
	Set fso = WScript.CreateObject("Scripting.FileSystemObject")
	maxDepth = 0
	maxDepthPath = ""
	Set filelist = WScript.CreateObject("System.Collections.ArrayList")

	'�w�肳�ꂽ�t�H���_�����݂���Ȃ�T�����J�n����
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

	'��Ԑ[���t�@�C���K�w��ݒ�
	Call SetMaxFileDepth(fso.GetFolder(rootDirPath), 1)
	WScript.Echo "File hierarchy depth: " & maxDepth

	'�t�@�C���K�w�����i�[����
	Call SetFileHierarchy(fso.GetFolder(rootDirPath), 1)

	'�t�@�C���K�w�����o�͂���
	Call WriteFileHierarchy(rootDirPath)

End Sub


'''
''' �t�@�C���K�w�����i�[���܂��B
'''
Sub SetFileHierarchy(targetDir, currentDepth)
	
	'�܂��͎������g�̃t�H���_�̊K�w����ǉ�
	Dim hierarchyInfo
	Set hierarchyInfo = New FileHierarchyInfo
	hierarchyInfo.Depth = currentDepth
	hierarchyInfo.Name = targetDir.Name
	hierarchyInfo.Path = targetDir.Path
	filelist.Add hierarchyInfo
	
	' �܂��̓J�����g�t�H���_�̃t�@�C����T��
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
	
	' ���ꂩ��T�u�t�H���_��T��
	Dim fldr
	For Each fldr In targetDir.SubFolders
		Call SetFileHierarchy(fldr, currentDepth + 1)
	Next
	
End Sub


'''
''' �t�@�C���K�w�����t�@�C���ɏo�͂��܂��B
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
		
		'���R�[�h��؂��CRLF
		tsvText = tsvText & vbCrLf
	Next
	
	Dim ts
	Set ts = fso.CreateTextFile("C:/Work/TestHierarchy.csv", True)
	ts.WriteLine tsvText
	ts.Close
	Set ts = Nothing
	
End Sub


'''
''' �T�����郋�[�g�t�H���_���猩�Ĉ�Ԑ[���t�@�C���K�w��ݒ肵�܂��B
'''
Sub SetMaxFileDepth(targetFldr, currentDepth)

	Dim tempDepth
	tempDepth = 0
	
	'�t�H���_���Ƀt�@�C�����Ȃ���Ό��݂̊K�w���x����ݒ�
	'�t�@�C��������Ό��݂̊K�w���x�� + 1��ݒ�
	If targetFldr.Files.Count = 0 Then
		tempDepth = currentDepth
	ElseIf targetFldr.Files.Count > 0 Then
		tempDepth = currentDepth + 1
	End If

	If maxDepth < tempDepth Then
		maxDepth = tempDepth
		maxDepthPath = targetFldr.Path
	End If

	'�T�u�t�H���_��T��
	Dim fldr
	For Each fldr In targetFldr.SubFolders
		Call SetMaxFileDepth(fldr, currentDepth + 1)
	Next

End Sub


'''
''' �T���̃��[�g�t�H���_���擾���܂��B
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
''' �t�@�C���K�w�����i�[���܂��B
'''
Class FileHierarchyInfo
	' �K�w
	Public Depth
	
	' �t�H���_�^�t�@�C������
	Public Name
	
	' �p�X
	Public Path

	' �g���q
	Public Extension

	' �T�C�Y�i�o�C�g�P�ʁj
	Public Size
End Class



