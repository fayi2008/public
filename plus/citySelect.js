/*
 *
 * author:fay
 * version:1.0
 * update:2016/4/21 20:00
 *
 * 数据包在cityData.js里面 请先于该插件之前引入数据包
 *纯JS,但是可以和jquery配合使用,仅兼容支持HTML5和CSS3的浏览器
 * jquery调用,请在jquery的ready里面调用
 * $('').citySelect(
 * {
 * province:num //初始化省 请传数字的行政区ID 所有ID均可在cityData里面找到 可以为空
 * city:num//初始化城市 可以为空
 * area:num//初始化地区 可以为空
 * callback:function(rs //返回的结果,_this //返回函数本身，可调用里面的方法 _this.close关闭){}
 * })
 *
 *
 * 普通调用
 * _citySelect({参数同上 多了一个elem 用来接收需要 绑定的节点 可以用 $('')[0] 或者 document.querySelector('')传入})
 *
 * */

(function (w, plus) {

    if (w.jQuery) {

        $(function () {
            plus($);
        })

    } else {

        plus();

    }

})(this, function ($) {

    window._black = function () {
        var _this = this
        _this.newhtml = document.createElement('div');
        _this.newhtml.className = 'back-black';

        document.body.appendChild(_this.newhtml)

        _this.close = function () {
            document.body.removeChild(_this.newhtml)
        }
        return _this

    }

    function cloneObj(oldObj) { //复制对象方法
        if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = new Object();
        for (var i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
        return newObj;
    };

    function extendObj() { //扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    }

    function CitySelect(opt) {

        var optison = {
            callback: function () {
            }
        }
        var _b = new _black();
        var _this = this;


        var opts = extendObj(optison, opt);

        var unit = 30;
        var ChineseDistricts = window.ChineseDistricts;
        var createHTML = function (tags, cn, html, to) {
            var newhtml = document.createElement(tags);
            newhtml.className = cn;
            newhtml.innerHTML = html;
            to.appendChild(newhtml);
            return newhtml
        }

        var _htmls = document.createElement('div');
        _htmls.className = 'fay-city-box';

        createHTML('div', 'fay-city-top', '<div class="fay-city-close">取消</div><div class="fay-city-sub">确定</div>', _htmls);

        var html = '';
        html += '<div><ul style="top:' + (unit * 3) + 'px" id="fay_city_pro">';
        html += return_html(ChineseDistricts['86']);
        html += '</ul></div>';
        html += '<div><ul style="top:' + (unit * 3) + 'px" id="fay_city">';
        html += return_html(ChineseDistricts[opts.province ? opts.province : '110000']);
        html += '</ul></div>';
        html += '<div><ul style="top:' + (unit * 3) + 'px" id="fay_city_qu">';
        html += return_html(ChineseDistricts[opts.city ? opts.city : '110100']);
        html += '</ul></div>';
        html += '<span class="fay-top-zz"></span><span class="fay-bottom-zz"></span>';
        html += '<dl>';
        html += '<dd class="fay-city-box-dd" to="fay_city_pro"></dd>';
        html += '<dd class="fay-city-box-dd" to="fay_city"></dd>';
        html += '<dd class="fay-city-box-dd" to="fay_city_qu"></dd>';
        html += '</dl>';

        createHTML('div', 'fay-city-select-box', html, _htmls);

        document.body.appendChild(_htmls)
        opts.elem.blur();
        if (opts.province) {
            //var now=document.querySelector('#fay_city_pro>li[data-id="'+opts.province+'"]')

            var list = document.querySelector('#fay_city_pro').childNodes
            var index = get_index(list, opts.province);
            document.querySelector('#fay_city_pro').style.top = (3 - index) * unit + 'px';
            addCheck('fay_city_pro');
        }

        if (opts.city) {
            var list = document.querySelector('#fay_city').childNodes
            var index = get_index(list, opts.city);
            document.querySelector('#fay_city').style.top = (3 - index) * unit + 'px';
            addCheck('fay_city');
        }

        if (opts.area) {
            var list = document.querySelector('#fay_city_qu').childNodes
            var index = get_index(list, opts.area);
            document.querySelector('#fay_city_qu').style.top = (3 - index) * unit + 'px';

        }


        click();

        var dd_list = document.getElementsByClassName('fay-city-box-dd')

        for (var i = 0; i < dd_list.length; i++) {

            var target;
            var pos = {'x': 0, 'y': 0};
            var nw_pos = {'x': 0, 'y': 0};
            dd_list.item(i).addEventListener('touchstart', function (event) {
                event.preventDefault()
                pos.x = event.touches[0].pageX;
                pos.y = event.touches[0].pageY;

                target = this.getAttribute('to');

            })
            dd_list.item(i).addEventListener('touchmove', function (event) {
                event.preventDefault()
                nw_pos.x = event.touches[0].pageX;
                nw_pos.y = event.touches[0].pageY;
                var p_ele = document.querySelector('#' + target)
                var lens = p_ele.childElementCount;

                var old_top = p_ele.style.top;
                console.log(nw_pos.y - pos.y)
                if ((nw_pos.y - pos.y)>0&&(nw_pos.y - pos.y)%10==0 && parseInt(old_top) != (unit * 3)) {

                    p_ele.style.top = parseInt(old_top) + unit + 'px'

                    setTimeout(function () {
                        addCheck(target);

                    }, 150)
                    pos.x = nw_pos.x;
                    pos.y = nw_pos.y;

                }

                if ((nw_pos.y - pos.y)<0&&(nw_pos.y - pos.y)%10==0&& parseInt(old_top) != (-(lens * unit - (unit * (3 + 1))))) {

                    p_ele.style.top = parseInt(old_top) - unit + 'px'
                    setTimeout(function () {
                        addCheck(target);

                    }, 150)

                    pos.x = nw_pos.x;
                    pos.y = nw_pos.y;
                }





            })
            dd_list.item(i).addEventListener('touchend', function (event) {
                // var p_ele = document.querySelector('#' + target)
                // var lens = p_ele.childElementCount;
                //
                // var old_top = p_ele.style.top;
                //
                // if (nw_pos.y - pos.y > 10 && parseInt(old_top) != (unit * 3)) {
                //
                //     p_ele.style.top = parseInt(old_top) + unit + 'px'
                //
                // }
                // if (nw_pos.y - pos.y < -10 && parseInt(old_top) != (-(lens * unit - (unit * (3 + 1))))) {
                //
                //     p_ele.style.top = parseInt(old_top) - unit + 'px'
                //
                // }
                // setTimeout(function () {
                //     addCheck(target);
                //
                // }, 150)
            })

        }
        // 获取当前节点的index 传入该节点所在的list和该节点的data-id 仅适用于本插件内
        function get_index(ele, id) {
            var index = 0;
            for (var i = 0; i < ele.length; i++) {
                if (ele[i].getAttribute('data-id') == id) {
                    index = i;

                }
            }
            return index
        }

        function addCheck(target) {
            var ele = document.querySelector('#' + target)
            if (ele.childElementCount) {
                var tops = ele.style.top;
                var index = (0 - parseInt(tops) + 90) / 30;

                for (var i = 0; i < ele.childElementCount; i++) {
                    ele.childNodes.item(i).classList.remove('fay-' + target + '_check')
                }
                ele.childNodes.item(index).classList.add('fay-' + target + '_check')

                check_city(target);
            }
        }

        function check_city(target) {
            var ele = document.querySelector('.fay-' + target + '_check');
            if (target == 'fay_city_pro') {

                var id = ele.getAttribute('data-id'); //__val(ele,'data-id');
                htmls(id, 'fay_city');

                var id2 = document.querySelector('#fay_city>li').getAttribute('data-id');
                htmls(id2, 'fay_city_qu');

            }

            if (target == 'fay_city') {
                var id2 = ele.getAttribute('data-id');
                htmls(id2, 'fay_city_qu');
            }

        }

        function return_html(list) {

            var html = '';
            for (var i in list) {
                html += '<li dataId="' + i + '" data-id="' + i + '">' + list[i] + '</li>';
            }

            return html;
        }

        function htmls(id, ele) {

            var list = ChineseDistricts[id];

            var html = return_html(list);

            document.getElementById(ele).innerHTML = html
            document.getElementById(ele).style.top = unit * 3 + 'px';

        }

        _this.close = function () {
            _b.close()
            document.body.removeChild(_htmls);
        }

        var __getVal = function () {

            var ele_pro = document.querySelector('.fay-fay_city_pro_check'),
                ele_city = document.querySelector('.fay-fay_city_check'),
                ele_area = document.querySelector('.fay-fay_city_qu_check'),
                ele_pro_null = document.querySelector('#fay_city_pro>li'),
                ele_city_null = document.querySelector('#fay_city>li'),
                ele_area_null = document.querySelector('#fay_city_qu>li')

            var pro = ele_pro ? ele_pro.innerHTML : ele_pro_null.innerHTML,
                pro_id = ele_pro ? ele_pro.getAttribute('data-id') : ele_pro_null.getAttribute('data-id');


            var city = ele_city ? ele_city.innerHTML : ele_city_null.innerHTML,
                city_id = ele_city ? ele_city.getAttribute('data-id') : ele_city_null.getAttribute('data-id');

            var qu_name = ele_area_null && ele_area_null.innerHTML ? ele_area_null.innerHTML : '',
                qu_ids = ele_area_null && ele_area_null.getAttribute('data-id') ? ele_area_null.getAttribute('data-id') : '';

            var qu = ele_area ? ele_area.innerHTML : qu_name,
                qu_id = ele_area ? ele_area.getAttribute('data-id') : qu_ids;

            return {
                "province": {id: pro_id, name: pro},
                "city": {id: city_id, name: city},
                "area": {id: qu_id, name: qu}
            }

        }

        function click() {

            document.getElementsByClassName('fay-city-close').item(0).addEventListener('click', function () {

                _this.close();
            })

            document.getElementsByClassName('fay-city-sub').item(0).addEventListener('click', function () {
                var val = __getVal()
                opts.callback(val, _this);
            })

        }

        return this;

    }

    if ($) {
        $.fn.citySelect = function (opt) {
            $.each(this, function () {
                $(this).on('click', function () {
                    $(this).trigger('focusout');
                    opt.elem=$(this)[0]
                    new CitySelect(opt);
                })
            })


        };
    } else {
        window._citySelect = function (opt) {

            if (opt.elem) {
                opt.elem.addEventListener('click', function () {

                    new CitySelect(opt);
                })
            } else {
                new CitySelect(opt);
            }

        };
    }

})




