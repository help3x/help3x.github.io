using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

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
                    //Console.WriteLine(args[i]);
                    var arg = args[i];
                    
                    if (i == 0)
                    {
                        if (! String.IsNullOrEmpty(arg))
                        {
                            /*if (arg == ".")
                            {
                                homeDirInfo = new DirectoryInfo(Directory.GetCurrentDirectory());
                            }
                            else
                            {*/
                                homeDirInfo = new DirectoryInfo(arg);
                            /*}*/
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
//                    var tsk = Task.Run(async () =>
//                    {
                    try
                    {
                        var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(mdf.FullName);
                        
                        var outDir = new DirectoryInfo(Path.Combine(outputDirInfo.FullName, fileNameWithoutExtension));
                        if (outDir.Exists)
                        {
                            outDir.Delete(true);
                        }
                        outDir.Create();
                        
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
//                    });
//                    pandocTasks.Add(tsk);
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

                // // TODO: 非同期テスト
                // // 非同期処理が終わるまで待つ
                // TestAsync().Wait();

                // すべてのプロセスが終了するまで待つ
                // ただし、30秒を超えたら待つのをやめる
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

        // // TODO: 非同期テスト
        // private static async Task TestAsync()
        // {
        //     var t1 = Task.Run(async () =>
        //              {
        //                 Console.WriteLine("Task1 Begin");
        //                 await Task.Delay(1000);
        //                 Console.WriteLine("Task1 End");
        //              });
        //     var t2 = Task.Run(async () =>
        //              {
        //                 Console.WriteLine("Task2 Begin");
        //                 await Task.Delay(5000);
        //                 Console.WriteLine("Task2 End");
        //              });

        //      // すべてのTaskが終わるまで待つ
        //     await Task.WhenAll(t1, t2);
        // }

        // private static async Task ConvertMarkdown()
        // {
        //     var pandocTasks = new List<Task>();
        //     foreach (var mdf in inputDirInfo.GetFiles("*.md"))
        //     {
        //         var tsk = Task.Run(async () =>
        //         {
        //             var psi = new ProcessStartInfo();
        //             psi.FileName = "notepad.exe";
        //             psi.Arguments = mdf.FullName;
        //             psi.CreateNoWindow = true;
        //             psi.UseShellExecute = false;

        //             var p = new Process();
        //             p.Exited += new EventHandler(proc_Exited);
        //             p.EnableRaisingEvents = true;
        //             p.StartInfo = psi;
        //             p.Start();
        //         });
        //         pandocTasks.Add(tsk);
        //     }

        //     if (pandocTasks.Count() > 0)
        //     {
        //         await Task.WhenAll(pandocTasks);
        //     }
        // }

//        private static async Task SubAsync()
//        {
//            Console.WriteLine("Begin. ThreadId={0}", Thread.CurrentThread.ManagedThreadId);
//            
//            // error CS4008: 'void' を待機することができません
//            //await VoidAsync();
//            
//            var task = new Task(async () =>
//            {
//                await Task.Delay(TimeSpan.FromSeconds(1));
//            });
//            task.Start();
//            
//            await task;
//            Console.WriteLine("End.   ThreadId={0}", Thread.CurrentThread.ManagedThreadId);
//        }
//
//        private static async void VoidAsync()
//        {
//            await Task.Delay(1000);
//        }

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
            
            var fis = templateDi.GetFiles();
            if (fis.Length == 0)
            {
                return null;
            }
            
            return fis[0];
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
    }
}