using System;
using System.IO;
using System.Runtime.InteropServices;
using Bld;

namespace Program
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                DirectoryInfo homeDirInfo = null;
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

                // 生成開始
                var builder = new Builder(homeDirInfo);
                builder.Build();

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
    }
}