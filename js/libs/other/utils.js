/**
 * 工具模块
 */


	(function($){
		$.extend($,{
			ajaxPost:function(servlet, param, succ,err){
                if(typeof(param)=="function"){
                    err=succ;
                    succ=param;
					param=null;
                }
                $.ajax({
                    url:servlet+"?r="+(new Date().getTime()),
                    data:param,
                    type:"post",
                    dataType:"json",
                    success: function(data){
                        if(typeof(succ)!="undefined"){
                            succ.call(this,data);
                        }
                    },
                    error:function(e){
                        if(typeof(err)!="undefined"){
                            err.call(this,e);
                        }
                    }
                });
            },
            ajaxCall:function(servlet, param, succ,err){
                if(typeof(param)=="function"){
                    err=succ;
                    succ=param;
                    param=null;
                }
                $.ajax({
                    url:servlet,
                    data:param,
                    type:"get",
                    jsonp:"callbackparam",
                    jsonpCallback:"success_jsonpCallback",
                    dataType:"jsonp",
                    success: function(data){
                        if(typeof(succ)!="undefined"){
                            succ.call(this,data);
                        }
                    },
                    error:function(e){
                        if(typeof(err)!="undefined"){
                            err.call(this,e);
                        }
                    }
                });
            },
            ajaxGet:function(servlet, param, succ,err){
                if(typeof(param)=="function"){
                    err=succ;
                    succ=param;
					param=null;
                }
                $.ajax({
                    url:servlet+"?r="+(new Date().getTime()),
                    data:param,
                    type:"get",
                    dataType:"json",
                    success: function(data){
                        if(typeof(succ)!="undefined"){
                            succ.call(this,data);
                        }
                    },
                    error:function(e){
                        if(typeof(err)!="undefined"){
                            err.call(this,e);
                        }
                    }
                });
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
            isAndroid:function(){
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/Android/i) == 'android'){ 
                return true; 
                }
                return false; 
            },
            isIOS:function(){
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/iPhone/i) == 'iphone'){ 
                return true; 
                }
                return false; 
            },
            getOS:function(){
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/iPhone/i) == 'iphone'||ua.match(/iPad/i)=='ipad'){ 
                    return 1; 
                }else if(ua.match(/Android/i)=='android'){
                    return 2;
                }else if(ua.match(/Windows/i=='windows')||ua.match(/Linux/i=='linux')||ua.match(/Macintosh/i=='macintosh')){
                    return 3;
                }
            },
            getOSName:function(){
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/iPhone/i) == 'iphone'||ua.match(/iPad/i)=='ipad'){ 
                    return "iOS"; 
                }else if(ua.match(/Android/i)=='android'){
                    return "Android";
                }else if(ua.match(/Windows/i=='windows')||ua.match(/Linux/i=='linux')||ua.match(/Macintosh/i=='macintosh')){
                    return "Other";
                }
            },
            getRange:function(id){
                var str="全省";
                switch(id){
                    case "1":
                        str="全省";
                    break;
                    case "2":
                    break;
                    case "3":
                       str="固定地点";
                    break;
                }
                return str;
            },
            getDateTime:function(){
                var time=new Date(),
                    year=time.getFullYear(),
                    month=time.getMonth()+1,
                    day=time.getDate(),
                    hour=time.getHours(),
                    minute =time.getMinutes(),
                    second =time.getSeconds();
                 month=month<10?"0"+month:month,
                 day=day<10?"0"+day:day,
                 hour=hour<10?"0"+hour:hour,
                 minute=minute<10?"0"+minute:minute,
                 second=second<10?"0"+second:second;
                return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
            },
            isEmpty:function(str){
                if(str==null||str==""||str=="undefined"){
                    return true;
                }
                return false;
            },
            getKey:function(json){
                for(var key in json){
                    return key;
                }
            },
            getValue:function(json){
                
            },
            isParamUrl:function(url){
                
            },
            getUrlParam:function(name){
              var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
              var r = window.location.search.substr(1).match(reg);
              if (r != null) {
                  return unescape(r[2]);
              }
              return null;  
            },
            loading:function(isShow){
                 if(isShow){
                    $('.loader').remove();
                    $('<div class="loader loading"></div>').appendTo("body");
                }else{
                    $('.loader').remove();
                }
            },
            getUUID:function(len, radix) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;
            
                if (len) {
                  // Compact form
                  for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
                } else {
                  // rfc4122, version 4 form
                  var r;
            
                  // rfc4122 requires these characters
                  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                  uuid[14] = '4';
            
                  // Fill in random data.  At i==19 set the high bits of clock sequence as
                  // per rfc4122, sec. 4.1.5
                  for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                      r = 0 | Math.random()*16;
                      uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                  }
                }
            
                return uuid.join('');
            }
		});
	})($);

