using System;
using System.Collections.Generic;

namespace Bld
{
    /// <summary>
    /// Yamlメタデータブロックの内容を保持します。
    /// </summary>
    public class YamlMetaData
    {
        /// <summary>
        /// 言語
        /// </summary>
        public string Lang { get; set; }

        /// <summary>
        /// ページタイトル
        /// </summary>
        public string PageTitle { get; set; }

        /// <summary>
        /// テンプレートファイル名
        /// </summary>
        public string TemplateFileName { get; set; }

        /// <summary>
        /// 作成日時
        /// </summary>
        public DateTime? CreatedAt { get; set; }

        /// <summary>
        /// 更新日時
        /// </summary>
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// カテゴリ
        /// </summary>
        public IEnumerable<string> Categories { get; set; }

        /// <summary>
        /// タグ
        /// </summary>
        public IEnumerable<string> Tags { get; set; }
    }
}
