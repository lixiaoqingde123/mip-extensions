/**
 * @file mip-cambrian-article 寒武纪文章落地页组件
 * @author lixiaoqing
 * @date 2017-05-04
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    // viewer 窗口
    var viewer = require('viewer');


    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // 获取公帐号ID
        var id = this.element.getAttribute('id');
        id && viewer.sendMessage('cambrian-header', id);

        // 获取文章ID
        var aid = this.element.getAttribute('aid');
        var element = this.element;
        // 文章数据
        var data;
        var url = '/officeplatform/message/articleselect?aid=' + aid;

        // 获取数据
        fetch(location.href).then(function (res) {
            return res.text();
        }).then(function (text) {
            data = JSON.parse(text).data;
        });

        templates.render(element, data).then(function (html) {
            element.innerHTML = html;
        });
    };

    return customElement;
});
