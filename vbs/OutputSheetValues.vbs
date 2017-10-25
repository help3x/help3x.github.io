'''======================================================================
''' Excel基礎表から10月報告と2Q見の値をそれぞれ抽出して
''' テキストファイルに出力します。
''' 出力先はマイドキュメント配下のシステム日時の名前が付いたフォルダです。
'''======================================================================
Option Explicit

Private fso
Private shell
Private outputFolder

Call Main()

''' 
''' スクリプトのエントリーポイントです。
''' 
Public Sub Main()

    Set fso = GetCreatedObject("Scripting.FileSystemObject")
    Set shell = GetCreatedObject("WScript.Shell")
    
    Dim outputFolderPath
    outputFolderPath = shell.SpecialFolders("MyDocuments")
    outputFolderPath = fso.BuildPath(outputFolderPath, Replace(Replace(Replace(Now, ":", ""), "/", ""), " ", ""))
    If fso.FolderExists(outputFolderPath) Then
        Set outputFolder = fso.GetFolder(outputFolderPath)
    Else
        Set outputFolder = fso.CreateFolder(outputFolderPath)
    End If

    Dim xls
    Set xls = GetCreatedObject("Excel.Application")
    If Err.Number <> 0 Then
        WScript.Echo "COMコンポーネントのインスタンスが生成できませんでした。"
        WScript.Echo "Excelがインストールされていない可能性があります。"

        set fso = Nothing
        set shell = Nothing
        Call WScript.Quit(1)
    End If

    Dim book
    Set book = xls.Workbooks.Open("C:\Work\BIT_20171025\After\10月報告_ＯＳＳ_月次報告_一括出力.xls", , True)

    Dim tmpSheet
    For Each tmpSheet In book.Worksheets
        Dim bpmsSecCode
        bpmsSecCode = GetNamedCellValue(tmpSheet, "BPMS_SEC_CODE")
        If Err.Number <> 0 Then
            bpmsSecCode = ""
        End If
        
        Dim secShortName
        secShortName = GetNamedCellValue(tmpSheet, "SEC_SHORT_NAME")
        If Err.Number <> 0 Then
            secShortName = ""
        End If
        
        If Len(bpmsSecCode) > 0 Then
            Call Abc123(tmpSheet, bpmsSecCode, secShortName)
        End If
    Next

    If book Is Nothing = False Then
        book.Application.CutCopyMode = False
        Call book.Close(False)
        Set book = Nothing
    End If

    If IsEmpty(xls) = False Then
        If xls Is Nothing = False Then
            xls.Quit
            Set xls = Nothing
        End If
    End If

    Set fso = Nothing
    Set shell = Nothing

End Sub


''' 
''' 
''' 
Function GetCreatedObject(objectName)
    On Error Resume Next
    Dim obj
    Set obj = WScript.CreateObject(objectName)
    If Err.Number = 0 Then
        Set GetCreatedObject = obj
    Else
        Set GetCreatedObject = Nothing
    End If
End Function


''' 
''' シート内の名前付きセルの値を取得します。
''' 
Function GetNamedCellValue(sht, cellName)
    On Error Resume Next
    GetNamedCellValue = sht.Range(cellName).Value
End Function


''' 
''' 
''' 
Sub Abc123(sht, sectionCode, sectionName)

    If sht Is Nothing Then
        Exit Sub
    End If
    
    'すべての行と列を再表示
    sht.Cells.Rows.Hidden = False
    sht.Cells.Columns.Hidden = False
    
    '当年度列をすべて非表示
    sht.Columns("G:BB").Hidden = True
    
    '
    '2Q見をテキストファイルに出力
    '
    sht.Range("H:H,L:L,P:P,T:T,X:X,AB:AB,AF:AF,AJ:AJ,AN:AN,AR:AR,AV:AV,AZ:AZ").EntireColumn.Hidden = False
    'sht.Range("G11:BB380").Copy
    sht.Range("H10:AZ380").Copy
    
    Dim fileName2Q
    fileName2Q = sectionCode & "_" & sectionName & "_2Q.csv"
    Call Write1(fso.BuildPath(outputFolder.Path, fileName2Q), GetClipBoard())
    
    '
    '10月報告をテキストファイルに出力
    '
    sht.Columns("G:BB").Hidden = True
    sht.Range("J:J,N:N,R:R,V:V,Z:Z,AD:AD,AG:AG,AK:AK,AO:AO,AS:AS,AW:AW,BA:BA").EntireColumn.Hidden = False
    sht.Range("J10:BA380").Copy
    
    Dim fileName10R
    fileName10R = sectionCode & "_" & sectionName & "_201710R.csv"
    Call Write1(fso.BuildPath(outputFolder.Path, fileName10R), GetClipBoard())
    
End Sub


''' 
''' ファイルに書き込みます。
''' 
Sub Write1(writeFilePath, writeText)
    On Error Resume Next
    Dim ts
    Set ts = fso.CreateTextFile(writeFilePath, True)
    If Err.Number <> 0 Then
        Set ts = Nothing
        Exit Sub
    End If
    Err.Clear
    
    Call ts.Write(writeText)
    Call ts.Close
    Set ts = Nothing
End Sub


''' 
''' クリップボードを取得します。
''' 
Function GetClipBoard()

    Dim ff
    Set ff = WScript.CreateObject("Forms.Form.1")

    Dim tb
    Set tb = ff.Controls.Add("Forms.TextBox.1").Object
    tb.MultiLine = True

    If tb.CanPaste Then
        tb.Paste
    End If

    GetClipBoard = tb.Text
    
    Set tb = Nothing
    Set ff = Nothing

End Function


''' 
''' クリップボードに設定します。
''' 
Sub SetClipBoard(clipText)

    Dim ff
    Set ff = WScript.CreateObject("Forms.Form.1")
    
    Dim tb
    Set tb = ff.Controls.Add("Forms.TextBox.1").Object
    tb.MultiLine = True
    tb.Text = clipText
    tb.SelStart = 0
    tb.SelLength = tb.TextLength
    tb.Copy
    
    Set tb = Nothing
    Set ff = Nothing

End Sub
