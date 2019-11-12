define(function(require) {
    var $=require('jquery');
    var utils=require('utils');
    var fn=require('fn');
    
    var app={   
        init:function(){
           var verCode = $.getUrlParam("ve");
           if(verCode){
            verCode=parseInt(verCode); 
            if(verCode<58){
                alertDialog({
                    content : '<p style="text-align:center">您的客户端版本过低，请升级到最新版本。</p>',
                    button : []
                    });
                }
            }
            function alertDialog(data) {
                $(".art_dialog").remove();
                if(!data){
                    return;
                }
                this.hide = function() {
                    $(".art_dialog").remove();
                };
                this.close = function() {
                    $(".art_dialog").remove();
                };
                this.ok = function() {
                    if (data.ok && typeof (data.ok) == "function") {
                        data.ok.call(this);
                    } else {
                        hide();
                    }
                };
                this.cancel = function() {
                    if (data.cancel && typeof (data.cancel) == "function") {
                        data.cancel.call(this);
                    } else {
                        hide();
                    }
                };
            
                var dialog = $('<div class="art_dialog"></div>');
                var box = $('<div class="dialog_box"></div>').appendTo(dialog);
                var content = $('<div class="dialog_content"></div>').appendTo(box);
                var table = $('<table class="btns"></table>').appendTo(box);
                var btns = $('<tr></tr>').appendTo(table);
            
                content.html(data.content);
                var cancel_text = data.cancel_text ? data.cancel_text : "取消";
                var ok_text = data.ok_text ? data.ok_text : "确定";
                if (data.button) {
                    if (data.button.length > 0) {
                        var percent = 100 / data.button.length + "%";
                        $.each(data.button, function(i, v) {
                            var btn = $('<td style="width:' + percent + '"><a href="javascript:void(0);">' + v.btn_text + '</a></td>').appendTo(btns);
                            if (v.callback && typeof (v.callback) == "function") {
                                btn.bind("click", v.callback);
                            } else {
                                btn.bind("click", hide);
                            }
            
                        });
                    } else {
                        $('<td style="width:100%"></td>').appendTo(btns);
                    }
                } else {
                    var cancelBtn = $('<td style="width:50%"><a href="javascript:void(0);">' + cancel_text + '</a></td>').appendTo(btns);
                    var okBtn = $('<td style="width:50%"><a href="javascript:void(0);" style="border-right:1px solid #c2c2c2;">' + ok_text + '</a></td>').appendTo(btns);
                    okBtn.bind("click", ok);
                    cancelBtn.bind("click", cancel);
            
                }
            
                dialog.appendTo($("body")).show();
                box.css("margin-left", -box.width() / 2);
                box.css("margin-top", -box.height() / 2);
            
                return this;
            }
        }
    };
    return app;
});