requirejs.config({
    //相对根目录
    baseUrl:'../js/libs',
    //map在任何模块之前，都先载入这个模块
    map: { 
        '*': {
            css: 'css/0.1.10/css.min'
        }
    },
    //通过配置灵活加载对应版本组件
    paths:{
        app:'../apps',
        jquery:'jquery/3.4.1/jquery.min',
        //可以根据useragent加载不同类型的组件
        //jquery: RegExp(" AppleWebKit/").test(navigator.userAgent) ? '/zepto/1.1.6/zepto' : '/js/jquery/2.1.3/jquery',
        query:'query/2.1.7/query',
        fn:'../component/fn',
        mob:'mob/1.0.0/mob',
        utils:'common/utils',
        fastclick:'fastclick/1.0/fastclick',
        swiper:'swipe/3.4.0/swiper'
    },
    //处理依赖问题
    shim: {
        //让jquery依赖样式表
        'jquery':['css!../../theme/globel.css','css!../../theme/style.css'],
        'fn': ['jquery'],
        'utils': ['jquery'],
        'query':['jquery'],
        'swiper':['jquery']
    },
    //解决url缓存问题
    urlArgs:"v=13",
    waitSeconds: 0
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    var reloadFun=function(){
        window.location.reload();
    };
    //超时提示
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
        var loadingObj=document.querySelector(".loader");
        var divObj=document.createElement("div");
        document.body.removeChild(loadingObj);
        divObj.setAttribute("class","loader loaded");
        divObj.innerHTML='<span>加载资源失败</span><p>重新加载</p>';
        divObj.addEventListener('click',reloadFun , false);
        
        document.body.appendChild(divObj);
    }
};