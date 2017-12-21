using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using YamlDotNet.RepresentationModel;
using RazorEngine;
using RazorEngine.Templating;

namespace Bld
{
	/// <summary>
	/// 
	/// </summary>
	public class Builder
	{
		private DirectoryInfo HomeDi;
		private DirectoryInfo InputDi;
        private DirectoryInfo OutputDi;
		private IEnumerable<DirectoryInfo> IgnoreDiList;
        private Dictionary<int, StringBuilder> convertedDict;
		private IDictionary<int, MyContent> MarkdownFiles;
        private IList<string> excludeDirNames = 
            new List<string>()
            {
                "css",
                "script",
                "template"
            };
		
        private int pandocStartedCount;
        private int pandocExitedCount;
        private bool pandocExited;
        private int elapsedTime;

		/// <summary>
		/// 
		/// </summary>
		public Builder(DirectoryInfo homeDi)
		{
			if (homeDi == null)
			{
				throw new Exception("ホームディレクトリを指定してください。");
			}
			this.HomeDi = homeDi;
		}

		/// <summary>
		/// 
		/// </summary>
		public void Build()
		{
			this.InputDi = new DirectoryInfo(Path.Combine(this.HomeDi.FullName, "input"));
			if (! this.InputDi.Exists)
			{
				Console.WriteLine("ホームフォルダ配下に入力ファイルが存在しません。");
				return;
			}
			
			this.OutputDi = new DirectoryInfo(Path.Combine(this.HomeDi.FullName, "output"));
			if (this.OutputDi.Exists)
			{
				// フォルダが存在したら一度消して作り直す
				this.OutputDi.Delete(true);
				this.OutputDi.Create();
			}
			else
			{
				// フォルダが存在しなければ作る
				this.OutputDi.Create();
			}
			
			// 除外フォルダリストを作成
			var ignoreDirList = new List<DirectoryInfo>();
			foreach (var dirName in this.excludeDirNames)
			{
				var workDi = new DirectoryInfo(Path.Combine(this.InputDi.FullName, dirName));
				if (workDi.Exists)
				{
					ignoreDirList.Add(workDi);
				}
			}
			this.IgnoreDiList = ignoreDirList;

			// TODO: とりあえずここでインスタンス化
			convertedDict = new Dictionary<int, StringBuilder>();
			this.MarkdownFiles = new Dictionary<int, MyContent>();

			// Pandocによる変換が完了するまで待機するための変数を初期化
			pandocStartedCount = 0;
			pandocExitedCount = 0;
			pandocExited = false;
			elapsedTime = 0;

			// 生成
			Generate(this.InputDi);

			// すべてのプロセスが終了するまで待つ
			// ただし、待つのは30秒までとする
			while (! pandocExited)
			{
				elapsedTime += 500;
				if (elapsedTime > 30000)
				{
					break;
				}
				Thread.Sleep(500);
			}

			return;

			// // CSSファイルを読み込む
			// //
			// var rawCss = GetCssString();
			// var escapedCss = string.Empty;
			// if (! string.IsNullOrEmpty(rawCss))
			// {
			// 	escapedCss = rawCss.Replace("\"", "\\\"").Replace("\t", " ").Replace("\r\n", "");
			// }
			
			// // テンプレートファイルのパスを取得
			// //
			// var templateFi = GetTemplateFileInfo();
			
			// // 入力フォルダ配下のMarkdownファイルを読み込む
			// pandocStartedCount = 0;
			// pandocExitedCount = 0;
			// pandocExited = false;
			// elapsedTime = 0;
			// foreach (var mdf in this.InputDi.GetFiles("*.md"))
			// {
			// 	try
			// 	{
			// 		var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(mdf.FullName);
					
			// 		var outDir = new DirectoryInfo(Path.Combine(this.OutputDi.FullName, fileNameWithoutExtension));
			// 		if (outDir.Exists)
			// 		{
			// 			outDir.Delete(true);
			// 		}
			// 		outDir.Create();

			// 		YamlMetaData yamlObject = null;
			// 		if (posts.TryGetValue(mdf.FullName, out yamlObject))
			// 		{
			// 			templateFi = GetTemplateFileInfo(yamlObject.Template);
			// 		}

			// 		var argTemplate = string.Empty;
			// 		if (templateFi != null)
			// 		{
			// 			argTemplate = string.Format(" --template=\"{0}\"", templateFi.FullName);
			// 		}
					
			// 		var argFolderName = string.Format(" -V folder-name=\"{0}\"", fileNameWithoutExtension);
					
			// 		var argCustomCss = string.Empty;
			// 		if (! string.IsNullOrEmpty(escapedCss))
			// 		{
			// 			argCustomCss = string.Format(" -V custom-css=\"{0}\"", escapedCss);
			// 		}
					
			// 		var argRecentPosts = string.Empty;
			// 		argRecentPosts  = " -V recent-posts=\"Visual C# Compiler, すなわち CSC を使ってみる\"";
			// 		argRecentPosts += " -V recent-posts=\"2件目\"";

			// 		var psi = new ProcessStartInfo();
			// 		psi.FileName = "pandoc.exe";
			// 		// psi.Arguments = string.Format("-f markdown-auto_identifiers -t html5 -o {0}\\index.html -s {2}{3}{4}{5} {1}",
			// 		//                               outDir.FullName,
			// 		//                               mdf.FullName,
			// 		//                               argTemplate,
			// 		//                               argFolderName,
			// 		//                               argCustomCss,
			// 		//                               argRecentPosts);
			// 		psi.Arguments = string.Format("-f markdown-auto_identifiers -t html5 {0}",
			// 										mdf.FullName);
			// 		// コンソール・ウィンドウを開かない
			// 		psi.CreateNoWindow = true;
					
			// 		// シェル機能を使わない
			// 		// コンソールアプリの場合、シェル機能を使うにしておくとコンソール･ウィンドウが開いてしまうため。
			// 		psi.UseShellExecute = false;
					
			// 		// UseShellExecute を true にしておくと、OSのファイル関連付けに応じてファイルの開き方を決める。
			// 		// たとえば、xlsxであればExcelで開き、txtはメモ帳で開く。exeならそのまま実行する。

			// 		// 標準出力をストリームに書き込む
			// 		psi.RedirectStandardOutput = true;

			// 		// プロセス終了時にイベントを発生させる
			// 		var p = new Process();
			// 		p.Exited += new EventHandler(pandoc_Exited);
			// 		p.EnableRaisingEvents = true;

			// 		// 
			// 		p.OutputDataReceived += pandoc_OutputDataReceived;

			// 		// 起動
			// 		p.StartInfo = psi;
			// 		if (p.Start())
			// 		{
			// 			pandocStartedCount++;
			// 			p.BeginOutputReadLine();
			// 			// WaitForExitを指定すると、おそらく非同期にならない
			// 			// p.WaitForExit();
			// 			// p.CancelOutputRead();
			// 			convertedDict.Add(p.Id, new StringBuilder());
			// 		}
			// 	}
			// 	catch (Exception e)
			// 	{
			// 		Console.WriteLine(mdf.FullName);
			// 		Console.WriteLine(e.ToString());
			// 	}
			// }

			// // すべてのプロセスが終了するまで待つ
			// // ただし、待つのは30秒までとする
			// while (! pandocExited)
			// {
			// 	elapsedTime += 500;
			// 	if (elapsedTime > 30000)
			// 	{
			// 		break;
			// 	}
			// 	Thread.Sleep(500);
			// }
		}

		/// <summary>
		/// 
		/// </summary>
		private void Generate(DirectoryInfo srcDi)
		{
			if (srcDi == null)
			{
				return;
			}

			// 出力フォルダを作成
			DirectoryInfo destDi = null;
			var rp = srcDi.FullName.Replace(this.InputDi.FullName, "");
			if (string.IsNullOrEmpty(rp))
			{
				// ルートフォルダ（inputフォルダ）
				destDi = new DirectoryInfo(this.OutputDi.FullName);
			}
			else
			{
				if (rp.Substring(0, 1) == Path.DirectorySeparatorChar.ToString())
				{
					rp = rp.Substring(1);
				}
				destDi = new DirectoryInfo(Path.Combine(this.OutputDi.FullName, rp));
			}

			// 出力フォルダがなければ作る
			if (! destDi.Exists)
			{
				destDi.Create();
			}

			// 入力フォルダのサブフォルダ
			foreach (var targetDi in srcDi.GetDirectories())
			{
				// 除外フォルダであればスキップ
				if (this.IgnoreDiList.Any(p => p.FullName == targetDi.FullName))
				{
					continue;
				}
				Generate(targetDi);
			}

            // 入力フォルダ配下のファイル
            foreach (var copyFi in srcDi.GetFiles())
            {
				// 入力ファイルの振り分け
				var isMarkdownFile = false;
				var isArticle = false;
				var isPage = false;

				// Markdownかどうか
				var extension = copyFi.Extension;
				if (! string.IsNullOrEmpty(extension) &&
					extension.ToLower() == ".md")
				{
					isMarkdownFile = true;
				}

				// ArticleかPageか
				if (isMarkdownFile)
				{
					var contentInfo = new MyContent()
									  {
										  InputFi = copyFi,
										  Yaml = new YamlMetaData()
									  };

					var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(copyFi.FullName);
					var r = new Regex(@"(\d{4}\d{2}\d{2})-(.*)", RegexOptions.IgnoreCase);
					var m = r.Match(fileNameWithoutExtension);
					if (m.Success)
					{
						// ファイル名から取得した日付とタイトルが有効であれば Article と判定
						var ymd = ToDateTime(m.Groups[1].Value);
						var title = m.Groups[2].Value;
						if (ymd.HasValue &&
							! string.IsNullOrEmpty(title))
						{
							isArticle = true;
							contentInfo.OutputBaseFolderName = title;
							contentInfo.PostDateFromFileName = ymd;
						}
					}

					// ArticleでなければPageにする
					if (! isArticle)
					{
						var outputFileName = string.Format("{0}.html", fileNameWithoutExtension);
						if (srcDi.GetFiles(outputFileName).Length > 0)
						{
							// TODO: ひとまず標準出力で警告
							Console.WriteLine("Warning: いるからコピーしないよ。" + fileNameWithoutExtension);
						}
						else
						{
							isPage = true;
							contentInfo.OutputFilePath = 
								Path.Combine(destDi.FullName, string.Format("{0}.html", fileNameWithoutExtension));
						}
					}

					// Article または Page と判定されたら変換する
					if (isArticle ||
						isPage)
					{
						try
						{
							// YAMLメタデータを取得
							SetYamlMetaData(contentInfo);

							// Pandocの起動設定
							var psi = new ProcessStartInfo();
							psi.FileName = "pandoc.exe";
							psi.Arguments = string.Format("-f markdown-auto_identifiers -t html5 {0}",
														  contentInfo.InputFi.FullName);
							// コンソール・ウィンドウを開かない
							psi.CreateNoWindow = true;
							
							// シェル機能を使わない
							// コンソールアプリの場合、シェル機能を使うにしておくとコンソール･ウィンドウが開いてしまうため。
							psi.UseShellExecute = false;
							
							// UseShellExecute を true にしておくと、OSのファイル関連付けに応じてファイルの開き方を決める。
							// たとえば、xlsxであればExcelで開き、txtはメモ帳で開く。exeならそのまま実行する。

							// 標準出力をストリームに書き込む
							psi.RedirectStandardOutput = true;

							// プロセス終了時にイベントを発生させる
							var p = new Process();
							p.Exited += new EventHandler(pandoc_Exited);
							p.EnableRaisingEvents = true;

							// 
							p.OutputDataReceived += pandoc_OutputDataReceived;

							// 起動
							p.StartInfo = psi;
							if (p.Start())
							{
								pandocStartedCount++;
								p.BeginOutputReadLine();
								// WaitForExitを指定すると、おそらく非同期にならない
								// p.WaitForExit();
								// p.CancelOutputRead();
								convertedDict.Add(p.Id, new StringBuilder());
								this.MarkdownFiles.Add(p.Id, contentInfo);
							}
						}
						catch (Exception ex)
						{
							Console.WriteLine(contentInfo.InputFi.FullName);
							Console.WriteLine(ex.ToString());
						}
					}
				}
				else
				{
                	copyFi.CopyTo(Path.Combine(destDi.FullName, copyFi.Name));
				}
            }
		}

		/// <summary>
		/// 
		/// </summary>
        private void pandoc_Exited(object sender, EventArgs e)
        {
            try
            {
				int processId;

                var prcs = sender as Process;
                if (prcs != null)
                {
					// 使い終わったプロセスを破棄
					processId = prcs.Id;
                    Console.WriteLine(processId + ": Disposed.");
                    prcs.Dispose();

					// 変換結果をファイルに出力
					MyContent inf;
					if (MarkdownFiles.TryGetValue(processId, out inf))
					{
						CreateFile(inf);
					}
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
			finally
			{
				// 変換完了
                pandocExitedCount++;
                if (pandocStartedCount >= pandocExitedCount)
                {
                    pandocExited = true;
                }
			}
        }

		/// <summary>
		/// 
		/// </summary>
        private void pandoc_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            try
            {
                var prcs = sender as Process;
                if (prcs == null)
                {
                    Console.WriteLine(sender.GetType());
                    return;
                }

				MyContent inf;
				if (this.MarkdownFiles.TryGetValue(prcs.Id, out inf))
				{
					if (inf.ConvertedData == null)
					{
						inf.ConvertedData = new StringBuilder();
					}
					inf.ConvertedData.AppendLine(e.Data);
				}
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

		/// <summary>
		/// Markdownファイルに定義されたYAMLメタデータを格納します。
		/// </summary>
		private void SetYamlMetaData(MyContent inf)
		{
			if (inf == null ||
				inf.InputFi == null ||
				! inf.InputFi.Exists)
			{
				return;
			}

			var fi = inf.InputFi;

			// YAMLフロントメーターを読み取る
			var yamlSetting = new StringBuilder();
			using (var fs = fi.Open(FileMode.Open, FileAccess.Read))
			{
				using (var reader = new StreamReader(fs))
				{
					var canRead = false;
					while (reader.Peek() >= 0)
					{
						var readText = reader.ReadLine();
						if (! string.IsNullOrEmpty(readText) &&
							readText.StartsWith("---"))
						{
							if (canRead)
							{
								// 読み込み許可状態であれば終了
								break;
							}
							else
							{
								// 読み込み禁止状態であれば次の行から読み取る
								canRead = true;
								continue;
							}
						}
						
						if (canRead)
						{
							yamlSetting.AppendLine(readText);
						}
					}
				}
			}

			if (yamlSetting.Length == 0)
			{
				return;
			}

			// 読み込んだYAMLを解析する
			var yamlObject = new YamlMetaData();
			try
			{
				using (var reader = new StringReader(yamlSetting.ToString()))
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
								yamlObject.Template = text;
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

			inf.Yaml = yamlObject;
		}

		/// <summary>
		/// 
		/// </summary>
		private void CreateFile(MyContent inf)
		{
			if (inf.ConvertedData != null &&
				! string.IsNullOrEmpty(inf.ConvertedData.ToString()))
			{
				Console.WriteLine(inf.ConvertedData.ToString());
			}
		}

		/// <summary>
		/// 
		/// </summary>
        private string GetCssString()
        {
            var cssDirInfo = new DirectoryInfo(Path.Combine(this.InputDi.FullName, "css"));
            if (! cssDirInfo.Exists)
            {
                return string.Empty;
            }
            
            StringBuilder sb = new StringBuilder();
            var files = cssDirInfo.GetFiles();
            for (var i = 0; i < files.Length; i++)
            {
                var file = files[i];
                // min を使うので通常版は除く
                if (file.Name == "normalize.css")
                {
                    continue;
                }
                // TODO: OpenText()ってメソッドでもいけるのでは？
                using (var fs = file.OpenRead())
                {
                    using (var reader = new StreamReader(fs, System.Text.Encoding.UTF8))
                    {
                        sb.Append(reader.ReadToEnd());
                    }
                }
            }
            
            return sb.ToString();
        }
        
		/// <summary>
		/// 
		/// </summary>
        private FileInfo GetTemplateFileInfo()
        {
            var templateDi = new DirectoryInfo(Path.Combine(this.InputDi.FullName, "template"));
            if (! templateDi.Exists)
            {
                return null;
            }
            
            var defaultTemplateFi =
                templateDi.GetFiles().Where(p => p.Name.ToLower().StartsWith("default."))
                                     .FirstOrDefault();
            
            return defaultTemplateFi;
        }

		/// <summary>
		/// 
		/// </summary>
        private FileInfo GetTemplateFileInfo(string fileName)
        {
            var templateDi = new DirectoryInfo(Path.Combine(this.InputDi.FullName, "template"));
            if (! templateDi.Exists)
            {
                return null;
            }
            
            if (string.IsNullOrEmpty(fileName))
            {
                return GetTemplateFileInfo();
            }

            var templateFi = new FileInfo(Path.Combine(templateDi.FullName, fileName));
            if (! templateFi.Exists)
            {
                return GetTemplateFileInfo();
            }
            
            return templateFi;
        }

		// /// <summary>
		// /// 
		// /// </summary>
        // private void copyDirectory(string src, string dest)
        // {
        //     if (string.IsNullOrEmpty(src) ||
        //         string.IsNullOrEmpty(dest))
        //     {
        //         return;
        //     }

        //     copyDirectory(
        //         new DirectoryInfo(src),
        //         new DirectoryInfo(dest)
        //     );
        // }
        
		// /// <summary>
		// /// 
		// /// </summary>
        // private void copyDirectory(DirectoryInfo srcDi, DirectoryInfo destDi)
        // {
        //     if (srcDi == null ||
        //         destDi == null)
        //     {
        //         return;
        //     }
            
        //     if (! srcDi.Exists)
        //     {
        //         return;
        //     }
            
        //     if (! destDi.Exists)
        //     {
        //         destDi.Create();
        //     }
            
        //     // フォルダ配下のファイルをすべてコピー
        //     foreach (var copyFi in srcDi.GetFiles())
        //     {
        //         copyFi.CopyTo(Path.Combine(destDi.FullName, copyFi.Name));
        //     }
            
        //     // サブフォルダもコピー
        //     foreach (var targetDi in srcDi.GetDirectories())
        //     {
        //         copyDirectory(targetDi,
        //                       new DirectoryInfo(Path.Combine(destDi.FullName, targetDi.Name)));
        //     }
        // }

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
