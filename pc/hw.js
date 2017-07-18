/**
 * Created by yangguangyuan on 2017/7/18.
 */
$.fn.roundimg = function (options) {
    var _t = this, $t = $(this)

    function round() {
        var u = navigator.userAgent
        var mobile = !!u.match(/AppleWebKit.*Mobile.*/);
        var option = {
            image: []
        };
        var opt = $.extend(option, options);

        var load = 0;
        var len = opt.image.length;

        function imgload() {

            var img = new Image();
            img.src = opt.image[load];
            img.className = 'round-img-item';
            img.onload = function () {


                if (load === 1) {
                    t.roundimg = 1;
                    img.className = 'round-img-item show';

                }
                $t.append(img);
                load++;
                if (load < len) {
                    imgload();
                }
            }


        }

        imgload();

        var ttttt = 0, inss = 0;
        var index = 1,
            old = {
                y: 0,
                x: 0
            };

        var sta = 0;
        var roundimg = 0;
        var curxiang = 'left';

        function start(event) {


            event.stopPropagation();
            event.preventDefault();

            sta = 1

        }


        function move(event) {
            event.stopPropagation();
            event.preventDefault();
            if (sta === 1) {
                var news = {
                    x: event.pageX,
                    y: event.pageY
                };
                if (mobile) {
                    news = {
                        x: event.originalEvent.touches[0].pageX,
                        y: event.originalEvent.touches[0].pageY
                    }
                }


                if (news.x - old.x > 2) {
                    roundimg--;
                    curxiang = 'left';
                    if (roundimg <= 0) {
                        roundimg = len - 1
                    }
                }

                if (news.x - old.x < -2) {
                    roundimg++;
                    curxiang = 'right';
                    if (roundimg >= len) {
                        roundimg = 1
                    }

                }

                setTimeout(function () {

                    old = {
                        x: event.pageX,
                        y: event.pageY
                    };
                    if (mobile) {
                        old = {
                            x: event.originalEvent.touches[0].pageX,
                            y: event.originalEvent.touches[0].pageY
                        }
                    }


                }, 20);
                $('.round-img-item:eq(' + roundimg + ')').addClass('show').siblings().removeClass('show');


            }
        }


        function end() {


            if (sta === 1) {
                var i = 0;

                ttttt = setInterval(function () {

                    if (curxiang === 'right') {
                        roundimg++;
                        if (roundimg >= len) {
                            roundimg = 1
                        }

                    }
                    if (curxiang === 'left') {
                        roundimg--;
                        if (roundimg <= 0) {
                            roundimg = len - 1
                        }

                    }
                    $('.round-img-item:eq(' + roundimg + ')').addClass('show').siblings().removeClass('show');
                    if (i >= 12) {
                        clearInterval(ttttt)
                    }
                    i++


                }, 20)
            }
            sta = 0
        }

        var eve={
            star: 'mousedown',
            move: 'mousemove',
            end: 'mouseout'
        }
        if (mobile) {
            eve = {
                star: 'touchstart',
                move: 'touchmove',
                end: 'touchend'
            }
        }


        $t.off(eve.star).on(eve.star,start);
        $t.off(eve.move).on(eve.move,move);
        $t.off(eve.end).on(eve.end,end);
    }

    new round()
}
