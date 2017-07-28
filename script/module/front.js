/**
 * Created by by on 2017/7/24.
 * 文章front部分
 */

(function ($, win) {
    function front() {

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

            for (const el of Common.xml.front) {
                const id = el.id;
                const cFront = '<div data-id="' + id + '" class="sc-front"></div>';
                $('.sc-article').append(cFront);
            }

            _self.getTitleGroup();
            _self.getAuthorList();
            _self.getAffList();
            _self.getAbstract();
        },

        // 标题
        getTitleGroup: function () {
            const _self = this;

            for (const xTitleGroup of Common.xml['title-group']) {

                const id = xTitleGroup.id;

                // 外层div
                const cTitleGroup = '<div data-id="' + id + '" class="sc-title-group"></div>';
                $('.sc-front').append(cTitleGroup);

                // 第二外层，可编辑div
                const eArticleTitle = '<div tabindex="2" data-surface-id="titleEditor" contenteditable="true" spellcheck="false" ' +
                    'class="sc-surface sc-text-property-editor sm-enabled se-article-title"></div>';
                $('.sc-title-group').append(eArticleTitle);

                // 中文
                const xArtitleTitle = xTitleGroup.getElementsByTagName('article-title');
                for (const xTitle of xArtitleTitle) {
                    const id = xTitle.id;
                    const cArtitletitle = '<div data-path="' + id + '.content" class="sc-text-property">' + xTitle.innerHTML + '</div>';
                    $('.se-article-title').append(cArtitletitle);
                }
                // 英文
                const xTransTitle = xTitleGroup.getElementsByTagName('trans-title');
                for (const xTitle of xTransTitle) {
                    const id = xTitle.id;
                    const cTransTitle = '<div data-path="' + id + '.content" class="sc-text-property">' + xTitle.innerHTML + '</div>';
                    $('.se-article-title').append(cTransTitle);
                }
                // console.log(xArtitleTitle.innerHTML)
            }
        },

        // 作者
        getAuthorList: function () {
            const _self = this;

            // 该div内的作者名称及上标字符串拼接
            let cAuthorList = "";
            $.each(Common.xml['contrib'], function (index, contrib) {

                // 每一个带上标的作者名称
                let xAuthor = contrib.getElementsByTagName('string-name')[0].innerHTML;
                // 若是上标存在，则遍历后拼接到xAuthor
                const xXrefList = contrib.getElementsByTagName('xref');
                if (xXrefList.length != 0) {
                    $.each(xXrefList, function (i, xref) {
                        const xSup = xref.getElementsByTagName('sup')[0];
                        const cSup = '<sup >' + xSup.innerHTML + '</sup>';
                        xAuthor += cSup;
                        if (i !== xXrefList.length - 1) {
                            xAuthor += '<sup>,</sup>'
                        }
                    });
                }
                cAuthorList += xAuthor;
                if (index != contrib.length - 1) {
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
            $.each(Common.xml['aff-alternatives'], function (index, xAffiliation) {
                // 每一个机构
                let xAffList = xAffiliation.getElementsByTagName('aff');
                $.each(xAffList, function (i, xAff) {
                    // 只选择中文的
                    if (!xAff.hasAttribute('xml:lang')) {
                        cAffList += xAff.innerHTML;
                    }
                });
                if (index !== Common.xml['aff-alternatives'].length - 1) {
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

            for (const abstract of Common.xml['abstract']) {
                if (abstract.getAttribute('abstract-type') === "key-points") {

                    const id = abstract.id;
                    // 外层div
                    const cAbstract = '<div data-id="' + id + '" class="sc-abstract"></div>';
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
                    const abstractP = abstract.getElementsByTagName('p');
                    for (const p of abstractP) {
                        const pId = p.id;
                        const cAbstractP = '<div data-id="' + pId + '" class="sc-p"></div>';
                        $('.abstract-content-1.sc-container-editor').append(cAbstractP);
                        const cAbstractSpan = '<p data-path="' + pId + '.content" class="sc-text-property">' + p.innerHTML + '</p>';
                        $('[data-id=' + pId + ']').append(cAbstractSpan);
                    }
                }

            }

            for (const abstract of Common.xml['trans-abstract']) {
                if (abstract.getAttribute('abstract-type') === "key-points") {

                    const id = abstract.id;

                    // 第四外层 p
                    const abstractP = abstract.getElementsByTagName('p');
                    for (const p of abstractP) {
                        const pId = p.id;
                        const cAbstractP = '<div data-id="' + pId + '" class="sc-p"></div>';
                        $('.abstract-content-1.sc-container-editor').append(cAbstractP);
                        const cAbstractSpan = '<p data-path="' + pId + '.content" class="sc-text-property">' + p.innerHTML + '</p>';
                        $('[data-id=' + pId + ']').append(cAbstractSpan);
                    }
                }
            }


        },

    }
    Common.module["front"] = front;
})(jQuery, window);

