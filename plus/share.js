(function ($) {

    //请先引入 http://res.wx.qq.com/open/js/jweixin-1.2.0.js
    $.ajax({
        url: '/Api/v1/Share',//分享授权的JS
        data: {
            strUrl: location.href
        },
        type: 'get'
    }).done(function (rs) {



        if (rs.returnCode == '200') {
            wx.config({//本段需要自己设定
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: rs.data.appId, // 必填，公众号的唯一标识
                timestamp: rs.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: rs.data.nonceStr, // 必填，生成签名的随机串
                signature: rs.data.signature,// 必填，签名，见附录1
                jsApiList: ['checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            //下面这些可以放到任何地方只要是上面授权完成 下面均可使用 更多API请参考 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

            var opts = {
                title: $('body').attr('title') || '',
                desc: $('body').attr('desc') || '',
                link: $('body').attr('link') || window.location.href,
                imgUrl: $('body').attr('imgUrl') || '',
                type: '',
                dataUrl: '',
                timeline: function () {
                },
                friend: function () {
                },
                qq: function () {
                },
                weibo: function () {
                }
            }
            var newopt = opts
            if (typeof opt == "object") {
                newopt = $.extend(opts, opt)
            }

            wx.ready(function () {

                wx.onMenuShareAppMessage({
                    title: newopt.title, // 分享标题
                    desc: newopt.desc, // 分享描述
                    link: newopt.link, // 分享链接
                    imgUrl: newopt.imgUrl, // 分享图标
                    type: newopt.type, // 分享类型,music、video或link，不填默认为link
                    dataUrl: newopt.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空

                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                        //alert(1)
                        newopt.friend()
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });


                wx.onMenuShareTimeline({
                    title: newopt.title, // 分享标题
                    desc: newopt.desc, // 分享描述
                    link: newopt.link, // 分享链接
                    imgUrl: newopt.imgUrl, // 分享图标
                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                        newopt.timeline()
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });


                wx.onMenuShareQQ({
                    title: newopt.title, // 分享标题
                    desc: newopt.desc, // 分享描述
                    link: newopt.link, // 分享链接
                    imgUrl: newopt.imgUrl, // 分享图标
                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                        newopt.qq()
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });

                wx.onMenuShareWeibo({
                    title: newopt.title, // 分享标题
                    desc: newopt.desc, // 分享描述
                    link: newopt.link, // 分享链接
                    imgUrl: newopt.imgUrl, // 分享图标
                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                        newopt.weibo()
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });
            })


        }

    }).fail(function (err) {
        // alert(JSON.stringify(err))
    })


})(jQuery)