(function (win, jQuery, factory) {
    window.DateP = $.DateP = function (opt) {

        return factory(win, jQuery, opt);
    }


})(window, jQuery, function (win, $, opt) {
    function DataPicker(opt) {

        var option = {
            el: '',
            isAlert: false,
            defaults: '',
            max: '',
            min: '',
            tips: [],
            not: [],
            getDays: function () {

            },
            mchange: function () {

            },
            mchanged: function () {

            }
        };

        var that = this;
        this.opts = $.extend(option, opt);
        var now=new Date();
        var date = now;
        var defaults = now;

        if (this.opts.defaults) {
            defaults = new Date(this.opts.defaults);
            date = new Date(this.opts.defaults);

        }

        this.opts['check'] = ''

        setHtml(date);

        function setHtml() {

            var year = date.getFullYear();
            var mouth = date.getMonth() + 1;
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            var week = ['日', '一', '二', '三', '四', '五', '六'];
            var fweek = firstd(year, (mouth - 1), 1);
            var htmls = '<div class="y-date-box '

            if(that.opts.isAlert){

                $(that.opts.el).addClass('y-date-box-alert-re');
                htmls+='y-date-box-alert'
            }
            htmls +='">';
            htmls += '<div class="y-date-year-box">' +
                '<div class="y-date-year-l">\<\<</div><div class="y-date-m-l">\<</div>' +
                '<div class="y-date-year">' + year + '</div><div class="y-date-m">' + mouth + '</div>' +
                '<div class="y-date-m-r">\></div><div class="y-date-year-r">\>\></div>' +
                '</div>';
            htmls += '<ul class="y-date-week-box">';
            for (var i = 0; i < week.length; i++) {
                var obj = week[i];
                htmls += '<li class="y-date-week">' + obj + '</li>'

            }
            htmls += '</ul>';
            htmls += '<div class="y-date-day-box">';

            for (var i = 0; i < fweek; i++) {

                htmls += '<div class="y-date-day"></div>'
            }
            var num = getmnum(year, mouth);

            var tips = [];

            for (var i = 0; i < that.opts.tips.length; i++) {
                var obj = that.opts.tips[i];
                var objt = new Date(obj);
                tips.push(new Date(objt.getFullYear(), objt.getMonth(), objt.getDate()).getTime());

            }

            var not = []
            for (var i = 0; i < that.opts.not.length; i++) {
                var obj = that.opts.not[i];
                var objt = new Date(obj);
                not.push(new Date(objt.getFullYear(), objt.getMonth(), objt.getDate()).getTime())

            }

            for (var i = 0; i < num; i++) {

                var data = new Date(year, mouth - 1, (i + 1)).getTime();

                htmls += '<div class="y-date-day y-date-days ';

                if(data==new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()){
                    htmls += 'y-date-now '
                }

                if (defaults && data == new Date(defaults.getFullYear(), defaults.getMonth(), defaults.getDate()).getTime()) {

                    htmls += 'y-date-days-default '
                }


                if ($.inArray(data, tips) > -1) {
                    htmls += 'y-date-days-tips '
                }
                if ($.inArray(data, not) > -1) {
                    htmls += 'y-date-days-not '
                }
                if (that.opts.max) {
                    var max = new Date(that.opts.max);

                    if (data >= max) {

                        htmls += 'y-date-days-not '

                    }

                }
                if (that.opts.min) {
                    var min = new Date(that.opts.min);
                    if (data <= min) {

                        htmls += 'y-date-days-not '

                    }
                }

                htmls += '" data-day="' + data + '">' + (i + 1) + '</div>'
            }
            htmls += '</div>';
            htmls += '<div class="y-date-time-box">'
            htmls += '<select class="y-date-hour">'
            for (var h = 0; h < 24; h++) {
                htmls += '<option '
                if (date.getHours() == h) {
                    htmls += 'selected '
                }
                htmls += '>' + h + '</options>'
            }
            htmls += '</select>'
            htmls += '<span>:</span>'
            htmls += '<select  class="y-date-min">'
            for (var h = 0; h < 60; h++) {
                htmls += '<option '
                if (date.getMinutes() == h) {
                    htmls += 'selected '
                }
                htmls += '>' + h + '</options>'
            }
            htmls += '</select>'
            htmls += '<span>:</span>'
            htmls += '<select class="y-date-sec">'
            for (var h = 0; h < 60; h++) {
                htmls += '<option '
                if (date.getSeconds() == h) {
                    htmls += 'selected '
                }
                htmls += '>' + h + '</options>'
            }
            htmls += '</select>'
            htmls += '<div class="y-date-today">现在</div>'
            htmls += '</div>'
            htmls += '</div>';
            if (that.opts.isAlert) {

            } else {
                $(that.opts.el).html(htmls);
            }
        }


        $(that.opts.el).on('click', '.y-date-year-l', function () {

            var year = date.getFullYear() - 1;
            var m = date.getMonth();
            var day = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            date = new Date(year, m, day, hour, min, sec);
            setHtml()
        });

        $(that.opts.el).on('click', '.y-date-m-l', function () {

            var year = date.getFullYear();
            var m = date.getMonth() - 1;
            var day = date.getDate();
            var hour = $('.y-date-hour').val();
            var min = $('.y-date-min').val();
            var sec = $('.y-date-sec').val();
            date = new Date(year, m, day, hour, min, sec);
            that.opts.mchange(date, that);

            setHtml();

            that.opts.mchanged(date, that);
        });

        $(that.opts.el).on('click', '.y-date-year-r', function () {
            var year = date.getFullYear() + 1;
            var m = date.getMonth();
            var day = date.getDate();
            var hour = $('.y-date-hour').val();
            var min = $('.y-date-min').val();
            var sec = $('.y-date-sec').val();
            date = new Date(year, m, day, hour, min, sec);
            setHtml()
        });

        $(that.opts.el).on('click', '.y-date-m-r', function () {
            var year = date.getFullYear();
            var m = date.getMonth() + 1;
            var day = date.getDate();
            var hour = $('.y-date-hour').val();
            var min = $('.y-date-min').val();
            var sec = $('.y-date-sec').val();
            date = new Date(year, m, day, hour, min, sec);
            that.opts.mchange(date, that);
            setHtml();
            that.opts.mchanged(date, that);
        });
        $(that.opts.el).on('change', '.y-date-hour', function () {
            var year = date.getFullYear();
            var m = date.getMonth() + 1;
            var day = date.getDate();
            var hour = $('.y-date-hour').val();
            var min = $('.y-date-min').val();
            var sec = $('.y-date-sec').val();
            date = new Date(year, m, day, hour, min, sec);

        })

        $(that.opts.el).on('change', '.y-date-min', function () {
            var year = date.getFullYear();
            var m = date.getMonth() + 1;
            var day = date.getDate();
            var hour = $('.y-date-hour').val();
            var min = $('.y-date-min').val();
            var sec = $('.y-date-sec').val();
            date = new Date(year, m, day, hour, min, sec);

        })

        $(that.opts.el).on('change', '.y-date-sec', function () {
            var year = date.getFullYear();
            var m = date.getMonth() + 1;
            var day = date.getDate();
            var hour = $('.y-date-hour').val();
            var min = $('.y-date-min').val();
            var sec = $('.y-date-sec').val();
            date = new Date(year, m, day, hour, min, sec);

        })

        $(that.opts.el).on('click', '.y-date-today', function () {
            now=new Date();
            date=new Date();

            setHtml()
            var day=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime()

            $('.y-date-day[data-day='+day+']').addClass('y-date-now').siblings().removeClass('y-date-now');
            $('.y-date-day[data-day='+day+']').addClass('y-date-change').siblings().removeClass('y-date-change');
        })

        that.addtips = function (day) {
            if ($.isArray(day)) {
                for (var i = 0; i < day.length; i++) {
                    var obj = day[i]
                    if ($.inArray(obj, that.opts.tips) == -1) {
                        that.opts.tips.push(obj);
                    }
                }
            } else {
                if ($.inArray(day, that.opts.tips) == -1) {
                    that.opts.tips.push(day);
                }
            }

        }
        $(that.opts.el).on('click', '.y-date-day:not(.y-date-days-not)', function () {
            $(this).addClass('y-date-change').siblings().removeClass('y-date-change');
            var day = $(this).attr('data-day')

            var hour = $('.y-date-hour').val() * 60 * 60 * 1000,
                min = $('.y-date-min').val() * 60 * 1000,
                sec = $('.y-date-sec').val() * 1000;

            var days = +day + hour + min + sec;


            console.log(days);
            that.opts['check'] = days;
            that.opts.getDays(days, that);
        });

        function firstd(y, m, d) {
            return new Date(y, m, d).getDay();
        }

        function getmnum(y, m) {
            return new Date(y, m, 0).getDate();
        }

        return this;
    }

    return new DataPicker(opt)


})