''' 
''' �X�N���v�g�̎��s�ɂ� ImageMagicK ���K�v�ł��B
''' 
Option Explicit

Dim fso
Dim srcDir
Dim destDir
Dim myConfig


'���C���������s
Call Main()


Set srcDir = Nothing
Set destDir = Nothing
Set fso = Nothing



'''
''' �X�N���v�g�̃G���g���[�|�C���g�ł��B
'''
Sub Main
	'Note: �g���� hoge.exe src ModelName
	
	Set fso = WScript.CreateObject("Scripting.FileSystemObject")
	
	'�ݒ�t�@�C���̓ǂݍ���
	Call ReadConfig()
	
	Dim params
	params = GetArgs()
	
	If fso.FolderExists(params(0)) = False Then
		WScript.Echo "Source folder is not found."
		WScript.Quit
	End If
	
	If FileNameIsValid(params(1)) = False Then
		WScript.Echo "���̔��p�����͎g���܂���B" & vbCrLf & "\ / : * ? "" < > |"
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
	
	'���t�H���_���̃t�@�C���Ń��[�v
	Dim fl
	For Each fl In srcDir.Files
		'�g���q���擾�BJPEG�摜�iJPG�j�̂݋���
		Dim extension
		extension = fso.GetExtensionName(fl.Path)
		
		If UCase(extension) = "JPG" Then
			Dim exifModel
			exifModel = GetModel(fl.Path)

			'�_�������f���Ɠ���ł���΃t�@�C�����ړ�
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
''' �t�@�C�����ړ����܂��B
''' 
Sub MoveFile(src, dest)
	On Error Resume Next
	If Right(dest, 1) <> "\" Then
		dest = dest & "\"
	End If
	Call fso.MoveFile(src, dest)
End Sub

'''
''' �V�����t�@�C�������擾���܂��B
'''
Function GetNewFileName(baseName, extension, seq)
	
	If seq < 1 Then
		GetNewFileName = baseName & "." & extension
	Else
		GetNewFileName = baseName & "-" & seq & "." & extension
	End If
	
End Function


'''
''' �t�H���_���̃t�@�C���������X�g�Ɋi�[���܂��B
''' �i�[����t�@�C�����͏������ɕϊ�����܂��B
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
''' �R�}���h���C���������擾���܂��B
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
	
	GetDateTimeOriginal = Trim(stdOutText)
	
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
''' �t�@�C�����Ƃ��ėL�����ǂ������肵�܂��B
''' 
Function FileNameIsValid(fileName)

	Dim re
	Set re = WScript.CreateObject("VBScript.RegExp")
	re.Pattern = "\\|/|:|\*|\?|""|<|>|\|"

	FileNameIsValid = Not re.Test(fileName)

	Set re = Nothing

End Function
