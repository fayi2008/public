$(function () {

    new Vue({
        el: '#main',
        data: {},
        mounted: function () {

            plus.set_font()

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
            alert2:function () {
                plus.alert({
                    cf: 1,//0为无取消，1为有取消
                    title: '提示',
                    content: 'holle word',
                    submit_text: '确定',
                    cancel_text: '取消',
                    submit_bgcolor: '#ccc',
                    submit_color: '#000',
                    cancel_bgcolor: '#000',
                    cancel_color: '#00ff00',
                    submit: function (e) {
                        plus.oppo('确认回调')
                        e.close()

                    },
                    cancel: function (e) {
                        plus.oppo('取消回调')
                        e.close()
                    }
                })
            },

            oppo:function () {
                plus.oppo('取消回调',1,function () {
                    plus.oppo('消失回调')
                })
            },
            save:function () {
                $.putUser({Id:'000-00-000',name:'测试'})
                plus.oppo('更新完成，请查看localstorge')
            },
            get:function () {
                var id=$.getUser('Id')
                plus.oppo('获取ID'+id)
            },
            update:function () {
                $.editUser('name','测试'+Math.random())
                plus.oppo('更新完成，请查看localstorge')
            },
            geturl:function () {
                var id=plus.getUrlParam('id')
                if(id){
                    plus.oppo('id:'+id)
                }else{
                    $.oppo('请现在URL上拼接上 ?id=1')
                }

            },
            geturlo:function () {
                var obj=plus.getUrlObject('https://fayi2008.github.io/public/mindex.html?id=123&text=333')//不传参，则取当前URL
                if(id){
                   console.log(obj)
                }
            }
        }
    })
})