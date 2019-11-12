/**
 * Created by wensochina on 2017/4/24.
 */
(function(windows,document){
    window.MOB=window.MOB||{};
    MOB.utils={
        log:function(tag,str){
            console.log(tag+">>"+str);
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
                MOB.utils.log("运行环境：未在客户端内执行！");
            }
            if(ua.match(/iPhone/i) == 'iphone'||ua.match(/iPad/i)=='ipad'){
                return 1;
            }else if(ua.match(/Android/i)=='android'){
                return 2;
            }else if(ua.match(/Windows/i=='windows')||ua.match(/Linux/i=='linux')||ua.match(/Macintosh/i=='macintosh')){
                return 3;
            }
        },
        isDeviceMotion:function(){
            if(window.DeviceMotionEvent){
                return true;
            }
            MOB.utils.log('运行环境：本设备不支持devicemotion事件');
            return false;
        },
        getUrlParam:function(key) {
            var url=window.location.search.substr(1);
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var params = url.match(reg);  //匹配目标参数
            if (params != null) return decodeURI(params[2]); return null; //返回参数值
        }
    };
    var MobBridger=null;
    var MobBridgeRegister=function(callback){
        if (window.WebViewJavascriptBridge) { return callback.call(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe);}, 0);
    };
    var MobCallHandler=function(func,opts,callback){
        if(opts){
            if(typeof(opts)=="function"){
                MobBridger.callHandler(func,{},function(response){
                    opts.call(this,response);
                });
            }else{
               if(callback){
                   MobBridger.callHandler(func,opts,function(response){
                       callback.call(this,response);
                   });
               }else{
                   MobBridger.callHandler(func,opts,function(response){});
               }
            }
        }else{
            MobBridger.callHandler(func,{},function(response){});
        }
    };
    var mob=function(){
        this.init();
        MobBridgeRegister(function(bridge){
            MobBridger=bridge;
            MobBridger.registerHandler("gpsUpdate",function(data,responseCallback){
                responseCallback(data);
            });
        });
    };
    mob.prototype={
        init:function(){},
        shareWXMoments:function(opts){
            MobCallHandler('shareWXMoments',opts);
        },
        share:function(opts){
            MobCallHandler('share',opts);
        },
        shareWXFirends:function(opts){
            MobCallHandler('shareWXFirends',opts);
        },
        shake:function(){
            MobCallHandler('shake',opts);
        },
        closeWindow:function(){
            MobCallHandler('closeWindow');
        },
        backWindow:function(){
            MobCallHandler('backWindow');
        },
        login:function(){
            MobCallHandler('login');
        },
        getUU:function(opts,callback){
            if(typeof(opts)=="function"){
                MobCallHandler('getUserInfo',{'type':'0'},opts);     
            }else{
                MobCallHandler('getUserInfo',opts,callback);
            }
        },
        taskMessage:function(opts){
            MobCallHandler('taskMessage',opts);
        },
        jsCall:function(opts,callback){
            MobCallHandler('jsCall',opts,callback);
        },
        getAMapLocation:function(callback){
            MobCallHandler('getAMapLocation',callback);
        },
        getLocation:function(callback){
            MobCallHandler('getLocation',callback);
        }
    };
    window.MobBridge=new mob();
}(window,document));