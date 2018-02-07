#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
    json_ld_reader.py

    json_ldを読み込みます。
"""

import json


class JsonLdReader:

    def __init__(self, path):
        self.path = path

    def read(self):

        read_file = None
        with open(self.path, "r") as f:
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



def main():
    import sys
    import json_ld_reader
    reader = json_ld_reader.JsonLdReader(sys.argv[1])
    print(reader.read())



if __name__ == "__main__":
    main()
