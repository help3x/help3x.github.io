@echo off

rem ----------------------------------------
rem VC# Compiler���g�����R���p�C��
rem ----------------------------------------

rem �ϐ��ݒ�
rem set HOGE="VALUE"

rem �o�b�`�t�@�C�������݂���t�H���_���J�����g�ɂ���
rem pushd %0\..

rem �R���p�C��
csc /platform:x86 /target:exe /codepage:65001 /r:YamlDotNet.dll /r:System.Web.Razor.dll /r:RazorEngine.dll CSharpCsc2nd.cs Builder.cs YamlMetaData.cs MyContent.cs

rem �I��
