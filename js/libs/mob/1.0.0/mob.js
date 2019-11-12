var NeusoftMob=(function(){
	window.MOB=window.MOB||{};
	
	MOB.utils={
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
		},
		isDeviceMotion:function(){
			if(window.DeviceMotionEvent){
				return true;
			}
			console.log('运行环境：本设备不支持devicemotion事件');
			return false;
		},
		getUrlParam:function(key) {
            var url=window.location.search.substr(1);
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var params = url.match(reg);  //匹配目标参数
            if (params != null) return decodeURI(params[2]); return null; //返回参数值
        }
	};
	var mob=function(){
		// if (window.WebViewJavascriptBridge) {
			// callback(WebViewJavascriptBridge)
		// } else {
			// document.addEventListener('WebViewJavascriptBridgeReady', function() {
				// callback(WebViewJavascriptBridge)
			// }, false)
		// }
	};
	mob.prototype={
		shareWXMoments:function(opts){
			switch(MOB.utils.getOS()){
				case 1:
					window.WebViewJavascriptBridge.callHandler('shareWXMoments',JSON.stringify(opts), function(response) {});
				break;
				case 2:
					window.bridge.shareWXMoments(JSON.stringify(opts));
				break;
				default:
					console.log("分享朋友圈：不支持的终端类型！");
				break;
			};
		},
		share:function(opts){
			switch(MOB.utils.getOS()){
				case 1:
					window.WebViewJavascriptBridge.callHandler('share',JSON.stringify(opts), function(response) {});
				break;
				case 2:
					window.bridge.share(JSON.stringify(opts));
				break;
				default:
					console.log("分享：不支持的终端类型！");
				break;
			};
		},
		shake:function(){
			switch(MOB.utils.getOS()){
				case 1:
					window.WebViewJavascriptBridge.callHandler('shake',"", function(response){});
				break;
				case 2:
					window.bridge.shake();
				break;
				default:
					console.log("摇一摇反馈：不支持的终端类型！");
				break;
			};
		}
	};
	return mob;
})();