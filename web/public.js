;(function (golden, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(golden)
    } else if (typeof define === "function" && define.amd) {
        define('plus', [], function () {
            return factory(golden);
        });
    } else{
        window.plus = factory(golden)
    }


})(window, function () {
    var plus = {}
    //判断是否为微信
    plus.is_weixin = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    var _black = function () {
        var _this = this
        _this.newhtml = document.createElement('div');
        _this.newhtml.className = 'back-black';

        document.body.appendChild(_this.newhtml)

        _this.close = function () {
            document.body.removeChild(_this.newhtml)
        }
        return _this;

    }
    //弹窗（新）
    function _Alert(option) {
        var a = new _black()
        var _this = this
        var opts = {
            cf: 0,
            title: '提示',
            content: '',
            submit_text: '确定',
            cancel_text: '取消',
            submit_bgcolor:'#fff',
            submit_color: '#333',
            cancel_bgcolor: '#fff',
            cancel_color: '#333',
            submit: function (e) {
            },
            cancel: function (e) {
            }
        }

        _this.createHTML = function (tags, cn, html, to) {
            var newhtml = document.createElement(tags)
            newhtml.className = cn
            newhtml.innerHTML = html
            to.appendChild(newhtml)
            return newhtml
        }

        var opt = $.extend(opts, option)
        _this.htmls = document.createElement('div')
        _this.htmls.className = 'yalert-box'


        _this.createHTML('div', 'yalert-box-top', opt.title, _this.htmls)

        _this.createHTML('div', 'yalert-box-tip', opt.content, _this.htmls)


        var btn = document.createElement('div')
        btn.className = 'yalert-box-btn'
        var y_quxiao = '', y_queding = ''
        if (opts.cf) {
            y_quxiao = _this.createHTML('a', 'yalert-box-submit', opt.cancel_text, btn)
            y_queding = _this.createHTML('a', 'yalert-box-submit', opt.submit_text, btn)
            y_quxiao.style.backgroundColor = opt.cancel_bgcolor
            y_queding.style.backgroundColor = opt.submit_bgcolor
            y_quxiao.style.color = opt.cancel_color
            y_queding.style.color = opt.submit_color

        } else {
            y_queding = _this.createHTML('a', 'yalert-box-submit', opt.submit_text, btn)
            y_queding.style.width = '100%'
            y_queding.style.color = opt.submit_color
        }

        _this.htmls.appendChild(btn)

        if (document.getElementsByTagName('input').length) {
            for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
                document.getElementsByTagName('input')[i].blur()

            }
        }

        if (document.getElementsByTagName('textarea').length) {
            for (var i = 0; i < document.getElementsByTagName('textarea').length; i++) {
                document.getElementsByTagName('textarea')[i].blur()

            }
        }

        document.body.appendChild(_this.htmls)

        y_queding.addEventListener('click', function () {

            if (option.submit) {
                opt.submit(_this)
            } else {
                document.body.removeChild(_this.htmls)

                a.close()
            }
        })

        if (opts.cf) {
            y_quxiao.addEventListener('click', function () {
                if (option.cancel) {
                    opt.cancel(_this)
                } else {
                    document.body.removeChild(_this.htmls)
                    a.close()
                }

            })
        }


        _this.close = function () {
            document.body.removeChild(_this.htmls)
            a.close()

        };

    }

    //弹窗调用
    plus.alert = function (option, title, callback) {

        if (typeof option != 'object' && typeof option == 'string') {

            var opt = {
                title: title,
                content: option,
                submit: callback
            }

            new _Alert(opt)
        } else {
            new _Alert(option)
        }


    }


    // $.alert('asdasd','title',function (e) {
    //     e.close()
    // })
    //
    // $.alert({
    //     cf: 1,
    //     title: '提示',
    //     content: '',
    //     submit_text: '确定',
    //     cancel_text: '取消',
    //     submit: function (e) {
    //         e.close()
    //     },
    //     cancel: function (e) {
    //         e.close()
    //     }
    // })

    //获取URL上参数
    plus.getUrlParam = $._getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return ''
    }


    plus.set_font = function (size) {

        // 计算、转换布局单位
        var html = document.getElementsByTagName('html')[0];
        var designFontSize = 100,
            designWidth = size ? size : 750;

        function setFontSize() {
            var winWidth = document.documentElement.getBoundingClientRect().width;
            var fontSize = winWidth / designWidth * designFontSize;

            html.style.fontSize = fontSize + 'px';
        }

        setFontSize();
        window.addEventListener('resize', function () {
            setFontSize();
        });

        return this;
    }

    //添加全页load
    plus.ADDLOAD = function () {
        var html = '<div class="new-loading">' +
            '<ul class="small-loading">' +
            '<li></li>' +
            '<li></li>' +
            '<li></li>' +
            '<li></li>' +
            '<li></li>' +
            '<li></li>' +
            '<li></li>' +
            '<li></li>' +
            '</ul>' +
            '</div>'
        if (!$('.new-loading').length) {
            $('body').append(html)
        }
    }

    //移除load
    plus.RMLOAD = function () {
        $('.new-loading').remove()
    }
    //页面浮动内容框
    plus.oppo = function (msg, time, callback) {

        var html = '<div class="oppo">' + msg + '</div>';
        $('body').append(html);
        setTimeout(function () {
            $('.oppo').remove()
            if (typeof (callback) == 'function') {
                callback()
            } else {

            }
        }, (time ? time : 1) * 1000)
    }

    //删除HTML里面标签
    plus.DELHTML = function (str) {
        return str ? str.replace(/<[^>].*?>/g, "") : str;
    }

    //base64加密
    plus.base64encode = function (str) {
        var encryptedHexStr = CryptoJS.enc.Utf8.parse(str);
        var words = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        console.log(words)
        return words
    }
    //base64解密
    plus.base64decode = function (str) {
        var words = CryptoJS.enc.Base64.parse(str);
        words = words.toString(CryptoJS.enc.Utf8);
        console.log(words)
        return words
    }

    return plus

});
