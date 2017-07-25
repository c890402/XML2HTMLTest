/**
 * Created by wangpeng on 2017/3/29.
 */
(function ($, win) {
    function main() {
        this.server = new Carnet.module.server();
        this.dataMenu = {};//菜单数据
    }

    main.prototype = {
        constructor: main,
        init: function () {
            var _self = this;
            //屏幕响应
            $(win).on('resize', _self.resize).trigger('resize');
            // $(win).resize = _self.resize();
            _self.bindEvents();
        },
        bindEvents: function () {
            var _self = this;

            //判断是从login跳转进来还是直接进入main
            var userName = cLib.base.getCookie('user');

            // 如果是直接从主页面进入
            if(!userName){
                _self.autoCookie();
            }

            _self.resetStyle();
            _self.pageOperate();
            _self.getMenu();
            _self.bindUser(userName);
            _self.bindExit();
            _self.bindAbout();

        },
        // 从cookie中读取登录信息，方便自动跳转
        autoCookie: function(){
            var _self = this;
            var cookieUser=cLib.base.getCookie('username'),
                cookiePw=cLib.base.getCookie('password');
            if(cookieUser&&cookiePw){//判断是否记住了密码
                var subData={
                    username:cookieUser,
                    password:cookiePw
                }
                _self.server.login(subData).done(function(res){
                    if(res=="success"){
                        cLib.base.setCookie("user",cookieUser);
                        return;
                    }
                    // 登录验证失败
                    else{
                        window.location.href="login.html";
                        layer.msg("用户名密码验证失败");
                    }
                })
            }
            // 没有用户名密码的缓存
            else{
                window.location.href="login.html";
            }
        },

        // 绑定用户
        bindUser: function(userName){
            $('#userName').text(userName);
        },
        // 退出事件
        bindExit: function(){
            var _self = this;
            $('.exit').bind('click', function () {
                layer.open({
                    content: '确认注销 ？',
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function(){
                        _self.logout();
                    }
                });
            })
        },
        // 关于事件
        bindAbout: function(){
            var content = '<p>版本：1.0.0.001</p><p>版权:安徽四创电子股份有限公司</p>';
            $('#about').bind('click', function () {
                layer.open({
                    title: '版本信息',
                    content: content,
                    shade: 0.2,
                    shadeClose: false,
                    btn:null
                });
            })
        },
        // 注销
        logout: function(){
            var _self = this;
            _self.server.logout().done(function(res){
                // window.location.href="main.html";
                if(res=="success"){
                    cLib.base.setCookie("username", "");
                    cLib.base.setCookie("password", "");
                    cLib.base.setCookie("user", '');
                    window.location.href = "login.html";
                    layer.msg("已退出",{'offset':['34%', '74%']});

                }else{
                    layer.msg("注销失败，请检查",{'offset':['34%', '74%']});
                }
            })
        },

        // 屏幕响应
        resize: function () {
            // layer.msg("不建议调整屏幕大小");
            var _self = this;
            //清除屏幕右侧滚动条，使body占比100%
            $('body').css({
                "overflow-y": "hidden"
            });
            //右侧布局浮动
            $('.rightWrap').css({
                'float': 'left'
            })
            //写死左侧宽度150px，右侧宽度可变
            $('#leftWrap').width(150);
            $('.rightWrap').width($('body').width() - $("#leftWrap").width());
        },
        //logo区
        resetStyle: function () {
            var _self = this;
            $('.logoWrap p,#userWrap').css({
                'line-height': $('.logoWrap').height() + 'px'
            });
        },
        //左侧菜单项收回弹出
        pageOperate: function () {
            var _self = this;
            $('.setNarrow').bind('click', function () {//变窄
                $('#leftWrap').addClass('narrow');

                $('#tabNarrow').show();
                $('.tabUl p').hide();
                $('.tabUl li img').css('margin-top', '16px')

                $('#leftWrap').css('width', '50px');
                $('.rightWrap').width($('body').width() - $('#leftWrap').width());
                _self.isNarrow = true;
            })
            $('#tabNarrow').bind('click', function () {//变宽
                $('#leftWrap').removeClass('narrow');

                $(this).hide();
                $('.tabUl li img').css('margin-top', '0px')
                $('.tabUl p').show();
                $('#leftWrap').css('width', '150px');

                $('.rightWrap').width($('body').width() - $('#leftWrap').width());
                _self.isNarrow = false;

            })

            //一级菜单点击
            $('#navUl').delegate('li', 'click', function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                _self.getLeft($(this).attr('dataid'), _self.dataMenu);
                $('a:first').find('span').click();

            });

            // wy首页三个数据点击打开页面
            $("#contentIn").load(function () {
                $(this).contents().find(".ap").attr("onclick", "return true");
                $(this).contents().find(".ap").bind('click', function () {
                    var obj = _self.check("pagetab", $(this).attr("href"));
                    if (obj == 0) {
                        //不存在
                        _self.pageTabAdd($(this).attr('name'), $(this).attr('href'));
                    } else {
                        // 存在 ，将其他页面去除active，将其设为active
                        $('#pagetab .atabs').removeClass('active');
                        obj.addClass('active');
                    }
                })
            });

            //左侧菜单与右侧选项卡标题对应
            $('#leftTab').delegate('a', 'click', function () {
                if ($(this).attr('href').length > 1) {
                    var obj = _self.check('pagetab', $(this).attr('href'));
                    if (obj == 0) {
                        //不存在，
                        if ($(this).attr('dataLevel') == 'second') {
                            _self.pageTabAdd($(this).find('p').html(), $(this).attr('href'));
                        } else {
                            _self.pageTabAdd($(this).html(), $(this).attr('href'));
                        }
                    } else { // 存在 ，将其他页面去除active，将其设为active
                        $('#pagetab .atabs').removeClass('active');
                        obj.addClass('active');
                    }
                }
            });
            $('#pagetab').delegate('.atabs', 'click', function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            })
            $('#pagetab').delegate('.atabs', "contextmenu", function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                _self.tabPageClick($(this).prop('href'));
                return false;
            })
            $('#pagetab').delegate('.atabs-close', 'click', function (event) {
                event.preventDefault();
                if ($(this).parent().hasClass('active')) {
                    _self.tabPageClick($(this).parent().prev().prop('href'));
                    $(this).parent().prev().addClass('active');
                }
                $(this).parent().remove();
                $('#pagetab').css('width', _self.getWidth('pagetab'));
                // console.log("关闭选项卡后的tab宽度：" + $('#pagetab').width());
                if (Math.abs($('#pagetab').position().left) > $('#pagetab').width() - $('#tabbox').width() && $('#pagetab').width() > $('#tabbox').width()) {
                    $('#pagetab').animate({'left': $('#tabbox').width() - $('#pagetab').width()});
                } else if ($('#pagetab').width() < $('#tabbox').width()) {
                    $('#pagetab').animate({'left': 0});
                }
            })
            $('#tabLeft,#tabRight').bind('click', function () {
                _self.tabMove($(this).attr('id'));
            })
        },
        pageTabAdd: function (title, src) {
            var _self = this;
            $('#pagetab .atabs').removeClass('active');
            $('#pagetab').append("<a class='atabs active'  href='" + src + "' target='downcon'>" + title + "&nbsp<span class='atabs-close'>X</span></a>");
            $('#pagetab').css('width', _self.getWidth('pagetab'));
            if ($('#pagetab').width() > $('#tabbox').width()) {
                $('#tabLeft,#tabRight').show();
                $('#pagetab').animate({'left': $('#tabbox').width() - $('#pagetab').width()});
            }
        },
        check: function (id, src) {//判断是否存在此标签
            var _self = this;
            var obj = 0;
            $.each($('#' + id + ' .atabs'), function () {
                //遍历选项卡标题a标签中的href，如果存在包含子字符串src的href，则返回位置；判断两个href是否一致
                if ((src.indexOf($(this).attr('href')) > 0) || (src == $(this).attr('href'))) {
                    obj = $(this);
                }
            })
            return obj;
        },
        getWidth: function (id) {
            var _self = this;
            var wid = 0;
            // yub 20170503 解决第二次打开菜单项时，右侧选项卡标题对应不上的bug,需要再改
            if (parseInt($('#' + id).width()) <= 100) {
                wid = 200;
            }
            else {
                $.each($('#' + id + ' .atabs'), function (i) {
                    // console.log(i + "：" + parseInt($(this).width()) + ";tab宽度：" + $('#pagetab').width());
                    wid += $(this).width() + 26;
                })
            }
            // console.log("返回的width：" + wid);
            return wid;
        },
        tabPageClick: function (src) {
            var _self = this;
            $('#contentIn').prop('src', src);

        },
        tabMove: function (id) {
            if (id == 'tabLeft') {//左侧点击
                if (Math.abs($('#pagetab').position().left) + $('#tabbox').width() >= $('#pagetab').width() - 50) {
                    $('#pagetab').animate({'left': -($('#pagetab').width() - $('#tabbox').width())});
                } else {
                    $('#pagetab').animate({'left': ($('#pagetab').position().left - 110)});
                }
            } else {
                if (Math.abs($('#pagetab').position().left) <= 50) {
                    $('#pagetab').animate({'left': 0});
                } else {
                    $('#pagetab').animate({'left': ($('#pagetab').position().left + 110)});
                }
            }
        },
        getMenu: function () {
            var _self = this;
            var userName = cLib.base.getCookie('user');
            _self.server.getUserMenu(userName).done(function (res) {
                if (res) {
                    _self.dataMenu = res;
                    $('#navUl').html('');
                    $.each(res, function (i) {
                        if (res[i]['parentId'] == 1) {
                            $('#navUl').append('<li dataid="' + res[i]['id'] + '">' + res[i]['permissionName'] + '</li>')
                        }
                    });
                    $('#navUl li').eq(0).addClass('active');
                    // console.log("tab宽度：" + $('#pagetab').width());
                    _self.getLeft($('#navUl li').eq(0).attr('dataid'), res);
                }
            })
        },
        getLeft: function (id, data) {
            var _self = this;
            if (data) {
                $('#leftTab').html('');
                $.each(data, function (i) {
                    if (data[i]['parentId'] == id) {
                        if (data[i]['url']) {
                            //如果该二级菜单没有三级菜单
                            $('#leftTab').append('<li dataid="' + data[i]['id'] + '">' +
                                //yub 请求路径添加'.html' 否则请求不到
                                '<a  href="' + '/sichuang-wangyueche/static/sichuang/html' + data[i]['url'] + '.html' + '" dataLevel="second" target="downcon">' +
                                '<div class="tabIconWrap">' +
                                '<img src="images/left/' + ((data[i]["icon"] + '.png') || "icon1.png") + '">' +
                                '</div>' +
                                '<span><p >' + data[i]['permissionName'] + '</p></span>' +
                                '</a>' +
                                '</li>');

                        } else {//有三级菜单
                            $('#leftTab').append('<li dataid="' + data[i]['id'] + '">' +
                                '<div class="tabIconWrap">' +
                                '<img src="images/left/' + ((data[i]["icon"] + '.png') || "icon1.png") + '">' +
                                '</div>' +
                                '<p>' + data[i]['permissionName'] + '</p>' +
                                '<ul>' +
                                '</ul>' +
                                '</li>');
                        }
                    }
                });

                //判断如果当前点击状态是narrow，隐藏所有菜单项文字，并下移图标
                if (_self.isNarrow) {
                    $('.tabUl li img').css('margin-top', '16px');
                    $('.tabUl p').hide();
                }
                else {
                    $('.tabUl p').show();
                }

                //左侧二级菜单滚动条，当数量多时才出现
                if ($('#leftTab li').length * 70 > $('#leftTab').height()) {
                    $('#leftTab').css('overflow', 'auto');

                } else {
                    $('#leftTab').css('overflow', 'visible');
                }
                // 添加三级菜单
                var third = $('#leftTab').children('li');
                $.each(third, function (i) {
                    var obj = third.eq(i);
                    (function (obj) {
                        $.each(data, function (m) {
                            if (data[m]['parentId'] == obj.attr('dataid')) {
                                $(obj).find('ul').append('<li><a href="' + '/sichuang-wangyueche/static/sichuang/html' + data[m]['url'] + '.html' + '" target="downcon"><span class="chcufa">' + data[m]['permissionName'] + '</span></a></li>')
                            }
                        })
                    })(obj)
                })
                //左侧菜单移入
                $('#leftTab').children('li').hover(function () {
                    $(this).find('ul').show();
                }, function () {
                    $(this).find('ul').hide();
                });
            }

        }
    }
    Carnet.module["main"] = main;
})(jQuery, window);

