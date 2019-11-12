# WebRequireJS
 使用RequireJS能力，通过统一配置即可管理页面JS控件的Web架构 

#目录结构 

#pages 
 放置html页面
 
#theme 
 放置样式表及图片素材，建议视图控件样式放到对应的component或libs目录中，本例子没有这样处理。
 
#js/apps
 放置所有页逻辑js资源，与html页面名称对应，home.js为加载逻辑，home.biz为业务逻辑
 
#js/component
 放置自己封装的视图控件，可以接fn.js研究一下jQuery控件封装
 
#js/libs
 放置三方或自己封装的可复用控件，机构为名称目录/版本号/控件名称 。 .min.js为压缩版代码，内部附加了common/utils.js是对一些工具函数的封装，如字符、ajax等方法封装
 
#js/config.js
 全局配置，样式及控件在配置文件加载后，html页面只需要加载对应页面的加载逻辑即可，如home.html,配置
 <script data-main="../js/apps/home" src="../js/require.js"></script>即可
