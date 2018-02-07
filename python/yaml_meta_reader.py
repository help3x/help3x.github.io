#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    yaml_meta_reader.py

    ファイルのYAMLメタデータブロックを読み込み、文字列で返します。
"""

class YamlMetaReader:

    def __init__(self, path):
        self.path = path

    #
    # YAMLメタデータブロックを読み込み、文字列で返します。
    #
    def read(self):
        read_file = None
        with open(self.path, "r") as f:
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
