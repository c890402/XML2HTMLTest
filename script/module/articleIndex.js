/**
 * Created by by on 2017/7/24.
 * 文章标题部分
 */

// class ArticleIndex {
//     constructor($) {
//         this.$ = $;
//         this.article = Common.article;
//     }
//
//     // 添加文章的html节点
//     _getArticle() {
//         const cArticle = '<div data-id="article" class="sc-article"></div>';
//         $('.sc-layout').append(cArticle);
//     }
//
//     // 添加文章下属的四种子节点
//     _getFront(){
//         new FrontIndex();
//     }
//
//     _getBody(){
//         new BodyIndex();
//     }
//
//     _getBack(){
//         new BackIndex();
//     }
//
//     _getSeparator(){
//         new SeparatorIndex();
//     }
// }
// new ArticleIndex(jQuery)._getArticle();

(function ($, win) {
    function articleIndex() {
        this.article = Common.article;
    }

    articleIndex.prototype = {
        constructor: articleIndex,
        init: function () {
            var _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            var _self = this;
            _self.getArticle();

        },
        // 添加文章的html节点
        getArticle: function () {
            var _self = this;

            const cArticle = '<div data-id="article" class="sc-article"></div>';
            $('.sc-layout').append(cArticle);

            _self.getFront();
            _self.getBody();
            _self.getBack();
            _self.getSeparator();
        },

        // 添加文章下属的四种子节点
        getFront: function (){
            new Common.module.front().init();
        },

        getBody: function (){
            new BodyIndex();
        },

        getBack: function (){
            new BackIndex();
        },

        getSeparator: function (){
            new SeparatorIndex();
        },

    }
    Common.module["articleIndex"] = articleIndex;
})(jQuery, window);