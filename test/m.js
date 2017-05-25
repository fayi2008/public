$(function () {
    $.ADDLOAD()
    new Vue({
        el: '#main',
        data: {},
        mounted: function () {
            $.checkUser()
            $.set_font()
            this.init()
        },
        methods: {
            init: function () {

            }
        }
    })
})