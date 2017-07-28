/**
 * Created by by on 2017/7/24.
 * 粗体斜体链接等编辑部分
 */

(function ($, win) {
    function save() {

    }

    save.prototype = {
        constructor: save,
        init: function () {
            const _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            const _self = this;
            _self.saveXml();
        },
        saveXml: function () {
            const _self = this;
            $('.save').on('click', function () {
                console.info('保存新的xml：', Common.xml.xmlDom);
            })
        },
    }
    Common.module["save"] = save;
})(jQuery, window);

