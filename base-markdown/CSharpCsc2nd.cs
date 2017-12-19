using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using YamlDotNet.RepresentationModel;

namespace Program
{
    class Program
    {
        private static DirectoryInfo homeDirInfo;
        private static DirectoryInfo inputDirInfo;
        private static DirectoryInfo outputDirInfo;
        private static int pandocStartedCount;
        private static int pandocExitedCount;
        private static bool pandocExited;
        private static int elapsedTime;
        
        static void Main(string[] args)
        {
            try
            {
                // いずれも実行ファイルの場所ではなく、カレントディレクトリを返してきた
                // Console.WriteLine(System.Environment.CurrentDirectory);
                // Console.WriteLine(System.IO.Directory.GetCurrentDirectory());

                homeDirInfo = null;
                inputDirInfo = null;
                outputDirInfo = null;

                for (var i = 0; i < args.Length; i++)
                {
                    var arg = args[i];
                    
                    if (i == 0)
                    {
                        if (! String.IsNullOrEmpty(arg))
                        {
                            homeDirInfo = new DirectoryInfo(arg);
                        }
                    }
                }

                // foreach (var arg in args)
                // {
                //     Console.WriteLine(arg);
                // }

                if (homeDirInfo == null ||
                    ! homeDirInfo.Exists)
                {
                    Console.WriteLine("ホームフォルダを指定してください。");
                    return;
                }

                inputDirInfo = new DirectoryInfo(Path.Combine(homeDirInfo.FullName, "input"));
                if (! inputDirInfo.Exists)
                {
                    Console.WriteLine("ホームフォルダ配下に入力ファイルが存在しません。");
                    return;
                }
                
                outputDirInfo = new DirectoryInfo(Path.Combine(homeDirInfo.FullName, "output"));
                if (outputDirInfo.Exists)
                {
                    // フォルダが存在したら一度消して作り直す
                    outputDirInfo.Delete(true);
                    outputDirInfo.Create();
                }
                else
                {
                    // フォルダが存在しなければ作る
                    outputDirInfo.Create();
                }
                
                Console.WriteLine(String.Format("ホームフォルダ: {0}", homeDirInfo.FullName));
                
                
                // CSSファイルを読み込む
                //
                var rawCss = GetCssString();
                var escapedCss = string.Empty;
                if (! string.IsNullOrEmpty(rawCss))
                {
                    escapedCss = rawCss.Replace("\"", "\\\"").Replace("\t", " ").Replace("\r\n", "");
                }
                
                // テンプレートファイルのパスを取得
                //
                var templateFi = GetTemplateFileInfo();
                
                // 入力フォルダ配下のMarkdownファイルを読み込む
                pandocStartedCount = 0;
                pandocExitedCount = 0;
                pandocExited = false;
                elapsedTime = 0;
                foreach (var mdf in inputDirInfo.GetFiles("*.md"))
                {
                    try
                    {
                        var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(mdf.FullName);
                        
                        var outDir = new DirectoryInfo(Path.Combine(outputDirInfo.FullName, fileNameWithoutExtension));
                        if (outDir.Exists)
                        {
                            outDir.Delete(true);
                        }
                        outDir.Create();
                        
                        // YAMLフロントメーターを読み取る
                        var yamlSetting = new StringBuilder();
                        using (var fs = mdf.Open(FileMode.Open, FileAccess.Read))
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
                        // 読み込んだYAMLを解析する
                        YamlMetaData yamlObject = null;
                        if (yamlSetting.Length > 0)
                        {
                            yamlObject = new YamlMetaData();
                            using (var reader = new StringReader(yamlSetting.ToString()))
                            {
                                var yaml = new YamlStream();
                                yaml.Load(reader);
                                
                                var mapping = (YamlMappingNode)yaml.Documents[0].RootNode;
                                foreach (var entry in mapping.Children)
                                {
                                    var key = ((YamlScalarNode)entry.Key).Value;
                                    var text = ((YamlScalarNode)entry.Value).Value;

                                    if (string.IsNullOrEmpty(key))
                                    {
                                        continue;
                                    }

                                    switch (key.ToLower())
                                    {
                                        case "template":
                                            yamlObject.Template = text;
                                            break;
                                        case "created-at":
                                            yamlObject.CreatedAt = ToDateTime(text);
                                            break;
                                        case "updated-at":
                                            yamlObject.UpdatedAt = ToDateTime(text);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                        
                        if (yamlObject != null)
                        {
                            templateFi = GetTemplateFileInfo(yamlObject.Template);
                        }

                        var argTemplate = string.Empty;
                        if (templateFi != null)
                        {
                            argTemplate = string.Format(" --template=\"{0}\"", templateFi.FullName);
                        }
                        
                        var argFolderName = string.Format(" -V folder-name=\"{0}\"", fileNameWithoutExtension);
                        
                        var argCustomCss = string.Empty;
                        if (! string.IsNullOrEmpty(escapedCss))
                        {
                            argCustomCss = string.Format(" -V custom-css=\"{0}\"", escapedCss);
                        }
                        
                        var psi = new ProcessStartInfo();
                        psi.FileName = "pandoc.exe";
                        psi.Arguments = string.Format("-f markdown-auto_identifiers -t html5 -o {0}\\index.html -s {2}{3}{4} {1}",
                                                      outDir.FullName,
                                                      mdf.FullName,
                                                      argTemplate,
                                                      argFolderName,
                                                      argCustomCss);
                        // コンソール・ウィンドウを開かない
                        psi.CreateNoWindow = true;
                        
                        // シェル機能を使わない
                        // コンソールアプリの場合、シェル機能を使うにしておくとコンソール･ウィンドウが開いてしまうため。
                        psi.UseShellExecute = false;
                        
                        // UseShellExecute を true にしておくと、OSのファイル関連付けに応じてファイルの開き方を決める。
                        // たとえば、xlsxであればExcelで開き、txtはメモ帳で開く。exeならそのまま実行する。

                        var p = new Process();
                        
                        // プロセス終了時にイベントを発生させる
                        p.Exited += new EventHandler(pandoc_Exited);
                        p.EnableRaisingEvents = true;

                        // 起動
                        p.StartInfo = psi;
                        if (p.Start())
                        {
                            pandocStartedCount++;
                        }
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(mdf.FullName);
                        Console.WriteLine(e.ToString());
                    }
                }
                
                // コピーから除外するフォルダ名
                var excludeDirNames = new List<string>() { "css", "script", "template" };
                
                // 入力フォルダのサブフォルダをコピー
                foreach (var copyDi in inputDirInfo.GetDirectories())
                {
                    // 除外フォルダであればスキップ
                    if (excludeDirNames.Any(p => p == copyDi.Name))
                    {
                        continue;
                    }
                    
                    // フォルダコピー
                    CopyDirectory(copyDi,
                                  new DirectoryInfo(Path.Combine(outputDirInfo.FullName,
                                                                 copyDi.Name)));
                }

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

                // 処理終了
                Console.WriteLine(string.Empty);
                Console.WriteLine("BUILD SUCCESSFUL");
            }
            catch (Exception e)
            {
                Console.WriteLine(string.Empty);
                Console.WriteLine("予期せぬエラーが発生しました。");
                Console.WriteLine(e.ToString());
                Marshal.GetHRForException(e);
            }
        }

        private static void pandoc_Exited(object sender, EventArgs e)
        {
            pandocExitedCount++;
            if (pandocStartedCount >= pandocExitedCount)
            {
                pandocExited = true;
            }
            Console.WriteLine("pandoc completed.");
        }

        private static string GetCssString()
        {
            var cssDirInfo = new DirectoryInfo(Path.Combine(inputDirInfo.FullName, "css"));
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
                    using (var reader = new StreamReader(fs, Encoding.UTF8))
                    {
                        sb.Append(reader.ReadToEnd());
                    }
                }
            }
            
            return sb.ToString();
        }
        
        private static FileInfo GetTemplateFileInfo()
        {
            var templateDi = new DirectoryInfo(Path.Combine(inputDirInfo.FullName, "template"));
            if (! templateDi.Exists)
            {
                return null;
            }
            
            var defaultTemplateFi =
                templateDi.GetFiles().Where(p => p.Name.ToLower().StartsWith("default."))
                                     .FirstOrDefault();
            
            return defaultTemplateFi;
        }

        private static FileInfo GetTemplateFileInfo(string fileName)
        {
            var templateDi = new DirectoryInfo(Path.Combine(inputDirInfo.FullName, "template"));
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

        private static void CopyDirectory(string src, string dest)
        {
            if (string.IsNullOrEmpty(src) ||
                string.IsNullOrEmpty(dest))
            {
                return;
            }

            CopyDirectory(
                new DirectoryInfo(src),
                new DirectoryInfo(dest)
            );
        }
        
        private static void CopyDirectory(DirectoryInfo srcDi, DirectoryInfo destDi)
        {
            if (srcDi == null ||
                destDi == null)
            {
                return;
            }
            
            if (! srcDi.Exists)
            {
                return;
            }
            
            if (! destDi.Exists)
            {
                destDi.Create();
            }
            
            // フォルダ配下のファイルをすべてコピー
            foreach (var copyFi in srcDi.GetFiles())
            {
                copyFi.CopyTo(Path.Combine(destDi.FullName, copyFi.Name));
            }
            
            // サブフォルダもコピー
            foreach (var copyDi in srcDi.GetDirectories())
            {
                CopyDirectory(copyDi,
                              new DirectoryInfo(Path.Combine(destDi.FullName, copyDi.Name)));
            }
        }

        private static DateTime? ToDateTime(string dateString)
        {
            var formats = new List<string>()
            {
                "yyyy-MM-dd'T'HH:mm:ss'Z'",
                "yyyy-MM-dd'T'HH:mm:ss",
                "yyyy-MM-dd HH:mm:ss",
                "yyyy-MM-dd"
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

    /// <summary>
    /// Yamlメタデータブロックの内容を保持します。
    /// </summary>
    class YamlMetaData
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
        public string Template { get; set; }

        /// <summary>
        /// 作成日時
        /// </summary>
        public DateTime? CreatedAt { get; set; }

        /// <summary>
        /// 更新日時
        /// </summary>
        public DateTime? UpdatedAt { get; set; }
    }
}