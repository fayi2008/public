$(function () {
    $.ADDLOAD()
    new Vue({
        el: '#main',
        data: {},
        mounted: function () {

            $.set_font()
            this.init()
        },
        methods: {
            init: function () {

            }
        }
    })
})