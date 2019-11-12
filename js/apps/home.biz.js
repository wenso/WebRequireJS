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
				//可以将body中html都在这里写到页面上，然后在执行以下方法
				var url="../data/list.json";
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
        $("#ActList").actList({"http":url});
		    function sortClick(val){
		        $("#ActList").actList({"http":url});
		    }

		}
	};
	return app;
});
