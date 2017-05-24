(function ($) {

    //跳转去登录
    $.toSignin = function (back) {
        var from = back || (location.pathname + location.search);

        if ($.is_weixin()) {
            window.location.replace('/WeiXin/Login' + (from ? ('?backUrl=' + from) : ''));
        } else {

            window.location.replace(window.URL + 'signin.html' + (from ? ('?from=' + $.base64encode(from)) : ''))
        }
    };

    //往ls里面放入用户信息
    $.putUser = function (rs) {
        localStorage['yes'] = $.base64encode(JSON.stringify(rs))
    };
    //不传参就是获取用户信息对象 传参获取单个用户信息
    $.getUser = function (rs) {
        return rs ? JSON.parse($.base64decode(localStorage['yes']))[rs] : JSON.parse($.base64decode(localStorage['yes']))
    };
    //清楚ls
    $.clearUser = function () {
        localStorage.clear()
    };
    //更新用户信息
    $.editUser = function (res, val) {
        var data = JSON.parse($.base64decode(localStorage['yes']));
        data[res] = val;
        $.putUser(data)
    };
    //保存LStoken
    $.putToken = function (res) {
        localStorage['yesToken'] = $.base64encode(res.PhoneNumber + ':' + res.DynamicToken);
    };
    //检查是否登录，并且拼接head
    $.checkUser = function () {

        if ($.is_weixin()) {
            var user = Cookies.getJSON('userInfo');
            if (user) {
                user = JSON.parse($.base64decodes(user));
                $.putUser(user);
                $.putToken(user);
                Cookies.remove('userInfo', {path: '/'});
            }

        }

        window.TOKEN = localStorage['yesToken'];
        if (window.TOKEN) {
            $.ajaxSetup({
                headers: {
                    Authorization: 'Basic ' + window.TOKEN
                }
            })
        } else {
            $.toSignin()
        }
    };

    //倒计时
    $.CountDown = function (obj) {
        var t = 60;
        var timer = setInterval(function () {
            if (t == 0) {
                obj.html('获取验证码');
                obj.removeClass('on');
                clearInterval(timer);
            } else {
                obj.html(t + '秒后重发');
                t--;
            }

        }, 1000)
    };

    //根据接口返回 显示错误信息 或者 返回授权
    $(document).ajaxSuccess(function (event, xhr, settings) {

        if (xhr.responseText) {
            var res = JSON.parse(xhr.responseText);
            if (res.returnCode == '401') {
                $.toSignin()
            }

            if (res.returnCode != '200') {
                $.oppo(res.msg)
            }

        }

    });


})(jQuery);