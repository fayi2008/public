/**
 * Created by yangguangyuan on 2017/7/18.
 */
$.fn.roundimg = function (options) {
    var _t = this, $t = $(this)

    function round() {
        var u = navigator.userAgent
        var mobile = !!u.match(/AppleWebKit.*Mobile.*/);
        var option = {
            image: [],
            autoplay:false,
            playbtn:false
        };
        var opt = $.extend(option, options);

        var load = 0;
        var len = opt.image.length;
        var inss = 0;
        var ttttt = 0;
        var roundimg = 0;
        var curxiang = 'left';

        var htmls='<div class="round-img-box"></div>'
        $t.css({
            position: 'relative'
        })
        $t.append(htmls)
        function imgload() {

            var img = new Image();
            img.src = opt.image[load];
            img.className = 'round-img-item';
            img.onload = function () {


                if (load == 1) {
                    roundimg = 1;
                    img.className = 'round-img-item show';

                }
                $t.find('.round-img-box').append(img);
                load++;
                if (load < len) {
                    imgload();
                }
            }


        }

        imgload();


        function autoplay(){
            inss = setInterval(function () {
                $('.round-img-item:eq(' + roundimg + ')').addClass('show').siblings().removeClass('show')
                roundimg++
                if (roundimg > len) {
                    roundimg = 1

                }

            }, 100)
        }

        function addbar() {
            var html='<div class="round-img-play-bar"><div class="round-img-play-btn"></div></div>'
            $t.append(html)
            add()
        }
        function add() {
            $t.off('click','.round-img-play-btn').on('click','.round-img-play-btn',function () {
                var $tt=$(this)
                if($tt.hasClass('r-i-p')){

                    clearInterval(inss)
                    $tt.removeClass('r-i-p')
                }else{
                    autoplay()
                    $tt.addClass('r-i-p')
                }
            })
        }

        if(opt.autoplay){
            autoplay()
        }

        if(opt.playbtn){
            addbar()

        }

        var index = 1,
            old = {
                y: 0,
                x: 0
            };

        var sta = 0;


        function start(event) {


            event.stopPropagation();
            event.preventDefault();
            if(inss){
                clearInterval(inss)
                $('.round-img-play-btn').removeClass('r-i-p')
            }



            sta = 1

        }


        function move(event) {

            event.stopPropagation();
            event.preventDefault();
            if (sta == 1) {

                if (mobile) {
                    var news = {
                        x: event.originalEvent.touches[0].pageX,
                        y: event.originalEvent.touches[0].pageY
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
                }else{
                    var news = {
                        x: event.pageX,
                        y: event.pageY
                    };
                    if (news.x - old.x > 5) {
                        roundimg--
                        curxiang = 'left'
                        if (roundimg <= 0) {
                            roundimg = len - 1
                        }

                    }

                    if (news.x - old.x < -5) {
                        roundimg++
                        curxiang = 'right'
                        if (roundimg >= len) {
                            roundimg = 1
                        }

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


            // if (sta === 1) {
            //     var i = 0;
            //
            //     ttttt = setInterval(function () {
            //
            //         if (curxiang === 'right') {
            //             roundimg++;
            //             if (roundimg >= len) {
            //                 roundimg = 1
            //             }
            //
            //         }
            //         if (curxiang === 'left') {
            //             roundimg--;
            //             if (roundimg <= 0) {
            //                 roundimg = len - 1
            //             }
            //
            //         }
            //         $('.round-img-item:eq(' + roundimg + ')').addClass('show').siblings().removeClass('show');
            //         if (i >= 12) {
            //             clearInterval(ttttt)
            //         }
            //         i++
            //
            //
            //     }, 20)
            // }
            sta = 0
        }

        var eve={
            star: 'mousedown',
            move: 'mousemove',
            end: 'mouseup'
        }
        if (mobile) {
            eve = {
                star: 'touchstart',
                move: 'touchmove',
                end: 'touchend'
            }
        }


        $t.find('.round-img-box').off(eve.star).on(eve.star,function(event){start(event)});
        $t.find('.round-img-box').off(eve.move).on(eve.move,function(event){move(event)});
        $t.find('.round-img-box').off(eve.end).on(eve.end,function(event){end()});
    }

    new round()
}
