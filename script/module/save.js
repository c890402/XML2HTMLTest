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
            document.addEventListener("DOMSubtreeModified", function(evt) {
                console.log(evt.target.name);
            }, false);
            _self.saveXml();
        },
        saveXml: function () {
            const _self = this;

            // document.onmouseup = function (event) {
            //
            //     setTimeout(function () {
            //         _self.checkTextHighlighting(event);
            //     }, 1);
            // };

        },


}
    Common.module["save"] = save;
})(jQuery, window);

