/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

/*
 Lightbox Plugin is based on Fancybox (http://fancybox.net, Janis Skarnelis, MIT License)
*/
(function(b) {
    var i, m, s, q, e, C, k, B, j, y, z, D, r = 0,
        c = {},
        o = [],
        p = 0,
        a = {},
        g = [],
        A = null,
        t = new Image,
        E, F = 1,
        G = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
        K = /[^\.]\.(swf)\s*$/i,
        H = /(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)&?(.*)/,
        L = /youtu\.be\/(.*)/,
        I = /(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/,
        M = /\.(mp4|ogv|webm|flv)(.*)?$/i,
        u = 0,
        v = "",
        n, f, h = !1,
        w = b.extend(b("<div/>")[0], {
            prop: 0
        });
    _abort = function() {
        s.hide();
        t.onerror = t.onload = null;
        A && A.abort();
        m.empty()
    };
    _error = function() {
        !1 === c.onError(o, r, c) ? (s.hide(), h = !1) : (c.titleShow = !1, c.width =
            "auto", c.height = "auto", m.html('<p id="lightbox-error">The requested content cannot be loaded.<br />Please try again later.</p>'), _process_inline())
    };
    _start = function() {
        var d = o[r],
            a, l, e, f, j, g;
        _abort();
        c = b.extend({}, i.defaults, "undefined" == typeof b(d).data(i.name) ? c : b(d).data(i.name));
        b(d).attr("data-lightbox") && b.each(b(d).attr("data-lightbox").split(";"), function(a, d) {
            var b = d.match(/\s*([A-Z_]*?)\s*:\s*(.+)\s*/i);
            if (b && (c[b[1]] = b[2], "true" === c[b[1]] || "false" === c[b[1]])) c[b[1]] = eval(b[2])
        });
        g = c.onStart(o,
            r, c);
        if (!1 === g) h = !1;
        else {
            "object" == typeof g && (c = b.extend(c, g));
            e = c.title || (d.nodeName ? b(d).attr("title") : d.title) || "";
            d.nodeName && !c.orig && (c.orig = b(d).children("img:first").length ? b(d).children("img:first") : b(d));
            "" === e && (c.orig && c.titleFromAlt) && (e = c.orig.attr("alt"));
            a = c.href || (d.nodeName ? b(d).attr("href") : d.href) || null;
            if (/^(?:javascript)/i.test(a) || "#" == a) a = null;
            c.type ? (l = c.type, a || (a = c.content)) : c.content ? l = "html" : a && (a.match(G) ? l = "image" : a.match(K) ? l = "swf" : a.match(M) ? l = "video" : a.match(H) ? (a =
                a.replace(H, "$1/embed/$2?$3").replace("/(.*)?$/", ""), l = "iframe") : a.match(L) ? (l = a.split("/"), a = "//www.youtube.com/embed/" + l[l.length - 1], l = "iframe") : a.match(I) ? (a = a.replace(I, "$1player.vimeo.com/video/$2"), l = "iframe") : l = -1 != a.indexOf("http://") && -1 == a.indexOf(location.hostname.toLowerCase()) ? "iframe" : 0 === a.indexOf("#wk-") ? window.wk_ajax_render_url ? "widget" : !1 : 0 === a.indexOf("#") ? "inline" : "ajax");
            if (l) switch ("inline" == l && (d = a.substr(a.indexOf("#")), l = 0 < b(d).length ? "inline" : "ajax"), c.type = l, c.href = a, c.title =
                e, c.autoDimensions && ("iframe" !== c.type && "swf" !== c.type && "video" !== c.type && "widget" !== c.type) && (c.width = "auto", c.height = "auto"), c.modal && (c.overlayShow = !0, c.hideOnOverlayClick = !1, c.hideOnContentClick = !1, c.enableEscapeButton = !1, c.showCloseButton = !1), c.padding = parseInt(c.padding, 10), c.margin = parseInt(c.margin, 10), m.css("padding", c.padding + c.margin), b(".lightbox-inline-tmp").unbind("lightbox-cancel").bind("lightbox-change", function() {
                    b(this).replaceWith(k.children())
                }), l) {
                case "html":
                    m.html(c.content);
                    _process_inline();
                    break;
                case "video":
                    h = !1;
                    c.scrolling = "no";
                    var n = "auto" == c.width ? 320 : c.width,
                        d = "auto" == c.height ? 240 : c.height;
                    e = [];
                    e.push('src="' + a + '"');
                    e.push('width="' + n + '"');
                    e.push('height="' + d + '"');
                    e.push('preload="none"');
                    "undefined" != b.type(c.autoplay) && e.push('autoplay="' + c.autoplay + '"');
                    "undefined" != b.type(c.controls) && e.push('controls="' + c.controls + '"');
                    "undefined" != b.type(c.loop) && e.push('loop="' + c.loop + '"');
                    "undefined" != b.type(c.poster) && e.push('poster="' + c.poster + '"');
                    m.html("<video " +
                        e.join(" ") + " /></video>");
                    b.fn.mediaelementplayer && b("video", m).each(function() {
                        var a = new mejs.MediaElementPlayer(this);
                        n > b(window).width() && a.setPlayerSize("100%", "100%")
                    });
                    c.width = "auto";
                    c.height = "auto";
                    _process_inline();
                    break;
                case "inline":
                    if (!0 === b(d).parent().is("#lightbox-content")) {
                        h = !1;
                        break
                    }
                    b('<div class="lightbox-inline-tmp" />').hide().insertBefore(b(d)).bind("lightbox-cleanup", function() {
                        b(this).replaceWith(k.children())
                    }).bind("lightbox-cancel", function() {
                        b(this).replaceWith(m.children())
                    });
                    b(d).appendTo(m);
                    _process_inline();
                    break;
                case "image":
                    h = !1;
                    i.showActivity();
                    t = new Image;
                    t.onerror = function() {
                        _error()
                    };
                    t.onload = function() {
                        h = true;
                        t.onerror = t.onload = null;
                        _process_image()
                    };
                    t.src = a;
                    break;
                case "swf":
                    c.scrolling = "no";
                    c.autoDimensions = !1;
                    f = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + c.width + '" height="' + c.height + '"><param name="movie" value="' + a + '"></param>';
                    j = "";
                    b.each(c.swf, function(a, d) {
                        f = f + ('<param name="' + a + '" value="' + d + '"></param>');
                        j = j + (" " + a + '="' + d +
                            '"')
                    });
                    f += '<embed src="' + a + '" type="application/x-shockwave-flash" width="' + c.width + '" height="' + c.height + '"' + j + "></embed></object>";
                    m.html(f);
                    _process_inline();
                    break;
                case "ajax":
                    h = !1;
                    i.showActivity();
                    c.ajax.win = c.ajax.success;
                    A = b.ajax(b.extend({}, c.ajax, {
                        url: a,
                        data: c.ajax.data || {},
                        error: function(a) {
                            a.status > 0 && _error()
                        },
                        success: function(d, b, e) {
                            if ((typeof e == "object" ? e : A).status == 200) {
                                if (typeof c.ajax.win == "function") {
                                    g = c.ajax.win(a, d, b, e);
                                    if (g === false) {
                                        s.hide();
                                        return
                                    }
                                    if (typeof g == "string" || typeof g ==
                                        "object") d = g
                                }
                                m.html(d);
                                _process_inline()
                            }
                        }
                    }));
                    break;
                case "widget":
                    h = !1;
                    c.autoDimensions = !1;
                    i.showActivity();
                    c.ajax.win = c.ajax.success;
                    A = b.ajax(b.extend({}, c.ajax, {
                        url: wk_ajax_render_url(a.split("-")[1]),
                        data: c.ajax.data || {},
                        error: function(a) {
                            a.status > 0 && _error()
                        },
                        success: function(d, e, l) {
                            if ((typeof l == "object" ? l : A).status == 200) {
                                if (typeof c.ajax.win == "function") {
                                    g = c.ajax.win(a, d, e, l);
                                    if (g === false) {
                                        s.hide();
                                        return
                                    }
                                    if (typeof g == "string" || typeof g == "object") d = g
                                }
                                m.html(d);
                                _process_inline();
                                $widgetkit.lazyload(b("#lightbox-content"))
                            }
                        }
                    }));
                    break;
                case "iframe":
                    c.autoDimensions = !1, _show()
            } else _error()
        }
    };
    _process_inline = function() {
        m.wrapInner('<div style="width:' + ("auto" == c.width ? "auto" : c.width + "px") + ";height:" + ("auto" == c.height ? "auto" : c.height + "px") + ";overflow: " + ("auto" == c.scrolling ? "auto" : "yes" == c.scrolling ? "scroll" : "hidden") + '"></div>');
        c.width = m.width();
        c.height = m.height();
        _show()
    };
    _process_image = function() {
        c.width = t.width;
        c.height = t.height;
        b("<img />").attr({
            id: "lightbox-img",
            src: t.src,
            alt: c.title
        }).appendTo(m);
        _show()
    };
    _show = function() {
        var d,
            J;
        s.hide();
        e.is(":visible") && !1 === a.onCleanup(g, p, a) ? (b.event.trigger("lightbox-cancel"), h = !1) : (h = !0, b(k.add(q)).unbind(), b(window).unbind("resize.fb scroll.fb"), b(document).unbind("keydown.fb"), e.is(":visible") && "outside" !== a.titlePosition && e.css("height", e.height()), g = o, p = r, a = c, a.overlayShow ? (q.css({
                "background-color": a.overlayColor,
                opacity: a.overlayOpacity,
                cursor: a.hideOnOverlayClick ? "pointer" : "auto",
                height: b(document).height()
            }), q.is(":visible") || q.show()) : q.hide(), f = _get_zoom_to(), _process_title(),
            e.is(":visible")) ? (b(B.add(y).add(z)).hide(), d = e.position(), n = {
            top: d.top,
            left: d.left,
            width: e.width(),
            height: e.height()
        }, J = n.width == f.width && n.height == f.height, k.fadeTo(a.changeFade, 0.3, function() {
            var d = function() {
                k.html(m.contents()).fadeTo(a.changeFade, 1, _finish)
            };
            b.event.trigger("lightbox-change");
            k.empty().removeAttr("filter").css({
                "border-width": a.padding,
                width: f.width - a.padding * 2,
                height: a.type == "image" || a.type == "swf" || a.type == "iframe" ? f.height - u - a.padding * 2 : "auto"
            });
            if (J) d();
            else {
                w.prop = 0;
                b(w).animate({
                    prop: 1
                }, {
                    duration: a.changeSpeed,
                    easing: a.easingChange,
                    step: _draw,
                    complete: d
                })
            }
        })) : (e.removeAttr("style"), k.css("border-width", a.padding), k.css("-webkit-transform", "translateZ(0)"), "elastic" == a.transitionIn ? (n = _get_zoom_from(), k.html(m.contents()), e.show(), a.opacity && (f.opacity = 0), w.prop = 0, b(w).animate({
            prop: 1
        }, {
            duration: a.speedIn,
            easing: a.easingIn,
            step: _draw,
            complete: _finish
        })) : ("inside" == a.titlePosition && 0 < u && j.show(), k.css({
            width: f.width - 2 * a.padding,
            height: "image" == a.type || "swf" == a.type || "iframe" == a.type ?
                f.height - u - 2 * a.padding : "auto"
        }).html(m.contents()), e.css(f).fadeIn("none" == a.transitionIn ? 0 : a.speedIn, _finish)))
    };
    _format_title = function(d) {
        return d && d.length ? '<div id="lightbox-title-' + a.titlePosition + '">' + d + "</div>" : !1
    };
    _process_title = function() {
        v = a.title || "";
        u = 0;
        j.empty().removeAttr("style").removeClass();
        if (!1 !== a.titleShow && (v = b.isFunction(a.titleFormat) ? a.titleFormat(v, g, p, a) : _format_title(v)) && "" !== v) switch (j.addClass("lightbox-title-" + a.titlePosition).html(v).appendTo("body").show(), a.titlePosition) {
            case "inside":
                j.css({
                    width: f.width -
                        2 * a.padding,
                    marginLeft: a.padding,
                    marginRight: a.padding
                });
                u = j.outerHeight(!0);
                j.appendTo(C);
                f.height += u;
                break;
            case "over":
                j.css({
                    marginLeft: a.padding,
                    width: f.width - 2 * a.padding,
                    bottom: a.padding
                }).appendTo(C);
                break;
            case "float":
                j.css("left", -1 * parseInt((j.width() - f.width - 40) / 2, 10)).appendTo(e);
                break;
            default:
                j.css({
                    width: f.width - 2 * a.padding,
                    paddingLeft: a.padding,
                    paddingRight: a.padding
                }).appendTo(e)
        }
        j.hide()
    };
    _set_navigation = function() {
        (a.enableEscapeButton || a.enableKeyboardNav) && b(document).bind("keydown.fb",
            function(d) {
                if (27 == d.keyCode && a.enableEscapeButton) d.preventDefault(), i.close();
                else if ((37 == d.keyCode || 39 == d.keyCode) && a.enableKeyboardNav && "INPUT" !== d.target.tagName && "TEXTAREA" !== d.target.tagName && "SELECT" !== d.target.tagName) d.preventDefault(), i[37 == d.keyCode ? "prev" : "next"]()
            });
        a.showNavArrows ? ((a.cyclic && 1 < g.length || 0 !== p) && y.show(), (a.cyclic && 1 < g.length || p != g.length - 1) && z.show()) : (y.hide(), z.hide())
    };
    _finish = function() {
        b.support.opacity || (k.get(0).style.removeAttribute("filter"), e.get(0).style.removeAttribute("filter"));
        e.css("height", "auto");
        "image" !== a.type && ("swf" !== a.type && "iframe" !== a.type) && k.css("height", "auto");
        v && v.length && j.show();
        a.showCloseButton && B.show();
        _set_navigation();
        a.hideOnContentClick && k.bind("click", i.close);
        a.hideOnOverlayClick && q.bind("click", i.close);
        b(window).bind("resize.fb", i.resize);
        a.centerOnScroll && b(window).bind("scroll.fb", i.center);
        "iframe" == a.type && b('<iframe id="lightbox-frame" name="lightbox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (!b.support.opacity ? 'allowtransparency="true""' :
            "") + ' scrolling="' + c.scrolling + '" src="' + a.href + '"></iframe>').appendTo(k);
        e.show();
        h = !1;
        i.center();
        a.onComplete(g, p, a);
        _preload_images()
    };
    _preload_images = function() {
        var a, b;
        g.length - 1 > p && (a = g[p + 1].href, "undefined" !== typeof a && a.match(G) && (b = new Image, b.src = a));
        0 < p && (a = g[p - 1].href, "undefined" !== typeof a && a.match(G) && (b = new Image, b.src = a))
    };
    _draw = function(d) {
        var b = {
            width: parseInt(n.width + (f.width - n.width) * d, 10),
            height: parseInt(n.height + (f.height - n.height) * d, 10),
            top: parseInt(n.top + (f.top - n.top) * d, 10),
            left: parseInt(n.left + (f.left - n.left) * d, 10)
        };
        "undefined" !== typeof f.opacity && (b.opacity = 0.5 > d ? 0.5 : d);
        e.css(b);
        k.css({
            width: b.width - 2 * a.padding,
            height: b.height - u * d - 2 * a.padding
        })
    };
    _get_viewport = function() {
        return [b(window).width() - 2 * a.margin, b(window).height() - 2 * a.margin, b(document).scrollLeft() + a.margin, b(document).scrollTop() + a.margin]
    };
    _get_zoom_to = function() {
        var d = _get_viewport(),
            b = {},
            e = a.autoScale,
            f = 2 * a.padding;
        b.width = -1 < a.width.toString().indexOf("%") ? parseInt(d[0] * parseFloat(a.width) / 100, 10) :
            parseInt(a.width) + f;
        b.height = -1 < a.height.toString().indexOf("%") ? parseInt(d[1] * parseFloat(a.height) / 100, 10) : parseInt(a.height) + f;
        if (e && (b.width > d[0] || b.height > d[1]))
            if ("image" == c.type || "swf" == c.type) {
                if (e = a.width / a.height, b.width > d[0] && (b.width = d[0], b.height = parseInt((b.width - f) / e + f, 10)), b.height > d[1]) b.height = d[1], b.width = parseInt((b.height - f) * e + f, 10)
            } else b.width = Math.min(b.width, d[0]), b.height = Math.min(b.height, d[1]);
        b.top = parseInt(Math.max(d[3] - 20, d[3] + 0.5 * (d[1] - b.height - 40)), 10);
        b.left = parseInt(Math.max(d[2] -
            20, d[2] + 0.5 * (d[0] - b.width - 40)), 10);
        return b
    };
    _get_obj_pos = function(a) {
        var b = a.offset();
        b.top += parseInt(a.css("paddingTop"), 10) || 0;
        b.left += parseInt(a.css("paddingLeft"), 10) || 0;
        b.top += parseInt(a.css("border-top-width"), 10) || 0;
        b.left += parseInt(a.css("border-left-width"), 10) || 0;
        b.width = a.width();
        b.height = a.height();
        return b
    };
    _get_zoom_from = function() {
        var d = c.orig ? b(c.orig) : !1,
            e = {};
        d && d.length ? (d = _get_obj_pos(d), e = {
            width: d.width + 2 * a.padding,
            height: d.height + 2 * a.padding,
            top: d.top - a.padding - 20,
            left: d.left -
                a.padding - 20
        }) : (d = _get_viewport(), e = {
            width: 2 * a.padding,
            height: 2 * a.padding,
            top: parseInt(d[3] + 0.5 * d[1], 10),
            left: parseInt(d[2] + 0.5 * d[0], 10)
        });
        return e
    };
    _animate_loading = function() {
        s.is(":visible") ? (b("div", s).css("top", -40 * F + "px"), F = (F + 1) % 12) : clearInterval(E)
    };
    var x = function() {};
    x.prototype = b.extend(x.prototype, {
        name: "lightbox",
        defaults: {
            padding: 10,
            margin: 40,
            opacity: !1,
            modal: !1,
            cyclic: !1,
            scrolling: "auto",
            width: 560,
            height: 340,
            autoScale: !0,
            autoDimensions: !0,
            centerOnScroll: !1,
            ajax: {},
            swf: {
                wmode: "transparent"
            },
            hideOnOverlayClick: !0,
            hideOnContentClick: !1,
            overlayShow: !0,
            overlayOpacity: 0.7,
            overlayColor: "#777",
            titleShow: !0,
            titlePosition: "float",
            titleFormat: null,
            titleFromAlt: !1,
            transitionIn: "fade",
            transitionOut: "fade",
            speedIn: 300,
            speedOut: 300,
            changeSpeed: 300,
            changeFade: "fast",
            easingIn: "swing",
            easingOut: "swing",
            showCloseButton: !0,
            showNavArrows: !0,
            enableEscapeButton: !0,
            enableKeyboardNav: !0,
            onStart: function() {},
            onCancel: function() {},
            onComplete: function() {},
            onCleanup: function() {},
            onClosed: function() {},
            onError: function() {}
        },
        init: function() {
            var d = this;
            b("#lightbox-wrap").length || (b("body").append(m = b('<div id="lightbox-tmp"></div>'), s = b('<div id="lightbox-loading"><div></div></div>'), q = b('<div id="lightbox-overlay"></div>'), e = b('<div id="lightbox-wrap"></div>')), D = q.show().position(), q.hide(), 0 != D.top && q.css("top", -1 * D.top), C = b('<div id="lightbox-outer"></div>').appendTo(e), C.append(k = b('<div id="lightbox-content"></div>'), B = b('<a id="lightbox-close"></a>'), j = b('<div id="lightbox-title"></div>'), y = b('<a href="javascript:;" id="lightbox-left"><span id="lightbox-left-ico"></span></a>'),
                z = b('<a href="javascript:;" id="lightbox-right"><span id="lightbox-right-ico"></span></a>')), B.bind("click", this.close), s.bind("click", this.cancel), y.bind("click", function(a) {
                a.preventDefault();
                d.prev()
            }), z.bind("click", function(a) {
                a.preventDefault();
                d.next()
            }), b.fn.mousewheel && e.bind("mousewheel.fb", function(b, c) {
                (h || "image" == a.type) && b.preventDefault();
                d[0 < c ? "prev" : "next"]()
            }))
        },
        open: function(a, c) {
            var e;
            if (!h) {
                h = !0;
                e = "undefined" !== typeof c ? c : {};
                o = [];
                r = parseInt(e.index, 10) || 0;
                if (b.isArray(a)) {
                    for (var f =
                            0, g = a.length; f < g; f++) "object" == typeof a[f] ? b(a[f]).data(i.name, b.extend({}, e, a[f])) : a[f] = b({}).data(i.name, b.extend({
                        content: a[f]
                    }, e));
                    o = b.merge(o, a)
                } else "object" == typeof a ? b(a).data(i.name, b.extend({}, e, a)) : a = b({}).data(i.name, b.extend({
                    content: a
                }, e)), o.push(a);
                if (r > o.length || 0 > r) r = 0;
                _start()
            }
        },
        showActivity: function() {
            clearInterval(E);
            s.show();
            E = setInterval(_animate_loading, 66)
        },
        hideActivity: function() {
            s.hide()
        },
        next: function() {
            return this.pos(p + 1)
        },
        prev: function() {
            return this.pos(p - 1)
        },
        pos: function(b) {
            h ||
                (b = parseInt(b), o = g, -1 < b && b < g.length ? (r = b, _start()) : a.cyclic && 1 < g.length && (r = b >= g.length ? 0 : g.length - 1, _start()))
        },
        cancel: function() {
            h || (h = !0, b.event.trigger("lightbox-cancel"), _abort(), c.onCancel(o, r, c), h = !1)
        },
        close: function() {
            function d() {
                q.fadeOut("fast");
                j.empty().hide();
                e.hide();
                b.event.trigger("lightbox-cleanup");
                k.empty();
                a.onClosed(g, p, a);
                g = c = [];
                p = r = 0;
                a = c = {};
                h = !1
            }
            if (!h && !e.is(":hidden"))
                if (h = !0, a && !1 === a.onCleanup(g, p, a)) h = !1;
                else if (_abort(), b(B.add(y).add(z)).hide(), b(k.add(q)).unbind(), b(window).unbind("resize.fb scroll.fb"),
                b(document).unbind("keydown.fb"), k.find("iframe").attr("src", "about:blank"), "inside" !== a.titlePosition && j.empty(), e.stop(), "elastic" == a.transitionOut) {
                n = _get_zoom_from();
                var i = e.position();
                f = {
                    top: i.top,
                    left: i.left,
                    width: e.width(),
                    height: e.height()
                };
                a.opacity && (f.opacity = 1);
                j.empty().hide();
                w.prop = 1;
                b(w).animate({
                    prop: 0
                }, {
                    duration: a.speedOut,
                    easing: a.easingOut,
                    step: _draw,
                    complete: d
                })
            } else e.fadeOut("none" == a.transitionOut ? 0 : a.speedOut, d)
        },
        resize: function() {
            q.is(":visible") && q.css("height", b(document).height());
            if ("image" == a.type) {
                f = _get_zoom_to();
                switch (a.titlePosition) {
                    case "float":
                        j.css("left", -1 * parseInt((j.width() - f.width - 40) / 2, 10));
                        break;
                    default:
                        j.css("width", f.width - 2 * a.padding)
                }
                e.is(":visible") && (pos = e.position(), n = {
                    top: pos.top,
                    left: pos.left,
                    width: e.width(),
                    height: e.height()
                }, equal = n.width == f.width && n.height == f.height, k.css({
                    width: f.width - 2 * a.padding,
                    height: "image" == a.type || "swf" == a.type || "iframe" == a.type ? f.height - u - 2 * a.padding : "auto"
                }), equal || (w.prop = 0, b(w).animate({
                    prop: 1
                }, {
                    duration: a.changeSpeed,
                    easing: a.easingChange,
                    step: _draw
                })))
            }
            i.center(!0)
        },
        center: function(b) {
            var c, f;
            if (!h && (f = !0 === b ? 1 : 0, c = _get_viewport(), f || !(e.width() > c[0] || e.height() > c[1]))) e.stop().animate({
                top: parseInt(Math.max(c[3] - 20, c[3] + 0.5 * (c[1] - k.height() - 40) - a.padding)),
                left: parseInt(Math.max(c[2] - 20, c[2] + 0.5 * (c[0] - k.width() - 40) - a.padding))
            }, "number" == typeof b ? b : 200)
        }
    });
    b.fn[x.prototype.name] = function() {
        var a = arguments,
            c = a[0] ? a[0] : {};
        return this.each(function() {
            b(this).data(x.prototype.name, c).unbind("click." + x.prototype.name).bind("click." +
                x.prototype.name,
                function(a) {
                    a.preventDefault();
                    h || (h = !0, b(this).blur(), o = [], r = 0, (a = b(this).attr("data-lightbox") || "") && (a = a.match(/group:([^;]+)/i)) ? (o = b('a[data-lightbox*="' + a[0] + '"], area[data-lightbox*="' + a[0] + '"]'), r = o.index(this)) : o.push(this), _start())
                })
        })
    };
    b(document).ready(function() {
        i = new x;
        i.init();
        b[x.prototype.name] = i
    })
})(jQuery);