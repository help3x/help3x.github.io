@echo off

rem ----------------------------------------
rem ImageMagick�ɂ��摜����
rem ----------------------------------------

rem �ϐ��ݒ�
set IMK="C:\Users\q40061wa\Downloads\ImageMagick\ImageMagick-7.0.6-0-portable-Q16-x86"

rem �o�b�`�t�@�C�������݂���t�H���_���J�����g�ɂ���
pushd %0\..

rem   -size 2048x1536
rem   -gravity center ^


%IMK%\convert.exe ^
  -size 512 ^
  -pointsize 48 ^
  label:"Photographed by J. Sem" ^
  img01-2.jpg

%IMK%\convert.exe ^
  -size 100x60 ^
  xc:skyblue ^
  -fill white ^
  -stroke black ^
  -font Times-New-Roman ^
  -pointsize 48 ^
  -gravity center ^
  -draw "text 0,0 \"Hello\"" ^
  img01-3.jpg

%IMK%\convert.exe ^
  -size 320x100 ^
  xc:lightblue ^
  -font "Yu-Gothic-Medium-&-Yu-Gothic-UI-Regular" ^
  -pointsize 72 ^
  -fill white ^
  -stroke black ^
  -strokewidth 3 ^
  -annotate +25+65 "Hello" ^
  img01-4.jpg

rem �O���f�[�V�����ɂ��� -tile

%IMK%\convert.exe ^
  -size 180x60 ^
  xc:none ^
  -tile gradient:#ffffff-#f8c749 ^
  -pointsize 50 ^
  -stroke #c0c0ff ^
  -strokewidth 2 ^
  -draw "text 0,45 \"Sample\" " ^
  img01-5.png

rem �P�F�h��Ԃ� -fill white

%IMK%\convert.exe ^
  -size 180x60 ^
  xc:none ^
  -fill white ^
  -pointsize 50 ^
  -stroke #c0c0ff ^
  -strokewidth 2 ^
  -draw "text 0,45 \"Sample\" " ^
  img01-6.png

rem convert�ł������ł���炵��

%IMK%\convert.exe ^
  -composite resize.jpg img01-5.png ^
  -gravity SouthEast ^
  -geometry 540x180+20+20 ^
  output.jpg

rem -geometry �d�˂�摜�̈ʒu�����߂�B�w����@�́A�c�̑傫���~���̑傫���~��l�����x���W�{��l�����y���W�v
rem ��L�̏ꍇ�A��l�� -gravity SouthEast �ŉ摜�̉E���B��������20px�̂Ƃ����540x180�̃T�C�Y�Ŕz�u����Ƃ����Ӗ��B

rem composite���g�����@�������̂悤�ł��B

%IMK%\composite.exe ^
  -dissolve 40% ^
  -gravity SouthEast ^
  -geometry 540x+30+30 ^
  img01-5.png ^
  resize.jpg ^
  output2.jpg
