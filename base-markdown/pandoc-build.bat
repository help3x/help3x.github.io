@echo off

rem ----------------------------------------
rem Pandoc�ɂ��Markdown��HTML�̕ϊ�
rem ----------------------------------------

rem �ϐ��ݒ�
rem set HOGE="VALUE"

rem �o�b�`�t�@�C�������݂���t�H���_���J�����g�ɂ���
pushd %0\..

rem �ϊ�
pandoc -f markdown -t html5 -o %2 --data-dir=. --template=my-template -c html5reset-1.6.1.css -c my-style.css -s --self-contained %1

rem �I��
pause