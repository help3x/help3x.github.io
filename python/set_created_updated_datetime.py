#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    set_created_updated_datetime.py

    JSON-LDから情報を取得して、YAMLメタデータブロックに設定します。

    引数:
      1. 対象ファイル
"""

import re
import sys
import json
import dateutil.parser
import os
import tempfile

def main():
    read_file = None

#     yaml_content = read_yaml_string(sys.argv[1])
#     if yaml_content is None or len(yaml_content) == 0:
#         sys.exit(0)

#     with open(sys.argv[1], "r") as f:
#         read_file = f.readlines()
# 
#     # JSON-LDを読み込む
#     cnt = 0
#     can_set = False
#     json_ld_content = ""
#     for line in read_file:
#         # 読み取り状態時に、scriptの閉じタグに達したら読み取り終了
#         if can_set:
#             if line.find('</script>') != -1:
#                 can_set = False
#                 cnt += 1
#         
#         if can_set:
#             json_ld_content += line
#         
#         # scriptの開始タグであれば読み取り開始
#         if line.find('<script type="application/ld+json">') != -1:
#             if cnt == 0:
#                 can_set = True
    
    # JSON-LDを読み込む
    parsed_json = read_json_ld(sys.argv[1])
    if parsed_json is None:
        sys.exit(0)
    
    # 読み取ったJSONから値を取得
    date_published = None
    if parsed_json.has_key("datePublished"):
        try:
            date_published = dateutil.parser.parse(parsed_json["datePublished"])
        except:
            date_published = None
    
    date_modified = None
    if parsed_json.has_key("dateModified"):
        try:
            date_modified = dateutil.parser.parse(parsed_json["dateModified"])
        except:
            date_modified = None

    if date_published is None:
        sys.exit(0)

    # YAMLメタデータブロックを置き換える
    read_file = None
    with open(sys.argv[1], "r") as f:
        read_file = f.readlines()

    has_date_published = False
    has_date_modified = False
    has_display_date_published = False
    has_display_date_modified = False

    is_yaml_block = False
    is_yaml_block_end_before = False
    write_content = ""
    for line in read_file:
        # YAMLメタデータブロック終了判定
        if is_yaml_block:
            if line.find('---') == 0:
                is_yaml_block = False
                is_yaml_block_end_before = True
        
        # そのまま書き込むか置換するか
        if is_yaml_block:
            if date_published is not None:
                # 作成日時
                m = re.match('^created-at:', line)
                if m:
                    line = re.sub('^(created-at:)(.*)', '\g<1> ' + date_published.isoformat(), line)
                    has_date_published = True
                
                # 作成日時（表示用）
                m = re.match('^display-created-at:', line)
                if m:
                    line = re.sub('^(display-created-at:)(.*)', '\g<1> ' + "{0:%Y.%m.%d}".format(date_published), line)
                    has_display_date_published = True
            
            if date_modified is not None:
                # 更新日時
                m = re.match('^updated-at:', line)
                if m:
                    if "{0:%Y%m%d}".format(date_published) != "{0:%Y%m%d}".format(date_modified):
                        line = re.sub('^(updated-at:)(.*)', '\g<1> ' + date_modified.isoformat(), line)
                        has_date_modified = True
                    else:
                        line = None
                
                # 更新日時（表示用）
                if line is not None:
                    m = re.match('^display-updated-at:', line)
                    if m:
                        if "{0:%Y%m%d}".format(date_published) != "{0:%Y%m%d}".format(date_modified):
                            line = re.sub('^(display-updated-at:)(.*)', '\g<1> ' + "{0:%Y.%m.%d}".format(date_modified), line)
                            has_display_date_modified = True
                        else:
                            line = None

            if line is not None:
                write_content += line

        else:
            if is_yaml_block_end_before:
                if date_published is not None:
                    if not has_date_published:
                        write_content += "created-at: " + date_published.isoformat() + "\n"
                    if not has_display_date_published:
                        write_content += "display-created-at: " + "{0:%Y.%m.%d}".format(date_published) + "\n"

                if date_modified is not None:
                    if "{0:%Y%m%d}".format(date_published) != "{0:%Y%m%d}".format(date_modified):
                        if not has_date_modified:
                            write_content += "updated-at: " + date_modified.isoformat() + "\n"
                        if not has_display_date_modified:
                            write_content += "display-updated-at: " + "{0:%Y.%m.%d}".format(date_modified) + "\n"

                is_yaml_block_end_before = False
            
            write_content += line
        
        # YAMLメタデータブロック開始判定
        if not is_yaml_block:
            if line.find('---') == 0:
                is_yaml_block = True

    # 一時ファイルに書き込み
    temp_file = None
    with tempfile.NamedTemporaryFile(mode="w+t", delete=False) as f:
        temp_file = f.name
        f.write(write_content)
    
    # 一時ファイルの名前を正規のファイル名にリネーム
    if os.path.isfile(sys.argv[1]) and os.path.isfile(temp_file):
        os.remove(sys.argv[1])
        os.rename(temp_file, sys.argv[1])

    # 終了
    sys.exit(0)



#
# JSON-LDを読み込みます
#
def read_json_ld(file):

    read_file = None
    with open(file, "r") as f:
        read_file = f.readlines()

    can_set = False
    json_ld_content = ""
    for line in read_file:
        # 読み取り状態時に、scriptの閉じタグに達したら読み取り終了
        if can_set:
            if line.find('</script>') != -1:
                can_set = False
                break
        
        if can_set:
            json_ld_content += line
        
        # scriptの開始タグであれば読み取り開始
        if line.find('<script type="application/ld+json">') != -1:
            can_set = True

    parsed_json = None
    if len(json_ld_content) > 0:
        try:
            parsed_json = json.loads(json_ld_content)
        except:
            parsed_json = None

    return parsed_json



#
# YAMLメタデータブロックを読み込み、文字列で返します。
#
def read_yaml_string(file):
    read_file = None
    with open(file, "r") as f:
        read_file = f.readlines()

    is_started = False
    can_set = False
    can_set2 = False
    temp_content = None
    yaml_content = ""
    for line in read_file:
        # --- で開始、--- に続いて空行なら終了
        if can_set2:
            if len(line) == 0:
                break
            elif line.find("\n") == 0:
                break
            else:
                can_set = True
                can_set2 = False
                yaml_content += temp_content
                temp_content = None
        
        if is_started:
            if line.find('---') == 0:
                can_set = False
                can_set2 = True
                temp_content = line
        
        if can_set:
            yaml_content += line
        
        if not is_started:
            if line.find('---') == 0:
                can_set = True
                is_started = True

    return yaml_content



if __name__ == "__main__":
    main()
