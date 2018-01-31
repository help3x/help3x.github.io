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
    #write_file = None
    #temp_file = "temp_file"

    css_content = None
    with open(sys.argv[3], "r") as f:
        css_content = f.read()

    write_contents = ""
    try:
        read_file = open(sys.argv[1], 'r')
        #write_file = open(temp_file, 'w')
        for line in read_file:
            if line.find(sys.argv[2]) != -1:
                line = re.sub(sys.argv[2], css_content, line)
            #write_file.write(line)
            write_contents += line
    finally:
        read_file.close()
        #write_file.close()

    # 既定だとバイナリモード（w+b）になるのでテキストモード（w+t）で作る
    #temp = tempfile.TemporaryFile()
    #temp = tempfile.TemporaryFile(mode="w+t")
    #try:
        #print "temp: ", temp
        #print "temp.name: ", temp.name
    #finally:
        #temp.close()

    # Note: delete=Falseを指定しないとクローズ時に削除される
    temp_file = None
    with tempfile.NamedTemporaryFile(mode="w+t", delete=False) as f:
        temp_file = f.name
        f.write(write_contents)
        
    #with open(temp_file, "w") as f:
    #    f.write(write_contents)

    if os.path.isfile(sys.argv[1]) and os.path.isfile(temp_file):
        os.remove(sys.argv[1])
        os.rename(temp_file, sys.argv[1])

    sys.exit(0)


if __name__ == "__main__":
    main()
