#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    rename.py

    フォルダ内のファイルをリネームします。

    引数:
      1. 対象フォルダ
"""

import re
import sys
import json
import dateutil.parser
import os
import tempfile
import glob
import operator
import datetime
import pytz
import yaml_meta_reader



def articles_getter(directory_path):
    if directory_path is None or
       len(directory_path) == 0:
        return []

    markdown_entries = []

    flist = glob.glob(directory_path)
    for path in flist:
        name, ext = os.path.splitext(path)
        if ext == ".md":
            markdown_entries.append(Entry(path))

    # Note:
    #   降順ソートするときは、reverse引数にTrueを指定する
    #print(sorted(entries, key=operator.attrgetter("posted_at"), reverse=True))

    # ファイル名の先頭が日付であるものを抽出
    articles = sorted(filter(lambda x: x.posted_at is not None, markdown_entries), \
                      key=operator.attrgetter("posted_at"))

    return articles



def main():
    markdown_entries = []

    if len(sys.argv) < 2:
        return

    flist = glob.glob("C:\\KitoWork\\github\\help3x.github.io\\base-markdown\\home\\input\\*.md")
    for path in flist:
        markdown_entries.append(Entry(path))

    # Note:
    #   降順ソートするときは、reverse引数にTrueを指定する
    #print(sorted(entries, key=operator.attrgetter("posted_at"), reverse=True))

    # ファイル名の先頭が日付であるものを抽出
    articles = sorted(filter(lambda x: x.posted_at is not None, markdown_entries), \
                      key=operator.attrgetter("posted_at"))

    target = filter(lambda x: os.path.basename(x.file_path) == os.path.basename(sys.argv[1]), markdown_entries)
    if len(target) == 0:
        return

    tested_at = pytz.timezone("Asia/Tokyo").localize(datetime.datetime(2017, 5, 4, 14, 49))
    prev_list = sorted(filter(lambda x: x.posted_at < tested_at, articles), \
                       key=operator.attrgetter("posted_at"), \
                       reverse=True)

    next_list = sorted(filter(lambda x: x.posted_at > tested_at, articles), \
                       key=operator.attrgetter("posted_at"))

    prev_entry = None
    if len(prev_list) > 0:
        prev_entry = prev_list[0]

    next_entry = None
    if len(next_list) > 0:
        next_entry = next_list[0]

    list = []

    if prev_entry is not None:
        entry_title = get_pagetitle(prev_entry.file_path)
        if entry_title is not None and len(entry_title) > 0:
            list.append("prev-entry-link: " + prev_entry.url)
            list.append("prev-entry-name: " + entry_title)
    
    if next_entry is not None:
        entry_title = get_pagetitle(next_entry.file_path)
        if entry_title is not None and len(entry_title) > 0:
            list.append("next-entry-link: " + prev_entry.url)
            list.append("next-entry-name: " + entry_title)

    print(list)

###     read_file = None
### 
### #     yaml_content = read_yaml_string(sys.argv[1])
### #     if yaml_content is None or len(yaml_content) == 0:
### #         sys.exit(0)
### 
### #     with open(sys.argv[1], "r") as f:
### #         read_file = f.readlines()
### # 
### #     # JSON-LDを読み込む
### #     cnt = 0
### #     can_set = False
### #     json_ld_content = ""
### #     for line in read_file:
### #         # 読み取り状態時に、scriptの閉じタグに達したら読み取り終了
### #         if can_set:
### #             if line.find('</script>') != -1:
### #                 can_set = False
### #                 cnt += 1
### #         
### #         if can_set:
### #             json_ld_content += line
### #         
### #         # scriptの開始タグであれば読み取り開始
### #         if line.find('<script type="application/ld+json">') != -1:
### #             if cnt == 0:
### #                 can_set = True
###     
###     # JSON-LDを読み込む
###     parsed_json = read_json_ld(sys.argv[1])
###     if parsed_json is None:
###         sys.exit(0)
###     
###     # 読み取ったJSONから値を取得
###     date_published = None
###     if parsed_json.has_key("datePublished"):
###         try:
###             date_published = dateutil.parser.parse(parsed_json["datePublished"])
###         except:
###             date_published = None
###     
###     date_modified = None
###     if parsed_json.has_key("dateModified"):
###         try:
###             date_modified = dateutil.parser.parse(parsed_json["dateModified"])
###         except:
###             date_modified = None
### 
###     if date_published is None:
###         sys.exit(0)
### 
###     # YAMLメタデータブロックを置き換える
###     read_file = None
###     with open(sys.argv[1], "r") as f:
###         read_file = f.readlines()
### 
###     has_date_published = False
###     has_date_modified = False
###     has_display_date_published = False
###     has_display_date_modified = False
### 
###     is_yaml_block = False
###     is_yaml_block_end_before = False
###     write_content = ""
###     for line in read_file:
###         # YAMLメタデータブロック終了判定
###         if is_yaml_block:
###             if line.find('---') == 0:
###                 is_yaml_block = False
###                 is_yaml_block_end_before = True
###         
###         # そのまま書き込むか置換するか
###         if is_yaml_block:
###             if date_published is not None:
###                 # 作成日時
###                 m = re.match('^created-at:', line)
###                 if m:
###                     line = re.sub('^(created-at:)(.*)', '\g<1> ' + date_published.isoformat(), line)
###                     has_date_published = True
###                 
###                 # 作成日時（表示用）
###                 m = re.match('^display-created-at:', line)
###                 if m:
###                     line = re.sub('^(display-created-at:)(.*)', '\g<1> ' + "{0:%Y.%m.%d}".format(date_published), line)
###                     has_display_date_published = True
###             
###             if date_modified is not None:
###                 # 更新日時
###                 m = re.match('^updated-at:', line)
###                 if m:
###                     if "{0:%Y%m%d}".format(date_published) != "{0:%Y%m%d}".format(date_modified):
###                         line = re.sub('^(updated-at:)(.*)', '\g<1> ' + date_modified.isoformat(), line)
###                         has_date_modified = True
###                     else:
###                         line = None
###                 
###                 # 更新日時（表示用）
###                 if line is not None:
###                     m = re.match('^display-updated-at:', line)
###                     if m:
###                         if "{0:%Y%m%d}".format(date_published) != "{0:%Y%m%d}".format(date_modified):
###                             line = re.sub('^(display-updated-at:)(.*)', '\g<1> ' + "{0:%Y.%m.%d}".format(date_modified), line)
###                             has_display_date_modified = True
###                         else:
###                             line = None
### 
###             if line is not None:
###                 write_content += line
### 
###         else:
###             if is_yaml_block_end_before:
###                 if date_published is not None:
###                     if not has_date_published:
###                         write_content += "created-at: " + date_published.isoformat() + "\n"
###                     if not has_display_date_published:
###                         write_content += "display-created-at: " + "{0:%Y.%m.%d}".format(date_published) + "\n"
### 
###                 if date_modified is not None:
###                     if "{0:%Y%m%d}".format(date_published) != "{0:%Y%m%d}".format(date_modified):
###                         if not has_date_modified:
###                             write_content += "updated-at: " + date_modified.isoformat() + "\n"
###                         if not has_display_date_modified:
###                             write_content += "display-updated-at: " + "{0:%Y.%m.%d}".format(date_modified) + "\n"
### 
###                 is_yaml_block_end_before = False
###             
###             write_content += line
###         
###         # YAMLメタデータブロック開始判定
###         if not is_yaml_block:
###             if line.find('---') == 0:
###                 is_yaml_block = True
### 
###     # 一時ファイルに書き込み
###     temp_file = None
###     with tempfile.NamedTemporaryFile(mode="w+t", delete=False) as f:
###         temp_file = f.name
###         f.write(write_content)
###     
###     # 一時ファイルの名前を正規のファイル名にリネーム
###     if os.path.isfile(sys.argv[1]) and os.path.isfile(temp_file):
###         os.remove(sys.argv[1])
###         os.rename(temp_file, sys.argv[1])

    # 終了
    sys.exit(0)



def get_pagetitle(path):
    yaml_content = yaml_meta_reader.YamlMetaReader(path).read()
    if yaml_content is None or \
       len(yaml_content) == 0:
        return None

    entry_title = ""
    for line in yaml_content.split("\n"):
        m = re.match("pagetitle: *(.*)", line)
        if m:
            entry_title = m.group(1)
            break

    return entry_title





class Entry:
    def __init__(self, file_path):
        self.file_path = file_path
        self.file_name = os.path.basename(file_path)
        self.parent_directory_name = ""
        self.posted_at = self.__get_posted_date_from_file_name()
        self.title = ""
        self.url = self.__get_url()
        self.url2 = self.__get_url2()

    def __repr__(self):
        return repr((self.file_path, self.file_name, self.posted_at.isoformat()))

    def __get_url(self):
        return "/" + self.parent_directory_name + "/index.html"

    def __get_url2(self):
        return self.url

    def __get_posted_date_from_file_name(self):
        if len(self.file_name) == 0:
            return None

        m = re.match("^(\d{8})_*(\d{4}|\d{6}){0,1}-(.*)\.md", self.file_name)
        if m is None:
            return None

        ds = m.group(1)
        if m.group(2):
            ds += m.group(2)

        if m.group(3):
            self.parent_directory_name = m.group(3)

        format = None
        if len(ds) == 8:
            format = "%Y%m%d"
        elif len(ds) == 12:
            format = "%Y%m%d%H%M"
        elif len(ds) == 14:
            format = "%Y%m%d%H%M%S"

        parsed_value = None
        if format is not None:
            try:
                parsed_value = pytz.timezone("Asia/Tokyo").localize(datetime.datetime.strptime(ds, format))
            except:
                pass
        
        return parsed_value


if __name__ == "__main__":
    main()
