/**
 * Created by by on 2017/7/24.
 * 文章标题部分
 */
// import * as common from '../common/common.js';


// class Title {
//     constructor($){
//         this.$ = $;
//         this.title_groups = cLib.base.title_groups;
//     }
//     getTitleGroup() {
//         for (let xTitleGroup of this.title_groups) {
//
//             const cTitleGroup = '<div data-id="title-group" class="sc-title-group"></div>';
//
//             $('.sc-layout').append(cTitleGroup);
//
//             const eArticleTitle = '<div tabindex="2" data-surface-id="titleEditor" contenteditable="true" spellcheck="false" ' +
//                 'class="sc-surface sc-text-property-editor sm-enabled se-article-title"></div>';
//             $('.sc-title-group').append(eArticleTitle);
//
//
//             const xArtitleTitle = xTitleGroup.getElementsByTagName('article-title')[0];
//             const cArtitletitle = '<div data-path="article-title-1.content" class="sc-text-property">' + xArtitleTitle.innerHTML + '</div>';
//             $('.sc-surface').append(cArtitletitle);
//
//             console.log(xArtitleTitle.innerHTML)
//         }
//     }
// }
// new Title(jQuery).getTitleGroup();

(function ($, win) {
    function title() {
        this.title_groups = Common.title_groups;
    }

    title.prototype = {
        constructor: title,
        init: function () {
            var _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            var _self = this;
            _self.getTitleGroup();

        },
        getTitleGroup: function() {
            for (let xTitleGroup of this.title_groups) {

                const cTitleGroup = '<div data-id="title-group" class="sc-title-group"></div>';

                $('.sc-layout').append(cTitleGroup);

                const eArticleTitle = '<div tabindex="2" data-surface-id="titleEditor" contenteditable="true" spellcheck="false" ' +
                    'class="sc-surface sc-text-property-editor sm-enabled se-article-title"></div>';
                $('.sc-title-group').append(eArticleTitle);


                const xArtitleTitle = xTitleGroup.getElementsByTagName('article-title')[0];
                const cArtitletitle = '<div data-path="article-title-1.content" class="sc-text-property">' + xArtitleTitle.innerHTML + '</div>';
                $('.sc-surface').append(cArtitletitle);

                console.log(xArtitleTitle.innerHTML)
            }
        }

    }
    Common.module["title"] = title;
})(jQuery, window);

$(function() {
    new Common.module.title().init();
})

