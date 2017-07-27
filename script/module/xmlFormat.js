/**
 * Created by by on 2017/7/27.
 * 给xml相关的节点添加id属性
 */

(function ($, win) {
    function xmlFormat() {
        this.xmlDom = Common.xmlDom;
    }

    xmlFormat.prototype = {
        constructor: xmlFormat,
        init: function () {
            const _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            const _self = this;
            _self.getXmlNode();
            _self.addAttrId();
        },
        getXmlNode: function () {
            const _self = this;
            const _xmlDom = _self.xmlDom;

            // 得到所有的list格式的节点序列
            Common.xml.article = _self.article = _xmlDom.getElementsByTagName('article');
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

