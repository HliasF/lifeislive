/* jcemediabox - 1.2.9 | 2017-04-05 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2016 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */ ! function(window) {
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(input) {
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output = "",
                i = 0;
            for (input = Base64._utf8_encode(input); i < input.length;) chr1 = input.charCodeAt(i++), chr2 = input.charCodeAt(i++), chr3 = input.charCodeAt(i++), enc1 = chr1 >> 2, enc2 = (3 & chr1) << 4 | chr2 >> 4, enc3 = (15 & chr2) << 2 | chr3 >> 6, enc4 = 63 & chr3, isNaN(chr2) ? enc3 = enc4 = 64 : isNaN(chr3) && (enc4 = 64), output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
            return output
        },
        decode: function(input) {
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output = "",
                i = 0;
            for (input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < input.length;) enc1 = Base64._keyStr.indexOf(input.charAt(i++)), enc2 = Base64._keyStr.indexOf(input.charAt(i++)), enc3 = Base64._keyStr.indexOf(input.charAt(i++)), enc4 = Base64._keyStr.indexOf(input.charAt(i++)), chr1 = enc1 << 2 | enc2 >> 4, chr2 = (15 & enc2) << 4 | enc3 >> 2, chr3 = (3 & enc3) << 6 | enc4, output += String.fromCharCode(chr1), 64 != enc3 && (output += String.fromCharCode(chr2)), 64 != enc4 && (output += String.fromCharCode(chr3));
            return output = Base64._utf8_decode(output)
        },
        _utf8_encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            for (var utftext = "", n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                c < 128 ? utftext += String.fromCharCode(c) : c > 127 && c < 2048 ? (utftext += String.fromCharCode(c >> 6 | 192), utftext += String.fromCharCode(63 & c | 128)) : (utftext += String.fromCharCode(c >> 12 | 224), utftext += String.fromCharCode(c >> 6 & 63 | 128), utftext += String.fromCharCode(63 & c | 128))
            }
            return utftext
        },
        _utf8_decode: function(utftext) {
            for (var string = "", i = 0, c = 0, c1 = 0, c2 = 0; i < utftext.length;) c = utftext.charCodeAt(i), c < 128 ? (string += String.fromCharCode(c), i++) : c > 191 && c < 224 ? (c1 = utftext.charCodeAt(i + 1), string += String.fromCharCode((31 & c) << 6 | 63 & c1), i += 2) : (c1 = utftext.charCodeAt(i + 1), c2 = utftext.charCodeAt(i + 2), string += String.fromCharCode((15 & c) << 12 | (63 & c1) << 6 | 63 & c2), i += 3);
            return string
        }
    };
    window.btoa || (window.btoa = Base64.encode), window.atob || (window.atob = Base64.decode);
    var support = {};
    support.video = function() {
        var elem = document.createElement("video"),
            bool = !1;
        try {
            (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (e) {}
        return bool
    }();
    var entities = {
        '"': "&quot;",
        "'": "&#39;",
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;"
    };
    support.audio = function() {
        var elem = document.createElement("audio"),
            bool = !1;
        try {
            (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), bool.mp3 = elem.canPlayType("audio/mpeg;").replace(/^no$/, ""), bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), bool.m4a = (elem.canPlayType("audio/x-m4a;") || elem.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (e) {}
        return bool
    }(), window.JCEMediaBox = {
        domLoaded: !1,
        options: {
            popup: {
                width: "",
                height: "",
                legacy: 0,
                lightbox: 0,
                shadowbox: 0,
                overlay: 1,
                overlayopacity: .8,
                overlaycolor: "#000000",
                resize: 0,
                icons: 1,
                fadespeed: 500,
                scalespeed: 500,
                hideobjects: 1,
                scrolling: "fixed",
                close: 2,
                labels: {
                    close: "Close",
                    next: "Next",
                    previous: "Previous",
                    numbers: "{$current} of {$total}",
                    cancel: "Cancel"
                },
                cookie_expiry: 7,
                google_viewer: 0,
                pdfjs: 0
            },
            tooltip: {
                speed: 150,
                offsets: {
                    x: 16,
                    y: 16
                },
                position: "br",
                opacity: .8,
                background: "#000000",
                color: "#ffffff"
            },
            base: "/",
            pngfix: !1,
            pngfixclass: "",
            theme: "standard",
            imgpath: "plugins/system/jcemediabox/img",
            mediafallback: !1,
            mediaplayer: "",
            mediaselector: "audio,video"
        },
        init: function(options) {
            if (this.extend(this.options, options), this.isIE6) try {
                document.execCommand("BackgroundImageCache", !1, !0)
            } catch (e) {}
            support.video && support.audio || document.createElement("source"), this.ready()
        },
        ready: function() {
            function detach() {
                doc.addEventListener ? (doc.removeEventListener("DOMContentLoaded", completed, !1), win.removeEventListener("load", completed, !1)) : (doc.detachEvent("onreadystatechange", completed), win.detachEvent("onload", completed))
            }

            function completed(event) {
                detach(), self.domLoaded = !0, self._init()
            }
            var win = window,
                doc = win.document,
                self = JCEMediaBox;
            if (self.domLoaded) return self._init();
            if ("complete" === doc.readyState) setTimeout(completed);
            else if (doc.addEventListener) doc.addEventListener("DOMContentLoaded", completed, !1), win.addEventListener("load", completed, !1);
            else {
                doc.attachEvent("onreadystatechange", completed), win.attachEvent("onload", completed);
                var top = !1;
                try {
                    top = null == win.frameElement && doc.documentElement
                } catch (e) {}
                top && top.doScroll && ! function doScrollCheck() {
                    if (!self.domLoaded) {
                        try {
                            top.doScroll("left")
                        } catch (e) {
                            return setTimeout(doScrollCheck, 50)
                        }
                        completed()
                    }
                }()
            }
        },
        getSite: function() {
            var base = this.options.base;
            if (base) {
                var site = document.location.href,
                    parts = site.split("://"),
                    port = parts[0],
                    url = parts[1];
                return url = url.indexOf(base) != -1 ? url.substr(0, url.indexOf(base)) : url.substr(0, url.indexOf("/")) || url, port + "://" + url + base
            }
            return null
        },
        _init: function() {
            var self = this,
                na = navigator,
                ua = na.userAgent;
            return self.isOpera = window.opera && opera.buildNumber, self.isWebKit = /WebKit/.test(ua), self.isChrome = /Chrome\//.test(ua), self.isSafari = /Safari\//.test(ua), self.isIE = !self.isWebKit && !self.isOpera && /MSIE/gi.test(ua) && /Explorer/gi.test(na.appName) && !!window.ActiveXObject, self.isIE6 = self.isIE && /MSIE [56]/.test(ua) && !window.XMLHttpRequest, self.isIE7 = self.isIE && /MSIE [7]/.test(ua) && !!window.XMLHttpRequest && !document.querySelector, self.isiOS = /(iPad|iPhone)/.test(ua), self.isAndroid = /Android/.test(ua), self.isMobile = self.isiOS || self.isAndroid, this.site = this.getSite(), !!this.site && (this.Popup.init(), this.ToolTip.init(), void(this.options.mediafallback && this.mediaFallback()))
        },
        mediaFallback: function() {
            function toAbsolute(url) {
                var div = document.createElement("div");
                return div.innerHTML = '<a href="' + url + '">x</a>', div.firstChild.href
            }

            function resolveMediaPath(s, absolute) {
                return s && s.indexOf("://") === -1 && "/" !== s.charAt(0) && (s = self.options.base + s), absolute ? toAbsolute(s) : s
            }

            function checkSupport(name, type) {
                var hasSupport = !1;
                for (var n in supportMap[name]) supportMap[name][n].indexOf(type) !== -1 && (hasSupport = support[name] && !!support[name][n]);
                return hasSupport
            }
            var self = this,
                DOM = this.DOM,
                each = this.each,
                selector = this.options.mediaselector,
                elms = DOM.select(selector),
                swf = this.options.mediaplayer || "plugins/system/jcemediabox/mediaplayer/mediaplayer.swf",
                supportMap = {
                    video: {
                        h264: ["video/mp4", "video/mpeg"],
                        webm: ["video/webm"],
                        ogg: ["video/ogg"]
                    },
                    audio: {
                        mp3: ["audio/mp3", "audio/mpeg"],
                        ogg: ["audio/ogg"],
                        webm: ["audio/webm"]
                    }
                };
            elms.length && each(elms, function(el) {
                var type = el.getAttribute("type"),
                    src = el.getAttribute("src"),
                    name = el.nodeName.toLowerCase(),
                    hasSupport = !1;
                if (src && type) hasSupport = checkSupport(name, type);
                else {
                    var source = DOM.select("source[type]", el);
                    each(source, function(n) {
                        if (src = n.getAttribute("src"), type = n.getAttribute("type"), "video/x-flv" !== type && (hasSupport = checkSupport(name, type)), !hasSupport) return !1
                    }), hasSupport || "video" !== name || (source = DOM.select('source[type="video/x-flv"]', el), source.length && (src = source[0].getAttribute("src"), type = "video/x-flv"))
                }
                if (src && type && !hasSupport) {
                    var w = el.getAttribute("width"),
                        h = el.getAttribute("height"),
                        html = "",
                        flashvars = [];
                    self.options.mediaplayer || flashvars.push("file=" + resolveMediaPath(src, !0)), self.each(["autoplay", "loop", "preload", "controls"], function(at) {
                        var v = el.getAttribute(at);
                        "undefined" != typeof v && null !== v && (v === at && (v = !0), flashvars.push(at + "=" + v))
                    });
                    var i, attrs = el.attributes;
                    for (i = attrs.length - 1; i >= 0; i--) {
                        var attrName = attrs[i].name;
                        if (attrName && (attrName.indexOf("data-video-") !== -1 || attrName.indexOf("data-audio-") !== -1)) {
                            var name = attrName.replace(/data-(video|audio)-/i, ""),
                                value = attrs[i].value;
                            "undefined" == typeof value && null === value || flashvars.push(name + "=" + value)
                        }
                    }
                    html += '<object class="wf-mediaplayer-object" data="' + resolveMediaPath(swf) + '" type="application/x-shockwave-flash"', w && (html += ' width="' + w + '"'), h && (html += ' height="' + h + '"'), html += ">", html += '<param name="movie" value="' + resolveMediaPath(swf) + '" />', html += '<param name="flashvars" value="' + flashvars.join("&") + '" />', html += '<param name="allowfullscreen" value="true" />', html += '<param name="wmode" value="transparent" />';
                    var poster = el.getAttribute("poster");
                    poster && (html += '<img src="' + resolveMediaPath(poster) + '" alt="" />'), html += '<i>Flash is required to play this video. <a href="https://get.adobe.com/flashplayer" target="_blank">Get Adobe® Flash Player</a></i>', html += "</object>";
                    var div = document.createElement("span");
                    div.innerHTML = html;
                    var o = div.firstChild;
                    o && "OBJECT" === o.nodeName && (el.parentNode.replaceChild(o, el), poster && (o.style.backgroundImage = "url('" + resolveMediaPath(poster) + "')"))
                }
            })
        },
        each: function(o, cb, s) {
            var n, l;
            if (!o) return 0;
            if (s = s || o, void 0 !== o.length)
                for (n = 0, l = o.length; n < l && cb.call(s, o[n], n, o) !== !1; n++);
            else
                for (n in o)
                    if (o.hasOwnProperty(n) && cb.call(s, o[n], n, o) === !1) break;
            return o
        },
        extend: function(obj, ext) {
            var i, l, name, value, args = arguments;
            for (i = 1, l = args.length; i < l; i++) {
                ext = args[i];
                for (name in ext) ext.hasOwnProperty(name) && (value = ext[name], void 0 !== value && (obj[name] = value))
            }
            return obj
        },
        trim: function(s) {
            return (s ? "" + s : "").replace(/^\s*|\s*$/g, "")
        },
        inArray: function(a, s) {
            var i, l;
            if (a)
                for (i = 0, l = a.length; i < l; i++)
                    if (a[i] === s) return i;
            return -1
        },
        DOM: {
            get: function(s) {
                return "string" == typeof s ? document.getElementById(s) : s
            },
            select: function(o, p) {
                function inArray(a, v) {
                    var i, l;
                    if (a)
                        for (i = 0, l = a.length; i < l; i++)
                            if (a[i] === v) return !0;
                    return !1
                }
                var s, parts, at, tag, cl, t = this,
                    r = [],
                    each = JCEMediaBox.each;
                return p = p || document, "*" == o ? p.getElementsByTagName(o) : p.querySelectorAll ? p.querySelectorAll(o) : (s = o.split(","), each(s, function(selectors) {
                    parts = JCEMediaBox.trim(selectors).split("."), tag = parts[0] || "*", cl = parts[1] || "", /\[(.*?)\]/.test(tag) && (tag = tag.replace(/(.*?)\[(.*?)\]/, function(a, b, c) {
                        return at = c, b
                    }));
                    var elements = p.getElementsByTagName(tag);
                    cl || at ? each(elements, function(el) {
                        cl && t.hasClass(el, cl) && (inArray(r, el) || r.push(el)), at && el.getAttribute(at) && (inArray(r, el) || r.push(el))
                    }) : r = elements
                }), r)
            },
            hasClass: function(el, c) {
                return new RegExp(c).test(el.className)
            },
            addClass: function(el, c) {
                this.hasClass(el, c) || (el.className = JCEMediaBox.trim(el.className + " " + c))
            },
            removeClass: function(el, c) {
                if (this.hasClass(el, c)) {
                    var s = el.className,
                        re = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g"),
                        v = s.replace(re, " ");
                    v = v.replace(/^\s|\s$/g, ""), el.className = v
                }
            },
            show: function(el) {
                el.style.display = "block"
            },
            hide: function(el) {
                el.style.display = "none"
            },
            remove: function(el, attrib) {
                if (attrib) el.removeAttribute(attrib);
                else {
                    var p = el.parentNode || document.body;
                    p.removeChild(el)
                }
            },
            style: function(n, na, v) {
                var r, s, isIE = JCEMediaBox.isIE;
                if (n) {
                    if (na = na.replace(/-(\D)/g, function(a, b) {
                            return b.toUpperCase()
                        }), s = n.style, "undefined" == typeof v) {
                        if ("float" == na && (na = isIE ? "styleFloat" : "cssFloat"), r = s[na], document.defaultView && !r) {
                            /float/i.test(na) && (na = "float"), na = na.replace(/[A-Z]/g, function(a) {
                                return "-" + a
                            }).toLowerCase();
                            try {
                                r = document.defaultView.getComputedStyle(n, null).getPropertyValue(na)
                            } catch (e) {}
                        }
                        return n.currentStyle && !r && (r = n.currentStyle[na]), r
                    }
                    switch (na) {
                        case "opacity":
                            v = parseFloat(v), isIE && (s.filter = "" === v ? "" : "alpha(opacity=" + 100 * v + ")", n.currentStyle && n.currentStyle.hasLayout || (s.display = "inline-block")), s[na] = v;
                            break;
                        case "float":
                            na = isIE ? "styleFloat" : "cssFloat";
                            break;
                        default:
                            v && /(margin|padding|width|height|top|bottom|left|right)/i.test(na) && (v = /^[\-0-9\.]+$/.test(v) ? v + "px" : v)
                    }
                    s[na] = v
                }
            },
            styles: function(el, props) {
                var t = this;
                JCEMediaBox.each(props, function(v, s) {
                    return t.style(el, s, v)
                })
            },
            attribute: function(el, s, v) {
                if ("undefined" == typeof v) return "class" == s ? el.className : (v = el.getAttribute(s), v && /^on/.test(s) && (v = v.toString(), v = v.replace(/^function\s+anonymous\(\)\s+\{\s+(.*)\s+\}$/, "$1")), "hspace" == s && v == -1 && (v = ""), v);
                switch ("" === v && el.removeAttribute(s), s) {
                    case "style":
                        "object" == typeof v ? this.styles(el, v) : el.style.cssText = v;
                        break;
                    case "class":
                        el.className = v || "";
                        break;
                    default:
                        el.setAttribute(s, v)
                }
            },
            attributes: function(el, attribs) {
                var t = this;
                JCEMediaBox.each(attribs, function(v, s) {
                    t.attribute(el, s, v)
                })
            },
            create: function(el, attribs, html) {
                var o = document.createElement(el);
                return this.attributes(o, attribs), "undefined" != typeof html && (o.innerHTML = html), o
            },
            add: function(n, o, a, h) {
                return "string" == typeof o && (a = a || {}, o = this.create(o, a, h)), n.appendChild(o), o
            },
            addBefore: function(n, o, c) {
                "undefined" == typeof c && (c = n.firstChild), n.insertBefore(o, c)
            },
            png: function(el) {
                var s;
                if ("IMG" == el.nodeName) s = el.src, /\.png$/i.test(s) && (this.attribute(el, "src", JCEMediaBox.site + "plugins/system/jcemediabox/img/blank.gif"), this.style(el, "filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + s + "')"));
                else if (s = this.style(el, "background-image"), /\.png/i.test(s)) {
                    var bg = /url\("(.*)"\)/.exec(s)[1];
                    this.styles(el, {
                        "background-image": "none",
                        filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + bg + "', sizingMethod='image')"
                    })
                }
            },
            encode: function(s) {
                return ("" + s).replace(/[<>&\"\']/g, function(c) {
                    return entities[c] || c
                })
            },
            decode: function(s) {
                var el;
                return s = s.replace(/&lt;/g, "<").replace(/&gt;/g, ">"), el = document.createElement("div"), el.innerHTML = s, el.innerHTML || s
            }
        },
        Event: {
            events: [],
            add: function(o, n, f, s) {
                function _add(o, n, f) {
                    o.attachEvent ? o.attachEvent("on" + n, f) : o.addEventListener ? o.addEventListener(n, f, !1) : o["on" + n] = f
                }
                var t = this;
                cb = function(e) {
                    if (!t.disabled) return e = e || window.event, e && JCEMediaBox.isIE && (e.target || (e.target = e.srcElement || document), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement), JCEMediaBox.extend(e, {
                        preventDefault: function() {
                            this.returnValue = !1
                        },
                        stopPropagation: function() {
                            this.cancelBubble = !0
                        }
                    })), e && JCEMediaBox.isWebKit && 3 == e.target.nodeType && (e.target = e.target.parentNode), s ? f.call(s, e) : f(e)
                }, t.events.push({
                    obj: o,
                    name: n,
                    func: f,
                    cfunc: cb,
                    scope: s
                }), _add(o, n, cb)
            },
            remove: function(o, n, f) {
                var t = this,
                    a = t.events,
                    s = !1;
                return JCEMediaBox.each(a, function(e, i) {
                    if (e.obj == o && e.name == n && (!f || e.func == f || e.cfunc == f)) return a.splice(i, 1), t._remove(o, n, e.cfunc), s = !0, !1
                }), s
            },
            _remove: function(o, n, f) {
                if (o) try {
                    o.detachEvent ? o.detachEvent("on" + n, f) : o.removeEventListener ? o.removeEventListener(n, f, !1) : o["on" + n] = null
                } catch (ex) {}
            },
            cancel: function(e) {
                return !!e && (this.stop(e), this.prevent(e))
            },
            stop: function(e) {
                return e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, !1
            },
            prevent: function(e) {
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            },
            destroy: function() {
                var t = this;
                JCEMediaBox.each(t.events, function(e, i) {
                    t._remove(e.obj, e.name, e.cfunc), e.obj = e.cfunc = null
                }), t.events = [], t = null
            },
            addUnload: function(f, s) {
                function unload() {
                    var o, n, li = t.unloads;
                    if (li) {
                        for (n in li) o = li[n], o && o.func && o.func.call(o.scope, 1);
                        window.detachEvent ? (window.detachEvent("onbeforeunload", fakeUnload), window.detachEvent("onunload", unload)) : window.removeEventListener && window.removeEventListener("unload", unload, !1), t.unloads = o = li = w = unload = 0, window.CollectGarbage && CollectGarbage()
                    }
                }

                function fakeUnload() {
                    function stop() {
                        d.detachEvent("onstop", stop), unload && unload(), d = 0
                    }
                    var d = document;
                    "interactive" == d.readyState && (d && d.attachEvent("onstop", stop), window.setTimeout(function() {
                        d && d.detachEvent("onstop", stop)
                    }, 0))
                }
                var t = this;
                return f = {
                    func: f,
                    scope: s || this
                }, t.unloads ? t.unloads.push(f) : (window.attachEvent ? (window.attachEvent("onunload", unload), window.attachEvent("onbeforeunload", fakeUnload)) : window.addEventListener && window.addEventListener("unload", unload, !1), t.unloads = [f]), f
            },
            removeUnload: function(f) {
                var u = this.unloads,
                    r = null;
                return JCEMediaBox.each(u, function(o, i) {
                    if (o && o.func == f) return u.splice(i, 1), r = f, !1
                }), r
            }
        },
        Dimensions: {
            getWidth: function() {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0
            },
            getHeight: function() {
                if (JCEMediaBox.isiOS || JCEMediaBox.isAndroid) {
                    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
                    return window.innerHeight * zoomLevel
                }
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
            },
            getScrollHeight: function() {
                return document.documentElement.scrollHeight || document.body.scrollHeight || 0
            },
            getScrollWidth: function() {
                return document.documentElement.scrollWidth || document.body.scrollWidth || 0
            },
            getScrollTop: function() {
                return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            },
            getScrollbarWidth: function() {
                var DOM = JCEMediaBox.DOM;
                if (this.scrollbarWidth) return this.scrollbarWidth;
                var outer = DOM.add(document.body, "div", {
                        style: {
                            position: "absolute",
                            visibility: "hidden",
                            width: 200,
                            height: 200,
                            border: 0,
                            margin: 0,
                            padding: 0,
                            overflow: "hidden"
                        }
                    }),
                    inner = DOM.add(outer, "div", {
                        style: {
                            width: "100%",
                            height: 200,
                            border: 0,
                            margin: 0,
                            padding: 0
                        }
                    }),
                    w1 = parseInt(inner.offsetWidth);
                outer.style.overflow = "scroll";
                var w2 = parseInt(inner.offsetWidth);
                return w1 == w2 && (w2 = parseInt(outer.clientWidth)), document.body.removeChild(outer), this.scrollbarWidth = w1 - w2, this.scrollbarWidth
            },
            outerWidth: function(n) {
                var v = 0,
                    x = 0;
                return x = n.offsetWidth, x || JCEMediaBox.each(["padding-left", "padding-right", "border-left", "border-right", "width"], function(s) {
                    v = parseFloat(JCEMediaBox.DOM.style(n, s)), v = /[0-9]/.test(v) ? v : 0, x += v
                }), x
            },
            outerHeight: function(n) {
                var v = 0,
                    x = 0;
                return x = n.offsetHeight, x || JCEMediaBox.each(["padding-top", "padding-bottom", "border-top", "border-bottom", "height"], function(s) {
                    v = parseFloat(JCEMediaBox.DOM.style(n, s)), v = /[0-9]/.test(v) ? v : 0, x += v
                }), x
            }
        },
        FX: {
            animate: function(el, props, speed, cb) {
                var sv, DOM = JCEMediaBox.DOM,
                    options = {
                        speed: speed || 100,
                        callback: cb || function() {}
                    },
                    styles = {};
                return JCEMediaBox.each(props, function(v, s) {
                    sv = parseFloat(DOM.style(el, s)), styles[s] = [sv, v]
                }), new JCEMediaBox.fx(el, options).custom(styles), !0
            }
        }
    }, JCEMediaBox.XHR = function(options, scope) {
        this.options = {
            async: !0,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                Accept: "text/javascript, text/html, application/xml, text/xml, */*"
            },
            data: null,
            encoding: "UTF-8",
            success: function() {},
            error: function() {}
        }, JCEMediaBox.extend(this.options, options), this.scope = scope || this
    }, JCEMediaBox.XHR.prototype = {
        setTransport: function() {
            function get(s) {
                var x = 0;
                try {
                    x = new ActiveXObject(s)
                } catch (ex) {}
                return x
            }
            this.transport = window.XMLHttpRequest ? new XMLHttpRequest : get("Microsoft.XMLHTTP") || get("Msxml2.XMLHTTP")
        },
        onStateChange: function() {
            if (4 == this.transport.readyState && this.running) {
                if (this.running = !1, this.transport.status >= 200 && this.transport.status < 300) {
                    var s = this.transport.responseText,
                        x = this.transport.responseXML;
                    this.options.success.call(this.scope, s, x)
                } else this.options.error.call(this.scope, this.transport, this.options);
                this.transport.onreadystatechange = function() {}, this.transport = null
            }
        },
        send: function(url) {
            var t = this,
                extend = JCEMediaBox.extend;
            if (this.running) return this;
            this.running = !0, this.setTransport();
            var method = this.options.data ? "POST" : "GET",
                encoding = this.options.encoding ? "; charset=" + this.options.encoding.toUpperCase() : "",
                contentType = {
                    "Content-type": "text/html" + encoding
                };
            this.options.data && (contentType = {
                "Content-type": "application/x-www-form-urlencoded" + encoding
            }), extend(this.options.headers, contentType), this.transport.open(method, url, this.options.async), this.transport.onreadystatechange = function() {
                return t.onStateChange()
            };
            for (var type in this.options.headers) try {
                this.transport.setRequestHeader(type, this.options.headers[type])
            } catch (e) {}
            this.transport.send(this.options.data)
        }
    }, JCEMediaBox.fx = function(el, options) {
        this.element = el, this.callback = options.callback, this.speed = options.speed, this.wait = !0, this.fps = 50, this.now = {}
    }, JCEMediaBox.fx.prototype = {
        step: function() {
            var time = (new Date).getTime();
            if (time < this.time + this.speed) this.cTime = time - this.time, this.setNow();
            else {
                var t = this;
                this.clearTimer(), this.now = this.to, setTimeout(function() {
                    t.callback.call(t.element, t)
                }, 10)
            }
            this.increase()
        },
        setNow: function() {
            var p;
            for (p in this.from) this.now[p] = this.compute(this.from[p], this.to[p])
        },
        compute: function(from, to) {
            var change = to - from;
            return this.transition(this.cTime, from, change, this.speed)
        },
        clearTimer: function() {
            return clearInterval(this.timer), this.timer = null, this
        },
        start: function(from, to) {
            var t = this;
            if (this.wait || this.clearTimer(), !this.timer) return this.from = from, this.to = to, this.time = (new Date).getTime(), this.timer = setInterval(function() {
                return t.step()
            }, Math.round(1e3 / this.fps)), this
        },
        custom: function(o) {
            if (!this.timer || !this.wait) {
                var property, from = {},
                    to = {};
                for (property in o) from[property] = o[property][0], to[property] = o[property][1];
                return this.start(from, to)
            }
        },
        increase: function() {
            for (var p in this.now) this.setStyle(this.element, p, this.now[p])
        },
        transition: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
        },
        setStyle: function(e, p, v) {
            JCEMediaBox.DOM.style(e, p, v)
        }
    }, JCEMediaBox.ToolTip = {
        init: function() {
            var t = this,
                theme = "custom" == JCEMediaBox.options.theme ? JCEMediaBox.options.themecustom : JCEMediaBox.options.theme;
            this.tooltiptheme = "", new JCEMediaBox.XHR({
                success: function(text, xml) {
                    var re = /<!-- THEME START -->([\s\S]*?)<!-- THEME END -->/;
                    re.test(text) && (text = re.exec(text)[1]), t.tooltiptheme = text, t.create()
                }
            }).send(JCEMediaBox.site + JCEMediaBox.options.themepath + "/" + theme + "/tooltip.html")
        },
        create: function(o) {
            function _withinElement(el, e, fn) {
                for (var p = e.relatedTarget; p && p != el;) try {
                    p = p.parentNode
                } catch (e) {
                    p = el
                }
                return p != el && fn.call(this)
            }
            var t = this,
                each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM,
                Event = JCEMediaBox.Event;
            each(DOM.select(".jcetooltip, .jce_tooltip", o), function(el) {
                DOM.attribute(el, "data-title", el.title), DOM.remove(el, "title");
                var n = el;
                "IMG" == el.nodeName && "jcemediabox-zoom-span" == el.parentNode.className && (n = el.parentNode), Event.add(n, "mouseover", function(e) {
                    _withinElement(el, e, function() {
                        return t.start(el)
                    })
                }), Event.add(n, "mouseout", function(e) {
                    _withinElement(el, e, function() {
                        return t.end(el)
                    })
                }), Event.add(n, "mousemove", function(e) {
                    return t.locate(e)
                })
            })
        },
        build: function() {
            if (!this.toolTip) {
                var DOM = JCEMediaBox.DOM;
                this.toolTip = DOM.add(document.body, "div", {
                    style: {
                        opacity: 0
                    },
                    class: "jcemediabox-tooltip"
                }, this.tooltiptheme), JCEMediaBox.isIE6 && DOM.addClass(this.toolTip, "ie6")
            }
        },
        start: function(el) {
            var t = this,
                DOM = JCEMediaBox.DOM;
            if (!this.tooltiptheme) return !1;
            this.build();
            var text = DOM.attribute(el, "data-title") || "",
                title = "";
            if (/::/.test(text)) {
                var parts = text.split("::");
                title = JCEMediaBox.trim(parts[0]), text = JCEMediaBox.trim(parts[1])
            }
            var h = "";
            title && (h += "<h4>" + title + "</h4>"), text && (h += "<p>" + text + "</p>");
            var tn = DOM.get("jcemediabox-tooltip-text");
            "undefined" == typeof tn ? (this.toolTip.className = "jcemediabox-tooltip-simple", this.toolTip.innerHTML = h) : tn.innerHTML = h, DOM.style(t.toolTip, "visibility", "visible"), JCEMediaBox.FX.animate(t.toolTip, {
                opacity: JCEMediaBox.options.tooltip.opacity
            }, JCEMediaBox.options.tooltip.speed)
        },
        end: function(el) {
            return !!this.tooltiptheme && void JCEMediaBox.DOM.styles(this.toolTip, {
                visibility: "hidden",
                opacity: 0
            })
        },
        locate: function(e) {
            if (!this.tooltiptheme) return !1;
            this.build();
            var o = JCEMediaBox.options.tooltip.offsets,
                page = {
                    x: e.pageX || e.clientX + document.documentElement.scrollLeft,
                    y: e.pageY || e.clientY + document.documentElement.scrollTop
                },
                tip = {
                    x: this.toolTip.offsetWidth,
                    y: this.toolTip.offsetHeight
                },
                pos = {
                    x: page.x + o.x,
                    y: page.y + o.y
                },
                ah = 0;
            switch (JCEMediaBox.options.tooltip.position) {
                case "tl":
                    pos.x = page.x - tip.x - o.x, pos.y = page.y - tip.y - (ah + o.y);
                    break;
                case "tr":
                    pos.x = page.x + o.x, pos.y = page.y - tip.y - (ah + o.y);
                    break;
                case "tc":
                    pos.x = page.x - Math.round(tip.x / 2) + o.x, pos.y = page.y - tip.y - (ah + o.y);
                    break;
                case "bl":
                    pos.x = page.x - tip.x - o.x, pos.y = page.y + Math.round(tip.y / 2) - (ah + o.y);
                    break;
                case "br":
                    pos.x = page.x + o.x, pos.y = page.y + o.y;
                    break;
                case "bc":
                    pos.x = page.x - tip.x / 2 + o.x, pos.y = page.y + ah + o.y
            }
            JCEMediaBox.DOM.styles(this.toolTip, {
                top: pos.y,
                left: pos.x
            })
        },
        position: function(element) {}
    }, JCEMediaBox.Popup = {
        addons: {
            flash: {},
            image: {},
            iframe: {},
            html: {},
            pdf: {}
        },
        setAddons: function(n, o) {
            JCEMediaBox.extend(this.addons[n], o)
        },
        getAddons: function(n) {
            return n ? this.addons[n] : this.addons
        },
        getAddon: function(v, n) {
            var r, cp = !1,
                each = JCEMediaBox.each;
            return addons = this.getAddons(n), each(this.addons, function(o, s) {
                each(o, function(fn) {
                    r = fn.call(this, v), "undefined" != typeof r && (cp = r)
                })
            }), cp
        },
        cleanEvent: function(s) {
            return s.replace(/^function\s+anonymous\(\)\s+\{\s+(.*)\s+\}$/, "$1")
        },
        parseJSON: function(data) {
            return "string" == typeof data && data ? /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ? window.JSON && window.JSON.parse ? window.JSON.parse(data) : new Function("return " + data)() : void 0 : null
        },
        params: function(s) {
            function trim(s) {
                return s = s.replace(/^\s+/, "").replace(/\s+$/, "")
            }
            var a = [],
                x = [],
                DOM = JCEMediaBox.DOM;
            if ("string" == typeof s) {
                if (/^\{[\w\W]+\}$/.test(s)) return this.parseJSON(s);
                if (/\w+\[[^\]]+\]/.test(s)) return s = s.replace(/([\w]+)\[([^\]]+)\](;)?/g, function(a, b, c, d) {
                    return '"' + b + '":"' + DOM.encode(trim(c)) + '"' + (d ? "," : "")
                }), this.parseJSON("{" + s + "}");
                s.indexOf("=") !== -1 && (s.indexOf("&") !== -1 ? x = s.split(/&(amp;)?/g) : x.push(s))
            }
            return "object" == typeof s && s instanceof Array && (x = s), JCEMediaBox.each(x, function(n, i) {
                n && (n = n.replace(/^([^\[]+)(\[|=|:)([^\]]*)(\]?)$/, function(a, b, c, d) {
                    return d ? /[^0-9]/.test(d) ? '"' + b + '":"' + DOM.encode(trim(d)) + '"' : '"' + b + '":' + parseInt(d) : ""
                }), n && a.push(n))
            }), this.parseJSON("{" + a.join(",") + "}")
        },
        getCookie: function(n) {
            var e, b, c = document.cookie,
                p = n + "=";
            if (c) {
                if (b = c.indexOf("; " + p), b == -1) {
                    if (b = c.indexOf(p), 0 != b) return null
                } else b += 2;
                return e = c.indexOf(";", b), e == -1 && (e = c.length), unescape(c.substring(b + p.length, e))
            }
        },
        setCookie: function(n, v, e, p, d, s) {
            document.cookie = n + "=" + escape(v) + (e ? "; expires=" + e.toGMTString() : "") + (p ? "; path=" + escape(p) : "") + (d ? "; domain=" + d : "") + (s ? "; secure" : "")
        },
        convertLegacy: function() {
            var self = this,
                each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM;
            each(DOM.select("a[href]"), function(el) {
                if (/com_jce/.test(el.href)) {
                    var p, s, img, oc = DOM.attribute(el, "onclick");
                    if (oc) {
                        s = oc.replace(/&#39;/g, "'").split("'"), p = self.params(s[1]);
                        var img = p.img || "",
                            title = p.title || ""
                    }
                    img && (/http:\/\//.test(img) || ("/" == img.charAt(0) && (img = img.substr(1)), img = JCEMediaBox.site.replace(/http:\/\/([^\/]+)/, "") + img), DOM.attributes(el, {
                        href: img,
                        title: title.replace(/_/, " "),
                        onclick: ""
                    }), DOM.addClass(el, "jcepopup"))
                }
            })
        },
        convertLightbox: function() {
            var each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM;
            each(DOM.select("a[rel*=lightbox]"), function(el) {
                DOM.addClass(el, "jcepopup"), r = el.rel.replace(/lightbox\[?([^\]]*)\]?/, function(a, b) {
                    return b ? "group[" + b + "]" : ""
                }), DOM.attribute(el, "rel", r)
            })
        },
        convertShadowbox: function() {
            var each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM;
            each(DOM.select("a[rel*=shadowbox]"), function(el) {
                DOM.addClass(el, "jcepopup"), r = el.rel.replace(/shadowbox\[?([^\]]*)\]?/, function(a, b) {
                    var attribs = "",
                        group = "";
                    return b && (group = "group[" + b + "]"), /;=/.test(a) && (attribs = a.replace(/=([^;"]+)/g, function(x, z) {
                        return "[" + z + "]"
                    })), group && attribs ? group + ";" + attribs : group || attribs || ""
                }), DOM.attribute(el, "rel", r)
            })
        },
        translate: function(s) {
            return s || (s = this.popup.theme), s = s.replace(/\{#(\w+?)\}/g, function(a, b) {
                return JCEMediaBox.options.popup.labels[b]
            })
        },
        styles: function(o) {
            var x = [];
            return o ? (JCEMediaBox.each(o.split(";"), function(s, i) {
                s = s.replace(/(.*):(.*)/, function(a, b, c) {
                    return '"' + b + '":"' + c + '"'
                }), x.push(s)
            }), this.parseJSON("{" + x.join(",") + "}")) : {}
        },
        getType: function(el) {
            var o = {},
                type = "";
            return el.type && /(director|windowsmedia|mplayer|quicktime|real|divx|flash|pdf)/.test(el.type) && (type = /(director|windowsmedia|mplayer|quicktime|real|divx|flash|pdf)/.exec(el.type)[1]), o = this.getAddon(el.src), o && o.type && (type = o.type), type || el.type || "iframe"
        },
        mediatype: function(c) {
            var ci, cb, mt;
            switch (c = /(director|windowsmedia|mplayer|quicktime|real|divx|flash|pdf)/.exec(c), c[1]) {
                case "director":
                case "application/x-director":
                    ci = "166b1bca-3f9c-11cf-8075-444553540000", cb = "http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0", mt = "application/x-director";
                    break;
                case "windowsmedia":
                case "mplayer":
                case "application/x-mplayer2":
                    ci = "6bf52a52-394a-11d3-b153-00c04f79faa6", cb = "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701", mt = "application/x-mplayer2";
                    break;
                case "quicktime":
                case "video/quicktime":
                    ci = "02bf25d5-8c17-4b23-bc80-d3488abddc6b", cb = "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0", mt = "video/quicktime";
                    break;
                case "real":
                case "realaudio":
                case "audio/x-pn-realaudio-plugin":
                    ci = "cfcdaa03-8be4-11cf-b84b-0020afbbccfa", cb = "", mt = "audio/x-pn-realaudio-plugin";
                    break;
                case "divx":
                case "video/divx":
                    ci = "67dabfbf-d0ab-41fa-9c46-cc0f21721616", cb = "http://go.divx.com/plugin/DivXBrowserPlugin.cab", mt = "video/divx";
                    break;
                case "pdf":
                case "application/pdf":
                    ci = "ca8a9780-280d-11cf-a24d-444553540000", cb = "", mt = "application/pdf";
                    break;
                default:
                case "flash":
                case "application/x-shockwave-flash":
                    ci = "d27cdb6e-ae6d-11cf-96b8-444553540000", cb = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0", mt = "application/x-shockwave-flash"
            }
            return {
                classid: ci,
                codebase: cb,
                mediatype: mt
            }
        },
        islocal: function(s) {
            return !/^(\w+:)?\/\//.test(s) || new RegExp("^(" + JCEMediaBox.site + ")").test(s)
        },
        protocolRelative: function(url) {
            if (JCEMediaBox.isIE6) return url;
            var local = document.location.href;
            return url.indexOf("https://") !== -1 ? url : local.indexOf("https://") !== -1 ? url.replace(/http(s)?:\/\//i, "//") : url
        },
        frameWidth: function() {
            var w = 0,
                el = this.frame;
            return JCEMediaBox.each(["left", "right"], function(s) {
                w += parseFloat(JCEMediaBox.DOM.style(el, "padding-" + s))
            }), parseFloat(this.frame.clientWidth - w)
        },
        frameHeight: function() {
            var h = 0,
                el = this.frame,
                DIM = JCEMediaBox.Dimensions;
            return JCEMediaBox.each(["top", "bottom"], function(s) {
                h += parseFloat(JCEMediaBox.DOM.style(el, "padding-" + s))
            }), h += JCEMediaBox.isIE6 || JCEMediaBox.isIE7 ? DIM.getScrollbarWidth() : 0, parseInt(DIM.getHeight()) - h
        },
        width: function() {
            return this.frameWidth() - JCEMediaBox.Dimensions.getScrollbarWidth()
        },
        height: function() {
            var h = 0,
                t = this,
                each = JCEMediaBox.each,
                DIM = JCEMediaBox.Dimensions;
            return each(["top", "bottom"], function(s) {
                var el = t["info-" + s];
                el && (h += parseInt(DIM.outerHeight(el)))
            }), this.frameHeight() - h
        },
        printPage: function() {
            return !1
        },
        zoom: function(el) {
            function _buildIcon(el, zoom, child, styles) {
                var span = DOM.add(el, "span", {
                    class: "jcemediabox-zoom-span",
                    style: child.style.cssText
                });
                "IMG" === child.nodeName && child.title && span.setAttribute("title", child.title), DOM.styles(span, styles), DOM.hasClass(el.parentNode, "wf_caption") && (span.style.width = null, DOM.style(span, "max-width", DOM.style(el.parentNode, "max-width"))), span.style.width && (DOM.style(span, "max-width", span.style.width), span.style.width = null), DOM.add(span, child), DOM.add(span, zoom), each(["style", "align", "border", "hspace", "vspace"], function(v, i) {
                    child.removeAttribute(v)
                }), DOM.addClass(zoom, "jcemediabox-zoom-image"), JCEMediaBox.isIE6 && /\.png/i.test(DOM.style(zoom, "background-image")) && DOM.png(zoom), DOM.styles(child, {
                    margin: 0,
                    padding: 0,
                    float: "none",
                    border: "none"
                })
            }
            var self = this,
                DOM = JCEMediaBox.DOM,
                extend = JCEMediaBox.extend,
                each = JCEMediaBox.each,
                zoom = (el.childNodes, DOM.create("span"));
            JCEMediaBox.isIE6 && DOM.addClass(el, "ie6");
            var cls = DOM.attribute(el, "class");
            cls = cls.replace("icon-", "zoom-", "g"), DOM.attribute(el, "class", cls);
            var img = DOM.select("img", el);
            if (img && img.length) {
                var child = img[0],
                    align = child.getAttribute("align"),
                    vspace = child.getAttribute("vspace"),
                    hspace = child.getAttribute("hspace"),
                    styles = {};
                each(["top", "right", "bottom", "left"], function(pos) {
                    styles["margin-" + pos] = DOM.style(child, "margin-" + pos), styles["padding-" + pos] = DOM.style(child, "padding-" + pos), each(["width", "style", "color"], function(prop) {
                        styles["border-" + pos + "-" + prop] = DOM.style(child, "border-" + pos + "-" + prop)
                    })
                }), /\w+/.test(align) && extend(styles, {
                    float: /left|right/.test(align) ? align : "",
                    "text-align": /top|middle|bottom/.test(align) ? align : ""
                }), vspace > 0 && extend(styles, {
                    "margin-top": parseInt(vspace),
                    "margin-bottom": parseInt(vspace)
                }), hspace > 0 && extend(styles, {
                    "margin-left": parseInt(hspace),
                    "margin-right": parseInt(hspace)
                });
                var w = child.getAttribute("width"),
                    h = child.getAttribute("height"),
                    ws = child.style.width,
                    rh = child.height,
                    rw = child.width;
                if (!w && !ws && !rw) return !child.loaded && (child.onload = function() {
                    return child.loaded = !0, self.zoom(el)
                }, child.onerror = function() {
                    return !1
                }, !1);
                !w && h && (w = h / rh * rw), w || (w = /([0-9]+)(px)?$/.test(ws) ? parseFloat(ws) : rw), w && (child.setAttribute("width", w), styles.width = w), extend(styles, {
                    "text-align": child.style.textAlign
                });
                var float = DOM.style(child, "float");
                "left" !== float && "right" !== float || (styles.float = float),
                    _buildIcon(el, zoom, child, styles)
            } else DOM.addClass(zoom, "jcemediabox-zoom-link"), DOM.hasClass(el, "zoom-left") ? DOM.addBefore(el, zoom) : DOM.add(el, zoom), JCEMediaBox.isIE7 && DOM.style(zoom, "display", "inline-block");
            return zoom
        },
        auto: function() {
            function makeID(src) {
                var url = document.location.href,
                    key = window.btoa(url + src);
                return key = key.replace(/[^\w]/g, ""), key = key.substr(0, 24)
            }
            var dts, key, t = this,
                expires = JCEMediaBox.options.popup.cookie_expiry;
            JCEMediaBox.each(this.popups, function(el, i) {
                if (el.auto)
                    if ("single" == el.auto) {
                        key = el.id || makeID(el.src);
                        var cookie = t.getCookie("jcemediabox_" + key + "_" + i);
                        cookie || (expires && (dts = new Date, dts.setHours(24 * expires)), t.setCookie("jcemediabox_" + key + "_" + i, 1, dts), t.start(el))
                    } else "multiple" == el.auto && t.start(el)
            })
        },
        init: function() {
            window.jcepopup = this, this.create()
        },
        getPopups: function(s, p) {
            var selector = "a.jcebox, a.jcelightbox, a.jcepopup, a[data-mediabox], area.jcebox, area.jcelightbox, area.jcepopup, area[data-mediabox]";
            return JCEMediaBox.DOM.select(s || selector, p)
        },
        getData: function(n) {
            var data, DOM = JCEMediaBox.DOM,
                o = (JCEMediaBox.each, {}),
                re = /\w+\[[^\]]+\]/;
            if (data = n.getAttribute("data-mediabox") || n.getAttribute("data-json"), data && "1" != data) return n.removeAttribute("data-json"), n.removeAttribute("data-mediabox"), this.params(data);
            var i, attrs = n.attributes,
                x = 0;
            for (i = attrs.length - 1; i >= 0; i--) {
                var attrName = attrs[i].name;
                if (attrName && attrName.indexOf("data-mediabox-") !== -1) {
                    var attr = attrName.replace("data-mediabox-", "");
                    o[attr] = attrs[i].value, x++
                }
            }
            if (x) return o;
            var title = DOM.attribute(n, "title"),
                rel = DOM.attribute(n, "rel");
            if (title && re.test(title)) return o = this.params(title), DOM.attribute(n, "title", o.title || ""), o;
            if (rel && re.test(rel)) {
                var args = [];
                return rel = rel.replace(/\b((\w+)\[(.*?)\])(;?)/g, function(a, b, c) {
                    return args.push(b), ""
                }), o = this.params(args) || {}, DOM.attribute(n, "rel", rel || o.rel || ""), o
            }
            return o
        },
        process: function(el) {
            var data, DOM = JCEMediaBox.DOM,
                o = {},
                group = "",
                auto = !1,
                title = el.title || "",
                rel = el.rel || "",
                src = el.href;
            if (src = src.replace(/b(w|h)=([0-9]+)/g, function(s, k, v) {
                    return k = "w" == k ? "width" : "height", k + "=" + v
                }), data = this.getData(el) || {}, !/\w+\[[^\]]+\]/.test(rel)) {
                var rx = "alternate|stylesheet|start|next|prev|contents|index|glossary|copyright|chapter|section|subsection|appendix|help|bookmark|nofollow|noopener|noreferrer|licence|tag|friend",
                    lb = "(lightbox([(.*?)])?)",
                    lt = "(lyte(box|frame|show)([(.*?)])?)";
                group = JCEMediaBox.trim(rel.replace(new RegExp("(^|\\s+)" + rx + "|" + lb + "|" + lt + "(\\s+|$)", "g"), "", "gi"))
            }
            return "AREA" == el.nodeName && (data || (data = this.params(src)), group = group || "AREA_ELEMENT", data.type || (match = /\b(ajax|iframe|image|flash|director|shockwave|mplayer|windowsmedia|quicktime|realaudio|real|divx|pdf)\b/.exec(el.className)) && (data.type = match[0])), /autopopup-(single|multiple)/.test(el.className) && (auto = /(multiple)/.test(el.className) ? "multiple" : "single"), auto = auto || data.autopopup || "", group = group || data.group || "", JCEMediaBox.extend(o, {
                src: src,
                title: data.title || title,
                group: DOM.hasClass(el, "nogroup") ? "" : group,
                type: data.type || el.type || "",
                params: data,
                auto: auto
            }), el.href = el.href.replace(/&type=(ajax|text\/html|text\/xml)/, ""), o
        },
        create: function(elements) {
            var t = this,
                each = JCEMediaBox.each,
                Event = JCEMediaBox.Event,
                DOM = JCEMediaBox.DOM,
                pageload = !1,
                auto = !1;
            if (elements || (pageload = !0, this.popups = [], 1 == JCEMediaBox.options.popup.legacy && t.convertLegacy(), 1 == JCEMediaBox.options.popup.lightbox && t.convertLightbox(), 1 == JCEMediaBox.options.popup.shadowbox && t.convertShadowbox()), this.elements = elements || this.getPopups(), each(this.elements, function(el, i) {
                    if (!el.href) return !0;
                    if (1 === el.childNodes.length && "IMG" === el.firstChild.nodeName && DOM.addClass(el, "jcemediabox-image"), 1 != JCEMediaBox.options.popup.icons || "A" != el.nodeName || /(noicon|icon-none|noshow)/.test(el.className) || "none" == el.style.display || t.zoom(el), "_blank" === DOM.attribute(el, "target")) {
                        var rel = DOM.attribute(el, "rel") || "";
                        rel.indexOf("noopener") === -1 && (rel += " noopener"), rel.indexOf("noreferrer") === -1 && (rel += " noreferrer"), DOM.attribute(el, "rel", JCEMediaBox.trim(rel))
                    }
                    DOM.removeClass(el, "jcelightbox"), DOM.removeClass(el, "jcebox"), DOM.addClass(el, "jcepopup");
                    var o = t.process(el);
                    t.popups.push(o), pageload || (i = t.popups.length - 1), Event.add(el, "click", function(e) {
                        return Event.cancel(e), t.start(o, i)
                    })
                }), pageload) {
                this.popuptheme = "";
                var theme = JCEMediaBox.options.theme;
                new JCEMediaBox.XHR({
                    success: function(text, xml) {
                        var re = /<!-- THEME START -->([\s\S]*?)<!-- THEME END -->/;
                        re.test(text) && (text = re.exec(text)[1]), t.popuptheme = text, auto || (t.auto(), auto = !0)
                    }
                }).send(JCEMediaBox.site + "plugins/system/jcemediabox/themes/" + theme + "/popup.html")
            }
        },
        open: function(data, title, group, type, params) {
            var i, o = {};
            if ("string" == typeof data && (data = {
                    src: data,
                    title: title,
                    group: group,
                    type: type,
                    params: params
                }), data.nodeName && ("A" == data.nodeName || "AREA" == data.nodeName)) {
                if (i = JCEMediaBox.inArray(this.elements, data), i >= 0) return this.start(this.popups[i], i);
                var o = this.process(data),
                    x = this.popups.push(o);
                return this.start(o, x - 1)
            }
            return this.start(data)
        },
        start: function(p, i) {
            var len, n = 0,
                items = [],
                each = JCEMediaBox.each;
            if (this.build()) return p.group ? (each(this.popups, function(o, x) {
                o.group == p.group && (len = items.push(o), i && x == i && (n = len - 1))
            }), p.auto || "undefined" != typeof i || (items.push(p), n = items.length - 1)) : items.push(p), this.show(items, n)
        },
        build: function() {
            var t = this,
                each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM,
                Event = JCEMediaBox.Event;
            if (!this.page) {
                if (this.page = DOM.add(document.body, "div", {
                        id: "jcemediabox-popup-page"
                    }), JCEMediaBox.isIE6 && DOM.addClass(this.page, "ie6"), JCEMediaBox.isIE7 && DOM.addClass(this.page, "ie7"), JCEMediaBox.isiOS && DOM.addClass(this.page, "ios"), JCEMediaBox.isAndroid && DOM.addClass(this.page, "android"), 1 == JCEMediaBox.options.popup.overlay && (this.overlay = DOM.add(this.page, "div", {
                        id: "jcemediabox-popup-overlay",
                        style: {
                            opacity: 0,
                            "background-color": JCEMediaBox.options.popup.overlaycolor
                        }
                    })), !this.popuptheme) return !1;
                this.popuptheme = this.popuptheme.replace(/<!--(.*?)-->/g, ""), this.popuptheme = this.translate(this.popuptheme), this.frame = DOM.add(this.page, "div", {
                    id: "jcemediabox-popup-frame"
                }, '<div id="jcemediabox-popup-body">' + this.popuptheme + "</div>"), each(DOM.select("*[id]", this.frame), function(el) {
                    var s = el.id.replace("jcemediabox-popup-", "");
                    t[s] = el, DOM.hide(el)
                }), (JCEMediaBox.isiOS || JCEMediaBox.isAndroid) && JCEMediaBox.isWebKit && DOM.style(this.content, "webkitOverflowScrolling", "touch"), 2 == JCEMediaBox.options.popup.close && Event.add(this.frame, "click", function(e) {
                    e.target && e.target == t.frame && t.close()
                }), this.closelink && Event.add(this.closelink, "click", function() {
                    return t.close()
                }), this.cancellink && Event.add(this.cancellink, "click", function() {
                    return t.close()
                }), this.next && Event.add(this.next, "click", function() {
                    return t.nextItem()
                }), this.prev && Event.add(this.prev, "click", function() {
                    return t.previousItem()
                }), this.numbers && (this.numbers.tmpHTML = this.numbers.innerHTML), this.print && Event.add(this.print, "click", function() {
                    return t.printPage()
                }), JCEMediaBox.isIE6 && (DOM.png(this.body), each(DOM.select("*", this.body), function(el) {
                    "jcemediabox-popup-content" != DOM.attribute(el, "id") && DOM.png(el)
                }))
            }
            return !0
        },
        show: function(items, n) {
            var DOM = JCEMediaBox.DOM,
                DIM = JCEMediaBox.Dimensions,
                top = 0;
            return this.items = items, this.bind(!0), DOM.show(this.body), /\d/.test(this.body.style.top) || (top = (DIM.getHeight() - DIM.outerHeight(this.body)) / 2), DOM.style(this.body, "top", top), (JCEMediaBox.isIE6 || "scroll" == JCEMediaBox.options.popup.scrolling) && (DOM.addClass(this.page, "scrolling"), DOM.style(this.overlay, "height", DIM.getScrollHeight()), DOM.style(this.body, "top", DIM.getScrollTop() + top)), 1 == JCEMediaBox.options.popup.overlay && this.overlay && (DOM.show(this.overlay), JCEMediaBox.FX.animate(this.overlay, {
                opacity: JCEMediaBox.options.popup.overlayopacity
            }, JCEMediaBox.options.popup.fadespeed)), this.change(n)
        },
        bind: function(open) {
            var t = this,
                isIE6 = JCEMediaBox.isIE6,
                each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM,
                Event = JCEMediaBox.Event;
            JCEMediaBox.Dimensions;
            isIE6 && each(DOM.select("select"), function(el) {
                open && (el.tmpStyle = el.style.visibility || ""), el.style.visibility = open ? "hidden" : el.tmpStyle
            }), JCEMediaBox.options.popup.hideobjects && each(DOM.select("object, embed"), function(el) {
                "jcemediabox-popup-object" != el.id && (open && (el.tmpStyle = el.style.visibility || ""), el.style.visibility = open ? "hidden" : el.tmpStyle)
            });
            var scroll = JCEMediaBox.options.popup.scrollpopup;
            open ? (Event.add(document, "keydown", function(e) {
                t.listener(e)
            }), isIE6 && (Event.add(window, "scroll", function(e) {
                DOM.style(t.overlay, "height", JCEMediaBox.Dimensions.getScrollHeight())
            }), Event.add(window, "scroll", function(e) {
                DOM.style(t.overlay, "width", JCEMediaBox.Dimensions.getScrollWidth())
            }))) : (!isIE6 && scroll || (Event.remove(window, "scroll"), Event.remove(window, "resize")), Event.remove(document, "keydown"))
        },
        listener: function(e) {
            switch (e.keyCode) {
                case 27:
                    this.close();
                    break;
                case 37:
                    this.previousItem();
                    break;
                case 39:
                    this.nextItem()
            }
        },
        queue: function(n) {
            var t = this,
                changed = !1;
            JCEMediaBox.each(["top", "bottom"], function(s) {
                var el = t["info-" + s];
                if (el) {
                    var v = JCEMediaBox.Dimensions.outerHeight(el),
                        style = {};
                    style.top = "top" == s ? v : -v, JCEMediaBox.FX.animate(el, style, JCEMediaBox.options.popup.scalespeed, function() {
                        changed || (changed = !0, JCEMediaBox.FX.animate(t.content, {
                            opacity: 0
                        }, JCEMediaBox.options.popup.fadespeed, function() {
                            return t.change(n)
                        }))
                    })
                }
            })
        },
        nextItem: function() {
            if (1 == this.items.length) return !1;
            var n = this.index + 1;
            return !(n < 0 || n >= this.items.length) && this.queue(n)
        },
        previousItem: function() {
            if (1 == this.items.length) return !1;
            var n = this.index - 1;
            return !(n < 0 || n >= this.items.length) && this.queue(n)
        },
        info: function() {
            function processRe(h) {
                return h = h.replace(ex, '<a href="mailto:$1" target="_blank">$1</a>'), h = h.replace(ux, '<a href="$1" target="_blank">$1</a>')
            }
            var each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM,
                Event = JCEMediaBox.Event;
            if (this.caption) {
                var title = this.active.title || "",
                    text = this.active.caption || "",
                    h = "",
                    ex = /([-!#$%&\'\*\+\\.\/0-9=?A-Z^_`a-z{|}~]+@[-!#$%&\'\*\+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'*+\\.\/0-9=?A-Z^_`a-z{|}~]+)/gi,
                    ux = /([a-zA-Z]{3,9}:\/\/[^\s]+)/gi;
                title && (h += "<h4>" + DOM.decode(title) + "</h4>"), text && (h += "<p>" + DOM.decode(text) + "</p>"), this.caption.innerHTML = h, "" != h && each(DOM.select("*", this.caption), function(el) {
                    "A" != el.nodeName && each(el.childNodes, function(n, i) {
                        if (3 == n.nodeType) {
                            var s = n.innerText || n.textContent || n.data || null;
                            s && /(@|:\/\/)/.test(s) && (s = processRe(s)) && (n.parentNode.innerHTML = s)
                        }
                    })
                })
            }
            var t = this,
                len = this.items.length;
            if (this.numbers && len > 1) {
                var html = this.numbers.tmpHTML || "{$numbers}";
                if (/\{\$numbers\}/.test(html)) {
                    this.numbers.innerHTML = "";
                    for (var i = 0; i < len; i++) {
                        var n = i + 1,
                            title = decodeURIComponent(this.items[i].title || n),
                            link = DOM.add(this.numbers, "a", {
                                href: "javascript:;",
                                title: title,
                                class: this.index == i ? "active" : ""
                            }, n);
                        Event.add(link, "click", function(e) {
                            var x = parseInt(e.target.innerHTML) - 1;
                            return t.index != x && t.queue(x)
                        })
                    }
                }
                /\{\$(current|total)\}/.test(html) && (this.numbers.innerHTML = html.replace("{$current}", this.index + 1).replace("{$total}", len))
            } else this.numbers && (this.numbers.innerHTML = "");
            each(["top", "bottom"], function(v, i) {
                var el = t["info-" + v];
                el && (DOM.show(el), each(DOM.select("*[id]", el), function(s) {
                    DOM.show(s)
                }), DOM.style(el, "visibility", "hidden"))
            }), DOM.hide(this.next), DOM.hide(this.prev), len > 1 && (this.prev && (this.index > 0 ? DOM.show(this.prev) : DOM.hide(this.prev)), this.next && (this.index < len - 1 ? DOM.show(this.next) : DOM.hide(this.next)))
        },
        change: function(n) {
            function toAbsolute(url) {
                var div = document.createElement("div");
                return div.innerHTML = '<a href="' + url + '">x</a>', div.firstChild.href
            }

            function resolveMediaPath(s, absolute) {
                return s && s.indexOf("://") === -1 && "/" !== s.charAt(0) && (s = JCEMediaBox.options.base + s), absolute ? toAbsolute(s) : s
            }
            var o, w, h, t = this,
                extend = JCEMediaBox.extend,
                each = JCEMediaBox.each,
                DOM = (JCEMediaBox.inArray, JCEMediaBox.DOM),
                Event = JCEMediaBox.Event,
                isIE = JCEMediaBox.isIE,
                DIM = JCEMediaBox.Dimensions,
                p = {};
            if (n < 0 || n >= this.items.length) return !1;
            this.index = n, this.active = {}, DOM.show(this.container), this.loader && DOM.show(this.loader), this.cancellink && DOM.show(this.cancellink), this.object && (this.object = null), this.content.innerHTML = "", o = this.items[n], extend(p, this.getAddon(o.src, o.type)), delete o.params.src, extend(p, o.params);
            var width = p.width || JCEMediaBox.options.popup.width || 0,
                height = p.height || JCEMediaBox.options.popup.height || 0;
            width && /%/.test(width) && (width = DIM.getWidth() * parseInt(width) / 100), height && /%/.test(height) && (height = DIM.getHeight() * parseInt(height) / 100);
            var title = o.title || p.title || "",
                caption = p.caption || "";
            if (/::/.test(title)) {
                var parts = title.split("::");
                title = JCEMediaBox.trim(parts[0]), caption = JCEMediaBox.trim(parts[1])
            }
            title = DOM.decode(title), caption = DOM.decode(caption);
            try {
                title = decodeURIComponent(title), caption = decodeURIComponent(caption)
            } catch (e) {}
            switch (extend(this.active, {
                src: p.src || o.src,
                title: title,
                caption: caption,
                type: p.type || this.getType(o),
                params: p || {},
                width: width,
                height: height
            }), this.active.type) {
                case "image":
                case "image/jpeg":
                case "image/png":
                case "image/gif":
                case "image/bmp":
                    this.print && this.options.print && (this.print.style.visibility = "visible"), this.img = new Image, this.img.onload = function() {
                        return t.setup()
                    }, this.img.onerror = function() {
                        return t.img.error = !0, t.setup()
                    }, this.img.src = this.active.src, isIE && DOM.style(this.content, "background-color", DOM.style(this.content, "background-color")), p.width && !p.height ? this.active.height = 0 : p.height && !p.width && (this.active.width = 0);
                    break;
                case "flash":
                case "director":
                case "shockwave":
                case "mplayer":
                case "windowsmedia":
                case "quicktime":
                case "realaudio":
                case "real":
                case "divx":
                    this.print && (this.print.style.visibility = "hidden"), p.src = this.active.src;
                    var base = /:\/\//.test(p.src) ? "" : this.site;
                    this.object = "", w = this.width(), h = this.height();
                    var mt = this.mediatype(this.active.type);
                    "flash" == this.active.type && (p.wmode = "transparent", p.base = base), /(mplayer|windowsmedia)/i.test(this.active.type) && (p.baseurl = base, isIE && (p.url = p.src, delete p.src)), delete p.title, delete p.group, p.width = this.active.width || this.width(), p.height = this.active.height || this.height();
                    var flash = /flash/i.test(this.active.type);
                    /pdf/i.test(this.active.type);
                    if (this.active.type = "media", this.active.width = p.width, this.active.height = p.height, flash || isIE) {
                        this.object = '<object id="jcemediabox-popup-object"', flash && !isIE ? this.object += ' type="' + mt.mediatype + '" data="' + p.src + '"' : (this.object += ' classid="clsid:' + mt.classid + '"', mt.codebase && (this.object += ' codebase="' + mt.codebase + '"'));
                        for (n in p) "" !== p[n] && /^(id|name|style|width|height)$/.test(n) && (t.object += " " + n + '="' + decodeURIComponent(DOM.decode(p[n])) + '"', delete p[n]);
                        delete p.type, this.object += ">";
                        for (n in p) t.object += '<param name="' + n + '" value="' + decodeURIComponent(DOM.decode(p[n])) + '" />';
                        this.object += "</object>"
                    } else {
                        this.object = '<embed id="jcemediabox-popup-object" type="' + mt.mediatype + '"';
                        for (n in p) "" !== v && (t.object += " " + n + '="' + v + '"');
                        this.object += "></embed>"
                    }
                    this.setup();
                    break;
                case "video/x-flv":
                case "video/mp4":
                case "video/mpeg":
                case "video/ogg":
                case "audio/ogg":
                case "audio/mp3":
                case "video/webm":
                case "audio/webm":
                    var type = this.active.type,
                        tag = /video/.test(type) ? "video" : "audio",
                        supportMap = {
                            video: {
                                h264: ["video/mp4", "video/mpeg"],
                                webm: ["video/webm"],
                                ogg: ["video/ogg"]
                            },
                            audio: {
                                mp3: ["audio/mp3"],
                                ogg: ["audio/ogg"],
                                webm: ["audio/webm"]
                            }
                        },
                        hasSupport = !1;
                    if ("video/x-flv" !== type)
                        for (var n in supportMap[tag]) supportMap[tag][n].indexOf(type) !== -1 && (hasSupport = support[tag] && !!support[tag][n]);
                    this.object = "";
                    var src = resolveMediaPath(this.active.src);
                    if (p.poster && (p.poster = resolveMediaPath(p.poster)), hasSupport) {
                        p.width = p.width || this.active.width, p.height = p.height || this.active.height, this.object += "<" + tag + ' type="' + type + '" src="' + this.active.src + '"';
                        for (n in p) "" !== p[n] && (/(loop|autoplay|controls|preload)$/.test(n) && (t.object += " " + n + '="' + n + '"'), /(id|style|poster|audio)$/.test(n) && (t.object += " " + n + '="' + decodeURIComponent(DOM.decode(p[n])) + '"'));
                        this.object += "></" + tag + ">"
                    } else if (/(video|audio)\/(mp4|mpeg|x-flv|mp3)/.test(type)) {
                        var swf = JCEMediaBox.options.base + "plugins/system/jcemediabox/mediaplayer/mediaplayer.swf";
                        this.object += '<object type="application/x-shockwave-flash" class="wf-mediaplayer-object" data="' + swf + '"', p.style = p.style || "";
                        var flashvars = ["file=" + toAbsolute(src)];
                        p.poster && (p.style += " background-image:url('" + p.poster + "')"), each(p, function(v, n) {
                            "" !== v && (n = n.toLowerCase(), "loop" !== n && "autoplay" !== n && "controls" !== n || flashvars.push(n + "=" + !!v), "preload" === n && flashvars.push(n + "=" + v), "id" !== n && "style" !== n || (v = decodeURIComponent(DOM.decode(v)), v = JCEMediaBox.trim(v), "" !== v && (t.object += " " + n + '="' + v + '"')), "width" === n | "height" === n && (t.object += " " + n + '="' + v + '"'))
                        }), this.object += ">", this.object += '<param name="movie" value="' + swf + '" />', this.object += '<param name="flashvars" value="' + flashvars.join("&") + '" />', this.object += '<param name="allowfullscreen" value="true" />', this.object += '<param name="wmode" value="transparent" />', this.object += '<i>Flash is required to play this video. <a href="http://get.adobe.com/flashplayer/" target="_blank">Get Adobe® Flash Player</a></i>', this.object += "</object>"
                    } else DOM.addClass(this.content, "broken-media");
                    this.active.type = "media", this.setup();
                    break;
                case "ajax":
                case "text/html":
                case "text/xml":
                    this.print && this.options.print && (this.print.style.visibility = "visible"), this.active.width = this.active.width || this.width(), this.active.height = this.active.height || this.height(), this.islocal(this.active.src) ? (/tmpl=component/i.test(this.active.src) || (this.active.src += /\?/.test(this.active.src) ? "&tmpl=component" : "?tmpl=component"), this.active.type = "ajax") : (this.active.type = "iframe", this.setup()), styles = extend(this.styles(p.styles), {
                        display: "none"
                    }), this.active.src = this.active.src.replace(/\&type=(ajax|text\/html|text\/xml)/, ""), this.loader && DOM.show(this.loader);
                    var iframe = DOM.add(document.body, "iframe", {
                        src: this.active.src,
                        style: "display:none;"
                    });
                    Event.add(iframe, "load", function() {
                        return t.ajax = DOM.add(t.content, "div", {
                            id: "jcemediabox-popup-ajax",
                            style: styles
                        }), t.ajax.innerHTML = iframe.contentWindow.document.body.innerHTML, JCEMediaBox.isIE6 && DOM.style(t.ajax, "margin-right", JCEMediaBox.Dimensions.getScrollbarWidth()), JCEMediaBox.isIE7 && DOM.style(t.ajax, "padding-right", JCEMediaBox.Dimensions.getScrollbarWidth()), window.setTimeout(function() {
                            DOM.remove(iframe)
                        }, 10), t.create(t.getPopups("", t.content)), JCEMediaBox.ToolTip.create(t.content), t.setup()
                    }), iframe.onerror = function() {
                        return DOM.addClass(this.content, "broken-page"), t.setup()
                    };
                    break;
                case "iframe":
                case "pdf":
                case "video/youtube":
                case "video/vimeo":
                default:
                    if (JCEMediaBox.isMobile && "pdf" === this.active.type) return this.close(), window.open(this.active.src);
                    this.print && (this.print.style.visibility = "hidden"), this.islocal(this.active.src) && (/tmpl=component/i.test(this.active.src) || /\.pdf\b/i.test(this.active.src) || (this.active.src += /\?/.test(this.active.src) ? "&tmpl=component" : "?tmpl=component")), this.active.src = this.protocolRelative(this.active.src), this.active.width = this.active.width || this.width(), this.active.height = this.active.height || this.height(), this.active.type = "iframe", this.setup()
            }
            return !1
        },
        resize: function(w, h, x, y) {
            return w > x ? (h *= x / w, w = x, h > y && (w *= y / h, h = y)) : h > y && (w *= y / h, h = y, w > x && (h *= x / w, w = x)), w = Math.round(w), h = Math.round(h), {
                width: Math.round(w),
                height: Math.round(h)
            }
        },
        setup: function() {
            var w, h, t = this,
                DOM = JCEMediaBox.DOM,
                o = JCEMediaBox.options.popup;
            if (w = this.active.width, h = this.active.height, this.info(), "image" == this.active.type) {
                t.img.error && (w = 300, h = 300);
                var x = this.img.width,
                    y = this.img.height;
                w && !h ? h = y * (w / x) : !w && h && (w = x * (h / y)), w = w || x, h = h || y
            }
            if (1 === parseInt(o.resize) || 0 === parseInt(o.resize) && "fixed" == o.scrolling) {
                var x = this.width(),
                    y = this.height(),
                    dim = this.resize(w, h, x, y);
                w = dim.width, h = dim.height
            }
            if (DOM.styles(this.content, {
                    width: w,
                    height: h
                }), DOM.hide(this.content), "image" == this.active.type && (this.img.error ? DOM.addClass(this.content, "broken-image") : this.content.innerHTML = '<img id="jcemediabox-popup-img" src="' + this.active.src + '" title="' + this.active.title + '" />', JCEMediaBox.isIE)) {
                var img = DOM.get("jcemediabox-popup-img");
                img && DOM.style(img, "-ms-interpolation-mode", "bicubic")
            }
            return this.animate()
        },
        showInfo: function() {
            var t = this,
                each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM,
                FX = JCEMediaBox.FX,
                DIM = JCEMediaBox.Dimensions,
                ss = (JCEMediaBox.Event, JCEMediaBox.options.popup.scalespeed),
                itop = (JCEMediaBox.options.popup.fadespeed, t["info-top"]);
            if (itop) {
                each(DOM.select("*[id]", itop), function(el) {
                    /jcemediabox-popup-(next|prev)/.test(DOM.attribute(el, "id")) || DOM.show(el)
                });
                var h = DIM.outerHeight(itop);
                DOM.styles(itop, {
                    "z-index": -1,
                    top: h,
                    visibility: "visible"
                }), FX.animate(itop, {
                    top: 0
                }, ss)
            }
            t.closelink && DOM.show(t.closelink);
            var ibottom = t["info-bottom"];
            if (ibottom) {
                each(DOM.select("*[id]", ibottom), function(el) {
                    /jcemediabox-popup-(next|prev)/.test(DOM.attribute(el, "id")) || DOM.show(el)
                });
                var h = DIM.outerHeight(ibottom);
                DOM.styles(ibottom, {
                    "z-index": -1,
                    top: -h,
                    visibility: "visible"
                }), FX.animate(ibottom, {
                    top: 0
                }, ss)
            }
        },
        animate: function() {
            var t = this,
                each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM,
                FX = JCEMediaBox.FX,
                DIM = JCEMediaBox.Dimensions,
                ss = (JCEMediaBox.Event, JCEMediaBox.options.popup.scalespeed),
                fs = JCEMediaBox.options.popup.fadespeed,
                cw = DIM.outerWidth(this.content),
                ch = DIM.outerHeight(this.content),
                ih = 0;
            each(["top", "bottom"], function(v, i) {
                var el = t["info-" + v];
                el && (ih += DIM.outerHeight(el))
            });
            var st = "fixed" == DOM.style(this.page, "position") ? 0 : DIM.getScrollTop(),
                top = st + this.frameHeight() / 2 - (ch + ih) / 2;
            top < 0 && (top = 0), DOM.style(this.content, "opacity", 0), FX.animate(this.body, {
                height: ch,
                top: top,
                width: cw
            }, ss, function() {
                if ("iframe" == t.active.type) {
                    var iframe = DOM.add(t.content, "iframe", {
                        id: "jcemediabox-popup-iframe",
                        frameborder: 0,
                        allowTransparency: !0,
                        allowfullscreen: !0,
                        scrolling: t.active.params.scrolling || "auto",
                        width: "100%",
                        height: "100%"
                    });
                    if (/\.pdf\b/.test(t.active.src)) t.loader && DOM.hide(t.loader);
                    else {
                        var _timer, win = iframe.contentWindow,
                            doc = win.document;
                        JCEMediaBox.isiOS && JCEMediaBox.isWebKit && (_timer = setInterval(function() {
                            "complete" === doc.readyState && (clearInterval(_timer), t.loader && DOM.hide(t.loader))
                        }, 1e3)), iframe.onload = function() {
                            _timer && clearInterval(_timer), t.loader && DOM.hide(t.loader)
                        }
                    }
                    iframe.setAttribute("src", t.active.src), t.iframe = iframe
                } else t.loader && DOM.hide(t.loader), "media" == t.active.type && t.object && (t.content.innerHTML = t.object, /\.pdf\b/.test(t.active.src) && JCEMediaBox.isiOS && DOM.styles(DOM.get("jcemediabox-popup-object"), {
                    height: "1000%",
                    width: "150%"
                })), "ajax" == t.active.type && DOM.show(t.ajax);
                DOM.show(t.content), t.content.focus(), "image" != t.active.type || JCEMediaBox.isIE6 ? (DOM.style(t.content, "opacity", 1), t.showInfo()) : FX.animate(t.content, {
                    opacity: 1
                }, fs, function() {
                    t.showInfo()
                })
            })
        },
        close: function(keepopen) {
            var t = this,
                each = JCEMediaBox.each,
                DOM = JCEMediaBox.DOM;
            JCEMediaBox.Dimensions, JCEMediaBox.FX, JCEMediaBox.options.popup.scalespeed;
            if (this.iframe && DOM.attribute(this.iframe, "src", ""), each(["img", "object", "iframe", "ajax"], function(i, v) {
                    t[v] && DOM.remove(t[v]), t[v] = null
                }), this.closelink && DOM.hide(this.closelink), this.content.innerHTML = "", !keepopen) {
                each(["top", "bottom"], function(v, i) {
                    var el = t["info-" + v];
                    el && DOM.hide(el)
                });
                for (var popups = this.getPopups(); this.popups.length > popups.length;) this.popups.pop();
                DOM.remove(this.frame), this.overlay ? JCEMediaBox.isIE6 ? (this.bind(), DOM.remove(this.page), this.page = null) : JCEMediaBox.FX.animate(this.overlay, {
                    opacity: 0
                }, JCEMediaBox.options.popup.fadespeed, function() {
                    t.bind(), DOM.remove(t.page), t.page = null
                }) : (DOM.remove(this.page), this.page = null)
            }
            return !1
        }
    }
}(window), JCEMediaBox.Event.addUnload(function() {
        JCEMediaBox.Event.destroy()
    }),
    function(mediabox, undefined) {
        if (mediabox !== undefined) {
            var popup = mediabox.Popup,
                trim = mediabox.trim;
            popup.setAddons("flash", {
                flash: function(v) {
                    if (/\.swf\b/i.test(v)) return {
                        type: "flash"
                    }
                },
                flv: function(v) {
                    if (/\.(flv|f4v)\b/i.test(v)) return {
                        type: "video/x-flv"
                    }
                },
                metacafe: function(v) {
                    if (/metacafe(.+)\/(watch|fplayer)\/(.+)/.test(v)) {
                        var s = trim(v);
                        return /\.swf/i.test(s) || ("/" == s.charAt(s.length - 1) && (s = s.substring(0, s.length - 1)), s += ".swf"), {
                            width: 400,
                            height: 345,
                            type: "flash",
                            attributes: {
                                wmode: "opaque",
                                src: s.replace(/watch/i, "fplayer")
                            }
                        }
                    }
                },
                dailymotion: function(v) {
                    if (/dailymotion(.+)\/(swf|video)\//.test(v)) {
                        var s = trim(v);
                        return s = s.replace(/_(.*)/, ""), {
                            width: 420,
                            height: 339,
                            type: "flash",
                            wmode: "opaque",
                            src: s.replace(/video/i, "swf")
                        }
                    }
                },
                googlevideo: function(v) {
                    if (/google(.+)\/(videoplay|googleplayer\.swf)\?docid=(.+)/.test(v)) return {
                        width: 425,
                        height: 326,
                        type: "flash",
                        id: "VideoPlayback",
                        wmode: "opaque",
                        src: v.replace(/videoplay/g, "googleplayer.swf")
                    }
                }
            }), popup.setAddons("iframe", {
                youtube: function(v) {
                    if (/youtu(\.)?be([^\/]+)?\/(.+)/.test(v)) return {
                        width: 425,
                        height: 350,
                        type: "iframe",
                        src: v.replace(/youtu(\.)?be([^\/]+)?\/(.+)/, function(a, b, c, d) {
                            var k, query = "";
                            if (/watch\?/.test(d)) {
                                d = d.replace(/watch\?/, "");
                                var args = JCEMediaBox.Popup.params(d);
                                query += args.v, delete args.v;
                                for (k in args) query += (/\?/.test(query) ? "&" : "?") + k + "=" + args[k]
                            } else query = d.replace(/embed\//, "");
                            return b && !c && (c = ".com"), /wmode/.test(query) || (query += /\?/.test(query) ? "&wmode=opaque" : "?wmode=opaque"), "youtube" + c + "/embed/" + query
                        }).replace(/\/\/youtube/i, "//www.youtube")
                    }
                },
                vimeo: function(v) {
                    if (/vimeo\.com\/(video\/)?([0-9]+)/.test(v)) return {
                        width: 400,
                        height: 225,
                        type: "iframe",
                        src: v.replace(/(player\.)?vimeo\.com\/(video\/)?([0-9]+)/, function(a, b, c, d) {
                            return b ? a : "player.vimeo.com/video/" + d
                        })
                    }
                },
                twitvid: function(v) {
                    if (/twitvid(.+)\/(.+)/.test(v)) {
                        var s = "http://www.twitvid.com/embed.php?guid=";
                        return {
                            width: 480,
                            height: 360,
                            type: "iframe",
                            src: v.replace(/(.+)twitvid([^\/]+)\/(.+)/, function(a, b, c, d) {
                                return /embed\.php/.test(d) ? a : s + d
                            })
                        }
                    }
                },
                word: function(v) {
                    if (/\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(v)) {
                        var src = v;
                        return mediabox.options.popup.google_viewer && (/:\/\//.test(v) || (v = mediabox.site + v.replace("?tmpl=component", "")), src = "//docs.google.com/viewer?url=" + encodeURIComponent(v) + "&embedded=true"), {
                            type: "iframe",
                            src: src
                        }
                    }
                }
            }), popup.setAddons("image", {
                image: function(v) {
                    if (v = v.split("?")[0], /\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(v)) return {
                        type: "image"
                    }
                },
                twitpic: function(v) {
                    if (/twitpic(.+)\/(.+)/.test(v)) return {
                        type: "image"
                    }
                }
            }), popup.setAddons("pdf", {
                pdf: function(v) {
                    if (/\.(pdf)$/i.test(v)) {
                        var type = "pdf",
                            src = /\?#/.test(v) ? v + "&view=fitH" : v + "#view=fitH";
                        return mediabox.options.popup.google_viewer && (type = "iframe", /:\/\//.test(v) || (v = mediabox.site + v.replace("?tmpl=component", "")), src = "//docs.google.com/viewer?url=" + encodeURIComponent(v) + "&embedded=true"), {
                            type: type,
                            src: src
                        }
                    }
                }
            })
        }
    }(JCEMediaBox);