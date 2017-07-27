/**
 * Created by by on 2017/7/27.
 * 给xml相关的节点添加id属性
 */

(function (_documentId) {
    function xmlRead() {
        this._documentId = _documentId;
    }

    xmlRead.prototype = {
        constructor: xmlRead,
        init: function () {
            const _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            const _self = this;
            _self.getXmlDom();
        },
        getXmlDom:function () {
            const _self = this;
            _self.xmlDom = loadXML.getXML(_self._documentId);
            Common.xml.xmlDom = _self.xmlDom;
        },

}
    Common.module["xmlRead"] = xmlRead;
})(Common._documentId);

