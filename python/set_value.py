#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    set_value.py

    JSON-LDから情報を取得して、YAMLメタデータブロックに設定します。

    引数:
      1. 対象ファイル
"""

import re
import sys
import json
import dateutil.parser
# import os
# import tempfile

def main():
    read_file = None

    with open(sys.argv[1], "r") as f:
        read_file = f.readlines()

    cnt = 0
    can_set = False
    json_ld_content = ""
    for line in read_file:
        # 読み取り状態時に、scriptの閉じタグに達したら読み取り終了
        if can_set:
            if line.find('</script>') != -1:
                can_set = False
                cnt += 1
        
        if can_set:
            json_ld_content += line
        
        # scriptの開始タグであれば読み取り開始
        if line.find('<script type="application/ld+json">') != -1:
            if cnt == 0:
                can_set = True
    
    # 読み取ったJSON文字列をパース
    if len(json_ld_content) > 0:
        parsed_json = json.loads(json_ld_content)
        print(parsed_json)
        print(dateutil.parser.parse(parsed_json["datePublished"]))
        print(dateutil.parser.parse(parsed_json["dateModified"]))

#     m = re.match('<script type="application/ld+json">', read_file, flags=re.DOTALL)
#     if m:
#       print(m.group(0))
#     else:
#       print("Not match.")

#     css_content = None
#     with open(sys.argv[3], "r") as f:
#         css_content = f.read()
# 
#     write_contents = ""
#     try:
#         read_file = open(sys.argv[1], 'r')
#         table_class = ""
#         for line in read_file:
#             if line.find(sys.argv[2]) != -1:
#                 line = re.sub(sys.argv[2], css_content, line)
#             
#             match = re.match('<table.*', line)
#             if match:
#                 # テーブルに自動で追加されたstyle属性を削除
#                 line = re.sub('(<table)( style="(.*?)")', '\g<1>', line)
#                 
#                 if table_class:
#                     line = re.sub('(<table)(.*?)(>)', '\g<1>\g<2>' + table_class + '\g<3>', line)
#                     table_class = ""
#             
#             match = re.match('<!-- *( class *= *"(.*?)")', line)
#             if match:
#                 table_class = match.group(1)
#             else:
#                 table_class = ""
#             
#             # テーブルの列幅の指定も削除
#             line = re.sub('</*colgroup>[\r|\n|\r\n]', '', line)
#             line = re.sub('<col(.*?)/>[\r|\n|\r\n]', '', line)
#             
#             # テーブルの行に自動で追加されたクラスを削除
#             line = re.sub('<tr( class="(header|odd|even)"?)>', "<tr>", line)
#             
#             # img 要素の閉じタグを消す
#             line = re.sub("(<img(.*?)) */(>)', '\g<1>\g<3>', line)
#             # AMP HTML 向け img 要素を変換
#             line = re.sub("<img ", "<amp-img ", line)
#             # TODO: amp-imgの閉じタグを追加
#             
#             write_contents += line
#     finally:
#         read_file.close()
# 
#     # Note:
#     #   ・既定だとバイナリモード（w+b）になるので、テキストモード（w+t）を指定する。
#     #   ・一時ファイルのクローズと同時に削除されてしまうため、delete=Falseを指定して削除されないようにする。
#     temp_file = None
#     with tempfile.NamedTemporaryFile(mode="w+t", delete=False) as f:
#         temp_file = f.name
#         f.write(write_contents)
#     
#     # 一時ファイルの名前を正規のファイル名にリネーム
#     if os.path.isfile(sys.argv[1]) and os.path.isfile(temp_file):
#         os.remove(sys.argv[1])
#         os.rename(temp_file, sys.argv[1])

    sys.exit(0)


if __name__ == "__main__":
    main()
