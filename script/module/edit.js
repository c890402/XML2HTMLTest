/**
 * Created by by on 2017/7/24.
 * 粗体斜体链接等编辑部分
 */

(function ($, win) {
    function edit() {
        this.xmlDom = Common.xml.xmlDom;
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

            document.onkeyup = _self.checkTextHighlighting;



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

            // 如果选中区域可编辑，修改工具栏样式
            const annotations = $('.sc-toggle-tool').children('button');
            const isEdit = _self.isEditable(selection.focusNode);
            if (isEdit) {
                annotations.css('opacity', '1.0');
            }

            // 找到修改节点的path，格式为：p-8.content
            const dataPathEl = _self.hasDataPath(selection.focusNode);
            if(dataPathEl){
                const path = $(dataPathEl).attr('data-path').split('.');
                const xmlEl = _self.xmlDom.getElementById(path[0]);
                xmlEl.textContent = dataPathEl.innerHTML;
                console.log(xmlEl);
            }

        },
        findNodes: function (element) {

            var nodeNames = {};

            // Internal node?
            var selection = window.getSelection();

            // if( selection.containsNode( document.querySelector('b'), false ) ) {
            // 	nodeNames[ 'B' ] = true;
            // }

            while (element.parentNode) {

                nodeNames[element.nodeName] = true;
                element = element.parentNode;

                if (element.nodeName === 'A') {
                    nodeNames.url = element.href;
                }
            }

            return nodeNames;
        },

        // 找到上级可编辑的最近的元素，如果有，返回true，证明该选中内容可编辑，即可保存
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
            return isEdit

        },

        // 找到上级元素中含有datapath最近的元素，根据datapath属性值从而找到xml中对应的节点
        hasDataPath: function (element) {
            while (element.parentNode) {
                if($(element).attr('data-path')) {
                    return element;
                }
                element = element.parentNode;
            }
            return null;

    }



    }
    Common.module["edit"] = edit;
})(jQuery, window);

