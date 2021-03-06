/**
 * Created by by on 2017/7/24.
 */
const SLASH = '/'.charCodeAt(0)
class SimpleVFS {
    readFileSync(path) {
        if (path.charCodeAt(0) === SLASH) {
            path = path.slice(1)
        }
        if (!CONTENT.hasOwnProperty(path)) {
            throw new Error('File does not exist: ' + path)
        }
        return CONTENT[path]
    }

    existsSync(path) {
        return CONTENT.hasOwnProperty(path)
    }
}

class LoadXML {
    getXML(documentId) {
        let xmlDoc = null;
        const vfs = new SimpleVFS()
        const xmlString = vfs.readFileSync(documentId);
        console.log(documentId)
//判断浏览器的类型
//支持IE浏览器
        if (!window.DOMParser && window.ActiveXObject) { //window.DOMParser 判断是否是非ie浏览器
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
            for (var i = 0; i < xmlDomVersions.length; i++) {
                try {
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                } catch (e) {
                }
            }
        }
//支持Mozilla浏览器
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                 */
                let domParser = new DOMParser();
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
            } catch (e) {
            }
        }
        else {
            return null;
        }
        return xmlDoc;
    }
}
window.loadXML = new LoadXML();
