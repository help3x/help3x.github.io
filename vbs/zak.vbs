''' �C�ӂ̃t�H���_���ɂ���JPEG�t�@�C�����A�C�ӂ̃t�H���_�ɃR�s�[���܂��B
''' �R�s�[�����t�@�C���̖��O�́AExif�̎B�e���������Ƃ� yyyy-MM-dd HH.mm.ss �ɂȂ�܂��B
''' JPEG�t�@�C���ȊO�܂���JPEG�t�@�C���ł����Ă�Exif�̎B�e�������Ȃ��t�@�C���͑Ώۂ��珜���܂��B
''' 
''' Usage:
''' CScript zak.vbs SrcFolder DestFolder
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
	'Note: �g���� hoge.exe src dest
	
	Set fso = WScript.CreateObject("Scripting.FileSystemObject")
	
	'�ݒ�t�@�C���̓ǂݍ���
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
	
	'����t�H���_�̎w��͋֎~
	If srcDir.Path = destDir.Path Then
		WScript.Echo "���t�H���_�Ɛ�t�H���_�́A�قȂ�t�H���_�ɂ��Ă��������B"
		WScript.Quit
	End If
	
	'��t�H���_���̃t�@�C���̖��O�����X�g�Ɋi�[
	Dim destFileNames
	Set destFileNames = WScript.CreateObject("System.Collections.ArrayList")
	Call SetFileNames(destDir, destFileNames)
	
	'��Ɨp���X�g�𐶐�
	Dim workNames
	Set workNames = destFileNames.Clone()
	
	'���t�H���_���̃t�@�C���Ń��[�v
	Dim fl
	For Each fl In srcDir.Files
		'�g���q���擾�BJPEG�摜�iJPG�j�̂݋���
		Dim extension
		extension = fso.GetExtensionName(fl.Path)
		
		If UCase(extension) = "JPG" Then
			Dim exifDateTime
			exifDateTime = GetDateTimeOriginal(fl.Path)
			
			If exifDateTime <> "" Then
				'yyyy:MM:dd HH:mm:ss �� yyyy-MM-dd HH.mm.ss
				Dim dateTimeText
				dateTimeText = Replace(Replace(exifDateTime, ":", "-", 1, 2), ":", ".", 1, 2)
				
				Dim baseName
				baseName = dateTimeText
				
				Dim fileCount
				fileCount = 0
				
				'�ύX��̃t�@�C���������߂�
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
				
				'�t�@�C������ύX���Đ�t�H���_�ɃR�s�[�i�㏑���֎~�j
				Call fso.CopyFile(fl.Path, destFilePath, False)
			End If
		End If
	Next

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


