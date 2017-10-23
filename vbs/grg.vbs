''' 
''' �X�N���v�g�̎��s�ɂ� ImageMagicK ���K�v�ł��B
''' 
Option Explicit

Dim fso
Dim srcDir
Dim myConfig


'���C���������s
Call Main()


Set srcDir = Nothing
Set fso = Nothing


'''
''' �X�N���v�g�̃G���g���[�|�C���g�ł��B
'''
Sub Main
	'Note: �g���� hoge.exe src
	
	Set fso = WScript.CreateObject("Scripting.FileSystemObject")
	
	'�ݒ�t�@�C���̓ǂݍ���
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
		'�g���q���擾�BJPEG�摜�iJPG�j�̂݋���
		Dim extension
		extension = fso.GetExtensionName(fl.Path)
		
		If UCase(extension) = "JPG" Then
			Dim exifDateTime
			exifDateTime = GetDateTimeOriginal(fl.Path)
			
			If exifDateTime <> "" Then
				'yyyy:MM:dd HH:mm:ss �� yyyy-MM-dd HH:mm:ss
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
''' �R�}���h���C���������擾���܂��B
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


