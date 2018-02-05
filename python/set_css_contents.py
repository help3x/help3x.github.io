#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    set_css_contents.py

    ファイル内の置換文字列を、指定したファイルの内容に置き換えます。

    引数:
      1. 置換文字列が設定されたファイル
      2. 置換文字列
      3. 置換後の値が書き込まれたファイル
"""

import re
import sys
import os
import tempfile

def main():
    read_file = None

    css_content = None
    with open(sys.argv[3], "r") as f:
        css_content = f.read()

    write_contents = ""
    try:
        read_file = open(sys.argv[1], 'r')
        table_class = ""
        for line in read_file:
            if line.find(sys.argv[2]) != -1:
                line = re.sub(sys.argv[2], css_content, line)
            
            match = re.match('<table.*', line)
            if match:
                # テーブルに自動で追加されたstyle属性を削除
                line = re.sub('(<table)( style="(.*?)")', '\g<1>', line)
                
                if table_class:
                    line = re.sub('(<table)(.*?)(>)', '\g<1>\g<2>' + table_class + '\g<3>', line)
                    table_class = ""
            
            match = re.match('<!-- *( class *= *"(.*?)")', line)
            if match:
                table_class = match.group(1)
            else:
                table_class = ""
            
            # テーブルの列幅の指定も削除
            line = re.sub('</*colgroup>[\r|\n|\r\n]', '', line)
            line = re.sub('<col(.*?)/>[\r|\n|\r\n]', '', line)
            
            # テーブルの行に自動で追加されたクラスを削除
            line = re.sub('<tr( class="(header|odd|even)"?)>', "<tr>", line)
            
            # img 要素の閉じタグを消す
            line = re.sub("(<img(.*?)) */(>)', '\g<1>\g<3>', line)
            # AMP HTML 向け img 要素を変換
            line = re.sub("<img ", "<amp-img ", line)
            # TODO: amp-imgの閉じタグを追加
            
            write_contents += line
    finally:
        read_file.close()

    # Note:
    #   ・既定だとバイナリモード（w+b）になるので、テキストモード（w+t）を指定する。
    #   ・一時ファイルのクローズと同時に削除されてしまうため、delete=Falseを指定して削除されないようにする。
    temp_file = None
    with tempfile.NamedTemporaryFile(mode="w+t", delete=False) as f:
        temp_file = f.name
        f.write(write_contents)
    
    # 一時ファイルの名前を正規のファイル名にリネーム
    if os.path.isfile(sys.argv[1]) and os.path.isfile(temp_file):
        os.remove(sys.argv[1])
        os.rename(temp_file, sys.argv[1])

    sys.exit(0)


if __name__ == "__main__":
    main()
