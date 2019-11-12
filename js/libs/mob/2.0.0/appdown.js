(function(window,undefined){
    var root,
    document = window.document,
    location = window.location,
    navigator = window.navigator;

    var wui=function(selector){
        return new wui.fn.init(selector);
    };
    wui.fn=wui.prototype={
        version:"1.1.0",
        url:"http://app.i-liaoning.com.cn/wj-app-info/download.html",
        selector:null,
        config:{
            "channel":"",
            "view":"40000006",
            "op":"",
            "b_txt":"打开"
        },
        constructor:wui,
        init:function(selector){

            //参数处理
            //this.setChannel(channel);
            //this.setView(view);
            //this.setOP(op);
            //处理选择
            if(typeof selector==="string"){
                if(selector === "body"){
                    this.selector=document.body;
                    this.type="0";
                }else{
                    this.selector=document.getElementById(selector);
                    this.type="1";
                }
            }
            return this;
        },
        build:function(opts){
            wui.extend(this.config,opts);
            this.selector.appendChild(this.mkHtml(this.type));
        },
        mkHtml:function(type){
          var elem=null;
          if(type=="0"){
              elem=document.createElement("div");
              elem.setAttribute("style","width:100%;height:60px;background: rgba(0, 0, 0,0.6); position:fixed;bottom:0; padding:10px;") ;
              var html='<div style="width:40px;height:40px; float:left;background-size:100% 100%; background-repeat:no-repeat; background-image:url(http://app.i-liaoning.com.cn/wj-app-info/theme/web/icon_logo.png)"></div>'+
                       '<div style="margin-left:60px; padding:.2em;">'+
                             '<b style="font-size:1.6em; color:#fff;display:block;">和生活爱辽宁客户端</b>'+
                             '<i style="font-size:1em; color:#ccc;display:block; font-style:normal;">一键上网，更快捷，更安全</i>'+
                       '</div>'+
                       '<a href="'+this.url+this.getChannel()+this.getView()+this.getOP()+'" style="border-radius:4px;background:#d21370; color:#fff; font-size:1.2em;padding:.6em; position:absolute; display:inline-block; right:1em;top: 50%;margin-top: -1.2em">'+this.config.b_txt+'</a>';
              elem.innerHTML=html;
          }else{
              elem=document.createElement("a");
              elem.setAttribute('href',this.url+this.getChannel()+this.getView()+this.getOP());
              elem.innerHTML=" 使用客户端登录，更快，更安全";
          }
          return elem;
        },
        getChannel:function(str){
            return this.config.channel?"?channel="+this.config.channel:"?channel=none";
        },
        getView:function(str){
            return this.config.view?"&view="+this.config.view:"&view=40000006";
        },
        getOP:function(){
            return this.config.op?"&op="+this.config.op:"";
        },
        isWX:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }
            return false;
        },
        isApp:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/Neusoft/i) == 'neusoft'){
            return true;
            }
            return false;
        },
        getOS:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/Neusoft/i) != 'neusoft'){
                console.log("运行环境：未在客户端内执行！");
            }
            if(ua.match(/iPhone/i) == 'iphone'||ua.match(/iPad/i)=='ipad'){
                return 1;
            }else if(ua.match(/Android/i)=='android'){
                return 2;
            }else if(ua.match(/Windows/i=='windows')||ua.match(/Linux/i=='linux')||ua.match(/Macintosh/i=='macintosh')){
                return 3;
            }
        }
    };
    wui.extend=wui.fn.extend=function(){
        var option,name,src,copy,
            target=arguments[0]||{},
            length=arguments.length;
            i=1;
        if(typeof target!=="object"){
            target={};
        }
        if(i===length){
            target=this;
            i--;
        }
        for(;i<length;i++){
            if((options=arguments[i])!=null){
                for(name in options){
                    src=target[name];
                    copy=options[name];
                    if(target===copy){
                        continue;
                    }
                    if(copy!==undefined){
                        target[name]=copy;
                    }
                }
            }
        }
        return target;
    };
    wui.fn.init.prototype=wui.fn;
    window.wui=wui;
})(window);
