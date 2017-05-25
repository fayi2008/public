$(function () {
    plus.ADDLOAD()
    new Vue({
        el: '#main',
        data: {},
        mounted: function () {

            plus.set_font()
            this.init()
        },
        methods: {
            addl: function () {
                plus.ADDLOAD()
                setTimeout(function () {
                    plus.RMLOAD()
                },2000)
            },
            alert1:function () {
                plus.alert('这是测试','测试',function (e) {
                    plus.oppo('确认回调')
                    e.close()
                })
            },
            alert1:function () {
                plus.alert({
                    cf: 1,//0为无取消，1为有取消
                    title: '提示',
                    content: 'holle word',
                    submit_text: '确定',
                    cancel_text: '取消',
                    submit_bgcolor: '#ccc',
                    submit_color: '#ccc',
                    cancel_bgcolor: '#000',
                    cancel_color: '#000',
                    submit: function (e) {
                    },
                    cancel: function (e) {
                    }
                })
            }
        }
    })
})