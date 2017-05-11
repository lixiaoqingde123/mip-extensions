/**
 * @file mip-cambrian-article 寒武纪文章落地页组件
 * @author lixiaoqing
 * @date 2017-05-04
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // 获取文章ID
        var aid = this.element.getAttribute('aid');
        var element = this.element;
        // 文章数据
        var data;
        var ARTICLE_AJAX = '/officeplatform/message/articleselect?aid=' + aid;

        // 获取数据
        fetch(ARTICLE_AJAX).then(function (res) {
            return res.text();
        }).then(function (text) {
            data = JSON.parse(text).data;
            // 文章主题内容，分为html和style两部分，把style塞到style标签里
            document.getElementsByTagName('style')[0].insertAdjacentHTML('beforeend', data.content.style);
            // 渲染html
            templates.render(element, data).then(function (html) {
                element.innerHTML = html;
            });
        });
    };

    return customElement;
});
