Option Explicit

Dim fso
Dim maxDepth
Dim maxDepthPath
Dim filelist
Dim srcDir
Dim myConfig

Call Main()


'''
''' �X�N���v�g�̃G���g���|�C���g�ł��B
'''
Sub Main()
    WScript.Echo "Start: " & Now

    '������
    '
    Set fso = WScript.CreateObject("Scripting.FileSystemObject")
    maxDepth = 0
    maxDepthPath = ""
    Set filelist = WScript.CreateObject("System.Collections.ArrayList")

	'�ݒ�t�@�C���̓ǂݍ���
	Call ReadConfig()

    '�w�肳�ꂽ�t�H���_�����݂���Ȃ�T�����J�n����
    '
	Dim params
	params = GetArgs()
	
	If fso.FolderExists(params(0)) = False Then
		WScript.Echo "Source folder is not found."
		WScript.Quit
	End If
    Set srcDir = fso.GetFolder(params(0))

    WScript.Echo "Specified root directory: " & srcDir.Path

    '��Ԑ[���t�@�C���K�w��ݒ�
    Call SetMaxFileDepth(fso.GetFolder(srcDir.Path), 1)
    WScript.Echo "File hierarchy depth: " & maxDepth

    '�t�@�C���K�w�����i�[����
    Call SetFileHierarchy(fso.GetFolder(srcDir.Path), 1)

    '�t�@�C���K�w�����o�͂���
    Call WriteFileHierarchy(srcDir.Path)

    WScript.Echo "End: " & Now
End Sub


'''
''' �R�}���h���C���������擾���܂��B
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

        '������
        flHrchyInf.DateTimeOriginal = ""
        flHrchyInf.ExifImageWidth = ""
        flHrchyInf.ExifImageLength = ""
        flHrchyInf.Make = ""
        flHrchyInf.Model = ""
        
        '�摜�t�@�C���ł���Βǉ������i�[
        If UCase(flHrchyInf.Extension) = "JPG" Then
            flHrchyInf.DateTimeOriginal = GetDateTimeOriginal(flHrchyInf.Path)
            flHrchyInf.Make = GetMaker(flHrchyInf.Path)
            flHrchyInf.Model = GetModel(flHrchyInf.Path)
        End If

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
        
        tsvText = tsvText & String(maxDepth - hrchy.Depth + 1, vbTab) & hrchy.Extension & vbTab & hrchy.Size & vbTab & hrchy.DateTimeOriginal & vbTab & hrchy.Make & vbTab & hrchy.Model
        
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


' '''
' ''' �T���̃��[�g�t�H���_���擾���܂��B
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
''' �ݒ�t�@�C����ǂݍ��݂܂��B
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

	'ImageMagicK�̃f�B���N�g��
	Public ImageMagicKDirectory

End Class


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

    '�B�e����
    Public DateTimeOriginal

    '��
    Public ExifImageWidth

    '����
    Public ExifImageLength

    '�J�����̐�����
    Public Make

    '�J�����̃��f��
    Public Model
End Class


'''
''' Exif�̎B�e�������擾���܂��B
'''
Function GetDateTimeOriginal(imagePath)

	Dim shell
	Set shell = WScript.CreateObject("WScript.Shell")
	
	Dim commandText
	commandText = myConfig.ImageMagicKDirectory & "\identify.exe -format ""%[exif:DateTimeOriginal]"" """ & imagePath & """"
	
	Dim exec
	Set exec = shell.Exec(commandText)
	
	'�W���u�̎��s����������܂őҋ@
	Do While exec.Status = 0
		WScript.Sleep 100
	Loop
	
	Dim stdOutText
	If exec.StdOut.AtEndOfStream = False Then
		stdOutText = stdOutText & exec.StdOut.ReadLine()
	End If
	
    stdOutText = Trim(stdOutText)
    If Len(stdOutText) > 0 Then
        'yyyy:MM:dd HH:mm:ss �� yyyy-MM-dd HH:mm:ss
        stdOutText = Replace(stdOutText, ":", "-", 1, 2)
    End If

	GetDateTimeOriginal = stdOutText
	
End Function


'''
''' Exif�̃J�����̐��������擾���܂��B
'''
Function GetMaker(imagePath)

	Dim shell
	Set shell = WScript.CreateObject("WScript.Shell")
	
	Dim commandText
	commandText = myConfig.ImageMagicKDirectory & "\identify.exe -format ""%[exif:Make]"" """ & imagePath & """"
	
	Dim exec
	Set exec = shell.Exec(commandText)
	
	'�W���u�̎��s����������܂őҋ@
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
''' Exif�̃J�����̃��f�����擾���܂��B
'''
Function GetModel(imagePath)

	Dim shell
	Set shell = WScript.CreateObject("WScript.Shell")
	
	Dim commandText
	commandText = myConfig.ImageMagicKDirectory & "\identify.exe -format ""%[exif:Model]"" """ & imagePath & """"
	
	Dim exec
	Set exec = shell.Exec(commandText)
	
	'�W���u�̎��s����������܂őҋ@
	Do While exec.Status = 0
		WScript.Sleep 100
	Loop
	
	Dim stdOutText
	If exec.StdOut.AtEndOfStream = False Then
		stdOutText = stdOutText & exec.StdOut.ReadLine()
	End If
	
	GetModel = Trim(stdOutText)
	
End Function
