// editor
ZenPen = window.ZenPen || {};
ZenPen.editor = (function () {

    // Editor elements
    var headerField, abstractField, cleanSlate, lastType, currentNodeList, savedSelection;

    // Editor Bubble elements
    var toolBar, activeTools, annotations, boldButton, italicButton, subButton, urlButton, urlInput;

    var composing;

    function init() {

        composing = false;
        bindElements();

        createEventBindings();

        // Load state if storage is supported
        if (ZenPen.util.supportsHtmlStorage()) {
            loadState();
        } else {
            loadDefault();
        }
        // Set cursor position
        var range = document.createRange();
        var selection = window.getSelection();
        // range.setStart(headerField, 1);
        selection.removeAllRanges();
        selection.addRange(range);

    }

    function createEventBindings() {

        // Key up bindings
        if (ZenPen.util.supportsHtmlStorage()) {

            document.onkeyup = function (event) {
                checkTextHighlighting(event);
                saveState();
            }
        } else {
            document.onkeyup = checkTextHighlighting;
        }

        // Mouse bindings
        document.onmousedown = checkTextHighlighting;
        document.onmouseup = function (event) {

            setTimeout(function () {
                checkTextHighlighting(event);
            }, 1);
        };

        // Window bindings
        window.addEventListener('resize', function (event) {
            updateBubblePosition();
        });


        document.body.addEventListener('scroll', function () {

            // TODO: Debounce update bubble position to stop excessive redraws
            updateBubblePosition();
        });

        // Composition bindings. We need them to distinguish
        // IME composition from text selection
        document.addEventListener('compositionstart', onCompositionStart);
        document.addEventListener('compositionend', onCompositionEnd);
    }


    function bindElements() {

        headerField = $('.se-article-title');
        abstractField = $('.sc-abstract');
        toolBar = $('.sc-toolbar');

        activeTools = $('.se-active-tools');
        annotations = $('.sc-toggle-tool').children('button');

        boldButton = $('.bold');
        boldButton.on('click',function(e){
            document.execCommand('bold', false);

        });
        // boldButton.onclick = onBoldClick;

        italicButton = $('.italic');
        italicButton.on('click',function(e){
            document.execCommand('Italic', false);

        });
        // italicButton.onclick = onItalicClick;

        subButton = $('.subscript');
        subButton.on('click',function(e){
            document.execCommand('SubScript', false);
        });
        // subButton.onclick = onSubClick;

        urlButton = $('.url');
        urlButton.onmousedown = onUrlClick;

        urlInput = $('.url-input');
        urlInput.onblur = onUrlInputBlur;
        urlInput.onkeydown = onUrlInputKeyDown;
    }

    function onBoldClick() {
        document.execCommand('bold', false);
    }

    function onItalicClick() {
        document.execCommand('italic', false);
    }

    function onSubClick() {

        var nodeNames = findNodes(window.getSelection().focusNode);

        if (hasNode(nodeNames, 'BLOCKQUOTE')) {
            document.execCommand('formatBlock', false, 'p');
            document.execCommand('outdent');
        } else {
            document.execCommand('formatBlock', false, 'blockquote');
        }
    }

    function checkTextHighlighting(event) {

        var selection = window.getSelection();


        if ((event.target.className === "url-input" ||
            event.target.classList.contains("url") ||
            event.target.parentNode.classList.contains("ui-inputs") )) {

            currentNodeList = findNodes(selection.focusNode);
            updateBubbleStates();
            return;
        }

        // Check selections exist
        if (selection.isCollapsed === true && lastType === false) {

            onSelectorBlur();
        }

        // Text is selected
        if (selection.isCollapsed === false && composing === false) {
            currentNodeList = findNodes( selection.focusNode );

            // Find if highlighting is in the editable area
            if (isEditable(selection.focusNode)) {
                updateBubbleStates();
                // updateBubblePosition();

                // Show the ui bubble
                annotations.css('opacity','1.0');
            }
        }

        lastType = selection.isCollapsed;
    }

    // 更新弹出编辑框的位置，跟随鼠标焦点
    function updateBubblePosition() {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var boundary = range.getBoundingClientRect();

        toolBar.style.top = boundary.top - 5 + window.pageYOffset + "px";
        toolBar.style.left = (boundary.left + boundary.right) / 2 + "px";
    }

    function updateBubbleStates() {

        // It would be possible to use classList here, but I feel that the
        // browser support isn't quite there, and this functionality doesn't
        // warrent a shim.

        if (hasNode(currentNodeList, 'B')) {
            boldButton.className = "bold active"
        } else {
            boldButton.className = "bold"
        }

        if (hasNode(currentNodeList, 'I')) {
            italicButton.className = "italic active"
        } else {
            italicButton.className = "italic"
        }

        if (hasNode(currentNodeList, 'BLOCKQUOTE')) {
            subButton.className = "quote active"
        } else {
            subButton.className = "quote"
        }

        if (hasNode(currentNodeList, 'A')) {
            urlButton.className = "url useicons active"
        } else {
            urlButton.className = "url useicons"
        }
    }

    function onSelectorBlur() {

        toolBar.className = "text-options fade";
        setTimeout(function () {

            if (toolBar.className == "text-options fade") {

                toolBar.className = "text-options";
                toolBar.style.top = '-999px';
                toolBar.style.left = '-999px';
            }
        }, 260)
    }

    function isEditable(element){
        var isEdit = false;
        var selection = window.getSelection();
        while (element.parentNode) {

            if ($(element).attr('contentEditable')) {
                isEdit = true;
                break;
            }
            element = element.parentNode;
        }
        return isEdit;
    };

    function findNodes(element) {

        var nodeNames = {};

        // Internal node?
        var selection = window.getSelection();

        // if( selection.containsNode( $('b'), false ) ) {
        // 	nodeNames[ 'B' ] = true;
        // }

        while (element.parentNode) {

            if ($(element.parentNode).attr('contentEditable') === true) {
                nodeNames[element.nodeName] = true;
            }
            element = element.parentNode;

            if (element.nodeName === 'A') {
                nodeNames.url = element.href;
            }

        }

        return nodeNames;
    }

    function hasNode(nodeList, name) {

        return !!nodeList[name];
    }

    function saveState(event) {

        localStorage['header'] = headerField.innerHTML;
        localStorage['content'] = abstractField.innerHTML;
    }

    function loadState() {

        if (localStorage['header']) {
            headerField.innerHTML = localStorage['header'];
        } else {
            headerField.innerHTML = defaultTitle; // in default.js
        }

        if (localStorage['content']) {
            abstractField.innerHTML = localStorage['content'];
        } else {
            loadDefaultContent()
        }
    }

    function loadDefault() {
        headerField.innerHTML = defaultTitle; // in default.js
        loadDefaultContent();
    }

    function loadDefaultContent() {
        abstractField.innerHTML = defaultContent; // in default.js
    }



    function onUrlClick() {

        if (activeTools.className == 'options') {

            activeTools.className = 'options url-mode';

            // Set timeout here to debounce the focus action
            setTimeout(function () {

                var nodeNames = findNodes(window.getSelection().focusNode);

                if (hasNode(nodeNames, "A")) {
                    urlInput.value = nodeNames.url;
                } else {
                    // Symbolize text turning into a link, which is temporary, and will never be seen.
                    document.execCommand('createLink', false, '/');
                }

                // Since typing in the input box kills the highlighted text we need
                // to save this selection, to add the url link if it is provided.
                lastSelection = window.getSelection().getRangeAt(0);
                lastType = false;

                urlInput.focus();

            }, 100);

        } else {

            activeTools.className = 'options';
        }
    }

    function onUrlInputKeyDown(event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            applyURL(urlInput.value);
            urlInput.blur();
        }
    }

    function onUrlInputBlur(event) {

        activeTools.className = 'options';
        applyURL(urlInput.value);
        urlInput.value = '';

        currentNodeList = findNodes(window.getSelection().focusNode);
        updateBubbleStates();
    }

    function applyURL(url) {

        rehighlightLastSelection();

        // Unlink any current links
        document.execCommand('unlink', false);

        if (url !== "") {

            // Insert HTTP if it doesn't exist.
            if (!url.match("^(http|https)://")) {

                url = "http://" + url;
            }

            document.execCommand('createLink', false, url);
        }
    }

    function rehighlightLastSelection() {

        window.getSelection().addRange(lastSelection);
    }

    function getWordCount() {

        var text = ZenPen.util.getText(abstractField);

        if (text === "") {
            return 0
        } else {
            return text.split(/\s+/).length;
        }
    }

    function onCompositionStart(event) {
        composing = true;
    }

    function onCompositionEnd(event) {
        composing = false;
    }

    return {
        init: init,
        saveState: saveState,
        getWordCount: getWordCount
    }

})();
