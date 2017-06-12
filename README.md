2017.6.5
更新 

    .NET公用文件内 TOKEN重新拼接成 UserName:Token
    新添格式化日期  $.fdate(new Date(时间戳),'yyyy-MM-dd hh:mm')

==================================我是华丽的分割线==================================

2017.5.25
更新

        public更新成代工厂模式，可以兼容module，amd,普通模式调用,jquery调用
        c#main.js：添加window支持，但是依旧大部分依赖jquery
        添加M端例子：访问页面https://fayi2008.github.io/public/mindex.html?id=123
        toSignin方法添加第二个参数，为跳转参数，空的时候默认 signin.html 有的时候 优先去url

==================================我是华丽的分割线==================================

web为手机端初始化部分JS

    distjs/distsjs
    内容为：
        jQuery 3.1.0
        vuejs 2.3.3
        cookies ：Cookies.getJSON()
        base64基础库
     distsjs 已压缩 发布版本
     distjs vue未压缩，其他压缩 开发版本

    swiper 版本 3.4

    public:一些简单的插件集合，可以兼容module，amd,普通模式调用
            调用方法 例：  plus.alert('xxx'), $.alert()均可

    c_main.js：.net项目需要用到的用户体系的方法，使用localstorge


PC为PC端初始化JS
     
     distjs
        内容为：
            jQuery 1.11.3
            cookies ：Cookies.getJSON()
            base64基础库
         distjs 全压缩

     public:一些简单的插件集合，基于jquery，js引用和web里面一样的即可，css请引入不同目录的
     c_main:.net项目需要用到的用户体系的方法,使用cookie

IP引入 下

    所有代码必须上传到GIT

关于页面：
    
    1、先引入CSS，再引入JS，页面级别JS放在底部。
    2、JS加载顺序请根据你内部调用的方法顺序加载
    3、M端务必在页面上添加一个#main DIV 来取代body


关于JS：
    
    1、一定要写在jQuery初始化函数里面
    $(function(){});    都可以

    2、分段好JS，请务必写注释
    注释要求：
        每个AJAX必须写清楚接口公用
        每个function必须写清楚功能

    3、JS里面除非层叠 否则不允许出现双引号 一切JS里面均使用单引号 包括选择器等

    4、若可以请在结尾加上分号（不加也可以）

    5、发布版本，若JS比较大 请压缩，网上很多第三方压缩工具


    6、使用vue整个页面请只出现一个vue初始化，不要出现多个，用操作数据去操作

    7、关于只切图的，请把公用JS写齐，包括验证、弹窗。

关于CSS：
    
    1、CSS请分为 插件CSS/公共CSS/页面CSS 来做处理，请不要全放在一个CSS里
    2、页面素材图片请放置在一个目录里
    3、不要死命用嵌套和dom选择器 嵌套不要超过2层
    4、不允许使用less sess（普通项目）

关于check：
    
    1、请务必自己完全走下流程，保证没JS报错等情况下提交测试

BUG 提交以后业务逻辑BUG 流程卡住 奖金扣
