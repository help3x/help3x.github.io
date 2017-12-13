using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Program
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // いずれも実行ファイルの場所ではなく、カレントディレクトリを返してきた
                // Console.WriteLine(System.Environment.CurrentDirectory);
                // Console.WriteLine(System.IO.Directory.GetCurrentDirectory());

                DirectoryInfo homeDirInfo = null;

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

                Console.WriteLine(String.Format("ホームフォルダ: {0}", homeDirInfo.FullName));

                Console.ReadKey();
            }
            catch (Exception e)
            {
                Console.WriteLine("予期せぬエラーが発生しました。");
                Console.WriteLine(e.ToString());
            }
        }
    }
}