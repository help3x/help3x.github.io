Pandoc Markdown
================

Simple Table
-------------

  Right     Left     Center     Default
-------     ------ ----------   -------
     12     12        12            12
    123     123       123          123
      1     1          1             1


Multiline Table
----------------

-------------------------------------------------------------
 Centered   Default           Right Left
  Header    Aligned         Aligned Aligned
----------- ------- --------------- -------------------------
   First    row                12.0 Example of a row that
                                    spans multiple lines.

  Second    row                 5.0 Here's another one. Note
                                    the blank line between
                                    rows.
-------------------------------------------------------------


Grid Table
-----------

+---------------+---------------+--------------------+
| 果物          | 値段          | 利点               |
+===============+===============+====================+
| バナナ        | $1.34         | - むきやすい       |
|               |               | - 明るい色         |
+---------------+---------------+--------------------+
| オレンジ      | $2.10         | - ビタミンCが豊富  |
|               |               | - おいしい         |
+---------------+---------------+--------------------+


Pipe Table
-----------

|右寄せ | 左寄せ|デフォルト|中央寄せ|
|------:|:-----|---------|:------:|
|   12  |  12  |    12   |    12  |
|  123  |  123 |   123   |   123  |
|    1  |    1 |     1   |     1  |


| jointed header || header |
| --- | --- | --- |
| jointed cell || cell |
| aaa | bbb | ccc |


Direct
-------

<table>
<tr>
<td>Cell-1</td>
<td>Cell-2</td>
<td>Cell-3</td>
</tr>
<tr>
<td colspan="2">Cell-1+2</td>
<td rowspan="2">Cell-3</td>
</tr>
<tr>
<td>Cell-1</td>
<td>Cell-2</td>
</tr>
</table>

