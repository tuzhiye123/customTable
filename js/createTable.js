/**
 * Created by tuzhiye on 16/11/14.
 */
(function($){

    var isDblClick;

    //拼接table头部,并且返回该table有多少列
    function createTitleHtml(target,globalOption){

        var elementId = target.attr('id');
        var elementIdString = '#'+elementId;

        var titleContentHtml = "";
        var titleArray = [];
        var checkboxHtml = "";

        if(globalOption.isShowCheckbox == true && globalOption.isShowRadio == false){
            checkboxHtml += '<div class="cmcc_checkbox1 check_ml_mr"><label class="cmcc_check_model1 checkAll"><input type="checkbox" value="1" /></label></div>';
        }else if(globalOption.isShowCheckbox == false && globalOption.isShowRadio == true){//如果table只显示radio,那么第一行(也就是标题),就不要有radio
            checkboxHtml = "选择";
        }
        else{
            checkboxHtml = "";
        }

        titleContentHtml +='<thead><tr class="table-tr table-tr-title">';

        if(globalOption.isShowRowNumbers == true){

            for(var i = 0; i < globalOption.columns.length;i++){

                var column = globalOption.columns[i];
                titleArray.push(column);

                if((globalOption.isShowCheckbox == false && globalOption.isShowRadio == false) || (globalOption.isShowCheckbox == true && globalOption.isShowRadio == true)){
                    if(i == 0){
                        titleContentHtml += '<th width="'+ column.width +'"'+' colspan="'+ column.colspan +'"'+' rowspan="'+column.rowspan+'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height +'"' +' class="table-td">'+'序号'+'</th>';
                    }else{
                        titleContentHtml += '<th width="'+ column.width +'"'+' colspan="'+ column.colspan +'"'+' rowspan="'+column.rowspan+'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height +'"'+ ' class="table-td">'+ column.title + '</th>';
                    }
                }else{
                    if(i == 0){
                        titleContentHtml += '<th width="'+ column.width +'"'+' colspan="'+ column.colspan +'"'+' rowspan="'+column.rowspan+'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height +'"' +' class="table-td">'+'序号'+'</th>';
                    }else if(i == 1){
                        titleContentHtml += '<th width="35px"'+' colspan="'+ column.colspan +'"'+' rowspan="'+column.rowspan+'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height +'"'+ ' class="table-td">'+ checkboxHtml + '</th>';
                    }else{
                        titleContentHtml += '<th width="'+ column.width +'"'+' colspan="'+ column.colspan +'"'+' rowspan="'+column.rowspan+'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height +'"'+ ' class="table-td">'+ column.title + '</th>';
                    }
                }
            }

        }else{

            //拼接第一行,即是table的头部
            for(var i = 0; i < globalOption.columns.length;i++){
                var column = globalOption.columns[i];
                titleArray.push(column);

                if(i == 0){//第一行的第一列,即是第一个单元

                    if((globalOption.isShowCheckbox == false && globalOption.isShowRadio == false) || (globalOption.isShowCheckbox == true && globalOption.isShowRadio == true)){
                        titleContentHtml += '<th width="'+ column.width +'"'+' colspan="'+ column.colspan +'"'+' rowspan="'+column.rowspan+'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height +'"' +' class="table-td">'+ column.title +'</th>';
                    }else{
                        titleContentHtml += '<th width="35px"'+' colspan="'+ column.colspan +'"'+' rowspan="'+column.rowspan+'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height +'"'+ ' class="table-td">'+ checkboxHtml + '</th>';
                    }
                }
                else{
                    titleContentHtml += '<th width="'+ column.width +'"'+' colspan="'+ column.colspan +'"'+' rowspan="'+column.rowspan+'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height +'"'+ ' class="table-td">'+ column.title + '</th>';
                }
            }
        }

        titleContentHtml +='</tr></thead>';

        var contentHtml = "";
        //表格的高度和宽度
        var width = globalOption.width;
        var height = globalOption.height;

        if((globalOption.isShowPage == true && globalOption.isShowPreNextPage == false) || (globalOption.isShowPage == false && globalOption.isShowPreNextPage == true)){

            //没有给height赋值,就直接取默认的高度430px,包含分页的高度,padding-top:10px
            if(height == "" || height == null || height == undefined){
                height = 430 + 'px';
            }
        }else{//没有分页
            //没有给height赋值,就直接取默认的高度375px,去掉分页的高度,padding-top:10px
            if(height == "" || height == null || height == undefined){
                height = 375 + 'px';
            }
        }

        //这里拼接一个div用来包含table和分页
        contentHtml = '<div id="'+elementId+'-div"'+' style="position:relative;width:'+ width +';height: '+ height + '">' +'<div id="'+elementId+'-table-div"'+' style="overflow: auto;width:100%;height:100%">'+
            '<table width="100%" id="'+elementId+'-table'+'" cellspacing="0" style="text-align: center;border-collapse: collapse;"></table>' + '</div></div>';

        //将contentHtmlappend到最外层div
        target.append(contentHtml);
        //将头部table拼接进table
        $(elementIdString+'-div '+elementIdString+'-table').append(titleContentHtml);
        //set td border-bottom
        $(".table-tr th").css("border-bottom","1px solid #ccc");

        if(globalOption.isShowBorderDivider == true){
            //$(elementIdString+'-div '+elementIdString+'-table' + ' th').addClass("custom-table-divider");
            //$(elementIdString+'-div '+elementIdString+'-table').addClass("custom-table-ltr");

            $(elementIdString+'-div '+elementIdString+'-table' + ' th').css("border-right","1px solid #ccc");
            $(elementIdString+'-div '+elementIdString+'-table').css("border-left","1px solid #ccc");
            $(elementIdString+'-div '+elementIdString+'-table').css("border-top","1px solid #ccc");
            $(elementIdString+'-div '+elementIdString+'-table').css("border-right","1px solid #ccc");
        }

        //判断是否自适应列,如果为否的话,就会按照你设置的列宽,超出table宽度,会出现水平滚动条
        if(globalOption.fitColumns == false){
            $(elementIdString+'-div '+elementIdString+'-table').css("table-layout","fixed");
        }

        /***************绑定复选框全选单击改变样式*************************************/
        $(elementIdString + ' .table-tr-title'+ ' .checkAll input[type="checkbox"]').on("click",function(event){

            //点击子元素不会触发父元素
            stopPropagation(event);

            //获取input里面存储的字符串
            var data = JSON.parse($(elementIdString +'-input').val());
            var rowsData = data.rows;
            var lableElemt = $(this).parent();
            if(lableElemt.hasClass("cmcc_check_on1")){

                $(elementIdString+' .cmcc_check_model1').each(function(){
                    $(this).removeClass('cmcc_check_on1');
                });

                //改变tr
                $(elementIdString + ' .table-tr1').each(function(){
                    var tr = $(this);
                    unselectBaseTrStyle(tr);
                });

                if(globalOption.oncheckboxAllUnSelect){
                    //取消全部选中回调
                    globalOption.oncheckboxAllUnSelect(rowsData);
                }

            }else{

                $(elementIdString+' .cmcc_check_model1').each(function(){
                    $(this).addClass('cmcc_check_on1');
                });

                //改变tr
                $(elementIdString + ' .table-tr1').each(function(){
                    var tr = $(this);
                    selectBaseTrStyle(tr);
                });

                if(globalOption.oncheckboxAllSelect){
                    //全部选中回调
                    globalOption.oncheckboxAllSelect(rowsData);
                }
            }
        });

        //解决 点击checkbox边边 同时触发触发checkAll和checkAll父元素的问题
        $(elementIdString + ' .table-tr-title'+ ' .checkAll').on("click",function(event){
            stopPropagation(event);
        });

        //返回有多少列
        return titleArray;
    }

    //拼接分页
    function createPageHtml(target,globalOption,titleArray){

        var elementId = target.attr('id');
        var elementIdString = '#'+elementId;

        //初始化加载第一页
        var pageIndex = 0;
        //分页
        var pageContentHtml = "";

        //判断是否有分页
        if(globalOption.isShowPage == true && globalOption.isShowPreNextPage == false){
            //pageContentHtml += '<div style="height:45px" id="'+elementId+'-pages-box' +'" class="pages-box mt10"><div class="pages-boxL">当前第<span class="current-page"></span>页 ，<span class="allPage">共<span class="all-page"></span></span>页</div>'
            //    +'<div class="pages"><div id="'+elementId+'-page" class="Pagination"></div><div class="searchPage"><span class="page-go">前往<input id="page-index" type="text">页</span>'
            //    +'<a class="page-btn">确定</a></div></div></div>';

            pageContentHtml += '<div style="height:45px" id="'+elementId+'-pages-box' +'" class="pages-box mt10"><div class="pages-boxL">当前第<span class="current-page"></span>页 ，<span class="allPage">共<span class="all-page"></span></span>页</div>'
                +'<div class="pages"><div id="'+elementId+'-page" class="Pagination"></div><div class="searchPage"><div class="page-input-div"><div class="page-input-div-text">前往</div><input id="page-index" type="text"><div class="page-input-div-text">页</div></div>'
                +'<a class="page-index-btn">确定</a></div></div></div>';

        }else if(globalOption.isShowPage == false && globalOption.isShowPreNextPage == true){
            //pageContentHtml += '<div style="height:45px;text-align: center;" id="'+elementId+'-preNextPage'+'">'+'<ul class="pager"><li style="margin-right: 5px;"><a>上一页</a></li><li style="margin-left: 5px;"><a>下一页</a></li></ul>'+'</div>';

            pageContentHtml += '<div style="margin-top: 10px;height:45px;text-align: center;width: 100%;"><div style="width: 80%;margin: 0 auto;"><button class="cmcc_btn cmcc_btn_stress" style="margin-right: 10px;" id="custom-pre-page">上一页</button><button class="cmcc_btn cmcc_btn_stress" style="margin-left: 10px;" id="custom-next-page">下一页</button></div></div>';
        }
        else{
            pageContentHtml = "";
        }

        /*
         * 这里的input永远都是隐藏的,因为我这里不能用到全局变量,否则同时多次调用createTableHtml会出现方法覆盖,不能同一页面绘制多个自定义table,它的作用相当于一个全局变量,一个容器,用来存放我请求成功后的数据,因为这
         * 里的table title是先绘制的,没有请求成功后的数据,table title要是有checkbox的话,全选或不全选时会有一个callback把数据带出去,所以在请求数据成功的时候把数据字符串化后赋值给input,在点击全选checkbox之后
         * 再JSON.parse出来数据,这里不用本地存储localStorage,是担心数据太大,出现缓存问题
         * */
        pageContentHtml += '<input type="text" style="display: none" id="'+elementId+'-input'+'"'+'">';
        //拼接分页
        $(elementIdString+'-div').append(pageContentHtml);
        //初始化分页
        if(globalOption.isShowPage == true && globalOption.isShowPreNextPage == false){
            initPage(0,0,globalOption,target,titleArray);
        }

        /************************绑定分页事件******************************/
            //绑定分页事件
        $(elementIdString+' .page-index-btn').off("click").on("click",function(){
            var index = $(elementIdString+' #page-index').val();
            //在ie7及其以下浏览器不支持console
            //console.log("---index---" + index);
            if(index == "" || index == undefined || index == null){
                alert("请输入页数!");
            }else{
                //设置去到第几页
                //$(elementIdString+'-page').trigger('setPage', [index-1]);//jquery.pagination是从第0页开始算起的,所以这里需要进行减1

                //判断输入的是否是正整数
                if(isPositiveInteger(index)){
                    getData(index-1,target,globalOption,titleArray);
                    $(elementIdString+' .current-page').text(index);//这里就正常显示页数
                    $(elementIdString+' #page-index').val("");//清空输入框内容
                }else{
                    alert("请输入正确的页数!");
                    $(elementIdString+' #page-index').val("");//清空输入框内容
                }
            }
        });

        //input回车事件
        $(elementIdString+' #page-index').bind("keyup",function(e){
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                //调用确定按钮
                $(elementIdString+' .page-index-btn').click();
            }
        });

        /************************绑定pre,next分页事件******************************/
        $(elementIdString+' #custom-pre-page').off("click").on("click",function(){
            pageIndex -= 1;
            if(pageIndex < 0){
                alert("已在首页,没有上一页!");
                pageIndex = 0;
                return;
            }
            getData(pageIndex,target,globalOption,titleArray);
        });

        $(elementIdString+' #custom-next-page').off("click").on("click",function(){
            pageIndex += 1;
            getData(pageIndex,target,globalOption,titleArray);
        });
    }

    //正则表达式,判断是否是正整数
    function isPositiveInteger(num){

        var type="^[0-9]*[1-9][0-9]*$";
        var re = new RegExp(type);
        if(num.match(re)==null) {
            return false;
        }else{
            return true;
        }
    }

    //初始化page分页
    function initPage(pageIndex,pageCount,globalOption,target,titleArray){

        var elementId = target.attr('id');
        var elementIdString = '#'+ elementId;
        //显示总页数
        $(elementIdString+' .all-page').text(pageCount);
        //显示当前页数
        $(elementIdString+' .current-page').text(pageIndex+1);
        //将分页置空
        $(elementIdString+' #'+elementId+'-page').html("");
        //分页初始化
        $(elementIdString+' #'+elementId+'-page').pagination(pageCount,    //分布总数量，必须参数
            {
                current_page:pageIndex,
                callback: function(page_index,jq){//page_index是指点击分页上的按钮是,回调的点击页数

                    $(elementIdString +' .checkAll').removeClass('cmcc_check_on1');
                    $(elementIdString + ' .current-page').text(page_index+1);//显示当前页数
                    //请求其他页面数据
                    getData(page_index,target,globalOption,titleArray);
                }
            });
        if(pageCount == 0 || pageCount == 1 || pageCount == undefined || globalOption.isShowPage == false){//如果分页页数为0,分页的div就隐藏
            $(".pages-box").css("display","none");
        }else{
            $(".pages-box").css("display","block");
        }
    }

    //拼接table的content
    function buildTableContent(rowsJson,target,globalOption,titleArray){

        var elementId = target.attr('id');
        var elementIdString = '#' + elementId;

        //分页移除整一个tbody
        $('#'+elementId+'-div '+'#'+ elementId +'-table tbody').remove();

        //根据options,获取是否有checkbox,radio等html
        var checkboxHtml = getCheckBoxOrRadioHtml(globalOption);

        //table body
        var tableBody = '<tbody>';
        //获取tr
        var tableContentTr = getTableContentTr(globalOption,rowsJson,titleArray,checkboxHtml,"");
        //拼接table body
        tableBody += tableContentTr + '</tbody>';

        //拼接table tbody
        $('#'+elementId+'-div '+'#'+ elementId +'-table').append(tableBody);
        //set td border-bottom
        $(".table-tr td").css("border-bottom","1px solid #ccc");

        if(globalOption.isShowBorderDivider == true){
            //$(elementIdString+'-div '+elementIdString+'-table' + ' td').addClass("custom-table-divider");
            $(elementIdString+'-div '+elementIdString+'-table' + ' td').css("border-right","1px solid #ccc");
        }

        //上面代码中的table高度设置的是和大的div一样高度的,但是如果出现分页的话,就要减去分页的高度,这里分页的高度设置为45px
        if((globalOption.isShowPage == true && globalOption.isShowPreNextPage == false) || (globalOption.isShowPage == false && globalOption.isShowPreNextPage == true)){//有分页

            //没有输入值,就用默认值
            var height = globalOption.height;
            if(height == "" || height == null || height == undefined){
                height = 430 + 'px';
            }
            //因为点击分页会重绘table content,所以这里需要进行table的高度重新设置,否则会出现table-div高度递减
            $(elementIdString+'-div '+ elementIdString+'-table-div').css("height",height);
            //获取table-div的高度
            var tableDivHeight = $(elementIdString+'-div '+ elementIdString+'-table-div').css("height");

            //减去分页的高度,这里面分页的div高度设置为45px,减去padding-top:10px
            var currentTableHeight = ((tableDivHeight.replace("px","")-0)-55) + "px";
            //重新设置table高度,不包含分页的高度
            $(elementIdString+'-div '+elementIdString+'-table-div').css("height",currentTableHeight);
        }
    }

    //请求数据
    function getData(pageIndex,target,globalOption,titleArray){

        var elementId = target.attr('id');
        var elementIdString = '#'+elementId;
        $.ajax({
            type: globalOption.method,
            url: globalOption.url,
            dataType:"json",
            data:{
                pageIndex:pageIndex,//第几页
                pageSize:""//页面显示条数
            },
            success: function (data) {
                if(globalOption.onLoadSuccess){
                    //options回调
                    globalOption.onLoadSuccess(data);
                }
                //获取请求成功的数据条数
                var rowsData = data.rows;
                var pageCount = data.pageCount;
                //成功取值之后再进行html的绘制和事件的绑定
                var table = {};
                table.json = data.rows;
                table.columns = globalOption.columns;

                //拼接table的content
                buildTableContent(data.rows,target,globalOption,titleArray);

                //先置空,再将数据放入input,给全选checkbox使用
                $(elementIdString +'-input').val("");
                var dataString = JSON.stringify(data);
                $(elementIdString +'-input').val(dataString);

                //绑定事件
                bindEvent(target,globalOption,rowsData);

                //请求数据成功之后这里需要初始化,设置分页总数,当前显示页数
                if(globalOption.isShowPage == true && globalOption.isShowPreNextPage == false){//这里需要判断是否需要进行分页,有分页才进行初始化
                    initPage(pageIndex,pageCount,globalOption,target,titleArray);
                }
            },
            error:function(error){
                alert("数据请求错误");
                if(globalOption.onLoadError){
                    globalOption.onLoadError(error);
                }
            }
        });
    }

    /********************绑定table content里面的事件***************************/
    function bindEvent(target,globalOption,rowsData){

        var elementId = target.attr('id');
        var elementIdString = '#'+elementId;

        /************复选框点击事件*************/
        $(elementIdString + ' .table-tr1'+ ' .cmcc_check_model1 input[type="checkbox"]').off("click").on("click",function(event){
            //点击子元素不会触发父元素
            stopPropagation(event);
            var tr = $(this).parent().parent().parent().parent();
            var lableElmt = $(this).parent();
            if(lableElmt.hasClass("cmcc_check_on1")){
                lableElmt.removeClass("cmcc_check_on1");

                //改变selectAttr和背景颜色
                unselectBaseTrStyle(tr);

                //table content中的checkbox取消选中时,获取是第几个tr
                var unSelectIndex = $(this).parents('tr').index();
                //获取这一行的rowData
                var unSelectRowData = rowsData[unSelectIndex];
                //回调,如果是全选checkbox的话就不要回调
                if(lableElmt.hasClass("checkAll"))return;
                if(globalOption.oncheckboxUnSelect){
                    globalOption.oncheckboxUnSelect(unSelectRowData,unSelectIndex);
                }
                if(globalOption.onUnSelect){
                    //取消选中
                    globalOption.onUnSelect(unSelectRowData,unSelectIndex);
                }

            }else{
                lableElmt.addClass("cmcc_check_on1");

                //改变selectAttr和背景颜色
                selectBaseTrStyle(tr);

                //选中时,获取是第几个tr
                var selectIndex = $(this).parents('tr').index();
                //获取这一行的rowData
                var selectRowData = rowsData[selectIndex];
                //回调,如果是全选checkbox的话就不要回调
                if(lableElmt.hasClass("checkAll"))return;
                if(globalOption.onCheckboxSelect){
                    globalOption.onCheckboxSelect(selectRowData,selectIndex);
                }
                if(globalOption.onSelect){
                    //选中
                    globalOption.onSelect(unSelectRowData,unSelectIndex);
                }

            }
        });

        //解决checkbox的边边点击,响应2次的问题
        $(elementIdString + ' .table-tr1'+ ' .cmcc_check_model1').off("click").on("click",function(event){
            stopPropagation(event);
        });

        //checkbox 鼠标覆盖事件,先解绑,后再绑定
        $(elementIdString +' .cmcc_check_model1').unbind("mouseenter").unbind("mouseleave");
        $(elementIdString +' .cmcc_check_model1').bind({
            mouseenter: function(e) {
                $(this).addClass("cmcc_check_hover1");
            },
            mouseleave: function(e) {
                $(this).removeClass("cmcc_check_hover1");
            }
        });

        /************单选框点击事件*************/
        $(elementIdString +' .cmcc_radio_model1 input[type="radio"]').off("click").on("click",function(event){
            stopPropagation(event);
            var tr = $(this).parent().parent().parent().parent();
            var lableElmt = $(this).parent();
            if(lableElmt.hasClass("cmcc_radio_on1")){
                lableElmt.removeClass("cmcc_radio_on1");

                //改变selectAttr和背景颜色
                unselectBaseTrStyle(tr);

                //选中时,获取是第几个tr
                var unSelectIndex = $(tr).index();
                //获取这一行的rowData
                var unSelectRowData = rowsData[unSelectIndex];
                if(globalOption.onRadioUnSelect){
                    globalOption.onRadioUnSelect(unSelectRowData,unSelectIndex);
                }
                if(globalOption.onUnSelect){
                    //取消选中
                    globalOption.onUnSelect(unSelectRowData,unSelectIndex);
                }

            }else{
                $(".cmcc_radio_model1").removeClass("cmcc_radio_on1");
                lableElmt.addClass("cmcc_radio_on1");

                //改变selectAttr和背景颜色
                $(elementIdString + ' .table-tr1').each(function(){
                    var tr = $(this);
                    unselectBaseTrStyle(tr);
                });
                selectBaseTrStyle(tr);

                //选中时,获取是第几个tr
                var selectIndex = $(tr).index();
                //获取这一行的rowData
                var selectRowData = rowsData[selectIndex];
                if(globalOption.onRadioSelect){
                    globalOption.onRadioSelect(selectRowData,selectIndex);
                }
                if(globalOption.onSelect){
                    //选中
                    globalOption.onSelect(unSelectRowData,unSelectIndex);
                }
            }
        });

        //解决radio边边点击响应2次的问题
        $(elementIdString +' .cmcc_radio_model1').off("click").on("click",function(event){
            stopPropagation(event);
        });

        //radio 鼠标覆盖事件,先解绑,后再绑定
        $(elementIdString +' .cmcc_radio_model1').unbind("mouseenter").unbind("mouseleave");
        $(elementIdString +' .cmcc_radio_model1').bind({
            mouseenter: function(e) {
                $(this).addClass("cmcc_radio_hover1");
            },
            mouseleave: function(e) {
                $(this).removeClass("cmcc_radio_hover1");
            }
        });

        //单击选中tr
        $(elementIdString +' .table-tr1').unbind("click").on("click",function(){

            //这里最好定义一个target局部变量出来,方便操作
            var myTarget = $(this);
            //通过isDblClick和setTimeout来解决双击和单击共存的问题,就是双击的时候不会触发单击,单击的时候不会触发双击
            isDblClick = false;
            setTimeout(function(){
                if(isDblClick != false)return;

                //有checkbox时,tr单击
                if(globalOption.isShowCheckbox == true && globalOption.isShowRadio == false){
                    if(myTarget.children(0).children(0).children(0).hasClass("cmcc_check_on1")){
                        myTarget.children(0).children(0).children(0).removeClass("cmcc_check_on1");

                        unselectBaseTrStyle(myTarget);

                        //获取选中li的index
                        var unSelectIndex = myTarget.index();
                        //获取这一行的rowData
                        var unSelectRowData = rowsData[unSelectIndex];
                        if(globalOption.oncheckboxUnSelect){
                            globalOption.oncheckboxUnSelect(unSelectRowData,unSelectIndex);
                        }
                        if(globalOption.onUnSelect){
                            //取消选中
                            globalOption.onUnSelect(unSelectRowData,unSelectIndex);
                        }

                    }else{
                        myTarget.children(0).children(0).children(0).addClass("cmcc_check_on1");

                        selectBaseTrStyle(myTarget);

                        //获取选中li的index
                        var selectIndex = myTarget.index();
                        //获取这一行的rowData
                        var selectRowData = rowsData[selectIndex];
                        //回调,如果是全选checkbox的话就不要回调
                        if(globalOption.onCheckboxSelect){
                            globalOption.onCheckboxSelect(selectRowData,selectIndex);
                        }
                        if(globalOption.onSelect){
                            //选中
                            globalOption.onSelect(unSelectRowData,unSelectIndex);
                        }
                    }
                }
                //有radio时,tr单击
                else if(globalOption.isShowCheckbox == false && globalOption.isShowRadio == true){

                    if(myTarget.children(0).children(0).children(0).hasClass("cmcc_radio_on1")){

                        myTarget.children(0).children(0).children(0).removeClass("cmcc_radio_on1");

                        unselectBaseTrStyle(myTarget);

                        //获取选中li的index
                        var unSelectIndex = myTarget.index();
                        //获取这一行的rowData
                        var unSelectRowData = rowsData[unSelectIndex];
                        if(globalOption.onRadioUnSelect){
                            globalOption.onRadioUnSelect(unSelectRowData,unSelectIndex);
                        }
                        if(globalOption.onUnSelect){
                            //取消选中
                            globalOption.onUnSelect(unSelectRowData,unSelectIndex);
                        }

                    }else{

                        $(elementIdString + " .cmcc_radio_model1").removeClass("cmcc_radio_on1");
                        myTarget.children(0).children(0).children(0).addClass("cmcc_radio_on1");

                        //先取消选中全部
                        $(elementIdString + ' .table-tr1').each(function(){
                            var tr = $(this);
                            unselectBaseTrStyle(tr);
                        });

                        //在选中当前tr
                        selectBaseTrStyle(myTarget);

                        //获取选中li的index
                        var selectIndex = myTarget.index();
                        //获取这一行的rowData
                        var selectRowData = rowsData[selectIndex];
                        if(globalOption.onRadioSelect){
                            globalOption.onRadioSelect(selectRowData,selectIndex);
                        }
                        if(globalOption.onSelect){
                            //选中
                            globalOption.onSelect(unSelectRowData,unSelectIndex);
                        }
                    }

                }else{

                    var selectAttr = JSON.parse(myTarget.attr("selectAttr"));
                    if(selectAttr == true){

                        unselectBaseTrStyle(myTarget);

                        var unSelectIndex = myTarget.index();
                        var unSelectRowData = rowsData[unSelectIndex];
                        if(globalOption.onUnSelect){
                            //options的回调
                            globalOption.onUnSelect(unSelectRowData,unSelectIndex);
                        }

                    }else{

                        selectBaseTrStyle(myTarget);

                        var selectIndex = myTarget.index();
                        var selectRowData = rowsData[selectIndex];
                        if(globalOption.onSelect){
                            //options的回调
                            globalOption.onSelect(selectRowData,selectIndex);
                        }
                    }
                }

                var index = myTarget.index();
                var rowData = rowsData[index];
                if(globalOption.onSglClick){
                    //单击一行的回调
                    globalOption.onSglClick(rowData,index);
                }

            },200);
        });

        //tr双击事件
        $(elementIdString + ' .table-tr1').unbind("dblclick").on("dblclick",function(){

            isDblClick = true;
            //获取index
            var index = $(this).index();
            //获取对应的row data
            var rowData = rowsData[index];
            if(globalOption.onDblClick){
                //双击一行回调
                globalOption.onDblClick(rowData,index);
            }
        });
    }

    //点击子元素不会触发父元素
    function stopPropagation(e){
        if(e && e.stopPropagation){//非IE浏览器
            e.stopPropagation();
        }else{//IE浏览器
            window.event.cancelBubble = true;
        }
    }

    function buildTable(options,target){

        //设置传进来的options
        var globalOption;

        var defaults = {
            url:"data/test.json",
            isShowCheckbox:false,
            isShowRadio:false,
            isShowPage:false,
            isShowPreNextPage:false
        };

        if(options == undefined || options == null || options == ""){
            globalOption = defaults;
        }else{
            globalOption = options;
        }
        //初始化赋值
        if(globalOption.isShowCheckbox == undefined || globalOption.isShowCheckbox == null || globalOption.isShowCheckbox == ""){
            globalOption.isShowCheckbox = false;
        }
        if(globalOption.isShowRadio == undefined || globalOption.isShowRadio == null || globalOption.isShowRadio == ""){
            globalOption.isShowRadio = false;
        }
        if(globalOption.isShowPage == undefined || globalOption.isShowPage == null || globalOption.isShowPage == ""){
            globalOption.isShowPage = false;
        }

        //有多少列checkbox
        var checkColumn = globalOption.checkColumn;

        if(globalOption.isShowRowNumbers == true){//这里的{name:"rowsNumber"}只是一个占位符
            if((globalOption.isShowCheckbox == true && globalOption.isShowRadio == false) || (globalOption.isShowCheckbox == false && globalOption.isShowRadio == true)){
                if(checkColumn.length != 0 && checkColumn.length != undefined){
                    //获取展示内容的有多少列
                    var columns = globalOption.columns;
                    //将checkColumn中的第一列放进进columns数组的首位
                    columns.unshift(checkColumn[0]);
                    //占位符,用来显示行号
                    var rowsNumberJson = {field:"rowsNumber",width:"35px",height:"34px",textAlign:"center"};
                    columns.unshift(rowsNumberJson);
                }
            }else{
                //获取展示内容的有多少列
                var columns = globalOption.columns;
                var rowsNumberJson = {field:"rowsNumber",width:"35px",height:"34px",textAlign:"center"};
                columns.unshift(rowsNumberJson);
            }
        }else{
            if((globalOption.isShowCheckbox == true && globalOption.isShowRadio == false) || (globalOption.isShowCheckbox == false && globalOption.isShowRadio == true)){
                if(checkColumn.length != 0 && checkColumn.length != undefined){
                    //获取展示内容的有多少列
                    var columns = globalOption.columns;
                    //将checkColumn中的第一列放进进columns数组的首位
                    columns.unshift(checkColumn[0]);
                }
            }
        }

        //titleArray是指options中有多少列(包含radio或者checkbox也算一列)
        var titleArray = createTitleHtml(target,globalOption);
        //拼接分页
        createPageHtml(target,globalOption,titleArray);
        //获取第一页的数据
        getData(0,target,globalOption,titleArray);
    }

    //选中tr改变selectAttr,颜色
    function selectBaseTrStyle(tr){

        //设置checkbox或radio取消选中
        var input = tr.find("input");
        if(input.length > 0){//判断input是否存在
            input.prop("checked",true);
        }
        //设置为未选中
        tr.attr("selectAttr","true");
        //改变tr的背景颜色
        tr.css("background-color","#e1f1fe");
        //先解绑
        tr.unbind("mouseenter").unbind("mouseleave");
        //再绑定
        $(tr).bind({
            mouseenter: function(e) {
                tr.css("background-color","#e1f1fe");
            }
        });
    }

    //取消选中tr改变selectAttr,颜色
    function unselectBaseTrStyle(tr){

        //设置checkbox或radio取消选中
        var input = tr.find("input");

        if(input.length > 0){//判断input是否存在
            input.prop("checked",false);
        }
        //设置为选中
        tr.attr("selectAttr","false");
        //改变tr的背景颜色
        tr.css("background-color","#FEFEFE");
        //先解绑
        tr.unbind("mouseenter").unbind("mouseleave");
        //再绑定
        $(tr).bind({
            mouseenter: function(e) {
                tr.css("background-color","#f9f9f9");
            },
            mouseleave: function(e) {
                tr.css("background-color","#FEFEFE");
            }
        });
    }

    //根据options,去获取是否有checkbox,radio等html
    function getCheckBoxOrRadioHtml(globalOption){

        //判断是checkbox还是radio还是无
        var checkboxHtml = "";
        if(globalOption.isShowCheckbox == true && globalOption.isShowRadio == false){
            checkboxHtml += '<div class="cmcc_checkbox1 check_ml_mr"><label class="cmcc_check_model1"><input type="checkbox" value="1" /></label></div>';
        }else if(globalOption.isShowCheckbox == false && globalOption.isShowRadio == true){
            checkboxHtml += '<div class="cmcc_radio_box1 radio_ml_mr"><label class="cmcc_radio_model1"><input type="radio" value="1" /></label></div>';
        }else{
            checkboxHtml = "";
        }
        return checkboxHtml;
    }

    //获取table的tbody中的tr
    function getTableContentTr(globalOption,rows,titleArray,checkboxHtml,currentRowsL){

        //tr的content
        var tableContent = "";
        //第几行
        var curRowsNum = 0;
        //拼接row行号,判断是否是在原有的row的基础上进行拼接行
        if(currentRowsL){
            curRowsNum = currentRowsL;
        }

        //是否拼接行号
        if(globalOption.isShowRowNumbers == true){

            //有多少行
            for(var i = 0; i < rows.length; i++){

                //第几行
                var rowNumber = (((curRowsNum-0)+(i-0))-0) + 1;

                var selectAttr = false;

                var row = rows[i];//rows就是请求回来的json数组,row就是json数组中的一条数据
                var rowString = JSON.stringify(row);

                tableContent +='<tr' + ' rowAttr=' + rowString +' selectAttr=' + selectAttr  +' class="table-tr table-tr1">';

                //有多少列
                for(var l = 0;l < titleArray.length;l++){

                    var column = titleArray[l];//column: options中的columns数组的一个元素
                    var field = row[column.field];//column.field: 就是column中的键filed中值; row[column.field]就是获取一条json数据中的值

                    if((globalOption.isShowCheckbox == true &&globalOption.isShowRadio == false) || (globalOption.isShowCheckbox == false &&globalOption.isShowRadio == true)){

                        if(l == 0){
                            tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ rowNumber + '</td>';

                        }else if(l == 1){
                            tableContent +='<td width="35px"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">' + checkboxHtml +'</td>';
                        }else{
                            //判断是否有formatter
                            if(column.formatter && typeof column.formatter == "function"){

                                tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ column.formatter(row,i,field) + '</td>';
                            }else{
                                tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ field + '</td>';
                            }
                        }
                    }else{

                        if(l == 0){
                            tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ rowNumber + '</td>';
                        }else{
                            //判断是否有formatter
                            if(column.formatter && typeof column.formatter == "function"){

                                tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ column.formatter(row,i,field) + '</td>';
                            }else{
                                tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ field + '</td>';
                            }
                        }
                    }
                }
                tableContent += '</tr>';
            }

        }else{

            //有多少行
            for(var i = 0; i < rows.length; i++){

                var selectAttr = false;

                var row = rows[i];
                var rowString = JSON.stringify(row);

                tableContent +='<tr' + ' rowAttr=' + rowString  + ' selectAttr=' + selectAttr +' class="table-tr table-tr1">';

                //有多少列
                for(var l = 0;l < titleArray.length;l++){

                    var column = titleArray[l];
                    var field = row[column.field];

                    if(l == 0){//table content的第一列

                        if((globalOption.isShowCheckbox == true &&globalOption.isShowRadio == false) || (globalOption.isShowCheckbox == false &&globalOption.isShowRadio == true)){//只要是第一列,并且有checkbox或radio,这需要显示
                            tableContent +='<td width="35px"'+' style="white-space: nowrap;text-align:'+ field.textAlign+';height:'+field.height+'"' + ' class="table-td">' + checkboxHtml +'</td>';
                        }else{//没有的话就显示内容
                            //判断是否有formatter
                            if(column.formatter && typeof column.formatter == "function"){

                                tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ column.formatter(row,i,field) + '</td>';
                            }else{
                                tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ field + '</td>';
                            }
                        }
                    }else{
                        //判断是否有formatter
                        if(column.formatter && typeof column.formatter == "function"){

                            tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ column.formatter(row,i,field) + '</td>';
                        }else{
                            tableContent += '<td width="'+ column.width +'"'+' style="white-space: nowrap;text-align:'+ column.textAlign+';height:'+column.height+'"' + ' class="table-td">'+ field + '</td>';
                        }
                    }
                }
                tableContent += '</tr>';
            }
        }
        return tableContent;
    }

    //将所有插件的方法放在一起
    var methods = {
        //初始化
        init: function (options) {

            return this.each(function () {
                $(window).bind('custom.createTableHtml');
                var target = $(this);
                var elementId = target.attr("id");
                //存储options
                $(this).data(elementId,options);

                buildTable(options,target);
            });
        },

        //销毁插件
        destroy: function () {
            return this.each(function () {
                $(window).unbind('.createTableHtml');
            })
        },

        //获取options
        getOptions:function(){
            var target = $(this);
            var elementId = target.attr("id");
            var options = $(this).data(elementId);
            return options;
        },

        //加载本地数据，旧的行会被移除
        loadData:function(data){

            if(data != "" && data != null && data != undefined){

                var target = $(this);
                var elementId = target.attr("id");
                var options = $(this).data(elementId);
                var titleArray = options.columns;

                buildTableContent(data,target,options,titleArray);
                //绑定事件
                bindEvent(target,options,data);
            }
        },

        //重新加载整个table,包括分页
        reload:function(){
            var target = $(this);
            var elementId = target.attr("id");
            var options = $(this).data(elementId);

            //先将原来的树置空
            $(target).html("");
            buildTable(options,target);
        },

        //获取数据请求成功之后的data
        getData:function(){
            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;

            //获取input里面存储的字符串
            var data = JSON.parse($(elementIdString +'-input').val());
            return data;
        },

        //当前页全部选中,单选框radio不支持此方法,因为radio没有必要进行全选
        selectAll:function(){

            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;
            var options = $(this).data(elementId);

            if(options.isShowCheckbox == true && options.isShowRadio == false){

                $(elementIdString + ' .table-tr1').each(function(){

                    var tr = $(this);
                    tr.children(0).children(0).children(0).addClass("cmcc_check_on1");
                    selectBaseTrStyle(tr);
                });

            }else if((options.isShowCheckbox == false && options.isShowRadio == false) || (options.isShowCheckbox == true && options.isShowRadio == true)){

                $(elementIdString + ' .table-tr1').each(function(){
                    var tr = $(this);
                    selectBaseTrStyle(tr);
                });
            }
        },

        //取消当前页的全部选中
        unselectAll:function(){

            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;
            var options = $(this).data(elementId);

            if(options.isShowCheckbox == true && options.isShowRadio == false){

                $(elementIdString + ' .table-tr1').each(function(){
                    var tr = $(this);
                    tr.children(0).children(0).children(0).removeClass("cmcc_check_on1");
                    unselectBaseTrStyle(tr);
                });

            }else if(options.isShowCheckbox == false && options.isShowRadio == true){

                $(elementIdString + ' .table-tr1').each(function(){
                    var tr = $(this);
                    tr.children(0).children(0).children(0).removeClass("cmcc_radio_on1");
                    unselectBaseTrStyle(tr);
                });

            }else{
                $(elementIdString + ' .table-tr1').each(function(){
                    var tr = $(this);
                    unselectBaseTrStyle(tr);
                });
            }
        },

        //选中指定的行
        selectRow:function(selectIndex){

            if(selectIndex != "" && selectIndex != null && selectIndex != undefined){

                var target = $(this);
                var elementId = target.attr("id");
                var elementIdString = '#'+elementId;
                var options = $(this).data(elementId);

                if(options.isShowCheckbox == true && options.isShowRadio == false){

                    $(elementIdString + ' .table-tr1').each(function(){
                        var tr = $(this);
                        var currentIndex = tr.index();
                        if(currentIndex == selectIndex){
                            tr.children(0).children(0).children(0).addClass("cmcc_check_on1");
                            selectBaseTrStyle(tr);
                        }
                    });

                }else if(options.isShowCheckbox == false && options.isShowRadio == true){

                    $(elementIdString + ' .table-tr1').each(function(){
                        var tr = $(this);
                        var currentIndex = tr.index();
                        if(currentIndex == selectIndex){
                            tr.children(0).children(0).children(0).addClass("cmcc_radio_on1");
                            selectBaseTrStyle(tr);
                        }
                    });

                }else{
                    $(elementIdString + ' .table-tr1').each(function(){
                        var tr = $(this);
                        var currentIndex = tr.index();
                        if(currentIndex == selectIndex){
                            selectBaseTrStyle(tr);
                        }
                    });
                }
            }
        },

        //取消选中某一行
        unselectRow:function(unselectIndex){

            if(unselectIndex != "" && unselectIndex != null && unselectIndex != undefined){

                var target = $(this);
                var elementId = target.attr("id");
                var elementIdString = '#'+elementId;
                var options = $(this).data(elementId);

                if(options.isShowCheckbox == true && options.isShowRadio == false){

                    $(elementIdString + ' .table-tr1').each(function(){
                        var tr = $(this);
                        var currentIndex = tr.index();
                        if(currentIndex == unselectIndex){
                            tr.children(0).children(0).children(0).removeClass("cmcc_check_on1");
                            unselectBaseTrStyle(tr);
                        }
                    });

                }else if(options.isShowCheckbox == false && options.isShowRadio == true){

                    $(elementIdString + ' .table-tr1').each(function(){
                        var tr = $(this);
                        var currentIndex = tr.index();
                        if(currentIndex == unselectIndex){
                            tr.children(0).children(0).children(0).removeClass("cmcc_radio_on1");
                            unselectBaseTrStyle(tr);
                        }
                    });

                }else{
                    $(elementIdString + ' .table-tr1').each(function(){
                        var tr = $(this);
                        var currentIndex = tr.index();
                        if(currentIndex == unselectIndex){
                            unselectBaseTrStyle(tr);
                        }
                    });
                }
            }
        },

        //获取当前页所有的rows
        getRows:function(){
            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;

            //用数组来存储选中的li
            var rows = [];

            $(elementIdString + ' .table-tr1').each(function(){
                var selectAttr = JSON.parse($(this).attr("selectAttr"));
                //获取row
                var row = JSON.parse($(this).attr("rowAttr"));
                //添加选中的tr
                row["target"] = $(this);
                rows.push(row);
            });

            if(rows.length > 0){
                return rows;
            }else{
                return null;
            }
        },

        //向table最后行添加行
        appendRow:function(rows){

            if(rows != "" && rows != null && rows != undefined){

                var target = $(this);
                var elementId = target.attr("id");
                var elementIdString = '#'+elementId;
                var options = $(this).data(elementId);

                var globalOption = options;
                var titleArray = options.columns;

                //根据options,获取是否有checkbox,radio等html
                var checkboxHtml = getCheckBoxOrRadioHtml(globalOption);

                //获取当前有多少行
                var currentRows = $(this).createTableHtml("getRows");
                //获取tr
                var tableContentTr = getTableContentTr(globalOption,rows,titleArray,checkboxHtml,currentRows.length);

                if(tableContentTr){
                    //往table tbody中添加 tr
                    $(elementIdString + '-div '+ elementIdString + '-table tbody').append(tableContentTr);
                    if(globalOption.isShowBorderDivider == true){
                        //$(elementIdString+'-div '+elementIdString+'-table' + ' td').addClass("custom-table-divider");
                        $(elementIdString+'-div '+elementIdString+'-table' + ' td').css("border-right","1px solid #ccc");
                    }
                    //绑定事件
                    bindEvent(target,globalOption,rows);
                }
            }
        },

        //删除指定的行,index从0开始
        deleteRow:function(deleteIndex){

            if(deleteIndex != null && deleteIndex != null && deleteIndex != undefined){

                var target = $(this);
                var elementId = target.attr("id");
                var elementIdString = '#'+elementId;

                $(elementIdString + '-div ' + elementIdString + '-table tbody tr:eq(' + deleteIndex + ')').remove();
            }
        },

        //插入行,index就是插入的行要显示的索引
        insertRow:function(opts){

            //插入的rows
            var rows = opts.rows;
            //插入的索引
            var insertIndex = opts.index;

            if(rows && insertIndex){

                var target = $(this);
                var elementId = target.attr("id");
                var elementIdString = '#'+elementId;
                var options = $(this).data(elementId);

                var globalOption = options;
                var titleArray = options.columns;

                //根据options,获取是否有checkbox,radio等html
                var checkboxHtml = getCheckBoxOrRadioHtml(globalOption);

                //插入之前,当前有多少行
                var currentRows = $(this).createTableHtml("getRows");
                //判插入的index的是否超过当前行的总数减1,因为从索引第一个从0开始
                if(!currentRows){
                    insertIndex = 0;
                }else if((currentRows.length-0-1) < insertIndex){//插入索引超过的话,就接在最后一行
                    insertIndex = currentRows.length;
                }
                //获取tr
                var tableContentTr = getTableContentTr(globalOption,rows,titleArray,checkboxHtml,insertIndex);

                if(tableContentTr){
                    //往table tbody中添加 tr
                    if(insertIndex){//判断是否有指定index
                        //插入之前,当前有多少行
                        if(currentRows && (currentRows.length-0-1) >= insertIndex){//没有超过当前所有行总数就插入
                            insertIndex = (insertIndex-0)-1;
                            //往tbody中添加tr
                            $(elementIdString + '-div '+ elementIdString +'-table tbody' + ' tr:eq(' + insertIndex + ')').after(tableContentTr);
                            if(globalOption.isShowRowNumbers == true){
                                //获取新的index,用来改变行号
                                var newIndex = (insertIndex-0) + (rows.length-0);
                                $(elementIdString + ' .table-tr1').each(function(){
                                    var tr = $(this);
                                    var currentIndex = tr.index();
                                    if(currentIndex > newIndex){//在新行后面的行,需要改变行号
                                        tr.find("td:first").text(currentIndex-0+1);
                                    }
                                });
                            }
                        }else{//超过就接在最后一行
                            $(elementIdString + '-div '+ elementIdString + '-table tbody').append(tableContentTr);
                        }

                    }else{//没有指定索引值,也接在最后一行
                        $(elementIdString + '-div '+ elementIdString + '-table tbody').append(tableContentTr);
                    }

                    if(globalOption.isShowBorderDivider == true){
                        //$(elementIdString+'-div '+elementIdString+'-table' + ' td').addClass("custom-table-divider");
                        $(elementIdString+'-div '+elementIdString+'-table' + ' td').css("border-right","1px solid #ccc");
                    }
                    //绑定事件
                    bindEvent(target,globalOption,rows);
                }
            }
        },

        //更新row,index更新行的索引,行的数据row
        updateRow:function(opts){
            //更新索引
            var updateIndex = opts.index;
            //更新的row数据
            var row = opts.row;

            if(updateIndex && row && row.length > 0){
                //先删除
                $(this).createTableHtml("deleteRow",updateIndex);
                //拼接新的opts
                var newOpts = {
                    "index":updateIndex,
                    "rows":row
                };
                //再插入
                $(this).createTableHtml("insertRow",newOpts);
            }
        },

        //获取选中的row
        getSelected:function(){
            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;

            //用数组来存储选中的li
            var rows = [];

            $(elementIdString + ' .table-tr1').each(function(){
                var selectAttr = JSON.parse($(this).attr("selectAttr"));

                if(selectAttr == true){//被选中
                    //获取row
                    var row = JSON.parse($(this).attr("rowAttr"));
                    //添加选中的tr
                    row["target"] = $(this);
                    rows.push(row);
                }
            });

            if(rows.length > 0){
                return rows;
            }else{
                return null;
            }
        }
    };

    //自定义插件
    $.fn.createTableHtml = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.createTableHtml');
        }
    };

})(jQuery);
