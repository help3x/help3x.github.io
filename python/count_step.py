#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    count_step.py

    ファイルの行数を数えます。

    引数:
      1. 対象フォルダ
"""

import os

def find_all_files(directory):
    for root, dirs, files in os.walk(directory):    # generator object が返ってきた
        yield root                                  # ここで一度 root の値を返す
        for file in files:                          # 返ってきたらここから再開
            yield os.path.join(root, file)          # ファイルのパスでyieldする


def main():
    import sys
    cnt_dict = {}
    for file in find_all_files(sys.argv[1]):
        # print file
        if os.path.isfile(file):
            # VB6向け
            # base, ext = os.path.splitext(file)
            # if ext.lower() == ".frm" or ext.lower() == ".bas":
            #     cnt_dict[file] = sum(1 for line in open(file, "r"))

            # ファイルであれば何でもカウント
            cnt_dict[file] = sum(1 for line in open(file, "r"))

    write_content = ""
    for key, value in cnt_dict.items():
        write_content += "{0}\t{1:d}\n".format(key, value)

    with open("C:\\Work\\step-count.txt", "w") as f:
        f.write(write_content)


if __name__ == "__main__":
    main()
