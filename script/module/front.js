/**
 * Created by by on 2017/7/24.
 * 文章front部分
 */

(function ($, win) {
    function front() {
        this.title_groups = Common.xml.title_group;
        this.contrib = Common.xml.contrib;
        this.aff_alternatives = Common.xml.aff_alternatives;
        this.abstract = Common.xml.abstract;
        this.trans_abstract = Common.xml.trans_abstract;

    }

    front.prototype = {
        constructor: front,
        init: function () {
            const _self = this;
            _self.bindEvents();
        },
        bindEvents: function () {
            const _self = this;
            _self.getFront();
        },
        getFront: function () {
            const _self = this;

            const cFront = '<div data-id="front-1" class="sc-front"></div>';
            $('.sc-article').append(cFront);

            _self.getTitleGroup();
            _self.getAuthorList();
            _self.getAffList();
            _self.getAbstract();
        },

        // 标题
        getTitleGroup: function () {
            const _self = this;

            $.each(_self.title_groups, function (index, xTitleGroup) {
                // 外层div
                const cTitleGroup = '<div data-id="title-group-' + (index + 1) + '" class="sc-title-group"></div>';
                $('.sc-front').append(cTitleGroup);

                // 第二外层，可编辑div
                const eArticleTitle = '<div tabindex="2" data-surface-id="titleEditor" contenteditable="true" spellcheck="false" ' +
                    'class="sc-surface sc-text-property-editor sm-enabled se-article-title"></div>';
                $('.sc-title-group').append(eArticleTitle);

                // 中文
                const xArtitleTitle = xTitleGroup.getElementsByTagName('article-title')[0];
                const cArtitletitle = '<div data-path="article-title-' + (index + 1) + '.content" class="sc-text-property">' + xArtitleTitle.innerHTML + '</div>';
                $('.se-article-title').append(cArtitletitle);

                // 英文
                const xTransTitle = xTitleGroup.getElementsByTagName('trans-title')[0];
                const cTransTitle = '<div data-path="article-trans-title-' + (index + 1) + '.content" class="sc-text-property">' + xTransTitle.innerHTML + '</div>';
                $('.se-article-title').append(cTransTitle);
                // console.log(xArtitleTitle.innerHTML)
            })
        },

        // 作者
        getAuthorList: function () {
            const _self = this;

            // 该div内的作者名称及上标字符串拼接
            let cAuthorList = "";
            $.each(_self.contrib, function (index, contrib) {
                // 每一个带上标的作者名称
                let xAuthor = contrib.getElementsByTagName('string-name')[0].innerHTML;
                // 若是上标存在，则遍历后拼接到xAAuthor
                const xXrefList = contrib.getElementsByTagName('xref');
                if (xXrefList.length != 0) {
                    $.each(xXrefList, function (i, xref) {
                        const xSup = xref.getElementsByTagName('sup')[0];
                        const cSup = '<sup >' + xSup.innerHTML + '</sup>';
                        xAuthor += cSup;
                    });
                }
                cAuthorList += xAuthor;
                if (index != _self.contrib.length - 1) {
                    cAuthorList += ' '
                }
            });

            // 作者的div
            const cAuthors = '<div class="sc-authors-list">' + cAuthorList + '</div>';
            $('.sc-front').append(cAuthors);

        },

        // 机构
        getAffList: function () {
            const _self = this;

            // 该div内的机构名称
            let cAffList = "";
            $.each(_self.aff_alternatives, function (index, xAffiliation) {
                // 每一个机构
                let xAffList = xAffiliation.getElementsByTagName('aff');
                $.each(xAffList, function (i, xAff) {
                    // 只选择中文的
                    if (!xAff.hasAttributes()) {
                        cAffList += xAff.innerHTML;
                    }
                });
                if (index != _self.aff_alternatives.length - 1) {
                    cAffList += ';'
                }
            });

            // 机构的div
            const cAffs = '<div class="sc-affiliations-list">' + cAffList + '</div>';
            $('.sc-front').append(cAffs);
        },

        // 摘要
        getAbstract: function () {
            const _self = this;

            // 外层div
            const cAbstract = '<div data-id="abstract-1" class="sc-abstract"></div>';
            $('.sc-front').append(cAbstract);

            // 第二外层div
            const cAbstractContent = '<div data-id="abstract-content-1" class="sc-abstract-content"></div>';
            $('.sc-abstract').append(cAbstractContent);

            // 第三外层，可编辑div
            const eAbstract = '<div tabindex="2" data-surface-id="abstractEditor" ' +
                'data-id="abstract-content-1" contenteditable="true" spellcheck="false" ' +
                'class="sc-surface sc-container-editor container-node abstract-content-1 sm-enabled"></div>';
            $('.sc-abstract-content').append(eAbstract);

            // 第四外层 p
            const cAbstractP = '<div data-id="p-1" class="sc-p"></div>';
            $('.abstract-content-1.sc-container-editor').append(cAbstractP);

            // 中文
            _self._getAbstract(_self.abstract[0]);
            // 英文
            _self._getAbstract(_self.trans_abstract[0]);

        },

        // 中英文摘要分别获取
        _getAbstract: function (abstracts) {
            $.each(abstracts, function (index, xAbstract) {
                // 筛选出头部的摘要，因为还有图注用的也是abstract标签
                if (xAbstract.getAttribute('abstract-type') === "key-points") {
                    const xAbstractContent = xAbstract.getElementsByTagName('p')[0];
                    const cAbstractSpan = '<p data-path="p-1.content" class="sc-text-property">' + xAbstractContent.innerHTML + '</p>';
                    $('[data-id="p-1"]').append(cAbstractSpan);
                }
            });
        },
    }
    Common.module["front"] = front;
})(jQuery, window);

