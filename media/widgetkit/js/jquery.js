window.jQuery || function(p, o) {
    function xb(a) {
        var b = wa[a] = {};
        c.each(a.split(G), function(a, c) {
            b[c] = !0
        });
        return b
    }

    function xa(a, b, d) {
        if (d === o && 1 === a.nodeType)
            if (d = "data-" + b.replace(yb, "-$1").toLowerCase(), d = a.getAttribute(d), "string" === typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : zb.test(d) ? c.parseJSON(d) : d
                } catch (e) {}
                c.data(a, b, d)
            } else d = o;
        return d
    }

    function ja(a) {
        for (var b in a)
            if (!("data" === b && c.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function R() {
        return !1
    }

    function V() {
        return !0
    }

    function W(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function ya(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function za(a, b, d) {
        b = b || 0;
        if (c.isFunction(b)) return c.grep(a, function(a, c) {
            return !!b.call(a, c, a) === d
        });
        if (b.nodeType) return c.grep(a, function(a) {
            return a === b === d
        });
        if ("string" === typeof b) {
            var e = c.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (Ab.test(b)) return c.filter(b, e, !d);
            b = c.filter(b, e)
        }
        return c.grep(a, function(a) {
            return 0 <= c.inArray(a, b) === d
        })
    }

    function Aa(a) {
        var b = Ba.split("|"),
            a = a.createDocumentFragment();
        if (a.createElement)
            for (; b.length;) a.createElement(b.pop());
        return a
    }

    function Ca(a, b) {
        if (1 === b.nodeType && c.hasData(a)) {
            var d, e, f;
            e = c._data(a);
            var g = c._data(b, e),
                h = e.events;
            if (h)
                for (d in delete g.handle, g.events = {}, h) {
                    e = 0;
                    for (f = h[d].length; e < f; e++) c.event.add(b, d, h[d][e])
                }
            g.data && (g.data = c.extend({}, g.data))
        }
    }

    function Da(a, b) {
        var d;
        if (1 === b.nodeType) {
            b.clearAttributes && b.clearAttributes();
            b.mergeAttributes && b.mergeAttributes(a);
            d = b.nodeName.toLowerCase();
            if ("object" === d) {
                if (b.parentNode &&
                    (b.outerHTML = a.outerHTML), c.support.html5Clone && a.innerHTML && !c.trim(b.innerHTML)) b.innerHTML = a.innerHTML
            } else "input" === d && Ea.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === d ? b.selected = a.defaultSelected : "input" === d || "textarea" === d ? b.defaultValue = a.defaultValue : "script" === d && b.text !== a.text && (b.text = a.text);
            b.removeAttribute(c.expando)
        }
    }

    function S(a) {
        return "undefined" !== typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" !== typeof a.querySelectorAll ?
            a.querySelectorAll("*") : []
    }

    function Fa(a) {
        Ea.test(a.type) && (a.defaultChecked = a.checked)
    }

    function Ga(a, b) {
        if (b in a) return b;
        for (var d = b.charAt(0).toUpperCase() + b.slice(1), c = b, f = Ha.length; f--;)
            if (b = Ha[f] + d, b in a) return b;
        return c
    }

    function Y(a, b) {
        a = b || a;
        return "none" === c.css(a, "display") || !c.contains(a.ownerDocument, a)
    }

    function Ia(a, b) {
        for (var d, e, f = [], g = 0, h = a.length; g < h; g++) d = a[g], d.style && (f[g] = c._data(d, "olddisplay"), b ? (!f[g] && "none" === d.style.display && (d.style.display = ""), "" === d.style.display &&
            Y(d) && (f[g] = c._data(d, "olddisplay", Ja(d.nodeName)))) : (e = r(d, "display"), !f[g] && "none" !== e && c._data(d, "olddisplay", e)));
        for (g = 0; g < h; g++)
            if (d = a[g], d.style && (!b || "none" === d.style.display || "" === d.style.display)) d.style.display = b ? f[g] || "" : "none";
        return a
    }

    function Ka(a, b, d) {
        return (a = Bb.exec(b)) ? Math.max(0, a[1] - (d || 0)) + (a[2] || "px") : b
    }

    function La(a, b, d, e) {
        for (var b = d === (e ? "border" : "content") ? 4 : "width" === b ? 1 : 0, f = 0; 4 > b; b += 2) "margin" === d && (f += c.css(a, d + M[b], !0)), e ? ("content" === d && (f -= parseFloat(r(a, "padding" +
            M[b])) || 0), "margin" !== d && (f -= parseFloat(r(a, "border" + M[b] + "Width")) || 0)) : (f += parseFloat(r(a, "padding" + M[b])) || 0, "padding" !== d && (f += parseFloat(r(a, "border" + M[b] + "Width")) || 0));
        return f
    }

    function Ma(a, b, d) {
        var e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = !0,
            g = c.support.boxSizing && "border-box" === c.css(a, "boxSizing");
        if (0 >= e) {
            e = r(a, b);
            if (0 > e || null == e) e = a.style[b];
            if (Z.test(e)) return e;
            f = g && (c.support.boxSizingReliable || e === a.style[b]);
            e = parseFloat(e) || 0
        }
        return e + La(a, b, d || (g ? "border" : "content"), f) + "px"
    }

    function Ja(a) {
        if (ka[a]) return ka[a];
        var b = c("<" + a + ">").appendTo(l.body),
            d = b.css("display");
        b.remove();
        if ("none" === d || "" === d) {
            N = l.body.appendChild(N || c.extend(l.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!X || !N.createElement) X = (N.contentWindow || N.contentDocument).document, X.write("<!doctype html><html><body>"), X.close();
            b = X.body.appendChild(X.createElement(a));
            d = r(b, "display");
            l.body.removeChild(N)
        }
        return ka[a] = d
    }

    function la(a, b, d, e) {
        var f;
        if (c.isArray(b)) c.each(b, function(b, c) {
            d ||
                Cb.test(a) ? e(a, c) : la(a + "[" + ("object" === typeof c ? b : "") + "]", c, d, e)
        });
        else if (!d && "object" === c.type(b))
            for (f in b) la(a + "[" + f + "]", b[f], d, e);
        else e(a, b)
    }

    function Na(a) {
        return function(b, d) {
            "string" !== typeof b && (d = b, b = "*");
            var e, f, g = b.toLowerCase().split(G),
                h = 0,
                i = g.length;
            if (c.isFunction(d))
                for (; h < i; h++) e = g[h], (f = /^\+/.test(e)) && (e = e.substr(1) || "*"), e = a[e] = a[e] || [], e[f ? "unshift" : "push"](d)
        }
    }

    function $(a, b, d, c, f, g) {
        f = f || b.dataTypes[0];
        g = g || {};
        g[f] = !0;
        for (var h, f = a[f], i = 0, j = f ? f.length : 0, k = a === ma; i < j && (k ||
                !h); i++) h = f[i](b, d, c), "string" === typeof h && (!k || g[h] ? h = o : (b.dataTypes.unshift(h), h = $(a, b, d, c, h, g)));
        if ((k || !h) && !g["*"]) h = $(a, b, d, c, "*", g);
        return h
    }

    function Oa(a, b) {
        var d, e, f = c.ajaxSettings.flatOptions || {};
        for (d in b) b[d] !== o && ((f[d] ? a : e || (e = {}))[d] = b[d]);
        e && c.extend(!0, a, e)
    }

    function Pa() {
        try {
            return new p.XMLHttpRequest
        } catch (a) {}
    }

    function Qa() {
        setTimeout(function() {
            aa = o
        }, 0);
        return aa = c.now()
    }

    function Db(a, b) {
        c.each(b, function(b, c) {
            for (var f = (O[b] || []).concat(O["*"]), g = 0, h = f.length; g < h && !f[g].call(a,
                    b, c); g++);
        })
    }

    function Ra(a, b, d) {
        var e = 0,
            f = ba.length,
            g = c.Deferred().always(function() {
                delete h.elem
            }),
            h = function() {
                for (var b = aa || Qa(), b = Math.max(0, i.startTime + i.duration - b), c = 1 - (b / i.duration || 0), d = 0, e = i.tweens.length; d < e; d++) i.tweens[d].run(c);
                g.notifyWith(a, [i, c, b]);
                if (1 > c && e) return b;
                g.resolveWith(a, [i]);
                return !1
            },
            i = g.promise({
                elem: a,
                props: c.extend({}, b),
                opts: c.extend(!0, {
                    specialEasing: {}
                }, d),
                originalProperties: b,
                originalOptions: d,
                startTime: aa || Qa(),
                duration: d.duration,
                tweens: [],
                createTween: function(b,
                    d) {
                    var e = c.Tween(a, i.opts, b, d, i.opts.specialEasing[b] || i.opts.easing);
                    i.tweens.push(e);
                    return e
                },
                stop: function(b) {
                    for (var c = 0, d = b ? i.tweens.length : 0; c < d; c++) i.tweens[c].run(1);
                    b ? g.resolveWith(a, [i, b]) : g.rejectWith(a, [i, b]);
                    return this
                }
            }),
            d = i.props;
        for (Eb(d, i.opts.specialEasing); e < f; e++)
            if (b = ba[e].call(i, a, d, i.opts)) return b;
        Db(i, d);
        c.isFunction(i.opts.start) && i.opts.start.call(a, i);
        c.fx.timer(c.extend(h, {
            anim: i,
            queue: i.opts.queue,
            elem: a
        }));
        return i.progress(i.opts.progress).done(i.opts.done, i.opts.complete).fail(i.opts.fail).always(i.opts.always)
    }

    function Eb(a, b) {
        var d, e, f, g, h;
        for (d in a)
            if (e = c.camelCase(d), f = b[e], g = a[d], c.isArray(g) && (f = g[1], g = a[d] = g[0]), d !== e && (a[e] = g, delete a[d]), (h = c.cssHooks[e]) && "expand" in h)
                for (d in g = h.expand(g), delete a[e], g) d in a || (a[d] = g[d], b[d] = f);
            else b[e] = f
    }

    function z(a, b, c, e, f) {
        return new z.prototype.init(a, b, c, e, f)
    }

    function ca(a, b) {
        for (var c, e = {
                height: a
            }, f = 0; 4 > f; f += 2 - b) c = M[f], e["margin" + c] = e["padding" + c] = a;
        b && (e.opacity = e.width = a);
        return e
    }

    function Sa(a) {
        return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView ||
            a.parentWindow : !1
    }
    var Ta, da, l = p.document,
        Fb = p.location,
        Gb = p.navigator,
        Hb = p.jQuery,
        Ib = p.$,
        Ua = Array.prototype.push,
        t = Array.prototype.slice,
        Va = Array.prototype.indexOf,
        Jb = Object.prototype.toString,
        na = Object.prototype.hasOwnProperty,
        Wa = String.prototype.trim,
        c = function(a, b) {
            return new c.fn.init(a, b, Ta)
        },
        ea = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        Xa = /\S/,
        G = /\s+/,
        Kb = Xa.test("\u00a0") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g,
        Lb = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        Ya = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Mb = /^[\],:{}\s]*$/,
        Nb = /(?:^|:|,)(?:\s*\[)+/g,
        Ob = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        Pb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        Qb = /^-ms-/,
        Rb = /-([\da-z])/gi,
        Sb = function(a, b) {
            return (b + "").toUpperCase()
        },
        fa = function() {
            l.addEventListener ? (l.removeEventListener("DOMContentLoaded", fa, !1), c.ready()) : "complete" === l.readyState && (l.detachEvent("onreadystatechange", fa), c.ready())
        },
        Za = {};
    c.fn = c.prototype = {
        constructor: c,
        init: function(a, b, d) {
            var e;
            if (!a) return this;
            if (a.nodeType) return this.context =
                this[0] = a, this.length = 1, this;
            if ("string" === typeof a) {
                if ((e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : Lb.exec(a)) && (e[1] || !b)) {
                    if (e[1]) return a = (b = b instanceof c ? b[0] : b) && b.nodeType ? b.ownerDocument || b : l, a = c.parseHTML(e[1], a, !0), Ya.test(e[1]) && c.isPlainObject(b) && this.attr.call(a, b, !0), c.merge(this, a);
                    if ((b = l.getElementById(e[2])) && b.parentNode) {
                        if (b.id !== e[2]) return d.find(a);
                        this.length = 1;
                        this[0] = b
                    }
                    this.context = l;
                    this.selector = a;
                    return this
                }
                return !b || b.jquery ? (b || d).find(a) :
                    this.constructor(b).find(a)
            }
            if (c.isFunction(a)) return d.ready(a);
            a.selector !== o && (this.selector = a.selector, this.context = a.context);
            return c.makeArray(a, this)
        },
        selector: "",
        jquery: "1.8.0",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return t.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a, b, d) {
            a = c.merge(this.constructor(), a);
            a.prevObject = this;
            a.context = this.context;
            "find" === b ? a.selector = this.selector + (this.selector ? " " :
                "") + d : b && (a.selector = this.selector + "." + b + "(" + d + ")");
            return a
        },
        each: function(a, b) {
            return c.each(this, a, b)
        },
        ready: function(a) {
            c.ready.promise().done(a);
            return this
        },
        eq: function(a) {
            a = +a;
            return -1 === a ? this.slice(a) : this.slice(a, a + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(t.apply(this, arguments), "slice", t.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(c.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        end: function() {
            return this.prevObject ||
                this.constructor(null)
        },
        push: Ua,
        sort: [].sort,
        splice: [].splice
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function() {
        var a, b, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        "boolean" === typeof g && (j = g, g = arguments[1] || {}, h = 2);
        "object" !== typeof g && !c.isFunction(g) && (g = {});
        i === h && (g = this, --h);
        for (; h < i; h++)
            if (null != (a = arguments[h]))
                for (b in a) d = g[b], e = a[b], g !== e && (j && e && (c.isPlainObject(e) || (f = c.isArray(e))) ? (f ? (f = !1, d = d && c.isArray(d) ? d : []) : d = d && c.isPlainObject(d) ? d : {}, g[b] = c.extend(j, d, e)) : e !==
                    o && (g[b] = e));
        return g
    };
    c.extend({
        noConflict: function(a) {
            p.$ === c && (p.$ = Ib);
            a && p.jQuery === c && (p.jQuery = Hb);
            return c
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? c.readyWait++ : c.ready(!0)
        },
        ready: function(a) {
            if (!(!0 === a ? --c.readyWait : c.isReady)) {
                if (!l.body) return setTimeout(c.ready, 1);
                c.isReady = !0;
                !0 !== a && 0 < --c.readyWait || (da.resolveWith(l, [c]), c.fn.trigger && c(l).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" === c.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" ===
                c.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? "" + a : Za[Jb.call(a)] || "object"
        },
        isPlainObject: function(a) {
            if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
            try {
                if (a.constructor && !na.call(a, "constructor") && !na.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (b) {
                return !1
            }
            for (var d in a);
            return d === o || na.call(a, d)
        },
        isEmptyObject: function(a) {
            for (var b in a) return !1;
            return !0
        },
        error: function(a) {
            throw Error(a);
        },
        parseHTML: function(a, b, d) {
            var e;
            if (!a || "string" !== typeof a) return null;
            "boolean" === typeof b && (d = b, b = 0);
            b = b || l;
            if (e = Ya.exec(a)) return [b.createElement(e[1])];
            e = c.buildFragment([a], b, d ? null : []);
            return c.merge([], (e.cacheable ? c.clone(e.fragment) : e.fragment).childNodes)
        },
        parseJSON: function(a) {
            if (!a || "string" !== typeof a) return null;
            a = c.trim(a);
            if (p.JSON && p.JSON.parse) return p.JSON.parse(a);
            if (Mb.test(a.replace(Ob, "@").replace(Pb, "]").replace(Nb, ""))) return (new Function("return " +
                a))();
            c.error("Invalid JSON: " + a)
        },
        parseXML: function(a) {
            var b, d;
            if (!a || "string" !== typeof a) return null;
            try {
                p.DOMParser ? (d = new DOMParser, b = d.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a))
            } catch (e) {
                b = o
            }(!b || !b.documentElement || b.getElementsByTagName("parsererror").length) && c.error("Invalid XML: " + a);
            return b
        },
        noop: function() {},
        globalEval: function(a) {
            a && Xa.test(a) && (p.execScript || function(a) {
                p.eval.call(p, a)
            })(a)
        },
        camelCase: function(a) {
            return a.replace(Qb,
                "ms-").replace(Rb, Sb)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        },
        each: function(a, b, d) {
            var e, f = 0,
                g = a.length,
                h = g === o || c.isFunction(a);
            if (d)
                if (h)
                    for (e in a) {
                        if (!1 === b.apply(a[e], d)) break
                    } else
                        for (; f < g && !1 !== b.apply(a[f++], d););
                else if (h)
                for (e in a) {
                    if (!1 === b.call(a[e], e, a[e])) break
                } else
                    for (; f < g && !1 !== b.call(a[f], f, a[f++]););
            return a
        },
        trim: Wa ? function(a) {
            return null == a ? "" : Wa.call(a)
        } : function(a) {
            return null == a ? "" : a.toString().replace(Kb, "")
        },
        makeArray: function(a,
            b) {
            var d, e = b || [];
            null != a && (d = c.type(a), null == a.length || "string" === d || "function" === d || "regexp" === d || c.isWindow(a) ? Ua.call(e, a) : c.merge(e, a));
            return e
        },
        inArray: function(a, b, c) {
            var e;
            if (b) {
                if (Va) return Va.call(b, a, c);
                e = b.length;
                for (c = c ? 0 > c ? Math.max(0, e + c) : c : 0; c < e; c++)
                    if (c in b && b[c] === a) return c
            }
            return -1
        },
        merge: function(a, b) {
            var c = b.length,
                e = a.length,
                f = 0;
            if ("number" === typeof c)
                for (; f < c; f++) a[e++] = b[f];
            else
                for (; b[f] !== o;) a[e++] = b[f++];
            a.length = e;
            return a
        },
        grep: function(a, b, c) {
            for (var e, f = [], g = 0, h = a.length,
                    c = !!c; g < h; g++) e = !!b(a[g], g), c !== e && f.push(a[g]);
            return f
        },
        map: function(a, b, d) {
            var e, f, g = [],
                h = 0,
                i = a.length;
            if (a instanceof c || i !== o && "number" === typeof i && (0 < i && a[0] && a[i - 1] || 0 === i || c.isArray(a)))
                for (; h < i; h++) e = b(a[h], h, d), null != e && (g[g.length] = e);
            else
                for (f in a) e = b(a[f], f, d), null != e && (g[g.length] = e);
            return g.concat.apply([], g)
        },
        guid: 1,
        proxy: function(a, b) {
            var d, e;
            "string" === typeof b && (d = a[b], b = a, a = d);
            if (!c.isFunction(a)) return o;
            e = t.call(arguments, 2);
            d = function() {
                return a.apply(b, e.concat(t.call(arguments)))
            };
            d.guid = a.guid = a.guid || d.guid || c.guid++;
            return d
        },
        access: function(a, b, d, e, f, g, h) {
            var i, j = null == d,
                k = 0,
                n = a.length;
            if (d && "object" === typeof d) {
                for (k in d) c.access(a, b, k, d[k], 1, g, e);
                f = 1
            } else if (e !== o) {
                i = h === o && c.isFunction(e);
                j && (i ? (i = b, b = function(a, b, d) {
                    return i.call(c(a), d)
                }) : (b.call(a, e), b = null));
                if (b)
                    for (; k < n; k++) b(a[k], d, i ? e.call(a[k], k, b(a[k], d)) : e, h);
                f = 1
            }
            return f ? a : j ? b.call(a) : n ? b(a[0], d) : g
        },
        now: function() {
            return (new Date).getTime()
        }
    });
    c.ready.promise = function(a) {
        if (!da)
            if (da = c.Deferred(), "complete" ===
                l.readyState || "loading" !== l.readyState && l.addEventListener) setTimeout(c.ready, 1);
            else if (l.addEventListener) l.addEventListener("DOMContentLoaded", fa, !1), p.addEventListener("load", c.ready, !1);
        else {
            l.attachEvent("onreadystatechange", fa);
            p.attachEvent("onload", c.ready);
            var b = !1;
            try {
                b = null == p.frameElement && l.documentElement
            } catch (d) {}
            b && b.doScroll && function f() {
                if (!c.isReady) {
                    try {
                        b.doScroll("left")
                    } catch (a) {
                        return setTimeout(f, 50)
                    }
                    c.ready()
                }
            }()
        }
        return da.promise(a)
    };
    c.each("Boolean Number String Function Array Date RegExp Object".split(" "),
        function(a, b) {
            Za["[object " + b + "]"] = b.toLowerCase()
        });
    Ta = c(l);
    var wa = {};
    c.Callbacks = function(a) {
        var a = "string" === typeof a ? wa[a] || xb(a) : c.extend({}, a),
            b, d, e, f, g, h, i = [],
            j = !a.once && [],
            k = function(c) {
                b = a.memory && c;
                d = !0;
                h = f || 0;
                f = 0;
                g = i.length;
                for (e = !0; i && h < g; h++)
                    if (!1 === i[h].apply(c[0], c[1]) && a.stopOnFalse) {
                        b = !1;
                        break
                    }
                e = !1;
                i && (j ? j.length && k(j.shift()) : b ? i = [] : n.disable())
            },
            n = {
                add: function() {
                    if (i) {
                        var d = i.length;
                        (function A(b) {
                            c.each(b, function(b, d) {
                                c.isFunction(d) && (!a.unique || !n.has(d)) ? i.push(d) : d && d.length &&
                                    A(d)
                            })
                        })(arguments);
                        e ? g = i.length : b && (f = d, k(b))
                    }
                    return this
                },
                remove: function() {
                    i && c.each(arguments, function(a, b) {
                        for (var d; - 1 < (d = c.inArray(b, i, d));) i.splice(d, 1), e && (d <= g && g--, d <= h && h--)
                    });
                    return this
                },
                has: function(a) {
                    return -1 < c.inArray(a, i)
                },
                empty: function() {
                    i = [];
                    return this
                },
                disable: function() {
                    i = j = b = o;
                    return this
                },
                disabled: function() {
                    return !i
                },
                lock: function() {
                    j = o;
                    b || n.disable();
                    return this
                },
                locked: function() {
                    return !j
                },
                fireWith: function(a, b) {
                    b = b || [];
                    b = [a, b.slice ? b.slice() : b];
                    if (i && (!d || j)) e ? j.push(b) :
                        k(b);
                    return this
                },
                fire: function() {
                    n.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!d
                }
            };
        return n
    };
    c.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", c.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", c.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", c.Callbacks("memory")]
                ],
                d = "pending",
                e = {
                    state: function() {
                        return d
                    },
                    always: function() {
                        f.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var a = arguments;
                        return c.Deferred(function(d) {
                            c.each(b, function(b, e) {
                                var k =
                                    e[0],
                                    n = a[b];
                                f[e[1]](c.isFunction(n) ? function() {
                                    var a = n.apply(this, arguments);
                                    if (a && c.isFunction(a.promise)) a.promise().done(d.resolve).fail(d.reject).progress(d.notify);
                                    else d[k + "With"](this === f ? d : this, [a])
                                } : d[k])
                            });
                            a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return "object" === typeof a ? c.extend(a, e) : e
                    }
                },
                f = {};
            e.pipe = e.then;
            c.each(b, function(a, c) {
                var i = c[2],
                    j = c[3];
                e[c[1]] = i.add;
                j && i.add(function() {
                    d = j
                }, b[a ^ 1][2].disable, b[2][2].lock);
                f[c[0]] = i.fire;
                f[c[0] + "With"] = i.fireWith
            });
            e.promise(f);
            a && a.call(f, f);
            return f
        },
        when: function(a) {
            var b = 0,
                d = t.call(arguments),
                e = d.length,
                f = 1 !== e || a && c.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : c.Deferred(),
                h = function(a, b, c) {
                    return function(d) {
                        b[a] = this;
                        c[a] = 1 < arguments.length ? t.call(arguments) : d;
                        c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                },
                i, j, k;
            if (1 < e) {
                i = Array(e);
                j = Array(e);
                for (k = Array(e); b < e; b++) d[b] && c.isFunction(d[b].promise) ? d[b].promise().done(h(b, k, d)).fail(g.reject).progress(h(b, j, i)) : --f
            }
            f || g.resolveWith(k, d);
            return g.promise()
        }
    });
    c.support = function() {
        var a,
            b, d, e, f, g, h, i = l.createElement("div");
        i.setAttribute("className", "t");
        i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        b = i.getElementsByTagName("*");
        d = i.getElementsByTagName("a")[0];
        d.style.cssText = "top:1px;float:left;opacity:.5";
        if (!b || !b.length || !d) return {};
        e = l.createElement("select");
        f = e.appendChild(l.createElement("option"));
        b = i.getElementsByTagName("input")[0];
        a = {
            leadingWhitespace: 3 === i.firstChild.nodeType,
            tbody: !i.getElementsByTagName("tbody").length,
            htmlSerialize: !!i.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: "/a" === d.getAttribute("href"),
            opacity: /^0.5/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: "on" === b.value,
            optSelected: f.selected,
            getSetAttribute: "t" !== i.className,
            enctype: !!l.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== l.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === l.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        };
        b.checked = !0;
        a.noCloneChecked = b.cloneNode(!0).checked;
        e.disabled = !0;
        a.optDisabled = !f.disabled;
        try {
            delete i.test
        } catch (j) {
            a.deleteExpando = !1
        }!i.addEventListener && (i.attachEvent && i.fireEvent) && (i.attachEvent("onclick", d = function() {
            a.noCloneEvent = !1
        }), i.cloneNode(!0).fireEvent("onclick"), i.detachEvent("onclick", d));
        b = l.createElement("input");
        b.value = "t";
        b.setAttribute("type", "radio");
        a.radioValue = "t" === b.value;
        b.setAttribute("checked", "checked");
        b.setAttribute("name", "t");
        i.appendChild(b);
        d = l.createDocumentFragment();
        d.appendChild(i.lastChild);
        a.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked;
        a.appendChecked = b.checked;
        d.removeChild(b);
        d.appendChild(i);
        if (i.attachEvent)
            for (g in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) b = "on" + g, h = b in i, h || (i.setAttribute(b, "return;"), h = "function" === typeof i[b]), a[g + "Bubbles"] = h;
        c(function() {
            var b, c, d, e = l.getElementsByTagName("body")[0];
            if (e) {
                b = l.createElement("div");
                b.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
                e.insertBefore(b, e.firstChild);
                c = l.createElement("div");
                b.appendChild(c);
                c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                d = c.getElementsByTagName("td");
                d[0].style.cssText = "padding:0;margin:0;border:0;display:none";
                h = d[0].offsetHeight === 0;
                d[0].style.display = "";
                d[1].style.display = "none";
                a.reliableHiddenOffsets = h && d[0].offsetHeight === 0;
                c.innerHTML = "";
                c.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
                a.boxSizing = c.offsetWidth === 4;
                a.doesNotIncludeMarginInBodyOffset = e.offsetTop !== 1;
                if (p.getComputedStyle) {
                    a.pixelPosition = (p.getComputedStyle(c, null) || {}).top !== "1%";
                    a.boxSizingReliable = (p.getComputedStyle(c, null) || {
                        width: "4px"
                    }).width === "4px";
                    d = l.createElement("div");
                    d.style.cssText = c.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;";
                    d.style.marginRight = d.style.width = "0";
                    c.style.width = "1px";
                    c.appendChild(d);
                    a.reliableMarginRight = !parseFloat((p.getComputedStyle(d, null) || {}).marginRight)
                }
                if (typeof c.style.zoom !==
                    "undefined") {
                    c.innerHTML = "";
                    c.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1";
                    a.inlineBlockNeedsLayout = c.offsetWidth === 3;
                    c.style.display = "block";
                    c.style.overflow = "visible";
                    c.innerHTML = "<div></div>";
                    c.firstChild.style.width = "5px";
                    a.shrinkWrapBlocks = c.offsetWidth !== 3;
                    b.style.zoom = 1
                }
                e.removeChild(b)
            }
        });
        d.removeChild(i);
        b = d = e = f = b = d = i = null;
        return a
    }();
    var zb = /^(?:\{.*\}|\[.*\])$/,
        yb = /([A-Z])/g;
    c.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (c.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando];
            return !!a && !ja(a)
        },
        data: function(a, b, d, e) {
            if (c.acceptData(a)) {
                var f = c.expando,
                    g = "string" === typeof b,
                    h = a.nodeType,
                    i = h ? c.cache : a,
                    j = h ? a[f] : a[f] && f;
                if (j && i[j] && (e || i[j].data) || !(g && d === o)) {
                    j || (h ? a[f] = j = c.deletedIds.pop() || ++c.uuid : j = f);
                    i[j] || (i[j] = {}, h || (i[j].toJSON = c.noop));
                    if ("object" === typeof b ||
                        "function" === typeof b) e ? i[j] = c.extend(i[j], b) : i[j].data = c.extend(i[j].data, b);
                    a = i[j];
                    e || (a.data || (a.data = {}), a = a.data);
                    d !== o && (a[c.camelCase(b)] = d);
                    g ? (d = a[b], null == d && (d = a[c.camelCase(b)])) : d = a;
                    return d
                }
            }
        },
        removeData: function(a, b, d) {
            if (c.acceptData(a)) {
                var e, f, g, h = a.nodeType,
                    i = h ? c.cache : a,
                    j = h ? a[c.expando] : c.expando;
                if (i[j]) {
                    if (b && (e = d ? i[j] : i[j].data)) {
                        c.isArray(b) || (b in e ? b = [b] : (b = c.camelCase(b), b = b in e ? [b] : b.split(" ")));
                        f = 0;
                        for (g = b.length; f < g; f++) delete e[b[f]];
                        if (!(d ? ja : c.isEmptyObject)(e)) return
                    }
                    if (!d &&
                        (delete i[j].data, !ja(i[j]))) return;
                    h ? c.cleanData([a], !0) : c.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null
                }
            }
        },
        _data: function(a, b, d) {
            return c.data(a, b, d, !0)
        },
        acceptData: function(a) {
            var b = a.nodeName && c.noData[a.nodeName.toLowerCase()];
            return !b || !0 !== b && a.getAttribute("classid") === b
        }
    });
    c.fn.extend({
        data: function(a, b) {
            var d, e, f, g, h, i = this[0],
                j = 0,
                k = null;
            if (a === o) {
                if (this.length && (k = c.data(i), 1 === i.nodeType && !c._data(i, "parsedAttrs"))) {
                    f = i.attributes;
                    for (h = f.length; j < h; j++) g = f[j].name, 0 === g.indexOf("data-") &&
                        (g = c.camelCase(g.substring(5)), xa(i, g, k[g]));
                    c._data(i, "parsedAttrs", !0)
                }
                return k
            }
            if ("object" === typeof a) return this.each(function() {
                c.data(this, a)
            });
            d = a.split(".", 2);
            d[1] = d[1] ? "." + d[1] : "";
            e = d[1] + "!";
            return c.access(this, function(b) {
                    if (b === o) return k = this.triggerHandler("getData" + e, [d[0]]), k === o && i && (k = c.data(i, a), k = xa(i, a, k)), k === o && d[1] ? this.data(d[0]) : k;
                    d[1] = b;
                    this.each(function() {
                        var f = c(this);
                        f.triggerHandler("setData" + e, d);
                        c.data(this, a, b);
                        f.triggerHandler("changeData" + e, d)
                    })
                }, null, b, 1 < arguments.length,
                null, !1)
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function(a, b, d) {
            var e;
            if (a) return b = (b || "fx") + "queue", e = c._data(a, b), d && (!e || c.isArray(d) ? e = c._data(a, b, c.makeArray(d)) : e.push(d)), e || []
        },
        dequeue: function(a, b) {
            var b = b || "fx",
                d = c.queue(a, b),
                e = d.shift(),
                f = c._queueHooks(a, b),
                g = function() {
                    c.dequeue(a, b)
                };
            "inprogress" === e && (e = d.shift());
            e && ("fx" === b && d.unshift("inprogress"), delete f.stop, e.call(a, g, f));
            !d.length && f && f.empty.fire()
        },
        _queueHooks: function(a,
            b) {
            var d = b + "queueHooks";
            return c._data(a, d) || c._data(a, d, {
                empty: c.Callbacks("once memory").add(function() {
                    c.removeData(a, b + "queue", !0);
                    c.removeData(a, d, !0)
                })
            })
        }
    });
    c.fn.extend({
        queue: function(a, b) {
            var d = 2;
            "string" !== typeof a && (b = a, a = "fx", d--);
            return arguments.length < d ? c.queue(this[0], a) : b === o ? this : this.each(function() {
                var d = c.queue(this, a, b);
                c._queueHooks(this, a);
                a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this, a)
            })
        },
        delay: function(a,
            b) {
            a = c.fx ? c.fx.speeds[a] || a : a;
            return this.queue(b || "fx", function(b, c) {
                var f = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(f)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var d, e = 1,
                f = c.Deferred(),
                g = this,
                h = this.length,
                i = function() {
                    --e || f.resolveWith(g, [g])
                };
            "string" !== typeof a && (b = a, a = o);
            for (a = a || "fx"; h--;)
                if ((d = c._data(g[h], a + "queueHooks")) && d.empty) e++, d.empty.add(i);
            i();
            return f.promise(b)
        }
    });
    var v, $a, ab, bb = /[\t\r\n]/g,
        Tb = /\r/g,
        Ub = /^(?:button|input)$/i,
        Vb = /^(?:button|input|object|select|textarea)$/i,
        Wb = /^a(?:rea|)$/i,
        cb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        db = c.support.getSetAttribute;
    c.fn.extend({
        attr: function(a, b) {
            return c.access(this, c.attr, a, b, 1 < arguments.length)
        },
        removeAttr: function(a) {
            return this.each(function() {
                c.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return c.access(this, c.prop, a, b, 1 < arguments.length)
        },
        removeProp: function(a) {
            a = c.propFix[a] || a;
            return this.each(function() {
                try {
                    this[a] = o, delete this[a]
                } catch (b) {}
            })
        },
        addClass: function(a) {
            var b, d, e, f, g, h, i;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).addClass(a.call(this, b, this.className))
            });
            if (a && "string" === typeof a) {
                b = a.split(G);
                d = 0;
                for (e = this.length; d < e; d++)
                    if (f = this[d], 1 === f.nodeType)
                        if (!f.className && 1 === b.length) f.className = a;
                        else {
                            g = " " + f.className + " ";
                            h = 0;
                            for (i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            f.className = c.trim(g)
                        }
            }
            return this
        },
        removeClass: function(a) {
            var b, d, e, f, g, h, i;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).removeClass(a.call(this,
                    b, this.className))
            });
            if (a && "string" === typeof a || a === o) {
                b = (a || "").split(G);
                h = 0;
                for (i = this.length; h < i; h++)
                    if (e = this[h], 1 === e.nodeType && e.className) {
                        d = (" " + e.className + " ").replace(bb, " ");
                        f = 0;
                        for (g = b.length; f < g; f++)
                            for (; - 1 < d.indexOf(" " + b[f] + " ");) d = d.replace(" " + b[f] + " ", " ");
                        e.className = a ? c.trim(d) : ""
                    }
            }
            return this
        },
        toggleClass: function(a, b) {
            var d = typeof a,
                e = "boolean" === typeof b;
            return c.isFunction(a) ? this.each(function(d) {
                c(this).toggleClass(a.call(this, d, this.className, b), b)
            }) : this.each(function() {
                if ("string" ===
                    d)
                    for (var f, g = 0, h = c(this), i = b, j = a.split(G); f = j[g++];) i = e ? i : !h.hasClass(f), h[i ? "addClass" : "removeClass"](f);
                else if ("undefined" === d || "boolean" === d) this.className && c._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : c._data(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            for (var a = " " + a + " ", b = 0, c = this.length; b < c; b++)
                if (1 === this[b].nodeType && -1 < (" " + this[b].className + " ").replace(bb, " ").indexOf(a)) return !0;
            return !1
        },
        val: function(a) {
            var b, d, e, f = this[0];
            if (arguments.length) return e =
                c.isFunction(a), this.each(function(d) {
                    var f = c(this);
                    if (1 === this.nodeType && (d = e ? a.call(this, d, f.val()) : a, null == d ? d = "" : "number" === typeof d ? d += "" : c.isArray(d) && (d = c.map(d, function(a) {
                            return a == null ? "" : a + ""
                        })), b = c.valHooks[this.type] || c.valHooks[this.nodeName.toLowerCase()], !b || !("set" in b) || b.set(this, d, "value") === o)) this.value = d
                });
            if (f) {
                if ((b = c.valHooks[f.type] || c.valHooks[f.nodeName.toLowerCase()]) && "get" in b && (d = b.get(f, "value")) !== o) return d;
                d = f.value;
                return "string" === typeof d ? d.replace(Tb, "") : null ==
                    d ? "" : d
            }
        }
    });
    c.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    var b, d, e = a.selectedIndex,
                        f = [],
                        g = a.options,
                        h = "select-one" === a.type;
                    if (0 > e) return null;
                    a = h ? e : 0;
                    for (d = h ? e + 1 : g.length; a < d; a++)
                        if (b = g[a], b.selected && (c.support.optDisabled ? !b.disabled : null === b.getAttribute("disabled")) && (!b.parentNode.disabled || !c.nodeName(b.parentNode, "optgroup"))) {
                            b = c(b).val();
                            if (h) return b;
                            f.push(b)
                        }
                    return h && !f.length && g.length ? c(g[e]).val() :
                        f
                },
                set: function(a, b) {
                    var d = c.makeArray(b);
                    c(a).find("option").each(function() {
                        this.selected = 0 <= c.inArray(c(this).val(), d)
                    });
                    d.length || (a.selectedIndex = -1);
                    return d
                }
            }
        },
        attrFn: {},
        attr: function(a, b, d, e) {
            var f, g, h = a.nodeType;
            if (a && !(3 === h || 8 === h || 2 === h)) {
                if (e && c.isFunction(c.fn[b])) return c(a)[b](d);
                if ("undefined" === typeof a.getAttribute) return c.prop(a, b, d);
                if (e = 1 !== h || !c.isXMLDoc(a)) b = b.toLowerCase(), g = c.attrHooks[b] || (cb.test(b) ? $a : v);
                if (d !== o)
                    if (null === d) c.removeAttr(a, b);
                    else {
                        if (g && "set" in g && e &&
                            (f = g.set(a, d, b)) !== o) return f;
                        a.setAttribute(b, "" + d);
                        return d
                    }
                else {
                    if (g && "get" in g && e && null !== (f = g.get(a, b))) return f;
                    f = a.getAttribute(b);
                    return null === f ? o : f
                }
            }
        },
        removeAttr: function(a, b) {
            var d, e, f, g, h = 0;
            if (b && 1 === a.nodeType)
                for (e = b.split(G); h < e.length; h++)
                    if (f = e[h]) d = c.propFix[f] || f, (g = cb.test(f)) || c.attr(a, f, ""), a.removeAttribute(db ? f : d), g && d in a && (a[d] = !1)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (Ub.test(a.nodeName) && a.parentNode) c.error("type property can't be changed");
                    else if (!c.support.radioValue &&
                        "radio" === b && c.nodeName(a, "input")) {
                        var d = a.value;
                        a.setAttribute("type", b);
                        d && (a.value = d);
                        return b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return v && c.nodeName(a, "button") ? v.get(a, b) : b in a ? a.value : null
                },
                set: function(a, b, d) {
                    if (v && c.nodeName(a, "button")) return v.set(a, b, d);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, b, d) {
            var e, f, g;
            g = a.nodeType;
            if (a && !(3 === g || 8 === g || 2 === g)) {
                if (g = 1 !== g || !c.isXMLDoc(a)) b = c.propFix[b] || b, f = c.propHooks[b];
                return d !== o ? f && "set" in f && (e = f.set(a, d, b)) !== o ? e : a[b] = d : f && "get" in f && null !== (e = f.get(a, b)) ? e : a[b]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = a.getAttributeNode("tabindex");
                    return b && b.specified ? parseInt(b.value, 10) : Vb.test(a.nodeName) || Wb.test(a.nodeName) && a.href ? 0 : o
                }
            }
        }
    });
    $a = {
        get: function(a, b) {
            var d, e = c.prop(a, b);
            return !0 ===
                e || "boolean" !== typeof e && (d = a.getAttributeNode(b)) && !1 !== d.nodeValue ? b.toLowerCase() : o
        },
        set: function(a, b, d) {
            !1 === b ? c.removeAttr(a, d) : (b = c.propFix[d] || d, b in a && (a[b] = !0), a.setAttribute(d, d.toLowerCase()));
            return d
        }
    };
    db || (ab = {
        name: !0,
        id: !0,
        coords: !0
    }, v = c.valHooks.button = {
        get: function(a, b) {
            var c;
            return (c = a.getAttributeNode(b)) && (ab[b] ? "" !== c.value : c.specified) ? c.value : o
        },
        set: function(a, b, c) {
            var e = a.getAttributeNode(c);
            e || (e = l.createAttribute(c), a.setAttributeNode(e));
            return e.value = b + ""
        }
    }, c.each(["width",
        "height"
    ], function(a, b) {
        c.attrHooks[b] = c.extend(c.attrHooks[b], {
            set: function(a, c) {
                if ("" === c) return a.setAttribute(b, "auto"), c
            }
        })
    }), c.attrHooks.contenteditable = {
        get: v.get,
        set: function(a, b, c) {
            "" === b && (b = "false");
            v.set(a, b, c)
        }
    });
    c.support.hrefNormalized || c.each(["href", "src", "width", "height"], function(a, b) {
        c.attrHooks[b] = c.extend(c.attrHooks[b], {
            get: function(a) {
                a = a.getAttribute(b, 2);
                return a === null ? o : a
            }
        })
    });
    c.support.style || (c.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || o
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    });
    c.support.optSelected || (c.propHooks.selected = c.extend(c.propHooks.selected, {
        get: function(a) {
            if (a = a.parentNode) {
                a.selectedIndex;
                a.parentNode && a.parentNode.selectedIndex
            }
            return null
        }
    }));
    c.support.enctype || (c.propFix.enctype = "encoding");
    c.support.checkOn || c.each(["radio", "checkbox"], function() {
        c.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    });
    c.each(["radio", "checkbox"], function() {
        c.valHooks[this] = c.extend(c.valHooks[this], {
            set: function(a, b) {
                if (c.isArray(b)) return a.checked = c.inArray(c(a).val(), b) >= 0
            }
        })
    });
    var oa = /^(?:textarea|input|select)$/i,
        eb = /^([^\.]*|)(?:\.(.+)|)$/,
        Xb = /(?:^|\s)hover(\.\S+|)\b/,
        Yb = /^key/,
        Zb = /^(?:mouse|contextmenu)|click/,
        fb = /^(?:focusinfocus|focusoutblur)$/,
        gb = function(a) {
            return c.event.special.hover ? a : a.replace(Xb, "mouseenter$1 mouseleave$1")
        };
    c.event = {
        add: function(a, b, d, e, f) {
            var g, h, i, j, k, n, m, l, A;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !b || !d || !(g = c._data(a)))) {
                if (d.handler) {
                    m = d;
                    d = m.handler;
                    f = m.selector
                }
                if (!d.guid) d.guid =
                    c.guid++;
                i = g.events;
                if (!i) g.events = i = {};
                h = g.handle;
                if (!h) {
                    g.handle = h = function(a) {
                        return typeof c !== "undefined" && (!a || c.event.triggered !== a.type) ? c.event.dispatch.apply(h.elem, arguments) : o
                    };
                    h.elem = a
                }
                b = c.trim(gb(b)).split(" ");
                for (g = 0; g < b.length; g++) {
                    j = eb.exec(b[g]) || [];
                    k = j[1];
                    n = (j[2] || "").split(".").sort();
                    A = c.event.special[k] || {};
                    k = (f ? A.delegateType : A.bindType) || k;
                    A = c.event.special[k] || {};
                    j = c.extend({
                        type: k,
                        origType: j[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: f,
                        namespace: n.join(".")
                    }, m);
                    l = i[k];
                    if (!l) {
                        l =
                            i[k] = [];
                        l.delegateCount = 0;
                        if (!A.setup || A.setup.call(a, e, n, h) === false) a.addEventListener ? a.addEventListener(k, h, false) : a.attachEvent && a.attachEvent("on" + k, h)
                    }
                    if (A.add) {
                        A.add.call(a, j);
                        if (!j.handler.guid) j.handler.guid = d.guid
                    }
                    f ? l.splice(l.delegateCount++, 0, j) : l.push(j);
                    c.event.global[k] = true
                }
                a = null
            }
        },
        global: {},
        remove: function(a, b, d, e, f) {
            var g, h, i, j, k, n, m, o, l, p, r = c.hasData(a) && c._data(a);
            if (r && (m = r.events)) {
                b = c.trim(gb(b || "")).split(" ");
                for (g = 0; g < b.length; g++) {
                    h = eb.exec(b[g]) || [];
                    i = j = h[1];
                    h = h[2];
                    if (i) {
                        o =
                            c.event.special[i] || {};
                        i = (e ? o.delegateType : o.bindType) || i;
                        l = m[i] || [];
                        k = l.length;
                        h = h ? RegExp("(^|\\.)" + h.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        for (n = 0; n < l.length; n++) {
                            p = l[n];
                            if ((f || j === p.origType) && (!d || d.guid === p.guid) && (!h || h.test(p.namespace)) && (!e || e === p.selector || e === "**" && p.selector)) {
                                l.splice(n--, 1);
                                p.selector && l.delegateCount--;
                                o.remove && o.remove.call(a, p)
                            }
                        }
                        if (l.length === 0 && k !== l.length) {
                            (!o.teardown || o.teardown.call(a, h, r.handle) === false) && c.removeEvent(a, i, r.handle);
                            delete m[i]
                        }
                    } else
                        for (i in m) c.event.remove(a,
                            i + b[g], d, e, true)
                }
                if (c.isEmptyObject(m)) {
                    delete r.handle;
                    c.removeData(a, "events", true)
                }
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(a, b, d, e) {
            if (!d || !(d.nodeType === 3 || d.nodeType === 8)) {
                var f, g, h, i, j, k, n = a.type || a;
                h = [];
                if (!fb.test(n + c.event.triggered)) {
                    if (n.indexOf("!") >= 0) {
                        n = n.slice(0, -1);
                        f = true
                    }
                    if (n.indexOf(".") >= 0) {
                        h = n.split(".");
                        n = h.shift();
                        h.sort()
                    }
                    if (d && !c.event.customEvent[n] || c.event.global[n]) {
                        a = typeof a === "object" ? a[c.expando] ? a : new c.Event(n, a) : new c.Event(n);
                        a.type =
                            n;
                        a.isTrigger = true;
                        a.exclusive = f;
                        a.namespace = h.join(".");
                        a.namespace_re = a.namespace ? RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        h = n.indexOf(":") < 0 ? "on" + n : "";
                        if (d) {
                            a.result = o;
                            if (!a.target) a.target = d;
                            b = b != null ? c.makeArray(b) : [];
                            b.unshift(a);
                            i = c.event.special[n] || {};
                            if (!(i.trigger && i.trigger.apply(d, b) === false)) {
                                k = [
                                    [d, i.bindType || n]
                                ];
                                if (!e && !i.noBubble && !c.isWindow(d)) {
                                    j = i.delegateType || n;
                                    f = fb.test(j + n) ? d : d.parentNode;
                                    for (g = d; f; f = f.parentNode) {
                                        k.push([f, j]);
                                        g = f
                                    }
                                    if (g === (d.ownerDocument ||
                                            l)) k.push([g.defaultView || g.parentWindow || p, j])
                                }
                                for (g = 0; g < k.length && !a.isPropagationStopped(); g++) {
                                    f = k[g][0];
                                    a.type = k[g][1];
                                    (j = (c._data(f, "events") || {})[a.type] && c._data(f, "handle")) && j.apply(f, b);
                                    (j = h && f[h]) && (c.acceptData(f) && j.apply(f, b) === false) && a.preventDefault()
                                }
                                a.type = n;
                                if (!e && !a.isDefaultPrevented() && (!i._default || i._default.apply(d.ownerDocument, b) === false) && !(n === "click" && c.nodeName(d, "a")) && c.acceptData(d))
                                    if (h && d[n] && (n !== "focus" && n !== "blur" || a.target.offsetWidth !== 0) && !c.isWindow(d)) {
                                        (g =
                                            d[h]) && (d[h] = null);
                                        c.event.triggered = n;
                                        d[n]();
                                        c.event.triggered = o;
                                        g && (d[h] = g)
                                    }
                                return a.result
                            }
                        } else {
                            d = c.cache;
                            for (g in d) d[g].events && d[g].events[n] && c.event.trigger(a, b, d[g].handle.elem, true)
                        }
                    }
                }
            }
        },
        dispatch: function(a) {
            var a = c.event.fix(a || p.event),
                b, d, e, f, g, h, i, j = (c._data(this, "events") || {})[a.type] || [],
                k = j.delegateCount,
                n = [].slice.call(arguments),
                m = !a.exclusive && !a.namespace,
                l = c.event.special[a.type] || {},
                A = [];
            n[0] = a;
            a.delegateTarget = this;
            if (!(l.preDispatch && l.preDispatch.call(this, a) === false)) {
                if (k &&
                    !(a.button && a.type === "click")) {
                    e = c(this);
                    e.context = this;
                    for (d = a.target; d != this; d = d.parentNode || this)
                        if (d.disabled !== true || a.type !== "click") {
                            g = {};
                            h = [];
                            e[0] = d;
                            for (b = 0; b < k; b++) {
                                f = j[b];
                                i = f.selector;
                                g[i] === o && (g[i] = e.is(i));
                                g[i] && h.push(f)
                            }
                            h.length && A.push({
                                elem: d,
                                matches: h
                            })
                        }
                }
                j.length > k && A.push({
                    elem: this,
                    matches: j.slice(k)
                });
                for (b = 0; b < A.length && !a.isPropagationStopped(); b++) {
                    e = A[b];
                    a.currentTarget = e.elem;
                    for (d = 0; d < e.matches.length && !a.isImmediatePropagationStopped(); d++) {
                        f = e.matches[d];
                        if (m || !a.namespace &&
                            !f.namespace || a.namespace_re && a.namespace_re.test(f.namespace)) {
                            a.data = f.data;
                            a.handleObj = f;
                            f = ((c.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, n);
                            if (f !== o) {
                                a.result = f;
                                if (f === false) {
                                    a.preventDefault();
                                    a.stopPropagation()
                                }
                            }
                        }
                    }
                }
                l.postDispatch && l.postDispatch.call(this, a);
                return a.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char",
                "charCode", "key", "keyCode"
            ],
            filter: function(a, b) {
                if (a.which == null) a.which = b.charCode != null ? b.charCode : b.keyCode;
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, e, f = b.button,
                    g = b.fromElement;
                if (a.pageX == null && b.clientX != null) {
                    c = a.target.ownerDocument || l;
                    e = c.documentElement;
                    c = c.body;
                    a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0);
                    a.pageY =
                        b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)
                }
                if (!a.relatedTarget && g) a.relatedTarget = g === a.target ? b.toElement : g;
                if (!a.which && f !== o) a.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0;
                return a
            }
        },
        fix: function(a) {
            if (a[c.expando]) return a;
            var b, d, e = a,
                f = c.event.fixHooks[a.type] || {},
                g = f.props ? this.props.concat(f.props) : this.props,
                a = c.Event(e);
            for (b = g.length; b;) {
                d = g[--b];
                a[d] = e[d]
            }
            if (!a.target) a.target = e.srcElement || l;
            if (a.target.nodeType === 3) a.target = a.target.parentNode;
            a.metaKey = !!a.metaKey;
            return f.filter ? f.filter(a, e) : a
        },
        special: {
            ready: {
                setup: c.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, d) {
                    if (c.isWindow(this)) this.onbeforeunload = d
                },
                teardown: function(a, b) {
                    if (this.onbeforeunload === b) this.onbeforeunload = null
                }
            }
        },
        simulate: function(a, b, d, e) {
            a = c.extend(new c.Event, d, {
                type: a,
                isSimulated: true,
                originalEvent: {}
            });
            e ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
            a.isDefaultPrevented() && d.preventDefault()
        }
    };
    c.event.handle = c.event.dispatch;
    c.removeEvent = l.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, false)
    } : function(a, b, c) {
        b = "on" + b;
        if (a.detachEvent) {
            typeof a[b] === "undefined" && (a[b] = null);
            a.detachEvent(b, c)
        }
    };
    c.Event = function(a, b) {
        if (!(this instanceof c.Event)) return new c.Event(a, b);
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type;
            this.isDefaultPrevented = a.defaultPrevented || a.returnValue === false || a.getPreventDefault && a.getPreventDefault() ? V : R
        } else this.type =
            a;
        b && c.extend(this, b);
        this.timeStamp = a && a.timeStamp || c.now();
        this[c.expando] = true
    };
    c.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = V;
            var a = this.originalEvent;
            if (a) a.preventDefault ? a.preventDefault() : a.returnValue = false
        },
        stopPropagation: function() {
            this.isPropagationStopped = V;
            var a = this.originalEvent;
            if (a) {
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = true
            }
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = V;
            this.stopPropagation()
        },
        isDefaultPrevented: R,
        isPropagationStopped: R,
        isImmediatePropagationStopped: R
    };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        c.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var e, f = a.relatedTarget,
                    g = a.handleObj;
                if (!f || f !== this && !c.contains(this, f)) {
                    a.type = g.origType;
                    e = g.handler.apply(this, arguments);
                    a.type = b
                }
                return e
            }
        }
    });
    c.support.submitBubbles || (c.event.special.submit = {
        setup: function() {
            if (c.nodeName(this, "form")) return false;
            c.event.add(this, "click._submit keypress._submit", function(a) {
                a =
                    a.target;
                if ((a = c.nodeName(a, "input") || c.nodeName(a, "button") ? a.form : o) && !c._data(a, "_submit_attached")) {
                    c.event.add(a, "submit._submit", function(a) {
                        a._submit_bubble = true
                    });
                    c._data(a, "_submit_attached", true)
                }
            })
        },
        postDispatch: function(a) {
            if (a._submit_bubble) {
                delete a._submit_bubble;
                this.parentNode && !a.isTrigger && c.event.simulate("submit", this.parentNode, a, true)
            }
        },
        teardown: function() {
            if (c.nodeName(this, "form")) return false;
            c.event.remove(this, "._submit")
        }
    });
    c.support.changeBubbles || (c.event.special.change = {
        setup: function() {
            if (oa.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") {
                    c.event.add(this, "propertychange._change", function(a) {
                        if (a.originalEvent.propertyName === "checked") this._just_changed = true
                    });
                    c.event.add(this, "click._change", function(a) {
                        if (this._just_changed && !a.isTrigger) this._just_changed = false;
                        c.event.simulate("change", this, a, true)
                    })
                }
                return false
            }
            c.event.add(this, "beforeactivate._change", function(a) {
                a = a.target;
                if (oa.test(a.nodeName) && !c._data(a, "_change_attached")) {
                    c.event.add(a,
                        "change._change",
                        function(a) {
                            this.parentNode && (!a.isSimulated && !a.isTrigger) && c.event.simulate("change", this.parentNode, a, true)
                        });
                    c._data(a, "_change_attached", true)
                }
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            c.event.remove(this, "._change");
            return oa.test(this.nodeName)
        }
    });
    c.support.focusinBubbles || c.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d =
            0,
            e = function(a) {
                c.event.simulate(b, a.target, c.event.fix(a), true)
            };
        c.event.special[b] = {
            setup: function() {
                d++ === 0 && l.addEventListener(a, e, true)
            },
            teardown: function() {
                --d === 0 && l.removeEventListener(a, e, true)
            }
        }
    });
    c.fn.extend({
        on: function(a, b, d, e, f) {
            var g, h;
            if (typeof a === "object") {
                if (typeof b !== "string") {
                    d = d || b;
                    b = o
                }
                for (h in a) this.on(h, b, d, a[h], f);
                return this
            }
            if (d == null && e == null) {
                e = b;
                d = b = o
            } else if (e == null)
                if (typeof b === "string") {
                    e = d;
                    d = o
                } else {
                    e = d;
                    d = b;
                    b = o
                }
            if (e === false) e = R;
            else if (!e) return this;
            if (f === 1) {
                g =
                    e;
                e = function(a) {
                    c().off(a);
                    return g.apply(this, arguments)
                };
                e.guid = g.guid || (g.guid = c.guid++)
            }
            return this.each(function() {
                c.event.add(this, a, e, d, b)
            })
        },
        one: function(a, b, c, e) {
            return this.on(a, b, c, e, 1)
        },
        off: function(a, b, d) {
            var e;
            if (a && a.preventDefault && a.handleObj) {
                e = a.handleObj;
                c(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
                return this
            }
            if (typeof a === "object") {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            if (b === false || typeof b === "function") {
                d = b;
                b = o
            }
            d === false &&
                (d = R);
            return this.each(function() {
                c.event.remove(this, a, d, b)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        live: function(a, b, d) {
            c(this.context).on(a, this.selector, b, d);
            return this
        },
        die: function(a, b) {
            c(this.context).off(a, this.selector || "**", b);
            return this
        },
        delegate: function(a, b, c, e) {
            return this.on(b, a, c, e)
        },
        undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a || "**", c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a,
                    b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) return c.event.trigger(a, b, this[0], true)
        },
        toggle: function(a) {
            var b = arguments,
                d = a.guid || c.guid++,
                e = 0,
                f = function(d) {
                    var f = (c._data(this, "lastToggle" + a.guid) || 0) % e;
                    c._data(this, "lastToggle" + a.guid, f + 1);
                    d.preventDefault();
                    return b[f].apply(this, arguments) || false
                };
            for (f.guid = d; e < b.length;) b[e++].guid = d;
            return this.click(f)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function(a, b) {
            c.fn[b] = function(a, c) {
                if (c == null) {
                    c = a;
                    a = null
                }
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            };
            if (Yb.test(b)) c.event.fixHooks[b] = c.event.keyHooks;
            if (Zb.test(b)) c.event.fixHooks[b] = c.event.mouseHooks
        });
    (function(a, b) {
        function d(a, b, c, d) {
            for (var e = 0, f = b.length; e < f; e++) s(a, b[e], c, d)
        }

        function e(a, b, c, e, f, g) {
            var h, i = u.setFilters[b.toLowerCase()];
            i || s.error(b);
            if (a || !(h = f)) d(a || "*", e, h = [], f);
            return h.length > 0 ? i(h, c, g) : []
        }

        function f(a, c, f, g, h) {
            for (var i, j, k, m, n, o, l, p = 0, L = h.length,
                    A = T.POS, u = RegExp("^" + A.source + "(?!" + q + ")", "i"), r = function() {
                        for (var a = 1, c = arguments.length - 2; a < c; a++) arguments[a] === b && (i[a] = b)
                    }; p < L; p++) {
                A.exec("");
                a = h[p];
                m = [];
                k = 0;
                for (n = g; i = A.exec(a);) {
                    j = A.lastIndex = i.index + i[0].length;
                    if (j > k) {
                        l = a.slice(k, i.index);
                        k = j;
                        o = [c];
                        if (ga.test(l)) {
                            n && (o = n);
                            n = g
                        }
                        if (j = E.test(l)) l = l.slice(0, -5).replace(ga, "$&*");
                        i.length > 1 && i[0].replace(u, r);
                        n = e(l, i[1], i[2], o, n, j)
                    }
                }
                if (n) {
                    m = m.concat(n);
                    (l = a.slice(k)) && l !== ")" ? ga.test(l) ? d(l, m, f, g) : s(l, c, f, g ? g.concat(n) : n) : B.apply(f, m)
                } else s(a,
                    c, f, g)
            }
            return L === 1 ? f : s.uniqueSort(f)
        }

        function g(a, b, c) {
            var d = b.dir,
                e = y++;
            a || (a = function(a) {
                return a === c
            });
            return b.first ? function(b, c) {
                for (; b = b[d];)
                    if (b.nodeType === 1) return a(b, c) && b
            } : function(b, c) {
                for (var f, g = e + "." + k, h = g + "." + j; b = b[d];)
                    if (b.nodeType === 1) {
                        if ((f = b[w]) === h) return b.sizset;
                        if (typeof f === "string" && f.indexOf(g) === 0) {
                            if (b.sizset) return b
                        } else {
                            b[w] = h;
                            if (a(b, c)) {
                                b.sizset = true;
                                return b
                            }
                            b.sizset = false
                        }
                    }
            }
        }

        function h(a, b) {
            return a ? function(c, d) {
                var e = b(c, d);
                return e && a(e === true ? c : e, d)
            } : b
        }

        function i(a) {
            return function(b,
                c) {
                for (var d, e = 0; d = a[e]; e++)
                    if (d(b, c)) return true;
                return false
            }
        }
        var j, k, n, m, o, l = a.document,
            p = l.documentElement,
            r = false,
            z = true,
            y = 0,
            U = [].slice,
            B = [].push,
            w = ("sizcache" + Math.random()).replace(".", ""),
            q = "[\\x20\\t\\r\\n\\f]",
            F = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#"),
            F = "\\[" + q + "*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)" + q + "*(?:([*^$|!~]?=)" + q + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + F + ")|)|)" + q + "*\\]",
            H = q + "*([\\x20\\t\\r\\n\\f>+~])" + q + "*",
            L = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + F + "|" + ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)".replace(2,
                7) + "|[^\\\\(),])+",
            pa = RegExp("^" + q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + q + "+$", "g"),
            ga = RegExp("^" + H),
            t = RegExp(L + "?(?=" + q + "*,|$)", "g"),
            hb = RegExp("^(?:(?!,)(?:(?:^|,)" + q + "*" + L + ")*?|" + q + "*(.*?))(\\)|$)"),
            $b = RegExp(L.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + H, "g"),
            ac = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            qa = /[\x20\t\r\n\f]*[+~]/,
            E = /:not\($/,
            bc = /h\d/i,
            x = /input|select|textarea|button/i,
            C = /\\(?!\\)/g,
            T = {
                ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
                NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
                TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("[-", "[-\\*") + ")"),
                ATTR: RegExp("^" + F),
                PSEUDO: RegExp("^:((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)"),
                CHILD: RegExp("^:(only|nth|last|first)-child(?:\\(" + q + "*(even|odd|(([+-]|)(\\d*)n|)" + q + "*(?:([+-]|)" + q + "*(\\d+)|))" + q + "*\\)|)", "i"),
                POS: RegExp(":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", "ig"),
                needsContext: RegExp("^" + q + "*[>+~]|:(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
                    "i")
            },
            v = {},
            I = [],
            G = {},
            D = [],
            F = function(a) {
                a.sizzleFilter = true;
                return a
            },
            H = function(a) {
                return function(b) {
                    return b.nodeName.toLowerCase() === "input" && b.type === a
                }
            },
            L = function(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return (c === "input" || c === "button") && b.type === a
                }
            },
            J = function(a) {
                var b = false,
                    c = l.createElement("div");
                try {
                    b = a(c)
                } catch (d) {}
                return b
            },
            M = J(function(a) {
                a.innerHTML = "<select></select>";
                a = typeof a.lastChild.getAttribute("multiple");
                return a !== "boolean" && a !== "string"
            }),
            P = J(function(a) {
                a.id =
                    w + 0;
                a.innerHTML = "<a name='" + w + "'></a><div name='" + w + "'></div>";
                p.insertBefore(a, p.firstChild);
                var b = l.getElementsByName && l.getElementsByName(w).length === 2 + l.getElementsByName(w + 0).length;
                o = !l.getElementById(w);
                p.removeChild(a);
                return b
            }),
            Q = J(function(a) {
                a.appendChild(l.createComment(""));
                return a.getElementsByTagName("*").length === 0
            }),
            R = J(function(a) {
                a.innerHTML = "<a href='#'></a>";
                return a.firstChild && typeof a.firstChild.getAttribute !== "undefined" && a.firstChild.getAttribute("href") === "#"
            }),
            N = J(function(a) {
                a.innerHTML =
                    "<div class='hidden e'></div><div class='hidden'></div>";
                if (!a.getElementsByClassName || a.getElementsByClassName("e").length === 0) return false;
                a.lastChild.className = "e";
                return a.getElementsByClassName("e").length !== 1
            }),
            s = function(a, b, c, d) {
                var c = c || [],
                    b = b || l,
                    e, f, g, h, i = b.nodeType;
                if (i !== 1 && i !== 9) return [];
                if (!a || typeof a !== "string") return c;
                g = K(b);
                if (!g && !d && (e = ac.exec(a)))
                    if (h = e[1])
                        if (i === 9)
                            if ((f = b.getElementById(h)) && f.parentNode) {
                                if (f.id === h) {
                                    c.push(f);
                                    return c
                                }
                            } else return c;
                else {
                    if (b.ownerDocument &&
                        (f = b.ownerDocument.getElementById(h)) && W(b, f) && f.id === h) {
                        c.push(f);
                        return c
                    }
                } else {
                    if (e[2]) {
                        B.apply(c, U.call(b.getElementsByTagName(a), 0));
                        return c
                    }
                    if ((h = e[3]) && N && b.getElementsByClassName) {
                        B.apply(c, U.call(b.getElementsByClassName(h), 0));
                        return c
                    }
                }
                return S(a, b, c, d, g)
            },
            u = s.selectors = {
                cacheLength: 50,
                match: T,
                order: ["ID", "TAG"],
                attrHandle: {},
                createPseudo: F,
                find: {
                    ID: o ? function(a, b, c) {
                        if (typeof b.getElementById !== "undefined" && !c) return (a = b.getElementById(a)) && a.parentNode ? [a] : []
                    } : function(a, c, d) {
                        if (typeof c.getElementById !==
                            "undefined" && !d) return (c = c.getElementById(a)) ? c.id === a || typeof c.getAttributeNode !== "undefined" && c.getAttributeNode("id").value === a ? [c] : b : []
                    },
                    TAG: Q ? function(a, b) {
                        if (typeof b.getElementsByTagName !== "undefined") return b.getElementsByTagName(a)
                    } : function(a, b) {
                        var c = b.getElementsByTagName(a);
                        if (a === "*") {
                            for (var d, e = [], f = 0; d = c[f]; f++) d.nodeType === 1 && e.push(d);
                            return e
                        }
                        return c
                    }
                },
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: true
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: true
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(a) {
                        a[1] = a[1].replace(C, "");
                        a[3] = (a[4] || a[5] || "").replace(C, "");
                        a[2] === "~=" && (a[3] = " " + a[3] + " ");
                        return a.slice(0, 4)
                    },
                    CHILD: function(a) {
                        a[1] = a[1].toLowerCase();
                        if (a[1] === "nth") {
                            a[2] || s.error(a[0]);
                            a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd"));
                            a[4] = +(a[6] + a[7] || a[2] === "odd")
                        } else a[2] && s.error(a[0]);
                        return a
                    },
                    PSEUDO: function(a) {
                        var b, c = a[4];
                        if (T.CHILD.test(a[0])) return null;
                        if (c && (b = hb.exec(c)) && b.pop()) {
                            a[0] = a[0].slice(0, b[0].length - c.length - 1);
                            c = b[0].slice(0, -1)
                        }
                        a.splice(2, 3, c || a[3]);
                        return a
                    }
                },
                filter: {
                    ID: o ? function(a) {
                        a = a.replace(C, "");
                        return function(b) {
                            return b.getAttribute("id") === a
                        }
                    } : function(a) {
                        a = a.replace(C, "");
                        return function(b) {
                            return (b = typeof b.getAttributeNode !== "undefined" && b.getAttributeNode("id")) && b.value === a
                        }
                    },
                    TAG: function(a) {
                        if (a === "*") return function() {
                            return true
                        };
                        a = a.replace(C, "").toLowerCase();
                        return function(b) {
                            return b.nodeName && b.nodeName.toLowerCase() === a
                        }
                    },
                    CLASS: function(a) {
                        var b = v[a];
                        if (!b) {
                            b = v[a] = RegExp("(^|" + q + ")" + a + "(" + q +
                                "|$)");
                            I.push(a);
                            I.length > u.cacheLength && delete v[I.shift()]
                        }
                        return function(a) {
                            return b.test(a.className || typeof a.getAttribute !== "undefined" && a.getAttribute("class") || "")
                        }
                    },
                    ATTR: function(a, b, c) {
                        return !b ? function(b) {
                            return s.attr(b, a) != null
                        } : function(d) {
                            var d = s.attr(d, a),
                                e = d + "";
                            if (d == null) return b === "!=";
                            switch (b) {
                                case "=":
                                    return e === c;
                                case "!=":
                                    return e !== c;
                                case "^=":
                                    return c && e.indexOf(c) === 0;
                                case "*=":
                                    return c && e.indexOf(c) > -1;
                                case "$=":
                                    return c && e.substr(e.length - c.length) === c;
                                case "~=":
                                    return (" " +
                                        e + " ").indexOf(c) > -1;
                                case "|=":
                                    return e === c || e.substr(0, c.length + 1) === c + "-"
                            }
                        }
                    },
                    CHILD: function(a, b, c, d) {
                        if (a === "nth") {
                            var e = y++;
                            return function(a) {
                                var b, f = 0,
                                    g = a;
                                if (c === 1 && d === 0) return true;
                                if ((b = a.parentNode) && (b[w] !== e || !a.sizset)) {
                                    for (g = b.firstChild; g; g = g.nextSibling)
                                        if (g.nodeType === 1) {
                                            g.sizset = ++f;
                                            if (g === a) break
                                        }
                                    b[w] = e
                                }
                                a = a.sizset - d;
                                return c === 0 ? a === 0 : a % c === 0 && a / c >= 0
                            }
                        }
                        return function(b) {
                            var c = b;
                            switch (a) {
                                case "only":
                                case "first":
                                    for (; c = c.previousSibling;)
                                        if (c.nodeType === 1) return false;
                                    if (a === "first") return true;
                                    c = b;
                                case "last":
                                    for (; c = c.nextSibling;)
                                        if (c.nodeType === 1) return false;
                                    return true
                            }
                        }
                    },
                    PSEUDO: function(a, b, c, d) {
                        var e = u.pseudos[a] || u.pseudos[a.toLowerCase()];
                        e || s.error("unsupported pseudo: " + a);
                        return !e.sizzleFilter ? e : e(b, c, d)
                    }
                },
                pseudos: {
                    not: F(function(a, b, c) {
                        var d = V(a.replace(pa, "$1"), b, c);
                        return function(a) {
                            return !d(a)
                        }
                    }),
                    enabled: function(a) {
                        return a.disabled === false
                    },
                    disabled: function(a) {
                        return a.disabled === true
                    },
                    checked: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return b === "input" && !!a.checked ||
                            b === "option" && !!a.selected
                    },
                    selected: function(a) {
                        a.parentNode && a.parentNode.selectedIndex;
                        return a.selected === true
                    },
                    parent: function(a) {
                        return !u.pseudos.empty(a)
                    },
                    empty: function(a) {
                        for (var b, a = a.firstChild; a;) {
                            if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4) return false;
                            a = a.nextSibling
                        }
                        return true
                    },
                    contains: F(function(a) {
                        return function(b) {
                            return (b.textContent || b.innerText || O(b)).indexOf(a) > -1
                        }
                    }),
                    has: F(function(a) {
                        return function(b) {
                            return s(a, b).length > 0
                        }
                    }),
                    header: function(a) {
                        return bc.test(a.nodeName)
                    },
                    text: function(a) {
                        var b, c;
                        return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b)
                    },
                    radio: H("radio"),
                    checkbox: H("checkbox"),
                    file: H("file"),
                    password: H("password"),
                    image: H("image"),
                    submit: L("submit"),
                    reset: L("reset"),
                    button: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return b === "input" && a.type === "button" || b === "button"
                    },
                    input: function(a) {
                        return x.test(a.nodeName)
                    },
                    focus: function(a) {
                        var b = a.ownerDocument;
                        return a === b.activeElement && (!b.hasFocus ||
                            b.hasFocus()) && !(!a.type && !a.href)
                    },
                    active: function(a) {
                        return a === a.ownerDocument.activeElement
                    }
                },
                setFilters: {
                    first: function(a, b, c) {
                        return c ? a.slice(1) : [a[0]]
                    },
                    last: function(a, b, c) {
                        b = a.pop();
                        return c ? a : [b]
                    },
                    even: function(a, b, c) {
                        for (var b = [], c = c ? 1 : 0, d = a.length; c < d; c = c + 2) b.push(a[c]);
                        return b
                    },
                    odd: function(a, b, c) {
                        for (var b = [], c = c ? 0 : 1, d = a.length; c < d; c = c + 2) b.push(a[c]);
                        return b
                    },
                    lt: function(a, b, c) {
                        return c ? a.slice(+b) : a.slice(0, +b)
                    },
                    gt: function(a, b, c) {
                        return c ? a.slice(0, +b + 1) : a.slice(+b + 1)
                    },
                    eq: function(a,
                        b, c) {
                        b = a.splice(+b, 1);
                        return c ? a : b
                    }
                }
            };
        u.setFilters.nth = u.setFilters.eq;
        u.filters = u.pseudos;
        if (!R) u.attrHandle = {
            href: function(a) {
                return a.getAttribute("href", 2)
            },
            type: function(a) {
                return a.getAttribute("type")
            }
        };
        if (P) {
            u.order.push("NAME");
            u.find.NAME = function(a, b) {
                if (typeof b.getElementsByName !== "undefined") return b.getElementsByName(a)
            }
        }
        if (N) {
            u.order.splice(1, 0, "CLASS");
            u.find.CLASS = function(a, b, c) {
                if (typeof b.getElementsByClassName !== "undefined" && !c) return b.getElementsByClassName(a)
            }
        }
        try {
            U.call(p.childNodes,
                0)[0].nodeType
        } catch (X) {
            U = function(a) {
                for (var b, c = []; b = this[a]; a++) c.push(b);
                return c
            }
        }
        var K = s.isXML = function(a) {
                return (a = a && (a.ownerDocument || a).documentElement) ? a.nodeName !== "HTML" : false
            },
            W = s.contains = p.compareDocumentPosition ? function(a, b) {
                return !!(a.compareDocumentPosition(b) & 16)
            } : p.contains ? function(a, b) {
                var c = a.nodeType === 9 ? a.documentElement : a,
                    d = b.parentNode;
                return a === d || !(!d || !(d.nodeType === 1 && c.contains && c.contains(d)))
            } : function(a, b) {
                for (; b = b.parentNode;)
                    if (b === a) return true;
                return false
            },
            O = s.getText = function(a) {
                var b, c = "",
                    d = 0;
                if (b = a.nodeType)
                    if (b === 1 || b === 9 || b === 11) {
                        if (typeof a.textContent === "string") return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c = c + O(a)
                    } else {
                        if (b === 3 || b === 4) return a.nodeValue
                    }
                else
                    for (; b = a[d]; d++) c = c + O(b);
                return c
            };
        s.attr = function(a, b) {
            var c;
            (c = K(a)) || (b = b.toLowerCase());
            if (u.attrHandle[b]) return u.attrHandle[b](a);
            if (M || c) return a.getAttribute(b);
            return (c = a.getAttributeNode(b)) ? typeof a[b] === "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null
        };
        s.error =
            function(a) {
                throw Error("Syntax error, unrecognized expression: " + a);
            };
        [0, 0].sort(function() {
            return z = 0
        });
        if (p.compareDocumentPosition) n = function(a, b) {
            if (a === b) {
                r = true;
                return 0
            }
            return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
        };
        else {
            n = function(a, b) {
                if (a === b) {
                    r = true;
                    return 0
                }
                if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
                var c, d, e = [],
                    f = [];
                c = a.parentNode;
                d = b.parentNode;
                var g = c;
                if (c === d) return m(a, b);
                if (c) {
                    if (!d) return 1
                } else return -1;
                for (; g;) {
                    e.unshift(g);
                    g = g.parentNode
                }
                for (g = d; g;) {
                    f.unshift(g);
                    g = g.parentNode
                }
                c = e.length;
                d = f.length;
                for (g = 0; g < c && g < d; g++)
                    if (e[g] !== f[g]) return m(e[g], f[g]);
                return g === c ? m(a, f[g], -1) : m(e[g], b, 1)
            };
            m = function(a, b, c) {
                if (a === b) return c;
                for (a = a.nextSibling; a;) {
                    if (a === b) return -1;
                    a = a.nextSibling
                }
                return 1
            }
        }
        s.uniqueSort = function(a) {
            var b, c = 1;
            if (n) {
                r = z;
                a.sort(n);
                if (r)
                    for (; b = a[c]; c++) b === a[c - 1] && a.splice(c--, 1)
            }
            return a
        };
        var V = s.compile = function(a, b, c) {
            var d, e, f = G[a];
            if (f && f.context === b) return f;
            var j, k, f = [];
            d = 0;
            for (var m = hb.exec(a), n = !m.pop() && !m.pop(), o = n && a.match(t) || [""], p = u.preFilter, q = u.filter, L = !c && b !== l;
                (k = o[d]) != null && n; d++) {
                f.push(j = []);
                for (L && (k = " " + k); k;) {
                    n = false;
                    if (m = ga.exec(k)) {
                        k = k.slice(m[0].length);
                        n = j.push({
                            part: m.pop().replace(pa, " "),
                            captures: m
                        })
                    }
                    for (e in q)
                        if ((m = T[e].exec(k)) && (!p[e] || (m = p[e](m, b, c)))) {
                            k = k.slice(m.shift().length);
                            n = j.push({
                                part: e,
                                captures: m
                            })
                        }
                    if (!n) break
                }
            }
            n || s.error(a);
            for (e = 0; d = f[e]; e++) {
                j = f;
                k = e;
                m = b;
                n = c;
                p = o = void 0;
                for (q = 0; o = d[q]; q++)
                    if (u.relative[o.part]) p = g(p, u.relative[o.part],
                        m);
                    else {
                        o.captures.push(m, n);
                        p = h(p, u.filter[o.part].apply(null, o.captures))
                    }
                j[k] = p
            }
            f = G[a] = i(f);
            f.context = b;
            f.runs = f.dirruns = 0;
            D.push(a);
            D.length > u.cacheLength && delete G[D.shift()];
            return f
        };
        s.matches = function(a, b) {
            return s(a, null, null, b)
        };
        s.matchesSelector = function(a, b) {
            return s(b, null, null, [a]).length > 0
        };
        var S = function(a, b, c, d, e) {
            var a = a.replace(pa, "$1"),
                g, h, i, m, n, o, l = a.match(t);
            h = a.match($b);
            i = b.nodeType;
            if (T.POS.test(a)) return f(a, b, c, d, l);
            if (d) g = U.call(d, 0);
            else if (l && l.length === 1) {
                if (h.length >
                    1 && i === 9 && !e && (l = T.ID.exec(h[0]))) {
                    b = u.find.ID(l[1], b, e)[0];
                    if (!b) return c;
                    a = a.slice(h.shift().length)
                }
                d = (l = qa.exec(h[0])) && !l.index && b.parentNode || b;
                o = h.pop();
                m = o.split(":not")[0];
                h = 0;
                for (i = u.order.length; h < i; h++) {
                    n = u.order[h];
                    if (l = T[n].exec(m)) {
                        g = u.find[n]((l[1] || "").replace(C, ""), d, e);
                        if (g != null) {
                            if (m === o)(a = a.slice(0, a.length - o.length) + m.replace(T[n], "")) || B.apply(c, U.call(g, 0));
                            break
                        }
                    }
                }
            }
            if (a) {
                e = V(a, b, e);
                k = e.dirruns++;
                g == null && (g = u.find.TAG("*", qa.test(a) && b.parentNode || b));
                for (h = 0; a = g[h]; h++) {
                    j =
                        e.runs++;
                    e(a, b) && c.push(a)
                }
            }
            return c
        };
        l.querySelectorAll && function() {
            var a, b = S,
                c = /'|\\/g,
                d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                e = [],
                f = [":active"],
                g = p.matchesSelector || p.mozMatchesSelector || p.webkitMatchesSelector || p.oMatchesSelector || p.msMatchesSelector;
            J(function(a) {
                a.innerHTML = "<select><option selected></option></select>";
                a.querySelectorAll("[selected]").length || e.push("\\[" + q + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                a.querySelectorAll(":checked").length || e.push(":checked")
            });
            J(function(a) {
                a.innerHTML = "<p test=''></p>";
                a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + q + "*(?:\"\"|'')");
                a.innerHTML = "<input type='hidden'>";
                a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled")
            });
            e = e.length && RegExp(e.join("|"));
            S = function(a, d, f, g, h) {
                if (!g && !h && (!e || !e.test(a)))
                    if (d.nodeType === 9) try {
                        B.apply(f, U.call(d.querySelectorAll(a), 0));
                        return f
                    } catch (i) {} else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
                        var j = d.getAttribute("id"),
                            k = j || w,
                            m = qa.test(a) &&
                            d.parentNode || d;
                        j ? k = k.replace(c, "\\$&") : d.setAttribute("id", k);
                        try {
                            B.apply(f, U.call(m.querySelectorAll(a.replace(t, "[id='" + k + "'] $&")), 0));
                            return f
                        } catch (n) {} finally {
                            j || d.removeAttribute("id")
                        }
                    }
                return b(a, d, f, g, h)
            };
            if (g) {
                J(function(b) {
                    a = g.call(b, "div");
                    try {
                        g.call(b, "[test!='']:sizzle");
                        f.push(u.match.PSEUDO)
                    } catch (c) {}
                });
                f = RegExp(f.join("|"));
                s.matchesSelector = function(b, c) {
                    c = c.replace(d, "='$1']");
                    if (!K(b) && !f.test(c) && (!e || !e.test(c))) try {
                        var h = g.call(b, c);
                        if (h || a || b.document && b.document.nodeType !==
                            11) return h
                    } catch (i) {}
                    return s(c, null, null, [b]).length > 0
                }
            }
        }();
        s.attr = c.attr;
        c.find = s;
        c.expr = s.selectors;
        c.expr[":"] = c.expr.pseudos;
        c.unique = s.uniqueSort;
        c.text = s.getText;
        c.isXMLDoc = s.isXML;
        c.contains = s.contains
    })(p);
    var cc = /Until$/,
        dc = /^(?:parents|prev(?:Until|All))/,
        Ab = /^.[^:#\[\.,]*$/,
        ib = c.expr.match.needsContext,
        ec = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    c.fn.extend({
        find: function(a) {
            var b, d, e, f, g, h, i = this;
            if (typeof a !== "string") return c(a).filter(function() {
                b = 0;
                for (d = i.length; b < d; b++)
                    if (c.contains(i[b],
                            this)) return true
            });
            h = this.pushStack("", "find", a);
            b = 0;
            for (d = this.length; b < d; b++) {
                e = h.length;
                c.find(a, this[b], h);
                if (b > 0)
                    for (f = e; f < h.length; f++)
                        for (g = 0; g < e; g++)
                            if (h[g] === h[f]) {
                                h.splice(f--, 1);
                                break
                            }
            }
            return h
        },
        has: function(a) {
            var b, d = c(a, this),
                e = d.length;
            return this.filter(function() {
                for (b = 0; b < e; b++)
                    if (c.contains(this, d[b])) return true
            })
        },
        not: function(a) {
            return this.pushStack(za(this, a, false), "not", a)
        },
        filter: function(a) {
            return this.pushStack(za(this, a, true), "filter", a)
        },
        is: function(a) {
            return !!a && (typeof a ===
                "string" ? ib.test(a) ? c(a, this.context).index(this[0]) >= 0 : c.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            for (var d, e = 0, f = this.length, g = [], h = ib.test(a) || typeof a !== "string" ? c(a, b || this.context) : 0; e < f; e++)
                for (d = this[e]; d && d.ownerDocument && d !== b && d.nodeType !== 11;) {
                    if (h ? h.index(d) > -1 : c.find.matchesSelector(d, a)) {
                        g.push(d);
                        break
                    }
                    d = d.parentNode
                }
            g = g.length > 1 ? c.unique(g) : g;
            return this.pushStack(g, "closest", a)
        },
        index: function(a) {
            return !a ? this[0] && this[0].parentNode ? this.prevAll().length :
                -1 : typeof a === "string" ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this)
        },
        add: function(a, b) {
            var d = typeof a === "string" ? c(a, b) : c.makeArray(a && a.nodeType ? [a] : a),
                e = c.merge(this.get(), d);
            return this.pushStack(W(d[0]) || W(e[0]) ? e : c.unique(e))
        },
        addBack: function(a) {
            return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
        }
    });
    c.fn.andSelf = c.fn.addBack;
    c.each({
        parent: function(a) {
            return (a = a.parentNode) && a.nodeType !== 11 ? a : null
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function(a,
            b, d) {
            return c.dir(a, "parentNode", d)
        },
        next: function(a) {
            return ya(a, "nextSibling")
        },
        prev: function(a) {
            return ya(a, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, d) {
            return c.dir(a, "nextSibling", d)
        },
        prevUntil: function(a, b, d) {
            return c.dir(a, "previousSibling", d)
        },
        siblings: function(a) {
            return c.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a,
                "iframe") ? a.contentDocument || a.contentWindow.document : c.merge([], a.childNodes)
        }
    }, function(a, b) {
        c.fn[a] = function(d, e) {
            var f = c.map(this, b, d);
            cc.test(a) || (e = d);
            e && typeof e === "string" && (f = c.filter(e, f));
            f = this.length > 1 && !ec[a] ? c.unique(f) : f;
            this.length > 1 && dc.test(a) && (f = f.reverse());
            return this.pushStack(f, a, t.call(arguments).join(","))
        }
    });
    c.extend({
        filter: function(a, b, d) {
            d && (a = ":not(" + a + ")");
            return b.length === 1 ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b)
        },
        dir: function(a, b, d) {
            for (var e = [], a = a[b]; a && a.nodeType !== 9 && (d === o || a.nodeType !== 1 || !c(a).is(d));) {
                a.nodeType === 1 && e.push(a);
                a = a[b]
            }
            return e
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var Ba = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        fc = / jQuery\d+="(?:null|\d+)"/g,
        ra = /^\s+/,
        jb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        kb = /<([\w:]+)/,
        gc = /<tbody/i,
        hc = /<|&#?\w+;/,
        ic = /<(?:script|style|link)/i,
        jc = /<(?:script|object|embed|option|style)/i,
        sa = RegExp("<(?:" + Ba + ")[\\s/>]", "i"),
        Ea = /^(?:checkbox|radio)$/,
        lb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        kc = /\/(java|ecma)script/i,
        lc = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        y = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2,
                "<table><tbody></tbody><colgroup>", "</colgroup></table>"
            ],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        mb = Aa(l),
        ta = mb.appendChild(l.createElement("div"));
    y.optgroup = y.option;
    y.tbody = y.tfoot = y.colgroup = y.caption = y.thead;
    y.th = y.td;
    c.support.htmlSerialize || (y._default = [1, "X<div>", "</div>"]);
    c.fn.extend({
        text: function(a) {
            return c.access(this, function(a) {
                return a === o ? c.text(this) : this.empty().append((this[0] && this[0].ownerDocument || l).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).wrapAll(a.call(this,
                    b))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(true);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var a = this; a.firstChild && a.firstChild.nodeType === 1;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return c.isFunction(a) ? this.each(function(b) {
                c(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = c(this),
                    d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = c.isFunction(a);
            return this.each(function(d) {
                c(this).wrapAll(b ?
                    a.call(this, d) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(a) {
                (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(a) {
                (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (!W(this[0])) return this.domManip(arguments, false, function(a) {
                this.parentNode.insertBefore(a,
                    this)
            });
            if (arguments.length) {
                var a = c.clean(arguments);
                return this.pushStack(c.merge(a, this), "before", this.selector)
            }
        },
        after: function() {
            if (!W(this[0])) return this.domManip(arguments, false, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = c.clean(arguments);
                return this.pushStack(c.merge(this, a), "after", this.selector)
            }
        },
        remove: function(a, b) {
            for (var d, e = 0;
                (d = this[e]) != null; e++)
                if (!a || c.filter(a, [d]).length) {
                    if (!b && d.nodeType === 1) {
                        c.cleanData(d.getElementsByTagName("*"));
                        c.cleanData([d])
                    }
                    d.parentNode && d.parentNode.removeChild(d)
                }
            return this
        },
        empty: function() {
            for (var a, b = 0;
                (a = this[b]) != null; b++)
                for (a.nodeType === 1 && c.cleanData(a.getElementsByTagName("*")); a.firstChild;) a.removeChild(a.firstChild);
            return this
        },
        clone: function(a, b) {
            a = a == null ? false : a;
            b = b == null ? a : b;
            return this.map(function() {
                return c.clone(this, a, b)
            })
        },
        html: function(a) {
            return c.access(this, function(a) {
                var d = this[0] || {},
                    e = 0,
                    f = this.length;
                if (a === o) return d.nodeType === 1 ? d.innerHTML.replace(fc, "") : o;
                if (typeof a ===
                    "string" && !ic.test(a) && (c.support.htmlSerialize || !sa.test(a)) && (c.support.leadingWhitespace || !ra.test(a)) && !y[(kb.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(jb, "<$1></$2>");
                    try {
                        for (; e < f; e++) {
                            d = this[e] || {};
                            if (d.nodeType === 1) {
                                c.cleanData(d.getElementsByTagName("*"));
                                d.innerHTML = a
                            }
                        }
                        d = 0
                    } catch (g) {}
                }
                d && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            if (!W(this[0])) {
                if (c.isFunction(a)) return this.each(function(b) {
                    var d = c(this),
                        e = d.html();
                    d.replaceWith(a.call(this, b, e))
                });
                typeof a !== "string" && (a = c(a).detach());
                return this.each(function() {
                    var b = this.nextSibling,
                        d = this.parentNode;
                    c(this).remove();
                    b ? c(b).before(a) : c(d).append(a)
                })
            }
            return this.length ? this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function(a) {
            return this.remove(a, true)
        },
        domManip: function(a, b, d) {
            var a = [].concat.apply([], a),
                e, f, g, h = 0,
                i = a[0],
                j = [],
                k = this.length;
            if (!c.support.checkClone && k > 1 && typeof i === "string" && lb.test(i)) return this.each(function() {
                c(this).domManip(a, b, d)
            });
            if (c.isFunction(i)) return this.each(function(e) {
                var f =
                    c(this);
                a[0] = i.call(this, e, b ? f.html() : o);
                f.domManip(a, b, d)
            });
            if (this[0]) {
                e = c.buildFragment(a, this, j);
                g = e.fragment;
                f = g.firstChild;
                g.childNodes.length === 1 && (g = f);
                if (f) {
                    b = b && c.nodeName(f, "tr");
                    for (e = e.cacheable || k - 1; h < k; h++) d.call(b && c.nodeName(this[h], "table") ? this[h].getElementsByTagName("tbody")[0] || this[h].appendChild(this[h].ownerDocument.createElement("tbody")) : this[h], h === e ? g : c.clone(g, true, true))
                }
                g = f = null;
                j.length && c.each(j, function(a, b) {
                    b.src ? c.ajax ? c.ajax({
                        url: b.src,
                        type: "GET",
                        dataType: "script",
                        async: false,
                        global: false,
                        "throws": true
                    }) : c.error("no ajax") : c.globalEval((b.text || b.textContent || b.innerHTML || "").replace(lc, ""));
                    b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    });
    c.buildFragment = function(a, b, d) {
        var e, f, g, h = a[0],
            b = b || l,
            b = (b[0] || b).ownerDocument || b[0] || b;
        typeof b.createDocumentFragment === "undefined" && (b = l);
        if (a.length === 1 && typeof h === "string" && h.length < 512 && b === l && h.charAt(0) === "<" && !jc.test(h) && (c.support.checkClone || !lb.test(h)) && (c.support.html5Clone || !sa.test(h))) {
            f = true;
            e = c.fragments[h];
            g = e !== o
        }
        if (!e) {
            e = b.createDocumentFragment();
            c.clean(a, b, e, d);
            f && (c.fragments[h] = g && e)
        }
        return {
            fragment: e,
            cacheable: f
        }
    };
    c.fragments = {};
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        c.fn[a] = function(d) {
            var e, f = 0,
                g = [],
                d = c(d),
                h = d.length;
            e = this.length === 1 && this[0].parentNode;
            if ((e == null || e && e.nodeType === 11 && e.childNodes.length === 1) && h === 1) {
                d[b](this[0]);
                return this
            }
            for (; f < h; f++) {
                e = (f > 0 ? this.clone(true) : this).get();
                c(d[f])[b](e);
                g = g.concat(e)
            }
            return this.pushStack(g, a, d.selector)
        }
    });
    c.extend({
        clone: function(a, b, d) {
            var e, f, g, h;
            if (c.support.html5Clone || c.isXMLDoc(a) || !sa.test("<" + a.nodeName + ">")) h = a.cloneNode(true);
            else {
                ta.innerHTML = a.outerHTML;
                ta.removeChild(h = ta.firstChild)
            }
            if ((!c.support.noCloneEvent || !c.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !c.isXMLDoc(a)) {
                Da(a, h);
                e = S(a);
                f = S(h);
                for (g = 0; e[g]; ++g) f[g] && Da(e[g], f[g])
            }
            if (b) {
                Ca(a, h);
                if (d) {
                    e = S(a);
                    f = S(h);
                    for (g = 0; e[g]; ++g) Ca(e[g], f[g])
                }
            }
            return h
        },
        clean: function(a, b, d, e) {
            var f, g, h, i, j, k, n = 0,
                m = [];
            if (!b || typeof b.createDocumentFragment === "undefined") b = l;
            for (g = b === l && mb;
                (h = a[n]) != null; n++) {
                typeof h === "number" && (h = h + "");
                if (h) {
                    if (typeof h === "string")
                        if (hc.test(h)) {
                            g = g || Aa(b);
                            k = k || g.appendChild(b.createElement("div"));
                            h = h.replace(jb, "<$1></$2>");
                            f = (kb.exec(h) || ["", ""])[1].toLowerCase();
                            i = y[f] || y._default;
                            j = i[0];
                            for (k.innerHTML = i[1] + h + i[2]; j--;) k = k.lastChild;
                            if (!c.support.tbody) {
                                j = gc.test(h);
                                i = f === "table" && !j ? k.firstChild && k.firstChild.childNodes :
                                    i[1] === "<table>" && !j ? k.childNodes : [];
                                for (f = i.length - 1; f >= 0; --f) c.nodeName(i[f], "tbody") && !i[f].childNodes.length && i[f].parentNode.removeChild(i[f])
                            }!c.support.leadingWhitespace && ra.test(h) && k.insertBefore(b.createTextNode(ra.exec(h)[0]), k.firstChild);
                            h = k.childNodes;
                            k = g.lastChild
                        } else h = b.createTextNode(h);
                    h.nodeType ? m.push(h) : m = c.merge(m, h)
                }
            }
            if (k) {
                g.removeChild(k);
                h = k = g = null
            }
            if (!c.support.appendChecked)
                for (n = 0;
                    (h = m[n]) != null; n++) c.nodeName(h, "input") ? Fa(h) : typeof h.getElementsByTagName !== "undefined" &&
                    c.grep(h.getElementsByTagName("input"), Fa);
            if (d) {
                a = function(a) {
                    if (!a.type || kc.test(a.type)) return e ? e.push(a.parentNode ? a.parentNode.removeChild(a) : a) : d.appendChild(a)
                };
                for (n = 0;
                    (h = m[n]) != null; n++)
                    if (!c.nodeName(h, "script") || !a(h)) {
                        d.appendChild(h);
                        if (typeof h.getElementsByTagName !== "undefined") {
                            h = c.grep(c.merge([], h.getElementsByTagName("script")), a);
                            m.splice.apply(m, [n + 1, 0].concat(h));
                            n = n + h.length
                        }
                    }
            }
            return m
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, i = c.expando, j = c.cache, k = c.support.deleteExpando,
                    n = c.event.special;
                (f = a[h]) != null; h++)
                if (b || c.acceptData(f))
                    if (d = (e = f[i]) && j[e]) {
                        if (d.events)
                            for (g in d.events) n[g] ? c.event.remove(f, g) : c.removeEvent(f, g, d.handle);
                        if (j[e]) {
                            delete j[e];
                            k ? delete f[i] : f.removeAttribute ? f.removeAttribute(i) : f[i] = null;
                            c.deletedIds.push(e)
                        }
                    }
        }
    });
    (function() {
        var a, b;
        c.uaMatch = function(a) {
            a = a.toLowerCase();
            a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 &&
                /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: a[1] || "",
                version: a[2] || "0"
            }
        };
        a = c.uaMatch(Gb.userAgent);
        b = {};
        if (a.browser) {
            b[a.browser] = true;
            b.version = a.version
        }
        if (b.webkit) b.safari = true;
        c.browser = b;
        c.sub = function() {
            function a(b, c) {
                return new a.fn.init(b, c)
            }
            c.extend(true, a, this);
            a.superclass = this;
            a.fn = a.prototype = this();
            a.fn.constructor = a;
            a.sub = this.sub;
            a.fn.init = function(f, g) {
                g && (g instanceof c && !(g instanceof a)) && (g = a(g));
                return c.fn.init.call(this, f, g, b)
            };
            a.fn.init.prototype = a.fn;
            var b =
                a(l);
            return a
        }
    })();
    var r, N, X, ua = /alpha\([^)]*\)/i,
        mc = /opacity=([^)]*)/,
        nc = /^(top|right|bottom|left)$/,
        nb = /^margin/,
        Bb = RegExp("^(" + ea + ")(.*)$", "i"),
        Z = RegExp("^(" + ea + ")(?!px)[a-z%]+$", "i"),
        oc = RegExp("^([-+])=(" + ea + ")", "i"),
        ka = {},
        pc = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ob = {
            letterSpacing: 0,
            fontWeight: 400,
            lineHeight: 1
        },
        M = ["Top", "Right", "Bottom", "Left"],
        Ha = ["Webkit", "O", "Moz", "ms"],
        qc = c.fn.toggle;
    c.fn.extend({
        css: function(a, b) {
            return c.access(this, function(a, b, f) {
                return f !== o ? c.style(a,
                    b, f) : c.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return Ia(this, true)
        },
        hide: function() {
            return Ia(this)
        },
        toggle: function(a, b) {
            var d = typeof a === "boolean";
            return c.isFunction(a) && c.isFunction(b) ? qc.apply(this, arguments) : this.each(function() {
                (d ? a : Y(this)) ? c(this).show(): c(this).hide()
            })
        }
    });
    c.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = r(a, "opacity");
                        return c === "" ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": c.support.cssFloat ?
                "cssFloat" : "styleFloat"
        },
        style: function(a, b, d, e) {
            if (a && !(a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
                var f, g, h, i = c.camelCase(b),
                    j = a.style,
                    b = c.cssProps[i] || (c.cssProps[i] = Ga(j, i));
                h = c.cssHooks[b] || c.cssHooks[i];
                if (d !== o) {
                    g = typeof d;
                    if (g === "string" && (f = oc.exec(d))) {
                        d = (f[1] + 1) * f[2] + parseFloat(c.css(a, b));
                        g = "number"
                    }
                    if (!(d == null || g === "number" && isNaN(d))) {
                        g === "number" && !c.cssNumber[i] && (d = d + "px");
                        if (!h || !("set" in h) || (d = h.set(a, d, e)) !== o) try {
                            j[b] = d
                        } catch (k) {}
                    }
                } else return h && "get" in h && (f = h.get(a, false,
                    e)) !== o ? f : j[b]
            }
        },
        css: function(a, b, d, e) {
            var f, g;
            g = c.camelCase(b);
            b = c.cssProps[g] || (c.cssProps[g] = Ga(a.style, g));
            (g = c.cssHooks[b] || c.cssHooks[g]) && "get" in g && (f = g.get(a, true, e));
            f === o && (f = r(a, b));
            f === "normal" && b in ob && (f = ob[b]);
            if (d || e !== o) {
                a = parseFloat(f);
                return d || c.isNumeric(a) ? a || 0 : f
            }
            return f
        },
        swap: function(a, b, c) {
            var e, f = {};
            for (e in b) {
                f[e] = a.style[e];
                a.style[e] = b[e]
            }
            c = c.call(a);
            for (e in b) a.style[e] = f[e];
            return c
        }
    });
    p.getComputedStyle ? r = function(a, b) {
        var d, e, f, g, h = getComputedStyle(a, null),
            i =
            a.style;
        if (h) {
            d = h[b];
            d === "" && !c.contains(a.ownerDocument.documentElement, a) && (d = c.style(a, b));
            if (Z.test(d) && nb.test(b)) {
                e = i.width;
                f = i.minWidth;
                g = i.maxWidth;
                i.minWidth = i.maxWidth = i.width = d;
                d = h.width;
                i.width = e;
                i.minWidth = f;
                i.maxWidth = g
            }
        }
        return d
    } : l.documentElement.currentStyle && (r = function(a, b) {
        var c, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        f == null && (g && g[b]) && (f = g[b]);
        if (Z.test(f) && !nc.test(b)) {
            c = g.left;
            if (e = a.runtimeStyle && a.runtimeStyle.left) a.runtimeStyle.left = a.currentStyle.left;
            g.left =
                b === "fontSize" ? "1em" : f;
            f = g.pixelLeft + "px";
            g.left = c;
            if (e) a.runtimeStyle.left = e
        }
        return f === "" ? "auto" : f
    });
    c.each(["height", "width"], function(a, b) {
        c.cssHooks[b] = {
            get: function(a, e, f) {
                if (e) return a.offsetWidth !== 0 || r(a, "display") !== "none" ? Ma(a, b, f) : c.swap(a, pc, function() {
                    return Ma(a, b, f)
                })
            },
            set: function(a, e, f) {
                return Ka(a, e, f ? La(a, b, f, c.support.boxSizing && c.css(a, "boxSizing") === "border-box") : 0)
            }
        }
    });
    c.support.opacity || (c.cssHooks.opacity = {
        get: function(a, b) {
            return mc.test((b && a.currentStyle ? a.currentStyle.filter :
                a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var d = a.style,
                e = a.currentStyle,
                f = c.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = e && e.filter || d.filter || "";
            d.zoom = 1;
            if (b >= 1 && c.trim(g.replace(ua, "")) === "" && d.removeAttribute) {
                d.removeAttribute("filter");
                if (e && !e.filter) return
            }
            d.filter = ua.test(g) ? g.replace(ua, f) : g + " " + f
        }
    });
    c(function() {
        if (!c.support.reliableMarginRight) c.cssHooks.marginRight = {
            get: function(a, b) {
                return c.swap(a, {
                    display: "inline-block"
                }, function() {
                    if (b) return r(a,
                        "marginRight")
                })
            }
        };
        !c.support.pixelPosition && c.fn.position && c.each(["top", "left"], function(a, b) {
            c.cssHooks[b] = {
                get: function(a, e) {
                    if (e) {
                        var f = r(a, b);
                        return Z.test(f) ? c(a).position()[b] + "px" : f
                    }
                }
            }
        })
    });
    c.expr && c.expr.filters && (c.expr.filters.hidden = function(a) {
        return a.offsetWidth === 0 && a.offsetHeight === 0 || !c.support.reliableHiddenOffsets && (a.style && a.style.display || r(a, "display")) === "none"
    }, c.expr.filters.visible = function(a) {
        return !c.expr.filters.hidden(a)
    });
    c.each({
            margin: "",
            padding: "",
            border: "Width"
        },
        function(a, b) {
            c.cssHooks[a + b] = {
                expand: function(c) {
                    for (var e = typeof c === "string" ? c.split(" ") : [c], f = {}, c = 0; c < 4; c++) f[a + M[c] + b] = e[c] || e[c - 2] || e[0];
                    return f
                }
            };
            if (!nb.test(a)) c.cssHooks[a + b].set = Ka
        });
    var rc = /%20/g,
        Cb = /\[\]$/,
        pb = /\r?\n/g,
        sc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        tc = /^(?:select|textarea)/i;
    c.fn.extend({
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ?
                    c.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || tc.test(this.nodeName) || sc.test(this.type))
            }).map(function(a, b) {
                var d = c(this).val();
                return d == null ? null : c.isArray(d) ? c.map(d, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(pb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: d.replace(pb, "\r\n")
                }
            }).get()
        }
    });
    c.param = function(a, b) {
        var d, e = [],
            f = function(a, b) {
                b = c.isFunction(b) ? b() : b == null ? "" : b;
                e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        b === o && (b = c.ajaxSettings &&
            c.ajaxSettings.traditional);
        if (c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function() {
            f(this.name, this.value)
        });
        else
            for (d in a) la(d, a[d], b, f);
        return e.join("&").replace(rc, "+")
    };
    var P, Q, uc = /#.*$/,
        vc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        wc = /^(?:GET|HEAD)$/,
        xc = /^\/\//,
        qb = /\?/,
        yc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        zc = /([?&])_=[^&]*/,
        rb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        sb = c.fn.load,
        ma = {},
        tb = {},
        ub = ["*/"] + ["*"];
    try {
        P = Fb.href
    } catch (Gc) {
        P = l.createElement("a"), P.href =
            "", P = P.href
    }
    Q = rb.exec(P.toLowerCase()) || [];
    c.fn.load = function(a, b, d) {
        if (typeof a !== "string" && sb) return sb.apply(this, arguments);
        if (!this.length) return this;
        var e, f, g, h = this,
            i = a.indexOf(" ");
        if (i >= 0) {
            e = a.slice(i, a.length);
            a = a.slice(0, i)
        }
        if (c.isFunction(b)) {
            d = b;
            b = o
        } else typeof b === "object" && (f = "POST");
        c.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b,
            complete: function(a, b) {
                d && h.each(d, g || [a.responseText, b, a])
            }
        }).done(function(a) {
            g = arguments;
            h.html(e ? c("<div>").append(a.replace(yc, "")).find(e) : a)
        });
        return this
    };
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        c.fn[b] = function(a) {
            return this.on(b, a)
        }
    });
    c.each(["get", "post"], function(a, b) {
        c[b] = function(a, e, f, g) {
            if (c.isFunction(e)) {
                g = g || f;
                f = e;
                e = o
            }
            return c.ajax({
                type: b,
                url: a,
                data: e,
                success: f,
                dataType: g
            })
        }
    });
    c.extend({
        getScript: function(a, b) {
            return c.get(a, o, b, "script")
        },
        getJSON: function(a, b, d) {
            return c.get(a, b, d, "json")
        },
        ajaxSetup: function(a, b) {
            if (b) Oa(a, c.ajaxSettings);
            else {
                b = a;
                a = c.ajaxSettings
            }
            Oa(a, b);
            return a
        },
        ajaxSettings: {
            url: P,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(Q[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": ub
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": p.String,
                "text html": !0,
                "text json": c.parseJSON,
                "text xml": c.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Na(ma),
        ajaxTransport: Na(tb),
        ajax: function(a, b) {
            function d(a, b, d, g) {
                var j, n, t, v, E = b;
                if (B !== 2) {
                    B = 2;
                    i && clearTimeout(i);
                    h = o;
                    f = g || "";
                    q.readyState = a > 0 ? 4 : 0;
                    if (d) {
                        v = m;
                        var g = q,
                            w, x, C, F, G = v.contents,
                            I = v.dataTypes,
                            H = v.responseFields;
                        for (x in H) x in d && (g[H[x]] = d[x]);
                        for (; I[0] === "*";) {
                            I.shift();
                            w === o && (w = v.mimeType || g.getResponseHeader("content-type"))
                        }
                        if (w)
                            for (x in G)
                                if (G[x] && G[x].test(w)) {
                                    I.unshift(x);
                                    break
                                }
                        if (I[0] in d) C = I[0];
                        else {
                            for (x in d) {
                                if (!I[0] ||
                                    v.converters[x + " " + I[0]]) {
                                    C = x;
                                    break
                                }
                                F || (F = x)
                            }
                            C = C || F
                        }
                        if (C) {
                            C !== I[0] && I.unshift(C);
                            v = d[C]
                        } else v = void 0
                    }
                    if (a >= 200 && a < 300 || a === 304) {
                        if (m.ifModified) {
                            (d = q.getResponseHeader("Last-Modified")) && (c.lastModified[e] = d);
                            (d = q.getResponseHeader("Etag")) && (c.etag[e] = d)
                        }
                        if (a === 304) {
                            E = "notmodified";
                            j = true
                        } else {
                            a: {
                                n = m;t = v;
                                var D, J, E = n.dataTypes.slice();w = E[0];x = {};C = 0;n.dataFilter && (t = n.dataFilter(t, n.dataType));
                                if (E[1])
                                    for (D in n.converters) x[D.toLowerCase()] = n.converters[D];
                                for (; d = E[++C];)
                                    if (d !== "*") {
                                        if (w !== "*" &&
                                            w !== d) {
                                            D = x[w + " " + d] || x["* " + d];
                                            if (!D)
                                                for (J in x) {
                                                    j = J.split(" ");
                                                    if (j[1] === d)
                                                        if (D = x[w + " " + j[0]] || x["* " + j[0]]) {
                                                            if (D === true) D = x[J];
                                                            else if (x[J] !== true) {
                                                                d = j[0];
                                                                E.splice(C--, 0, d)
                                                            }
                                                            break
                                                        }
                                                }
                                            if (D !== true)
                                                if (D && n["throws"]) t = D(t);
                                                else try {
                                                    t = D(t)
                                                } catch (K) {
                                                    j = {
                                                        state: "parsererror",
                                                        error: D ? K : "No conversion from " + w + " to " + d
                                                    };
                                                    break a
                                                }
                                        }
                                        w = d
                                    }
                                j = {
                                    state: "success",
                                    data: t
                                }
                            }
                            E = j.state;n = j.data;t = j.error;j = !t
                        }
                    } else {
                        t = E;
                        if (!E || a) {
                            E = "error";
                            a < 0 && (a = 0)
                        }
                    }
                    q.status = a;
                    q.statusText = "" + (b || E);
                    j ? r.resolveWith(l, [n, E, q]) : r.rejectWith(l, [q, E, t]);
                    q.statusCode(y);
                    y = o;
                    k && p.trigger("ajax" + (j ? "Success" : "Error"), [q, m, j ? n : t]);
                    z.fireWith(l, [q, E]);
                    if (k) {
                        p.trigger("ajaxComplete", [q, m]);
                        --c.active || c.event.trigger("ajaxStop")
                    }
                }
            }
            if (typeof a === "object") {
                b = a;
                a = o
            }
            var b = b || {},
                e, f, g, h, i, j, k, n, m = c.ajaxSetup({}, b),
                l = m.context || m,
                p = l !== m && (l.nodeType || l instanceof c) ? c(l) : c.event,
                r = c.Deferred(),
                z = c.Callbacks("once memory"),
                y = m.statusCode || {},
                t = {},
                v = {},
                B = 0,
                w = "canceled",
                q = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        if (!B) {
                            var c = a.toLowerCase(),
                                a = v[c] =
                                v[c] || a;
                            t[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return B === 2 ? f : null
                    },
                    getResponseHeader: function(a) {
                        var b;
                        if (B === 2) {
                            if (!g)
                                for (g = {}; b = vc.exec(f);) g[b[1].toLowerCase()] = b[2];
                            b = g[a.toLowerCase()]
                        }
                        return b === o ? null : b
                    },
                    overrideMimeType: function(a) {
                        if (!B) m.mimeType = a;
                        return this
                    },
                    abort: function(a) {
                        a = a || w;
                        h && h.abort(a);
                        d(0, a);
                        return this
                    }
                };
            r.promise(q);
            q.success = q.done;
            q.error = q.fail;
            q.complete = z.add;
            q.statusCode = function(a) {
                if (a) {
                    var b;
                    if (B < 2)
                        for (b in a) y[b] = [y[b], a[b]];
                    else {
                        b = a[q.status];
                        q.always(b)
                    }
                }
                return this
            };
            m.url = ((a || m.url) + "").replace(uc, "").replace(xc, Q[1] + "//");
            m.dataTypes = c.trim(m.dataType || "*").toLowerCase().split(G);
            if (m.crossDomain == null) {
                j = rb.exec(m.url.toLowerCase());
                m.crossDomain = !(!j || !(j[1] != Q[1] || j[2] != Q[2] || (j[3] || (j[1] === "http:" ? 80 : 443)) != (Q[3] || (Q[1] === "http:" ? 80 : 443))))
            }
            if (m.data && m.processData && typeof m.data !== "string") m.data = c.param(m.data, m.traditional);
            $(ma, m, b, q);
            if (B === 2) return q;
            k = m.global;
            m.type = m.type.toUpperCase();
            m.hasContent = !wc.test(m.type);
            k && c.active++ === 0 && c.event.trigger("ajaxStart");
            if (!m.hasContent) {
                if (m.data) {
                    m.url = m.url + ((qb.test(m.url) ? "&" : "?") + m.data);
                    delete m.data
                }
                e = m.url;
                if (m.cache === false) {
                    j = c.now();
                    var F = m.url.replace(zc, "$1_=" + j);
                    m.url = F + (F === m.url ? (qb.test(m.url) ? "&" : "?") + "_=" + j : "")
                }
            }(m.data && m.hasContent && m.contentType !== false || b.contentType) && q.setRequestHeader("Content-Type", m.contentType);
            if (m.ifModified) {
                e = e || m.url;
                c.lastModified[e] && q.setRequestHeader("If-Modified-Since", c.lastModified[e]);
                c.etag[e] && q.setRequestHeader("If-None-Match", c.etag[e])
            }
            q.setRequestHeader("Accept",
                m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + (m.dataTypes[0] !== "*" ? ", " + ub + "; q=0.01" : "") : m.accepts["*"]);
            for (n in m.headers) q.setRequestHeader(n, m.headers[n]);
            if (m.beforeSend && (m.beforeSend.call(l, q, m) === false || B === 2)) return q.abort();
            w = "abort";
            for (n in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) q[n](m[n]);
            if (h = $(tb, m, b, q)) {
                q.readyState = 1;
                k && p.trigger("ajaxSend", [q, m]);
                m.async && m.timeout > 0 && (i = setTimeout(function() {
                    q.abort("timeout")
                }, m.timeout));
                try {
                    B = 1;
                    h.send(t, d)
                } catch (H) {
                    if (B < 2) d(-1,
                        H);
                    else throw H;
                }
            } else d(-1, "No Transport");
            return q
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var vb = [],
        Ac = /\?/,
        ha = /(=)\?(?=&|$)|\?\?/,
        Bc = c.now();
    c.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = vb.pop() || c.expando + "_" + Bc++;
            this[a] = true;
            return a
        }
    });
    c.ajaxPrefilter("json jsonp", function(a, b, d) {
        var e, f, g, h = a.data,
            i = a.url,
            j = a.jsonp !== false,
            k = j && ha.test(i),
            n = j && !k && typeof h === "string" && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && ha.test(h);
        if (a.dataTypes[0] === "jsonp" || k ||
            n) {
            e = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback;
            f = p[e];
            if (k) a.url = i.replace(ha, "$1" + e);
            else if (n) a.data = h.replace(ha, "$1" + e);
            else if (j) a.url = a.url + ((Ac.test(i) ? "&" : "?") + a.jsonp + "=" + e);
            a.converters["script json"] = function() {
                g || c.error(e + " was not called");
                return g[0]
            };
            a.dataTypes[0] = "json";
            p[e] = function() {
                g = arguments
            };
            d.always(function() {
                p[e] = f;
                if (a[e]) {
                    a.jsonpCallback = b.jsonpCallback;
                    vb.push(e)
                }
                g && c.isFunction(f) && f(g[0]);
                g = f = o
            });
            return "script"
        }
    });
    c.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                c.globalEval(a);
                return a
            }
        }
    });
    c.ajaxPrefilter("script", function(a) {
        if (a.cache === o) a.cache = false;
        if (a.crossDomain) {
            a.type = "GET";
            a.global = false
        }
    });
    c.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = l.head || l.getElementsByTagName("head")[0] || l.documentElement;
            return {
                send: function(e, f) {
                    b = l.createElement("script");
                    b.async = "async";
                    if (a.scriptCharset) b.charset = a.scriptCharset;
                    b.src = a.url;
                    b.onload = b.onreadystatechange =
                        function(a, e) {
                            if (e || !b.readyState || /loaded|complete/.test(b.readyState)) {
                                b.onload = b.onreadystatechange = null;
                                c && b.parentNode && c.removeChild(b);
                                b = o;
                                e || f(200, "success")
                            }
                        };
                    c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    if (b) b.onload(0, 1)
                }
            }
        }
    });
    var K, va = p.ActiveXObject ? function() {
            for (var a in K) K[a](0, 1)
        } : !1,
        Cc = 0;
    c.ajaxSettings.xhr = p.ActiveXObject ? function() {
        var a;
        if (!(a = !this.isLocal && Pa())) a: {
            try {
                a = new p.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (b) {}
            a = void 0
        }
        return a
    } : Pa;
    (function(a) {
        c.extend(c.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        })
    })(c.ajaxSettings.xhr());
    c.support.ajax && c.ajaxTransport(function(a) {
        if (!a.crossDomain || c.support.cors) {
            var b;
            return {
                send: function(d, e) {
                    var f, g, h = a.xhr();
                    a.username ? h.open(a.type, a.url, a.async, a.username, a.password) : h.open(a.type, a.url, a.async);
                    if (a.xhrFields)
                        for (g in a.xhrFields) h[g] = a.xhrFields[g];
                    a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType);
                    !a.crossDomain && !d["X-Requested-With"] && (d["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (g in d) h.setRequestHeader(g,
                            d[g])
                    } catch (i) {}
                    h.send(a.hasContent && a.data || null);
                    b = function(d, g) {
                        var i, m, l, p, r;
                        try {
                            if (b && (g || h.readyState === 4)) {
                                b = o;
                                if (f) {
                                    h.onreadystatechange = c.noop;
                                    va && delete K[f]
                                }
                                if (g) h.readyState !== 4 && h.abort();
                                else {
                                    i = h.status;
                                    l = h.getAllResponseHeaders();
                                    p = {};
                                    if ((r = h.responseXML) && r.documentElement) p.xml = r;
                                    try {
                                        p.text = h.responseText
                                    } catch (t) {}
                                    try {
                                        m = h.statusText
                                    } catch (v) {
                                        m = ""
                                    }!i && a.isLocal && !a.crossDomain ? i = p.text ? 200 : 404 : i === 1223 && (i = 204)
                                }
                            }
                        } catch (y) {
                            g || e(-1, y)
                        }
                        p && e(i, m, p, l)
                    };
                    if (a.async)
                        if (h.readyState === 4) setTimeout(b,
                            0);
                        else {
                            f = ++Cc;
                            if (va) {
                                if (!K) {
                                    K = {};
                                    c(p).unload(va)
                                }
                                K[f] = b
                            }
                            h.onreadystatechange = b
                        }
                    else b()
                },
                abort: function() {
                    b && b(0, 1)
                }
            }
        }
    });
    var aa, ia, Dc = /^(?:toggle|show|hide)$/,
        Ec = RegExp("^(?:([-+])=|)(" + ea + ")([a-z%]*)$", "i"),
        Fc = /queueHooks$/,
        ba = [function(a, b, d) {
            var e, f, g, h, i, j, k = this,
                n = a.style,
                m = {},
                l = [],
                o = a.nodeType && Y(a);
            if (!d.queue) {
                i = c._queueHooks(a, "fx");
                if (i.unqueued == null) {
                    i.unqueued = 0;
                    j = i.empty.fire;
                    i.empty.fire = function() {
                        i.unqueued || j()
                    }
                }
                i.unqueued++;
                k.always(function() {
                    k.always(function() {
                        i.unqueued--;
                        c.queue(a, "fx").length || i.empty.fire()
                    })
                })
            }
            if (a.nodeType === 1 && ("height" in b || "width" in b)) {
                d.overflow = [n.overflow, n.overflowX, n.overflowY];
                if (c.css(a, "display") === "inline" && c.css(a, "float") === "none") !c.support.inlineBlockNeedsLayout || Ja(a.nodeName) === "inline" ? n.display = "inline-block" : n.zoom = 1
            }
            if (d.overflow) {
                n.overflow = "hidden";
                c.support.shrinkWrapBlocks || k.done(function() {
                    n.overflow = d.overflow[0];
                    n.overflowX = d.overflow[1];
                    n.overflowY = d.overflow[2]
                })
            }
            for (e in b) {
                f = b[e];
                if (Dc.exec(f)) {
                    delete b[e];
                    f !==
                        (o ? "hide" : "show") && l.push(e)
                }
            }
            if (f = l.length) {
                g = c._data(a, "fxshow") || c._data(a, "fxshow", {});
                o ? c(a).show() : k.done(function() {
                    c(a).hide()
                });
                k.done(function() {
                    var b;
                    c.removeData(a, "fxshow", true);
                    for (b in m) c.style(a, b, m[b])
                });
                for (e = 0; e < f; e++) {
                    b = l[e];
                    h = k.createTween(b, o ? g[b] : 0);
                    m[b] = g[b] || c.style(a, b);
                    if (!(b in g)) {
                        g[b] = h.start;
                        if (o) {
                            h.end = h.start;
                            h.start = b === "width" || b === "height" ? 1 : 0
                        }
                    }
                }
            }
        }],
        O = {
            "*": [function(a, b) {
                var d, e, f, g = this.createTween(a, b),
                    h = Ec.exec(b),
                    i = g.cur(),
                    j = +i || 0,
                    k = 1;
                if (h) {
                    d = +h[2];
                    e = h[3] ||
                        (c.cssNumber[a] ? "" : "px");
                    if (e !== "px" && j) {
                        j = c.css(g.elem, a, true) || d || 1;
                        do {
                            f = k = k || ".5";
                            j = j / k;
                            c.style(g.elem, a, j + e);
                            k = g.cur() / i
                        } while (k !== 1 && k !== f)
                    }
                    g.unit = e;
                    g.start = j;
                    g.end = h[1] ? j + (h[1] + 1) * d : d
                }
                return g
            }]
        };
    c.Animation = c.extend(Ra, {
        tweener: function(a, b) {
            if (c.isFunction(a)) {
                b = a;
                a = ["*"]
            } else a = a.split(" ");
            for (var d, e = 0, f = a.length; e < f; e++) {
                d = a[e];
                O[d] = O[d] || [];
                O[d].unshift(b)
            }
        },
        prefilter: function(a, b) {
            b ? ba.unshift(a) : ba.push(a)
        }
    });
    c.Tween = z;
    z.prototype = {
        constructor: z,
        init: function(a, b, d, e, f, g) {
            this.elem =
                a;
            this.prop = d;
            this.easing = f || "swing";
            this.options = b;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = g || (c.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var a = z.propHooks[this.prop];
            return a && a.get ? a.get(this) : z.propHooks._default.get(this)
        },
        run: function(a) {
            var b = z.propHooks[this.prop];
            this.pos = a = c.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration);
            this.now = (this.end - this.start) * a + this.start;
            this.options.step && this.options.step.call(this.elem, this.now, this);
            b && b.set ? b.set(this) : z.propHooks._default.set(this);
            return this
        }
    };
    z.prototype.init.prototype = z.prototype;
    z.propHooks = {
        _default: {
            get: function(a) {
                if (a.elem[a.prop] != null && (!a.elem.style || a.elem.style[a.prop] == null)) return a.elem[a.prop];
                a = c.css(a.elem, a.prop, false, "");
                return !a || a === "auto" ? 0 : a
            },
            set: function(a) {
                if (c.fx.step[a.prop]) c.fx.step[a.prop](a);
                else a.elem.style && (a.elem.style[c.cssProps[a.prop]] != null || c.cssHooks[a.prop]) ? c.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    z.propHooks.scrollTop = z.propHooks.scrollLeft = {
        set: function(a) {
            if (a.elem.nodeType &&
                a.elem.parentNode) a.elem[a.prop] = a.now
        }
    };
    c.each(["toggle", "show", "hide"], function(a, b) {
        var d = c.fn[b];
        c.fn[b] = function(e, f, g) {
            return e == null || typeof e === "boolean" || !a && c.isFunction(e) && c.isFunction(f) ? d.apply(this, arguments) : this.animate(ca(b, true), e, f, g)
        }
    });
    c.fn.extend({
        fadeTo: function(a, b, c, e) {
            return this.filter(Y).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, e)
        },
        animate: function(a, b, d, e) {
            var f = c.isEmptyObject(a),
                g = c.speed(b, d, e),
                b = function() {
                    var b = Ra(this, c.extend({}, a), g);
                    f && b.stop(true)
                };
            return f || g.queue === false ? this.each(b) : this.queue(g.queue, b)
        },
        stop: function(a, b, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop;
                b(d)
            };
            if (typeof a !== "string") {
                d = b;
                b = a;
                a = o
            }
            b && a !== false && this.queue(a || "fx", []);
            return this.each(function() {
                var b = true,
                    g = a != null && a + "queueHooks",
                    h = c.timers,
                    i = c._data(this);
                if (g) i[g] && i[g].stop && e(i[g]);
                else
                    for (g in i) i[g] && (i[g].stop && Fc.test(g)) && e(i[g]);
                for (g = h.length; g--;)
                    if (h[g].elem === this && (a == null || h[g].queue === a)) {
                        h[g].anim.stop(d);
                        b = false;
                        h.splice(g, 1)
                    }(b || !d) &&
                c.dequeue(this, a)
            })
        }
    });
    c.each({
        slideDown: ca("show"),
        slideUp: ca("hide"),
        slideToggle: ca("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        c.fn[a] = function(a, c, f) {
            return this.animate(b, a, c, f)
        }
    });
    c.speed = function(a, b, d) {
        var e = a && typeof a === "object" ? c.extend({}, a) : {
            complete: d || !d && b || c.isFunction(a) && a,
            duration: a,
            easing: d && b || b && !c.isFunction(b) && b
        };
        e.duration = c.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] :
            c.fx.speeds._default;
        if (e.queue == null || e.queue === true) e.queue = "fx";
        e.old = e.complete;
        e.complete = function() {
            c.isFunction(e.old) && e.old.call(this);
            e.queue && c.dequeue(this, e.queue)
        };
        return e
    };
    c.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    };
    c.timers = [];
    c.fx = z.prototype.init;
    c.fx.tick = function() {
        for (var a, b = c.timers, d = 0; d < b.length; d++) {
            a = b[d];
            !a() && b[d] === a && b.splice(d--, 1)
        }
        b.length || c.fx.stop()
    };
    c.fx.timer = function(a) {
        a() && (c.timers.push(a) && !ia) && (ia = setInterval(c.fx.tick,
            c.fx.interval))
    };
    c.fx.interval = 13;
    c.fx.stop = function() {
        clearInterval(ia);
        ia = null
    };
    c.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    c.fx.step = {};
    c.expr && c.expr.filters && (c.expr.filters.animated = function(a) {
        return c.grep(c.timers, function(b) {
            return a === b.elem
        }).length
    });
    var wb = /^(?:body|html)$/i;
    c.fn.offset = function(a) {
        if (arguments.length) return a === o ? this : this.each(function(b) {
            c.offset.setOffset(this, a, b)
        });
        var b, d, e, f, g, h;
        if (g = (b = this[0]) && b.ownerDocument) {
            if ((e = g.body) === b) return c.offset.bodyOffset(b);
            d = g.documentElement;
            if (!c.contains(d, b)) return {
                top: 0,
                left: 0
            };
            b = b.getBoundingClientRect();
            f = Sa(g);
            g = d.clientTop || e.clientTop || 0;
            e = d.clientLeft || e.clientLeft || 0;
            h = f.pageYOffset || d.scrollTop;
            d = f.pageXOffset || d.scrollLeft;
            g = b.top + h - g;
            b = b.left + d - e;
            return {
                top: g,
                left: b
            }
        }
    };
    c.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
                d = a.offsetLeft;
            if (c.support.doesNotIncludeMarginInBodyOffset) {
                b = b + (parseFloat(c.css(a, "marginTop")) || 0);
                d = d + (parseFloat(c.css(a, "marginLeft")) || 0)
            }
            return {
                top: b,
                left: d
            }
        },
        setOffset: function(a,
            b, d) {
            var e = c.css(a, "position");
            if (e === "static") a.style.position = "relative";
            var f = c(a),
                g = f.offset(),
                h = c.css(a, "top"),
                i = c.css(a, "left"),
                j = {},
                k = {};
            if ((e === "absolute" || e === "fixed") && c.inArray("auto", [h, i]) > -1) {
                k = f.position();
                e = k.top;
                i = k.left
            } else {
                e = parseFloat(h) || 0;
                i = parseFloat(i) || 0
            }
            c.isFunction(b) && (b = b.call(a, d, g));
            if (b.top != null) j.top = b.top - g.top + e;
            if (b.left != null) j.left = b.left - g.left + i;
            "using" in b ? b.using.call(a, j) : f.css(j)
        }
    };
    c.fn.extend({
        position: function() {
            if (this[0]) {
                var a = this[0],
                    b = this.offsetParent(),
                    d = this.offset(),
                    e = wb.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                d.top = d.top - (parseFloat(c.css(a, "marginTop")) || 0);
                d.left = d.left - (parseFloat(c.css(a, "marginLeft")) || 0);
                e.top = e.top + (parseFloat(c.css(b[0], "borderTopWidth")) || 0);
                e.left = e.left + (parseFloat(c.css(b[0], "borderLeftWidth")) || 0);
                return {
                    top: d.top - e.top,
                    left: d.left - e.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || l.body; a && !wb.test(a.nodeName) && c.css(a, "position") === "static";) a = a.offsetParent;
                return a ||
                    l.body
            })
        }
    });
    c.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var d = /Y/.test(b);
        c.fn[a] = function(e) {
            return c.access(this, function(a, e, h) {
                var i = Sa(a);
                if (h === o) return i ? b in i ? i[b] : i.document.documentElement[e] : a[e];
                i ? i.scrollTo(!d ? h : c(i).scrollLeft(), d ? h : c(i).scrollTop()) : a[e] = h
            }, a, e, arguments.length, null)
        }
    });
    c.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        c.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(d, e) {
            c.fn[e] = function(e, g) {
                var h = arguments.length && (d || typeof e !==
                        "boolean"),
                    i = d || (e === true || g === true ? "margin" : "border");
                return c.access(this, function(b, d, e) {
                    if (c.isWindow(b)) return b.document.documentElement["client" + a];
                    if (b.nodeType === 9) {
                        d = b.documentElement;
                        return Math.max(b.body["scroll" + a], d["scroll" + a], b.body["offset" + a], d["offset" + a], d["client" + a])
                    }
                    return e === o ? c.css(b, d, e, i) : c.style(b, d, e, i)
                }, b, h ? e : o, h)
            }
        })
    });
    p.jQuery = p.$ = c;
    "function" === typeof define && (define.amd && define.amd.jQuery) && define("jquery", [], function() {
        return c
    })
}(window);
jQuery.noConflict();