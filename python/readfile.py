#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    readfile.py

    テキストファイル読み込みのサンプルです。

    引数:
      1. 読み込むファイルのパス
"""

import sys

def main():
    # スタイルファイルを読み込み
    with open(sys.argv[1], "r") as f:
        data = f.read()

    print(data)
    print(len(data))


if __name__ == "__main__":
    main()
