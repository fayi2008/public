(function ($) {

    //跳转去登录
    $.toSignin = window.toSignin = function (back,url) {
        var from = back || (location.pathname + location.search);

        window.location.replace(url||'signin.html' + (from ? ('?from=' + plus.base64encode(from)) : ''))

    };

    //往ls里面放入用户信息
    $.putUser = window.putUser = function (rs) {
        Cookies.set('yes', plus.base64encode(JSON.stringify(rs)), {path: '/'})
    };

    //不传参就是获取用户信息对象 传参获取单个用户信息
    $.getUser = window.getUser = function (rs) {
        var res = Cookies.getJSON('yes')
        if (!res) {
            return false
        }
        return rs ? JSON.parse(plus.base64decode(res))[rs] : JSON.parse(plus.base64decode(res))
    };
    //清楚ls
    $.clearUser = window.clearUser = function () {
        Cookies.remove('yes', {path: '/'});
    };
    //更新用户信息
    $.editUser = window.editUser = function (rs, val) {
        var res = Cookies.getJSON('yes')
        if (!res) {
            return false
        }
        var data = JSON.parse(plus.base64decode(res));
        data[rs] = val;
        $.putUser(data)
    };

    //保存LStoken
    $.putToken = window.putToken = function (rs) {

        var res = plus.base64encode(rs.UserName + ':' + rs.DynamicToken);
        Cookies.set('yesToken', res, {path: '/'})
    };
    //检查是否登录，并且拼接head
    $.checkUser = window.checkUser = function () {

        if (plus.is_weixin()) {
            var user = Cookies.getJSON('userInfo')?decodeURIComponent(Cookies.getJSON('userInfo')):'';
            if (user) {
                user = JSON.parse(plus.base64decode(user));
                $.putUser(user);
                $.putToken(user);
                Cookies.remove('userInfo', {path: '/'});
            }

        }

        window.TOKEN = Cookies.get('yesToken');
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
    $.fn.countDown = function () {

        $(this).each(function (index, item) {
            var t = 60;
            var timer = setInterval(function () {
                if (t == 0) {
                    item.html('获取验证码');
                    item.removeClass('on');
                    clearInterval(timer);
                } else {
                    item.html(t + '秒后重发');
                    t--;
                }

            }, 1000)
        })

    };
    $.CountDown = window.CountDown = function () {

        $(this).each(function (index, item) {
            var t = 60;
            var timer = setInterval(function () {
                if (t == 0) {
                    item.html('获取验证码');
                    item.removeClass('on');
                    clearInterval(timer);
                } else {
                    item.html(t + '秒后重发');
                    t--;
                }

            }, 1000)
        })

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
    $.ajaxSetup({
        headers: {
            Platform:2
        }
    })

})(jQuery);