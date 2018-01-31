#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    writefile.py

    テキストファイル書き込みのサンプルです。

    引数:
      1. 書き込むファイルのパス
"""

import sys
import io

def main():

    # 基本形
    text = "ABCDE\n12345\nあいうえお\n"
    with open(sys.argv[1], "w") as f:
        f.write(text)

    # 文字コードを指定
    with io.open(sys.argv[1], "w", encoding="utf-8") as f:
        f.write(u"abcde\n67890\nあいうえお\n")

    with io.open(sys.argv[1], "w", encoding="cp932") as f:
        f.write(u"abcde\n67890\nあいうえお\n")

# モード
# "r" 読み込み（規定値）
# "w" 書き込み
# "x" 新規作成して書き込み用に開く。すでに存在すれば失敗。
# "a" 書き込み用に開き、既に存在するなら末尾に追加。
# "b" バイナリモード
# "t" テキストモード（規定値）
# + 書き込みと読み込みの両方を可能にする。


if __name__ == "__main__":
    main()
