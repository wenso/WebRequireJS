/**
 * 工具模块
 */
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
    ajaxHeader:function(servlet, param, succ,err){
        if(typeof(param)=="function"){
            err=succ;
            succ=param;
            param=null;
        }
        $.ajax({
            url:servlet,
            data:"",
            type:"get",
            dataType:"json",
            beforeSend:function (xhr) {

                 xhr.setRequestHeader("encstr", param.encstr);
            },
            success: function(data,status,xhr){
                if(typeof(succ)!="undefined"){
                    succ.call(this,data);
                }
            },
            error:function(e,d,f){
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
    toDateTime:function(str){
        if(str&&str!=""){
            str = str.replace(/-/g,"/");
            return new Date(str);
        }
        return new Date();
    },
    formatTime2:function(str){
      if(str&&str!=""){//20160919205248
          year=str.substr(0,4);
          month=str.substr(4,2);
          day=str.substr(6,2);
          hour=str.substr(8,2);
          minute=str.substr(10,2);
          second=str.substr(12,2);
          return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
      }
      return "";
    },
    toDateTime2:function(str){
      if(str&&str!=""){//20160919205248
          year=str.substr(0,4);
          month=str.substr(4,2);
          day=str.substr(6,2);
          hour=str.substr(8,2);
          minute=str.substr(10,2);
          second=str.substr(12,2);
          return new Date(year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second);
      }
      return "";
    },
    formatTime3:function(str,type){
      if(str&&str!=""){//20160919205248
          year=str.substr(0,4);
          month=str.substr(4,2);
          day=str.substr(6,2);
          switch(type){
              case 1:
              return year+"年"+parseInt(month)+"月"+parseInt(day)+"日";
              break;
              case 2:
              return parseInt(month)+"月"+parseInt(day)+"日";
              break;
              case 3:
              return parseInt(day)+"日";
              break;
              case 4:
              return year+"年";
              break;
              default:
              return year+"/"+month+"/"+day;
              break;
          }
      }
      return "";
    },
    formatTime:function(str,format){
        if(str&&str!=""){
        var time=this.toDateTime(str);
        var year=time.getFullYear(),
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
        return year+"-"+month+"-"+day;
        }
        return "";
    },
    mkArr:function(str,code){
      var code=code?code:"|";
      if(str){
          if(str.indexOf(code)>-1){
            return str.split(code);
          }else{
            return [str];
          }
      }else{
          return [""];
      }
    },

    showShortText:function(str){
        var num=30;
        if(str.length > num){
           str =str.substring(0,num)+"...";
        }
        return str;
    },
    checkLocalEtag:function(key,data){
        var dataStorage=window.localStorage.getItem(key);
        if(dataStorage){
            var dataStorageJson=JSON.parse(dataStorage);
            if(parseInt(data.etag)>parseInt(dataStorageJson.etag)){
                window.localStorage.setItem(key,JSON.stringify(data));
                return true;
            }
        }else{
            window.localStorage.setItem(key,JSON.stringify(data));
            return true;
        }
    },
    checkFlag:function(key){
        var dataStorage=window.localStorage.getItem(key);
        if(dataStorage){
            return true;
        }else{
            return false;
        }
    },
    getFlagByKey:function(key){
        return window.localStorage.getItem(key);
    },
    setFlagByKey:function(key,data){
        window.localStorage.setItem(key,data);
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
		showImg:function(type,url){
				var imgUrl="";
				switch(type){
						case 0:
						if(url&&url!=""){
								imgUrl=url;
						}else{
								imgUrl="../theme/web/no_0_pic.png";
						}
						break;
						case 1:
						if(url&&url!=""){
								imgUrl=url;
						}else{
								imgUrl="../theme/web/no_1_pic.png";
						}
						break;
						case 2:
						if(url&&url!=""){
								imgUrl=url;
						}else{
								imgUrl="../theme/web/no_2_pic.png";
						}
						break;
						default:
						break;
				}
				return imgUrl;
		},
		showTag:function(tags){
				//tags="1|2";
				var tagArr= this.mkArr(tags);
				var size=tagArr.length;
				var strs=[];
				for(var i=0;i<size;i++){
						if(i>1){
								break;
						}
						var tag= tagArr[i];

						switch(tag){
								case "1":
								strs.push('<span class="act_tag c_1">流量</span>');
								break;
								case "2":
								strs.push('<span class="act_tag c_2">积分</span>');
								break;
								case "3":
								strs.push('<span class="act_tag c_3">话费</span>');
								break;
								case "4":
								strs.push('<span class="act_tag c_4">宽带</span>');
								break;
								case "5":
								strs.push('<span class="act_tag c_5">手机</span>');
								break;
								case "6":
								strs.push('<span class="act_tag c_6">电子卷</span>');
								break;
								case "7":
								strs.push('<span class="act_tag c_7">通话时长</span>');
								break;
								default:
								break;
						}
				}
				return strs.join("");
		},
    getUrlParam:function(name){
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return unescape(r[2]);
      }
      return null;
    },

    getSineDay:function(str,today){
        var time=this.toDateTime(str);
        var now=new Date();

        var sineSecond=time.getTime()-now.getTime();
        return today?Math.floor(sineSecond/(24*3600*1000))+1:Math.floor(sineSecond/(24*3600*1000));
    },
    getSineDay2:function(str,today){
        var time=this.toDateTime2(str);
        var now=new Date();

        var sineSecond=time.getTime()-now.getTime();
        return today?Math.floor(sineSecond/(24*3600*1000))+1:Math.floor(sineSecond/(24*3600*1000));
    },
    formatDay:function(day){
      if(day>365){
         var year=Math.floor(day/365);
         return '距结束'+year+'年';
      }else if(day<365&&day>=31){
         var month=Math.floor(day/31);
         return '距结束'+month+'个月';
      // }else if(day<31&&day>7){
         // return '距结束'+day+'天';
      }else{
         return '距结束<span style="color:#ff0000">'+day+'天</span>';
      }
    },
    formatCount:function(num){
      // if(num>=100000){
          // return "10万+";
      // }else if(num<100000&&num>=10000){
          // return num.substr(0, 1)+"万+";
      // }else{
          // return num;
      // }
      return num;
    },
    //获取滚动条位置
    getScrollT:function(){
    	var scrollTop=0;
    	if(document.documentElement&&document.documentElement.scrollTop){
    		scrollTop=document.documentElement.scrollTop;
    	}else if(document.body){
    		scrollTop=document.body.scrollTop;
    	}
    	return scrollTop;
    },
    //获取可视范围高度
    getClientH:function(){
    	var clientH=0;
    	if(document.body.clientHeight&&document.documentElement.clientHeight){
    		clientH=Math.min(document.body.clientHeight,document.documentElement.clientHeight);
    	}else{
    		clientH=Math.max(document.body.clientHeight,document.documentElement.clientHeight);
    	}
    	return clientH;
    },
    //获取整个文档高度
    getScrollH:function(){
    	return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
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
