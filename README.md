web为手机端初始化部分JS

    distjs/distsjs
    内容为：
        jQuery 3.1.0
        vuejs 2.3.3
        cookies ：Cookies.getJSON()
        base64基础库
     distjs 已压缩 发布版本
     distsjs vue未压缩 其他压缩 开发版本

    swiper 版本 3.4

    public:一些简单的插件集合，基于jquery

    c#main.js：.net项目需要用到的用户体系的方法




关于页面：
    1、先引入CSS，再引入JS，页面级别JS放在底部。
    2、JS加载顺序请根据你内部调用的方法顺序加载
    3、M端务必在页面上添加一个#main DIV 来取代body


关于JS：
    1、一定要写在jQuery初始化函数里面
    $(function(){});   $(document).ready(function(){});  都可以

    2、分段好JS，请务必写注释
    注释要求：
        每个AJAX必须写清楚接口公用
        每个function必须写清楚功能

    3、JS里面除非层叠 否则不允许出现双引号 一切JS里面均使用单引号 包括选择器等

    4、若可以请在结尾加上分号（不加也可以）

    5、发布版本，若JS比较大 请压缩，网上很多第三方压缩工具

关于CSS：
    1、CSS请分为 插件CSS/公共CSS/页面CSS 来做处理，请不要全放在一个CSS里
    2、页面素材图片请放置在一个目录里

