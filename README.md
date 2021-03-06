
|Title       |Description     |
|:----------:|:-------------:|
|customTable |表格结构展示数据|

## customTable

一个自定义 js plugin。表格结构展示数据，支持多选checkbox，单选radio或者没有checkbox的双选，支持row的拼接、删除、刷新、插入，支持现实行号，支持分页，支持每列中的td自适应宽度或者指定宽度。

## Usage（使用）

1）table用空的div元素来定义
```
<div id="con_one_5">
</div>
```
2）javascript加载数据
```
<script type="text/javascript">
    $("#con_one_5").createTableHtml({
        url:"data/test.json",
        method:"POST",//ajax请求的方式
        width:"80%",//若没有给宽度,则默认是100%
        height:"",//若没有给高度,那么会有一个默认高度

        isShowCheckbox:true,//是否显示checkbox,注意,checkbox和radio只能显示其中一个或者全部都不显示,如果都为true,则全部不显示
        isShowRadio:false,//是否显示radio

        isShowPage:true,//是否显示分页,注意分页只能显示其中的一个,或者不显示,如果都选择true的话,就全部不显示
        isShowPreNextPage:false,//是否显示pre,next分页

        isShowBorderDivider:true,//是否展示border分割线

        isShowRowNumbers:true,//是否展示行号

        fitColumns:true,//是否自适应列的宽度,false的话,所有列宽超出table的宽度则会出现水平滚动条

        checkColumn:[
            {field:'ck',type:'string',title:"ck2",height:"34px",colspan:"1",rowspan:"1",textAlign:"center",
                formatter:function(rowData,index,value){return "<font color=red>"+value+"</font>";}
            }
        ],
        columns:[
            {field:'buyPlanNum',type:'string',title:"范本1",width:"400px",height:"34px",colspan:"1",rowspan:"1",textAlign:"center",

                formatter:function(rowData,index,value)
                {
                    if(value == "PL-SGS2013001"){

                        return "<a style='color: red' onclick='test(this)'>test1</a>";
                    }else{
                        return value;
                    }
                }
            },
            {field:'buyPlanStatus',type:'string',title:"状态",width:"400px",height:"34px",colspan:"1",rowspan:"1",textAlign:"center"},
            {field:'createBy',type:'string',title:"创建人",width:"400px",height:"34px",colspan:"1",rowspan:"1",textAlign:"center"},

            {field:'buyPlanDescription',type:'string',title:"范本3",width:"400px",height:"34px",colspan:"1",rowspan:"1",textAlign:"center",

                formatter:function(rowData,index,value)
                {
                    if(value == "描述3"){

                        return "<a style='color: blue' onclick='test(this)'>test</a>";
                    }else{
                        return value;
                    }
                }
            }
        ]
    });
</script>
```

## Attribute（属性）
|Name        |Description|
|:----------:|:-------------:|
|url          |获取远程数据的url|
|method        |请求url的方法|
|width        |指定宽度|
|height        |指定高度|
|isShowCheckbox        |是否显示checkbox|
|isShowRadio        |是否显示radio|
|isShowPreNextPage        |是否显示pre,next分页|
|isShowPage        |是否显示分页|
|isShowBorderDivider        |是否展示border分割线|
|isShowRowNumbers        |是否展示行号|
|fitColumns        |是否自适应列的宽度,false的话,所有列宽超出table的宽度则会出现水平滚动条|

## Column attribute（列属性）
|Name        |Type     |Description|
|:----------:|:-------------:|:-------------:|
|title          |string|列的标题文本|
|field          |string|列的字段名|
|width          |number|列的宽度|
|height          |number|列的高度|
|textAlign          |string|指示如何对齐该列的数据|
|formatter          |function|单元格的格式化函数需要三个参数：value：字段的值 rowData：行的记录数据 index：行的索引|

## Events（事件）
|Name        |Param     |Description|
|:----------:|:-------------:|:-------------:|
|onDblClick          |rowData，index|当用户双击一行时触发|
|onSglClick          |rowData，index|当用户选中checkbox时触发|
|onCheckboxSelect          |rowData，index|当用户选中checkbox时触发|
|oncheckboxUnSelect          |rowData，index|当用户取消选中checkbox时触发|
|oncheckboxAllSelect          |rowData|当用户选中全选checkbox时触发|
|oncheckboxAllUnSelect          |rowData|当用户取消选中全选checkbox时触发|
|onRadioSelect          |rowData，index|当用户选中radio时触发|
|onRadioUnSelect          |rowData，index|当用户取消选中radio时触发|
|onSelect          |rowData，index|当用户选中一行时触发|
|onUnSelect          |rowData，index|当用户取消选中一行时触发|
|onLoadSuccess          |data|当数据加载成功时触发|
|onLoadError          |error|当数据加载失败时触发|

## Methods（方法）
|Name        |Param     |Description|
|:----------:|:-------------:|:-------------:|
|getOptions          |none|返回表格的选项（options）|
|loadData          |none|加载本地数据|
|reload          |data|重载table数据|
|getData          |none|获取请求成功后的数据|
|selectAll          |none|选中所有的行|
|unselectAll          |none|取消选中所有的行|
|selectRow          |index|选中指定的行|
|unselectRow          |index|取消选中指定的行|
|getRows          |none|返回当前页的行|
|appendRow          |rows|往表格最后追加行|
|deleteRow          |index|删除指定的行|
|insertRow          |rows, index|往表格插入行，rows是行数据，index是索引|
|updateRow          |row, index|更新表格中行的数据，row是一行的数据，index是索引|
|getSelected          |none|获取选中的行|

## Attention（注意）

**这里面的数据用的是本地的数据，所以下载项目并运行，出现错误的话，自己检查元素看看，有些会拦截本地数据，用i.e.打开，或者chrome，如果出现Origin null is not allowed by Access-Control-Allow-Origin，只需在html头部加上Access-Control-Allow-Origin。**
