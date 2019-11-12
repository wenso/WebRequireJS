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
		        $("#ActList").actList();
		    }
        fastClick(document.body);
		}
	};
	return app;
});
