/**
 * Created by by on 2017/7/27.
 * 给xml相关的节点添加id属性
 */

(function ($, win) {
    function xmlFormat() {
        // xml文档
        this.xmlDom = Common.xml.xmlDom;
        // 所有的节点类型，值为其最后的id，不重复
        this.attrJson = {};
        // 根节点
        Common.xml.article = this.article = this.xmlDom.getElementsByTagName('article')[0];
    }

    xmlFormat.prototype = {
        constructor: xmlFormat,
        init: function () {
            const _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            const _self = this;

            _self.setXmlId(_self.article);
            _self.setCommonXml();

            _self.addAttrId();
        },

        // 递归遍历所有xml节点，添加id并存储
        setXmlId: function (xmlElement) {
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
                    this.setXmlId(item);
                }

            }
        },
        // 自动为属性id值+1
        serialId: function (oldId) {
            const length = oldId.length;
            const num = (parseInt(oldId.charAt(length - 1))) + 1;
            const newId = oldId.substr(0,length - 1) + num;
            return newId;
        },

        // 得到xml中所有的list格式的节点序列
        setCommonXml: function () {
            const _self = this;
            const _xmlDom = _self.xmlDom;
            const xmlEls = _self.attrJson;

            for(const xmlEl in xmlEls){
                if(xmlEl!=='article'){
                    Common.xml[xmlEl] = _xmlDom.getElementsByTagName(xmlEl);
                }
            }
        },

        // 设置xml节点的id属性值
        addAttrId: function () {
            const _self = this;
        },

    }
    Common.module["xmlFormat"] = xmlFormat;
})(jQuery, window);

