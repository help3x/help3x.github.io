using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Bld
{
    /// <summary>
    /// "article" と "page" の基本クラス
    /// </summary>
    class MyContent
    {
        /// <summary>
        /// 入力ファイル情報
        /// </summary>
        public FileInfo InputFi { get; set; }

        /// <summary>
        /// 出力ファイルパス
        /// </summary>
        public string OutputFilePath { get; set; }

        /// <summary>
        /// 出力フォルダ名
        /// </summary>
        public string OutputBaseFolderName { get; set; }

        /// <summary>
        /// ファイル名から抽出した日付
        /// </summary>
        public DateTime? PostDateFromFileName { get; set; }

        /// <summary>
        /// ファイルに定義されたYAMLメタデータ
        /// </summary>
        public YamlMetaData Yaml { get; set; }

        /// <summary>
        /// 変換結果
        /// </summary>
        public StringBuilder ConvertedData { get; set; }
    }
}
