/**
 * 帮助模块
 */
define(function(require) {
	var $=require('jquery');
	var utils=require('utils');
	var fn=require('fn');
	var swiper=require('swiper');
	var fastClick = require('fastclick');
    
	var app={	
		init:function(){
		    
		    var http="http://app.i-liaoning.com.cn:8126";
		    var uu = $.getUrlParam("uu")||"",
                pt=$.getUrlParam("pt")||"";
            var USER_LOVE_FLAG="user_love_flag";
          
		    $("#GoTopBtn").topBtn();
		    
		    $("#SortBtn").dropDownList({
                "flag":"4",
                "itemClick":sortClick,
                "data":[{
                   "name":"热门排序",
                   "value":"3"
                },{
                    "name":"默认排序",
                    "value":"4" 
                }]
              }
            );
            $("#ActBanner").actBanner(); 
            $("#ActList").actList();
		    function sortClick(val){
		        $("#ActList").actList({"encstr":encodeURIComponent(uu),"citycode":pt,"sort":val});
		    }
            fastClick(document.body);

		}
	};
	return app;
});
