/**
 * 插件模块
 */
define(function (require, exports, moudles) {
    return (function ($) {
            /**
             * 下拉列表
             */
            $.fn.dropDownList=function(options){
                var defaults={
                    data:null,
                    selCss:"curr",
                    css:"drop_down_list",
                    itemClick:null
                };
                var opts=$.extend({},defaults,options);
                return this.each(function(){
                   var $this=$(this);
                   var $box=$('<div class="'+opts.css+'"></div>').appendTo($('body'));
                   $('<span class="arrow_outer"><span class="arrow"></span></span>').appendTo($box);
                   var $ul=$('<ul></ul>').appendTo($box);
                   $.each(opts.data,function(i,v){
                      var item=$('<li class="wui_item"><span>'+v.name+'</span></li>').appendTo($ul);
                      item.data("val",v.value);
                      if(i==0){
                          item.addClass="wui_first";
                      }
                      if(v.value==opts.flag){
                          item.addClass("wui_active");
                          $box.data("val",v.value);
                          $this.html('<span>'+v.name+'</span>');
                      }
                      item.bind("click",function(e){
                          $box.data("val",v.value);
                          $this.html('<span>'+v.name+'</span>');
                          $box.hide();
                          if(opts.itemClick){
                              opts.itemClick.call(this,v.value);
                          }
                          e.stopPropagation();

                      });
                   });
                   $this.bind("click",function(e){
                       if(!$(this).hasClass("wui_open")){
                           $(this).addClass("wui_open");
                           showList($box);
                           $(document).one("click", function(){
                                $box.hide();
                           });
                           e.stopPropagation();
                       }else{
                           $(this).removeClass("wui_open");
                           hideList($box);
                       }

                   });
                });
                function hideList(obj){
                    obj.hide();
                }
                function setSelect(obj,value){
                    var li=obj.find("li");
                    $.each(li,function(i,v){
                       if($(v).data("val")!=value){
                          $(v).removeClass("wui_active");
                       }else{
                          $(v).addClass("wui_active");
                       }
                    });
                }
                function showList(obj){
                    var val=obj.data("val");
                    setSelect(obj,val);
                    obj.show();

                }
            };
            /**
             * 回到顶部按钮
             */
            $.fn.topBtn=function(options){
                var defaults={
                    v:0.1,
                    time:10,
                    height:200
                };

                var opts=$.extend({},defaults,options);
                acceleration = opts.v;
                stime = opts.time;

                return this.each(function(){
                   var $this=$(this);
                   $this.hide();
                   $this.bind("click",function(acceleration,stime){
                       gotoTop(acceleration,stime);
                   });

                   $(window).scroll(function(){  //只要窗口滚动,就触发下面代码
                       var scrollt = document.documentElement.scrollTop + document.body.scrollTop; //获取滚动后的高度
                       if( scrollt >opts.height){  //判断滚动后高度超过200px,就显示
                          $this.fadeIn(200); //淡出
                       }else{
                          $this.stop().fadeOut(200); //如果返回或者没有超过,就淡入.必须加上stop()停止之前动画,否则会出现闪动
                       }
                   });
                });
                function gotoTop(acceleration,stime){
                   var x1 = 0;
                   var y1 = 0;
                   var x2 = 0;
                   var y2 = 0;
                   var x3 = 0;
                   var y3 = 0;
                   if (document.documentElement) {
                       x1 = document.documentElement.scrollLeft || 0;
                       y1 = document.documentElement.scrollTop || 0;
                   }
                   if (document.body) {
                       x2 = document.body.scrollLeft || 0;
                       y2 = document.body.scrollTop || 0;
                   }
                   var x3 = window.scrollX || 0;
                   var y3 = window.scrollY || 0;

                   // 滚动条到页面顶部的水平距离
                   var x = Math.max(x1, Math.max(x2, x3));
                   // 滚动条到页面顶部的垂直距离
                   var y = Math.max(y1, Math.max(y2, y3));

                   // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
                   var speeding = 1 + acceleration;
                   window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));

                   // 如果距离不为零, 继续调用函数
                   if(x > 0 || y > 0) {
                       var run = gotoTop(acceleration, stime);
                       window.setTimeout(run, stime);
                   }
              };
            };
            /**
             * 导航tab
             */
            $.fn.navTab=function(options){
                var defaults={
                  "data":[{
                    "text":"默认",
                    "value":"0"
                  },{
                    "text":"最新",
                    "value":"1"
                  },{
                    "text":"热门",
                    "value":"2"
                  }]
                };
                var opts=$.extend({},defaults,options);
                return this.each(function(){
                    var $this=$(this);
                    var a=$this.children();

                    a.bind("click",function(){
                        var $a=$(this);
                        var val=$a.data("value")+"";
                        if(!$a.hasClass("curr")){
                            $a.addClass("curr");
                            $a.siblings().removeClass("curr");
                            alert("选择了"+val);

                        }
                    });
                });
            };

            /**
             *活动插件
             */

            $.fn.actList=function(options){
                var defaults={
                  "encstr":"",
                  "user_attr":"0",
                  "num":"10",
                  "sort":"4",
                  "activity_tag":"0",
                  "activity_type":"0",
                  "citycode":"",
                  "status":"2",
                  "activity_channel":"0",
                  "isTag":true,
                  "offsetH":60,
                  "lock":true,
                  "loadAfter":null,
                  "page":"1"
                };
                var opts=$.extend({},defaults,options);

                return this.each(function(){
                   $(this).html("");
                   var $ul=$("<ul></ul>").appendTo($(this));
                   $.fn.actList.init($ul,opts);
                });
            };

            $.fn.actList.init=function(obj,opts){
                obj.attr("scrolling","enabled");
                obj.data("page",0);
                obj.data("totalpage",100);
                $(window).scroll(function(e){
                   if(obj.attr("scrolling")=="enabled"&&obj.data("page")<obj.data("totalpage")){
                       $.fn.actList.loadData(obj,opts);
                   }else{
                       e.stopPropagation();
                   }
                });
                $.fn.actList.loadData(obj,opts);
            };

            $.fn.actList.loadData=function(obj,opts){
               var http="../data/list.json";
               var $this=obj;
               var isLoad= $(window).scrollTop()+opts.offsetH >= $(document).height() - $(window).height();

               if(isLoad&&opts.lock){
                       var page=$this.data("page")+1,
                          total=$this.data("totalpage");
                       if(page<=total){

                       opts.lock=false;

                       var param={
                          "encstr":opts.encstr,
                          "user_attr":opts.user_attr,
                          "num":opts.num,
                          "time":"",
                          "sort":opts.sort,
                          "activity_tag":opts.activity_tag,
                          "activity_type":opts.activity_type,
                          "citycode":opts.citycode,
                          "status":opts.status,
                          "activity_channel":opts.activity_channel,
                          "page":page+""
                       };

                       $.ajaxPost(http+opts.citycode,JSON.stringify(param),function(data){
                           $this.wLoading();
                           $this.data("page",parseInt(data.page));
                           $this.data("totalpage",parseInt(data.totalpage));

                           if(data.error_code=="00000"){
                               if(data.activitys.length>0){
                                   $.each(data.activitys,function(i,v){
                                       var status=v.act_status,    //状态
                                           attr=v.user_attr,   //属性
                                           type=v.act_type,  //类型
                                           tag=v.act_tag,    //标签
                                           title=v.act_title,   //标题
                                           name=v.act_name,     //宣传语
                                           stime=v.start_time,  //时间
                                           etime=v.end_time,
                                           utime=v.update_time, //戳
                                           id=v.act_id,         //id
                                           url=v.act_url,    //地址
                                           desc=v.act_desc, //描述
                                           count=v.act_pv,  //跳转次数
                                           smallImg=v.act_logo,
                                           bigImg=v.act_banner,
                                           breviaryImg=v.act_pic,
                                           normalImg="";
                                       var html="";

                                       breviaryImg=$.showImg(0,breviaryImg);
                                       smallImg=$.showImg(1,smallImg);
                                       bigImg=$.showImg(2,bigImg);
                                       stime=$.toDateTime2(stime,"");
                                       var overplus=$.getSineDay2(etime,true);

                                       etime=$.formatDay(overplus);
                                       count=$.formatCount(count);
                                       tag=opts.isTag?$.showTag(tag):"";
                                       var li=$('<li></li>');
                                       var actBox=$('<div class="act_box"></div>').appendTo(li);
                                       //需要再次做一个方法生成tag部分的代码
                                       switch(v.act_css){
                                           case "0":
                                             actBox.addClass('thumb_b');
                                             html='<div class="act_content">'+
                                                  '<div class="thumb">'+
                                                  '<img src="'+ bigImg +'" alt="" title="">'+
                                                  '</div>'+
                                                  '<span class="act_total">'+count+'</span>'+
                                                  tag+
                                                  '<div class="act_other">'+
                                                  '<span class="act_desc">'+ desc +'</span>'+
                                                  '<span class="act_time">'+etime+'</span>'+
                                                  '</div>'+
                                                  '</div>';
                                             actBox.html(html);
                                           break;
                                           case "1":
                                             actBox.addClass('thumb_f');
                                             html='<div class="act_content">'+
                                                  '<p>'+ desc +'</p>'+
                                                  //'<span class="act_tag icon_top">荐</span>'+
                                                  '</div>'+
                                                  '<div class="thumb">'+
                                                  '<img src="'+ bigImg +'" alt="" title="">'+
                                                  '</div>'+
                                                  '<div class="act_other">'+
                                                  '<h1>'+ title +'</h1>'+
                                                  //'<span class="act_time">'+stime+'</span>'+
                                                  tag+
                                                  '<span class="act_total">'+count+'</span>'+
                                                  '</div>';
                                             actBox.html(html);
                                           break;
                                           case "2":
                                             actBox.addClass('thumb_l');
                                             html='<div class="thumb">'+
                                                  '<img src="'+ breviaryImg +'" alt="" title="">'+
                                                  '</div>'+
                                                  '<div class="act_content">'+
                                                  '<h1>'+ title +'</h1>'+
                                                  '<p>'+ desc +'</p>'+
                                                  //'<span class="act_tag icon_hot">热</span>'+
                                                  //'<span class="act_total">'+count+'阅读</span>'+
                                                  '</div>'+
                                                  '<div class="act_other">'+
                                                  '<span class="act_time">'+etime+'</span>'+
                                                  tag+
                                                  '<span class="act_total">'+count+'</span>'+
                                                  '</div>';
                                             actBox.html(html);
                                           break;
                                           default:
                                             actBox.addClass('thumb_l');
                                             html='<div class="thumb">'+
                                                  '<img src="'+ breviaryImg +'" alt="" title="">'+
                                                  '</div>'+
                                                  '<div class="act_content">'+
                                                  '<h1>'+ title +'</h1>'+
                                                  '<p>'+ desc +'</p>'+
                                                  //'<span class="act_tag icon_hot">热</span>'+
                                                  '</div>'+
                                                  '<div class="act_other">'+
                                                  '<span class="act_time">'+etime+'</span>'+
                                                  tag+
                                                  '<span class="act_total">'+count+'</span>'+
                                                  '</div>';
                                             actBox.html(html);
                                           break;
                                       };

                                       li.bind('click',function(){
                                           //访问详情逻辑
                                       });
                                       li.appendTo($this);
                                   });
                               }else{
                                   //$this.html("<div class='error_box'>暂时还没有活动数据哦！</div>");
                               }
                           }
                           $this.loaded(true);
                           opts.lock=true;
                       },function(err){
                           //$this.html("<div class='error_box'>获取数据失败，请检查网络连接是否正常。</div>");
                           $this.loaded(true);
                           opts.lock=true;
                       });
                  }
               }
            };
            /**
             *
              list插件
             */
            $.fn.wList=function(options){
                var defaults={
                    css:"",
                    lastCss:""
                };
                var opts=$.extend({},defaults,options);
                return this.each(function(){

                    var $this=$(this);

                    $this.addClass("wui_list").addClass(opts.css);

                    var $li=$("li",this);
                    $.each($li,function(i,v){
                        $(this).addClass("wui_list_item");
                        $('<span class="icon_arrow"></span>').appendTo($(this));
                        if(i==$li.length-1){
                            $(this).addClass(opts.lastCss);
                        }
                    });
                    $li.bind("touchstart",function(){
                        $(this).addClass("hover");
                    }).bind("touchend",function(){
                        $(this).removeClass("hover");
                    });
                });
            };

            /**
             * 弹框
             */
            $.fn.dataDialog=function(options){
                var defaults={
                    lock:true,
                    css:"art_dialog",
                    ok_text:"确定",
                    cancel_text:"取消",
                    content:null,
                    top:null
                };
                var opts=$.extend({},defaults,options);
                if($("#DataDialog")){
                    $("#DataDialog").remove();
                }

                init(opts);

                function init(opts){
                   var dialog=$('<div id="DataDialog" class="'+opts.css+'"></div>');

                   var box=$('<div class="dialog_box"></div>').appendTo(dialog);
                   var top=$('<div class="dialog_top"></div>').appendTo(box);
                   var content=$('<div class="dialog_content"></div>').appendTo(box);
                   var table=$('<table class="btns"></table>').appendTo(box);
                   var btns=$('<tr></tr>').appendTo(table);

                   if(opts.top){
                       top.html(opts.top);
                   }
                   if(opts.content){
                       opts.content.call(this,content);
                   }
                   var cancel_text=opts.cancel_text?opts.cancel_text:opts.cancel_text;
                   var ok_text=opts.ok_text?opts.ok_text:opts.ok_text;
                   if(opts.button){
                        if(opts.button.length>0){
                            var percent=100/opts.button.length+"%";
                            $.each(opts.button,function(i,v){
                                var btn=$('<td style="width:'+percent+'"><a href="javascript:void(0);">'+v.btn_text+'</a></td>').appendTo(btns);
                                if(v.callback&&typeof(v.callback)=="function"){
                                    btn.bind("click",function(){
                                        v.callback.call(this,content);
                                        hide(dialog);
                                    });
                                }else{
                                    btn.bind("click",function(){
                                        hide(dialog);
                                    });
                                }
                            });
                        }else{
                            $('<td style="width:100%"></td>').appendTo(btns);
                        }
                   }else{
                        var cancelBtn=$('<td style="width:50%"><a href="javascript:void(0);">'+cancel_text+'</a></td>').appendTo(btns);
                        var okBtn=$('<td style="width:50%"><a href="javascript:void(0);">'+ok_text+'</a></td>').appendTo(btns);
                        okBtn.bind("click",function(){
                            ok(dialog);
                        });
                        cancelBtn.bind("click",function(){
                            cancel(dialog);
                        });
                   }
                   dialog.appendTo($("body")).show();
                   box.css("margin-left",-box.width()/2);
                   box.css("margin-top",-box.height()/2);
                };
                function hide(obj){
                    obj.remove();
                };
                function close(obj){
                    obj.remove();
                };
                function ok(obj){
                    if(opts.ok&&typeof(opts.ok)=="function"){
                      opts.ok.call(this);
                    }else{
                      hide(obj);
                    }
                };
                function cancel(obj){
                    if(opts.cancel&&typeof(opts.cancel)=="function"){
                      opts.cancel.call(this);
                    }else{
                      hide(obj);
                    }
                };
            },
            /**
             * 加载效果
             */
            $.fn.loading=function(isShow){
                if(isShow){
                   $('.loader').remove();
                   $('<div class="loader loading"></div>').appendTo("body");
               }else{
                   $('.loader').remove();
               }
            },
            /**
             * 加载失败页面
             */
            $.fn.loaded=function(options){
                $('.loader').remove();
                if(options){
                    $('.loader').unbind("click");
                }else{
                    $('<div class="loader loaded">重新加载</div>').appendTo("body");
                    $('.loader').bind("click",function(){
                       window.location.reload();
                    });
                }
            };
         })($);
});
