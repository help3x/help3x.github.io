'================================================================================
' VBScript��TryCatch���ɃG���[�n���h�����O����T���v��
'================================================================================
Option Explicit


Call Main()


'''
''' �X�N���v�g�̃G���g���[�|�C���g�ł��B
'''
Sub Main()
	Call Catch()

	Dim resultCode
	resultCode = Err.Number		'Catch�v���V�[�W���ŃG���[�����������ǂ������ׂ�

	If Err.Number <> 0 Then
		'�ُ�I��
		WScript.Echo Err.Number & ": " & Err.Description & vbCrLf & Err.Source
	Else
		'����I��
	End If

	WScript.Quit resultCode
End Sub


Sub Try()
	'
	'TODO: �����ɏ���������
	'
	Dim a
	a = 1 / 0				'�����Ƀ[�����Z�G���[�𔭐�������B
End Sub


Sub Catch()
	On Error Resume Next	'�����̃v���V�[�W�����ł̂݃G���[�𖳎�����B
	Call Try()				'�����Try�v���V�[�W���ŉ����G���[���������Ă����̂܂܏����͑��s����B
End Sub


