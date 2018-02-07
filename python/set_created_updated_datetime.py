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
import dateutil.parser
import os
import tempfile
import json_ld_reader
import my_module



def main():

    if not os.path.isfile(sys.argv[1]):
        print("file is not found.")
        sys.exit(1)

    # 対象ファイルの親ディレクトリの配下にある
    # Markdownファイルを取得
    parent_directory = os.path.dirname(sys.argv[1])
    articles = my_module.articles_getter(parent_directory)

    target_entry = None
    target_entries = filter(lambda x: os.path.basename(x.file_path) == os.path.basename(sys.argv[1]), articles)
    if len(target_entries) > 0:
        target_entry = target_entries[0]

    if target_entry is None:
        print("target entry is not found.")
        sys.exit(0)

    # 前と後ろの情報を取得
    dict = my_module.get_prev_and_next_link(target_entry, articles)

    # JSON-LDを読み込む
    parsed_json = json_ld_reader.JsonLdReader(sys.argv[1]).read()
    if parsed_json is None:
        print("JSON-LD is not found or invalid.")
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
        print("datePublished is not specified.")
        sys.exit(0)

    # YAMLメタデータブロックを置き換える
    read_file = None
    with open(sys.argv[1], "r") as f:
        read_file = f.readlines()

    has_date_published = False
    has_date_modified = False
    has_display_date_published = False
    has_display_date_modified = False
    has_prev_entry_link = False
    has_prev_entry_name = False
    has_next_entry_link = False
    has_next_entry_name = False

    is_yaml_ended = False
    is_yaml_block = False
    is_yaml_block_end_before = False
    write_content = ""
    for line in read_file:
        # YAMLメタデータブロック終了判定
        if is_yaml_block:
            if line.find('---') == 0:
                is_yaml_block = False
                is_yaml_ended = True
                is_yaml_block_end_before = True
        
        # そのまま書き込むか置換するか
        if is_yaml_block:
            if dict.has_key("prev-entry-link") and dict.has_key("prev-entry-name"):
                if line.find("prev-entry-link") == 0:
                    line = re.sub('^(prev-entry-link:)(.*)', '\g<1> ' + dict["prev-entry-link"], line)
                    has_prev_entry_link = True
                elif line.find("prev-entry-name") == 0:
                    line = re.sub('^(prev-entry-name:)(.*)', '\g<1> ' + dict["prev-entry-name"], line)
                    has_prev_entry_name = True
                
            if dict.has_key("next-entry-link") and dict.has_key("next-entry-name"):
                if line.find("next-entry-link") == 0:
                    line = re.sub('^(next-entry-link:)(.*)', '\g<1> ' + dict["next-entry-link"], line)
                    has_next_entry_link = True
                elif line.find("next-entry-name") == 0:
                    line = re.sub('^(next-entry-name:)(.*)', '\g<1> ' + dict["next-entry-name"], line)
                    has_next_entry_name = True
                
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
                if not has_prev_entry_link and not has_prev_entry_name:
                    if dict.has_key("prev-entry-link") and dict.has_key("prev-entry-name"):
                        write_content += "prev-entry-link: " + dict["prev-entry-link"] + "\n"
                        write_content += "prev-entry-name: " + dict["prev-entry-name"] + "\n"
                
                if not has_next_entry_link and not has_next_entry_name:
                    if dict.has_key("next-entry-link") and dict.has_key("next-entry-name"):
                        write_content += "next-entry-link: " + dict["next-entry-link"] + "\n"
                        write_content += "next-entry-name: " + dict["next-entry-name"] + "\n"
                
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
        if not is_yaml_ended:
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



if __name__ == "__main__":
    main()
