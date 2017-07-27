/**
 * Created by by on 2017/7/24.
 * 粗体斜体链接等编辑部分
 */

(function ($, win) {
    function edit() {

    }

    edit.prototype = {
        constructor: edit,
        init: function () {
            const _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            const _self = this;
            _self.editArticle();
        },
        editArticle: function () {
            const _self = this;

            document.onmouseup = function (event) {

                setTimeout(function () {
                    _self.checkTextHighlighting(event);
                }, 1);
            };

            const boldButton = $('.bold');
            boldButton.on('click', function (e) {
                document.execCommand('bold', false);

            });
            // boldButton.onclick = onBoldClick;

            const italicButton = $('.italic');
            italicButton.on('click', function (e) {
                document.execCommand('Italic', false);

            });
            // italicButton.onclick = onItalicClick;

            const subButton = $('.subscript');
            subButton.on('click', function (e) {
                document.execCommand('SubScript', false);
            });
        },

        checkTextHighlighting: function (event) {

            const _self = this;
            var selection = window.getSelection();


            const annotations = $('.sc-toggle-tool').children('button');
            if (_self.isEditable(selection.focusNode)) {
                annotations.css('opacity', '1.0');
            }
        },
        isEditable: function (element) {
            var isEdit = false;
            var selection = window.getSelection();
            while (element.parentNode) {

                if ($(element).attr('contentEditable')) {
                    isEdit = true;
                    break;
                }
                element = element.parentNode;
            }
            return isEdit;
        },


}
    Common.module["edit"] = edit;
})(jQuery, window);

