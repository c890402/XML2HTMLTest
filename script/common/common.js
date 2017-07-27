/**
 * Created by by on 2017/7/24.
 */


(function (win) {


    const common  = win.Common = win.Common || {

            // xml相关的基础变量
            _documentId: 'data/casb15070064.xml',
            // _documentId: 'data/introducing-texture.xml',

            // 公共全局模块变量
            module:{},

            // xml相关的全局变量,xmlFormat中赋值
            xml:{},

            html:{},

        }
})(window)
    // xml相关的基础私有变量
// const _documentId = 'data/casb15070064.xml';
// const _xmlStr = vfs.readFileSync(_documentId);
// const _xmlDom = loadXML.getXML(_xmlStr);
//
// // 读取出所有节点并且获得叶子节点，存储起来
// export const article = _xmlDom.getElementsByTagName('article')[0];
// export const title_groups = _xmlDom.getElementsByTagName('title-group');
//
// export const textArr = new Array();
// setXmlId(article, textArr);
//
// console.info(textArr);
// // 递归遍历所有xml节点，并存储有用的节点
// export function setXmlId(xmlElement, arr) {
//
//     //判断DOM有无子DOM
//     if (xmlElement.hasChildNodes()) {
//         //因为xml的文本节点是单独作为元素节点的子节点出现的
//
//         //1、找到所有叶子节点，并放入arr数组
//         if (xmlElement.childNodes.length == 1 && xmlElement.childNodes[0].nodeType == 3) {
//             arr.push(xmlElement);
//         }
//         //如果有, 遍历之
//         for (let item of xmlElement.childNodes) {
//             this.setXmlId(item, arr);
//         }
//
//     }
//     // 如果没有子元素，返回
//     else {
//         return false;
//     }
//
// }
