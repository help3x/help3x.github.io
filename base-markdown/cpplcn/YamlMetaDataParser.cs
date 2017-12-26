using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using YamlDotNet.RepresentationModel;

namespace Bld
{
    /// <summary>
    /// Yamlメタデータブロックの内容を解析します。
    /// </summary>
    public class YamlMetaDataParser
    {
		/// <summary>
		/// 解析結果を保持します。
		/// </summary>
		private IDictionary<string, object> ParsedDict;

		/// <summary>
		/// 
		/// </summary>
		private FileStream InputStream;

		/// <summary>
		/// 
		/// </summary>
		public YamlMetaDataParser(FileStream inputStream)
		{
			this.InputStream = inputStream;
			this.ParsedDict = new Dictionary<string, object>();
		}

		/// <summary>
		/// 
		/// </summary>
		public IDictionary<string, object> Parse()
		{
			if (this.InputStream == null)
			{
				return this.ParsedDict;
			}

			// YAMLメタデータを読み取る
			var yamlText = ReadYamlMetaData();
			if (string.IsNullOrEmpty(yamlText))
			{
				return this.ParsedDict;
			}

			// 読み込んだYAMLメタデータを解析する
			SetParsedYamlMetaData(yamlText);
			
			return this.ParsedDict;
		}

		/// <summary>
		/// ストリームからYAMLメタデータブロックを読み取ります。
		/// </summary>
		private string ReadYamlMetaData()
		{
			var yamlText = new StringBuilder();

			using (var reader = new StreamReader(this.InputStream))
			{
				var canRead = false;
				var linePos = 0;
				var isPrevLineNewLine = false;	// 前の行が空行

				while (reader.Peek() >= 0)
				{
					var readText = reader.ReadLine();
					linePos++;

					if (readText != null)
					{
						if (canRead)
						{
							// 読み込み終了
							if (readText.StartsWith("---"))
							{
								break;
							}

							yamlText.AppendLine(readText);
						}
						else
						{
							if (readText.StartsWith("---"))
							{
								// 先頭行からの読み込み、または前の行が空行であれば、
								// YAMLメタデータブロックの開始とみなす
								if (linePos == 1 || isPrevLineNewLine)
								{
									canRead = true;
									isPrevLineNewLine = false;
									continue;
								}
								else
								{
									isPrevLineNewLine = false;
								}
							}
							else if (readText.Length == 0)
							{
								isPrevLineNewLine = true;
							}
							else
							{
								isPrevLineNewLine = false;
							}
						}
					}
				}
			}

			return yamlText.ToString();
		}

		/// <summary>
		/// 解析します。
		/// </summary>
		private void SetParsedYamlMetaData(string yamlText)
		{
			var yamlObject = new YamlMetaData();
			try
			{
				using (var reader = new StringReader(yamlText))
				{
					var yaml = new YamlStream();
					yaml.Load(reader);
					
					var mapping = (YamlMappingNode)yaml.Documents[0].RootNode;
					foreach (var entry in mapping.Children)
					{
						var key = ((YamlScalarNode)entry.Key).Value;
						var text = string.Empty;

						if (string.IsNullOrEmpty(key))
						{
							continue;
						}

						switch (key.ToLower())
						{
							case "lang":
								text = ((YamlScalarNode)entry.Value).Value;
								yamlObject.Lang = text;
								break;
							case "pagetitle":
								text = ((YamlScalarNode)entry.Value).Value;
								yamlObject.PageTitle = text;
								break;
							case "template":
								text = ((YamlScalarNode)entry.Value).Value;
								yamlObject.TemplateFileName = text;
								break;
							case "created-at":
								text = ((YamlScalarNode)entry.Value).Value;
								yamlObject.CreatedAt = ToDateTime(text);
								break;
							case "updated-at":
								text = ((YamlScalarNode)entry.Value).Value;
								yamlObject.UpdatedAt = ToDateTime(text);
								break;
							case "categories":
								{
									var list = new List<string>();
									foreach (YamlScalarNode item in (YamlSequenceNode)entry.Value)
									{
										if (! list.Contains(item.Value))
										{
											list.Add(item.Value);
										}
									}
									if (list.Count() > 0)
									{
										yamlObject.Categories = list;
									}
								}
								break;
							case "tags":
								{
									var list = new List<string>();
									foreach (YamlScalarNode item in (YamlSequenceNode)entry.Value)
									{
										if (! list.Contains(item.Value))
										{
											list.Add(item.Value);
										}
									}
									if (list.Count() > 0)
									{
										yamlObject.Tags = list;
									}
								}
								break;
							default:
								break;
						}
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
			}
		}
		
		/// <summary>
		/// 日付文字列を日付型に変換します。
		/// </summary>
        private DateTime? ToDateTime(string dateString)
        {
            var formats = new List<string>()
            {
                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                "yyyy-MM-dd'T'HH:mm:ss",
                "yyyy-MM-dd HH:mm:ss",
                "yyyy-MM-dd",
				"yyyyMMdd"
            };

            DateTime? parsedDt = null;
            foreach (var format in formats)
            {
                DateTime tempDt;
                var result = 
                    DateTime.TryParseExact(dateString,
                                        format,
                                        System.Globalization.CultureInfo.InvariantCulture,
                                        System.Globalization.DateTimeStyles.None,
                                        out tempDt);
                if (result)
                {
                    parsedDt = tempDt;
                    break;
                }
            }

            return parsedDt;
        }
	}
}
