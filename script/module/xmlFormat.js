/**
 * Created by by on 2017/7/27.
 * 给xml相关的节点添加id属性
 */

(function ($, win) {
    function xmlFormat() {
        this.xmlDom = Common.xml.xmlDom;
    }

    xmlFormat.prototype = {
        constructor: xmlFormat,
        init: function () {
            const _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            const _self = this;
            const _xmlDom = _self.xmlDom;
            Common.xml.article = _self.article = _xmlDom.getElementsByTagName('article')[0];

            _self.attrJson = {};
            _self.getXMLNode(_self.article);
            console.log(_xmlDom);

            _self.addAttrId();
        },

        // 递归遍历所有xml节点，添加id并存储
        getXMLNode: function (xmlElement) {
            const _self = this;
            const name = xmlElement.nodeName;
            //判断DOM有无子DOM
            if (xmlElement.hasChildNodes()) {
                // 如果该类元素从来未出现（即未为其赋id值），或者，才开始操作xml文件，存储属性的json对象为空
                if (!(name in _self.attrJson) || !(_self.attrJson)) {
                    xmlElement.setAttribute('id', name + '-' + 1);
                    _self.attrJson[name] = name + '-' + 1;
                }
                else {
                    const oldId = _self.attrJson[name];
                    const newId = _self.serialId(oldId);
                    xmlElement.setAttribute('id', newId);
                    // 更新json中属性值为最新（后者可以覆盖前者）
                    _self.attrJson[name] = newId;
                }
                //如果有, 遍历之
                for (let item of xmlElement.childNodes) {
                    this.getXMLNode(item);
                }

            }
            // 如果没有子元素，返回
            // else {
            //     return false;
            // }
        },
        // 自动为shuxingid值+1
        serialId: function (oldId) {
            const length = oldId.length;
            const num = (parseInt(oldId.charAt(length - 1))) + 1;
            const newId = oldId.substr(0,length - 1) + num;
            return newId;
        },

        getXmlNode: function () {
            const _self = this;
            const _xmlDom = _self.xmlDom;

            // 得到所有的list格式的节点序列
            Common.xml.front = _self.front = _xmlDom.getElementsByTagName('front');
            Common.xml.article_meta = _self.article_meta = _xmlDom.getElementsByTagName('article-meta');
            Common.xml.title_group = _self.title_group = _xmlDom.getElementsByTagName('title-group');
            Common.xml.article_title = _self.article_title = _xmlDom.getElementsByTagName('article-title');
            Common.xml.trans_title_group = _self.trans_title_group = _xmlDom.getElementsByTagName('trans-title-group');
            Common.xml.trans_title = _self.trans_title = _xmlDom.getElementsByTagName('trans-title');

            Common.xml.contrib_group = _self.contrib_group = _xmlDom.getElementsByTagName('contrib-group');
            Common.xml.contrib = _self.contrib = _xmlDom.getElementsByTagName('contrib');
            Common.xml.aff_alternatives = _self.aff_alternatives = _xmlDom.getElementsByTagName('aff-alternatives');
            Common.xml.abstract = _self.abstract = _xmlDom.getElementsByTagName('abstract');
            Common.xml.trans_abstract = _self.trans_abstract = _xmlDom.getElementsByTagName('trans-abstract');
            Common.xml.p = _self.p = _xmlDom.getElementsByTagName('p');


        },

        // 设置xml节点的id属性值
        addAttrId: function () {
            const _self = this;


        },

    }
    Common.module["xmlFormat"] = xmlFormat;
})(jQuery, window);

