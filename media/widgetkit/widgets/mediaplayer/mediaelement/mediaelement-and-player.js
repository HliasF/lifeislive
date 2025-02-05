var mejs = mejs || {};
mejs.version = "2.9.1";
mejs.meIndex = 0;
mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: "video/mp4 video/m4v video/mov video/wmv audio/wma audio/m4a audio/mp3 audio/wav audio/mpeg".split(" ")
    }],
    flash: [{
        version: [9, 0, 124],
        types: "video/mp4 video/m4v video/mov video/flv video/x-flv audio/flv audio/x-flv audio/mp3 audio/m4a audio/mpeg video/youtube video/x-youtube".split(" ")
    }],
    youtube: [{
        version: null,
        types: ["video/youtube", "video/x-youtube"]
    }],
    vimeo: [{
        version: null,
        types: ["video/vimeo"]
    }]
};
mejs.Utility = {
    encodeUrl: function(b) {
        return encodeURIComponent(b)
    },
    escapeHTML: function(b) {
        return b.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    },
    absolutizeUrl: function(b) {
        var a = document.createElement("div");
        a.innerHTML = '<a href="' + this.escapeHTML(b) + '">x</a>';
        return a.firstChild.href
    },
    getScriptPath: function(b) {
        for (var a = 0, c, d = "", e = "", f, g = document.getElementsByTagName("script"), j = g.length, h = b.length; a < j; a++) {
            f = g[a].src;
            for (c = 0; c < h; c++)
                if (e = b[c], -1 < f.indexOf(e)) {
                    d =
                        f.substring(0, f.indexOf(e));
                    break
                }
            if ("" !== d) break
        }
        return d
    },
    secondsToTimeCode: function(b, a, c, d) {
        "undefined" == typeof c ? c = !1 : "undefined" == typeof d && (d = 25);
        var e = Math.floor(b / 3600) % 24,
            f = Math.floor(b / 60) % 60,
            g = Math.floor(b % 60),
            b = Math.floor((b % 1 * d).toFixed(3));
        return (a || 0 < e ? (10 > e ? "0" + e : e) + ":" : "") + (10 > f ? "0" + f : f) + ":" + (10 > g ? "0" + g : g) + (c ? ":" + (10 > b ? "0" + b : b) : "")
    },
    timeCodeToSeconds: function(b, a, c, d) {
        "undefined" == typeof c ? c = !1 : "undefined" == typeof d && (d = 25);
        var b = b.split(":"),
            a = parseInt(b[0], 10),
            e = parseInt(b[1],
                10),
            f = parseInt(b[2], 10),
            g = 0;
        c && (g = parseInt(b[3]) / d);
        return 3600 * a + 60 * e + f + g
    },
    removeSwf: function(b) {
        var a = document.getElementById(b);
        a && "OBJECT" == a.nodeName && (mejs.MediaFeatures.isIE ? (a.style.display = "none", function() {
            4 == a.readyState ? mejs.Utility.removeObjectInIE(b) : setTimeout(arguments.callee, 10)
        }()) : a.parentNode.removeChild(a))
    },
    removeObjectInIE: function(b) {
        if (b = document.getElementById(b)) {
            for (var a in b) "function" == typeof b[a] && (b[a] = null);
            b.parentNode.removeChild(b)
        }
    }
};
mejs.PluginDetector = {
    hasPluginVersion: function(b, a) {
        var c = this.plugins[b];
        a[1] = a[1] || 0;
        a[2] = a[2] || 0;
        return c[0] > a[0] || c[0] == a[0] && c[1] > a[1] || c[0] == a[0] && c[1] == a[1] && c[2] >= a[2] ? !0 : !1
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function(b, a, c, d, e) {
        this.plugins[b] = this.detectPlugin(a, c, d, e)
    },
    detectPlugin: function(b, a, c, d) {
        var e = [0, 0, 0],
            f;
        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[b]) {
            if ((c = this.nav.plugins[b].description) && !("undefined" !=
                    typeof this.nav.mimeTypes && this.nav.mimeTypes[a] && !this.nav.mimeTypes[a].enabledPlugin)) {
                e = c.replace(b, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split(".");
                for (b = 0; b < e.length; b++) e[b] = parseInt(e[b].match(/\d+/), 10)
            }
        } else if ("undefined" != typeof window.ActiveXObject) try {
            (f = new ActiveXObject(c)) && (e = d(f))
        } catch (g) {}
        return e
    }
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(b) {
    var a = [];
    if (b = b.GetVariable("$version")) b = b.split(" ")[1].split(","), a = [parseInt(b[0], 10), parseInt(b[1], 10), parseInt(b[2], 10)];
    return a
});
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(b) {
    var a = [0, 0, 0, 0],
        c = function(a, b, c, g) {
            for (; a.isVersionSupported(b[0] + "." + b[1] + "." + b[2] + "." + b[3]);) b[c] += g;
            b[c] -= g
        };
    c(b, a, 0, 1);
    c(b, a, 1, 1);
    c(b, a, 2, 1E4);
    c(b, a, 2, 1E3);
    c(b, a, 2, 100);
    c(b, a, 2, 10);
    c(b, a, 2, 1);
    c(b, a, 3, 1);
    return a
});
mejs.MediaFeatures = {
    init: function() {
        var b = this,
            a = document,
            c = mejs.PluginDetector.nav,
            d = mejs.PluginDetector.ua.toLowerCase(),
            e, f = ["source", "track", "audio", "video"];
        b.isiPad = null !== d.match(/ipad/i);
        b.isiPhone = null !== d.match(/iphone/i);
        b.isiOS = b.isiPhone || b.isiPad;
        b.isAndroid = null !== d.match(/android/i);
        b.isBustedAndroid = null !== d.match(/android 2\.[12]/);
        b.isIE = -1 != c.appName.toLowerCase().indexOf("microsoft");
        b.isChrome = null !== d.match(/chrome/gi);
        b.isFirefox = null !== d.match(/firefox/gi);
        b.isWebkit = null !==
            d.match(/webkit/gi);
        b.isGecko = null !== d.match(/gecko/gi) && !b.isWebkit;
        b.isOpera = null !== d.match(/opera/gi);
        b.hasTouch = "ontouchstart" in window;
        for (c = 0; c < f.length; c++) e = document.createElement(f[c]);
        b.supportsMediaTag = "undefined" !== typeof e.canPlayType || b.isBustedAndroid;
        b.hasSemiNativeFullScreen = "undefined" !== typeof e.webkitEnterFullscreen;
        b.hasWebkitNativeFullScreen = "undefined" !== typeof e.webkitRequestFullScreen;
        b.hasMozNativeFullScreen = "undefined" !== typeof e.mozRequestFullScreen;
        b.hasTrueNativeFullScreen =
            b.hasWebkitNativeFullScreen || b.hasMozNativeFullScreen;
        b.nativeFullScreenEnabled = b.hasTrueNativeFullScreen;
        b.hasMozNativeFullScreen && (b.nativeFullScreenEnabled = e.mozFullScreenEnabled);
        this.isChrome && (b.hasSemiNativeFullScreen = !1);
        b.hasTrueNativeFullScreen && (b.fullScreenEventName = b.hasWebkitNativeFullScreen ? "webkitfullscreenchange" : "mozfullscreenchange", b.isFullScreen = function() {
                if (e.mozRequestFullScreen) return a.mozFullScreen;
                if (e.webkitRequestFullScreen) return a.webkitIsFullScreen
            }, b.requestFullScreen =
            function(a) {
                b.hasWebkitNativeFullScreen ? a.webkitRequestFullScreen() : b.hasMozNativeFullScreen && a.mozRequestFullScreen()
            }, b.cancelFullScreen = function() {
                b.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : b.hasMozNativeFullScreen && document.mozCancelFullScreen()
            });
        b.hasSemiNativeFullScreen && d.match(/mac os x 10_5/i) && (b.hasNativeFullScreen = !1, b.hasSemiNativeFullScreen = !1)
    }
};
mejs.MediaFeatures.init();
mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function(b) {
        this.currentTime = b
    },
    setMuted: function(b) {
        this.muted = b
    },
    setVolume: function(b) {
        this.volume = b
    },
    stop: function() {
        this.pause()
    },
    setSrc: function(b) {
        for (var a = this.getElementsByTagName("source"); 0 < a.length;) this.removeChild(a[0]);
        if ("string" == typeof b) this.src = b;
        else
            for (var c, a = 0; a < b.length; a++) c = b[a], this.canPlayType(c.type) && (this.src = c.src)
    },
    setVideoSize: function(b, a) {
        this.width = b;
        this.height = a
    }
};
mejs.PluginMediaElement = function(b, a, c) {
    this.id = b;
    this.pluginType = a;
    this.src = c;
    this.events = {}
};
mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null,
    tagName: "",
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function() {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
    },
    load: function() {
        null != this.pluginApi && ("youtube" != this.pluginType && this.pluginApi.loadMedia(), this.paused = !1)
    },
    pause: function() {
        null !=
            this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
    },
    stop: function() {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
    },
    canPlayType: function(b) {
        var a, c, d, e = mejs.plugins[this.pluginType];
        for (a = 0; a < e.length; a++)
            if (d = e[a], mejs.PluginDetector.hasPluginVersion(this.pluginType, d.version))
                for (c = 0; c < d.types.length; c++)
                    if (b == d.types[c]) return !0;
        return !1
    },
    positionFullscreenButton: function(b,
        a, c) {
        null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(b, a, c)
    },
    hideFullscreenButton: function() {
        null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function(b) {
        if ("string" == typeof b) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(b)), this.src = mejs.Utility.absolutizeUrl(b);
        else {
            var a, c;
            for (a = 0; a < b.length; a++) c = b[a], this.canPlayType(c.type) && (this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src)),
                this.src = mejs.Utility.absolutizeUrl(b))
        }
    },
    setCurrentTime: function(b) {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.seekTo(b) : this.pluginApi.setCurrentTime(b), this.currentTime = b)
    },
    setVolume: function(b) {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.setVolume(100 * b) : this.pluginApi.setVolume(b), this.volume = b)
    },
    setMuted: function(b) {
        null != this.pluginApi && ("youtube" == this.pluginType ? (b ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = b, this.dispatchEvent("volumechange")) :
            this.pluginApi.setMuted(b), this.muted = b)
    },
    setVideoSize: function(b, a) {
        this.pluginElement.style && (this.pluginElement.style.width = b + "px", this.pluginElement.style.height = a + "px");
        null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(b, a)
    },
    setFullscreen: function(b) {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(b)
    },
    enterFullScreen: function() {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
    },
    exitFullScreen: function() {
        null !=
            this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
    },
    addEventListener: function(b, a) {
        this.events[b] = this.events[b] || [];
        this.events[b].push(a)
    },
    removeEventListener: function(b, a) {
        if (!b) return this.events = {}, !0;
        var c = this.events[b];
        if (!c) return !0;
        if (!a) return this.events[b] = [], !0;
        for (i = 0; i < c.length; i++)
            if (c[i] === a) return this.events[b].splice(i, 1), !0;
        return !1
    },
    dispatchEvent: function(b) {
        var a, c, d = this.events[b];
        if (d) {
            c = Array.prototype.slice.call(arguments, 1);
            for (a = 0; a < d.length; a++) d[a].apply(null,
                c)
        }
    },
    attributes: {},
    hasAttribute: function(b) {
        return b in this.attributes
    },
    removeAttribute: function(b) {
        delete this.attributes[b]
    },
    getAttribute: function(b) {
        return this.hasAttribute(b) ? this.attributes[b] : ""
    },
    setAttribute: function(b, a) {
        this.attributes[b] = a
    },
    remove: function() {
        mejs.Utility.removeSwf(this.pluginElement.id)
    }
};
mejs.MediaPluginBridge = {
    pluginMediaElements: {},
    htmlMediaElements: {},
    registerPluginElement: function(b, a, c) {
        this.pluginMediaElements[b] = a;
        this.htmlMediaElements[b] = c
    },
    initPlugin: function(b) {
        var a = this.pluginMediaElements[b],
            c = this.htmlMediaElements[b];
        if (a) {
            switch (a.pluginType) {
                case "flash":
                    a.pluginElement = a.pluginApi = document.getElementById(b);
                    break;
                case "silverlight":
                    a.pluginElement = document.getElementById(a.id), a.pluginApi = a.pluginElement.Content.MediaElementJS
            }
            null != a.pluginApi && a.success && a.success(a,
                c)
        }
    },
    fireEvent: function(b, a, c) {
        var d, e, b = this.pluginMediaElements[b];
        b.ended = !1;
        b.paused = !0;
        a = {
            type: a,
            target: b
        };
        for (d in c) b[d] = c[d], a[d] = c[d];
        e = c.bufferedTime || 0;
        a.target.buffered = a.buffered = {
            start: function() {
                return 0
            },
            end: function() {
                return e
            },
            length: 1
        };
        b.dispatchEvent(a.type, a)
    }
};
mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: !1,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    enablePluginSmoothing: !1,
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: 0.8,
    success: function() {},
    error: function() {}
};
mejs.MediaElement = function(b, a) {
    return mejs.HtmlMediaElementShim.create(b, a)
};
mejs.HtmlMediaElementShim = {
    create: function(b, a) {
        var c = mejs.MediaElementDefaults,
            d = "string" == typeof b ? document.getElementById(b) : b,
            e = d.tagName.toLowerCase(),
            f = "audio" === e || "video" === e,
            g = f ? d.getAttribute("src") : d.getAttribute("href"),
            e = d.getAttribute("poster"),
            j = d.getAttribute("autoplay"),
            h = d.getAttribute("preload"),
            l = d.getAttribute("controls"),
            k;
        for (k in a) c[k] = a[k];
        e = "undefined" == typeof e || null === e ? "" : e;
        h = "undefined" == typeof h || null === h || "false" === h ? "none" : h;
        j = !("undefined" == typeof j || null === j || "false" ===
            j);
        l = !("undefined" == typeof l || null === l || "false" === l);
        k = this.determinePlayback(d, c, mejs.MediaFeatures.supportsMediaTag, f, "undefined" == typeof g || null === g || "" == g ? null : g);
        k.url = null !== k.url ? mejs.Utility.absolutizeUrl(k.url) : "";
        if ("native" == k.method) return mejs.MediaFeatures.isBustedAndroid && (d.src = k.url, d.addEventListener("click", function() {
            d.play()
        }, !1)), this.updateNative(k, c, j, h);
        if ("" !== k.method) return this.createPlugin(k, c, e, j, h, l);
        this.createErrorMessage(k, c, e);
        return this
    },
    determinePlayback: function(b,
        a, c, d, e) {
        var f = [],
            g, j, h = {
                method: "",
                url: "",
                htmlMediaElement: b,
                isVideo: "audio" != b.tagName.toLowerCase()
            },
            l, k;
        if ("undefined" != typeof a.type && "" !== a.type)
            if ("string" == typeof a.type) f.push({
                type: a.type,
                url: e
            });
            else
                for (g = 0; g < a.type.length; g++) f.push({
                    type: a.type[g],
                    url: e
                });
        else if (null !== e) j = this.formatType(e, b.getAttribute("type")), f.push({
            type: j,
            url: e
        });
        else
            for (g = 0; g < b.childNodes.length; g++) j = b.childNodes[g], 1 == j.nodeType && "source" == j.tagName.toLowerCase() && (e = j.getAttribute("src"), j = this.formatType(e,
                j.getAttribute("type")), f.push({
                type: j,
                url: e
            }));
        !d && (0 < f.length && null !== f[0].url && -1 < this.getTypeFromFile(f[0].url).indexOf("audio")) && (h.isVideo = !1);
        mejs.MediaFeatures.isBustedAndroid && (b.canPlayType = function(a) {
            return a.match(/video\/(mp4|m4v)/gi) !== null ? "maybe" : ""
        });
        if (c && ("auto" === a.mode || "auto_plugin" === a.mode || "native" === a.mode)) {
            d || (g = document.createElement(h.isVideo ? "video" : "audio"), b.parentNode.insertBefore(g, b), b.style.display = "none", h.htmlMediaElement = b = g);
            for (g = 0; g < f.length; g++)
                if ("" !==
                    b.canPlayType(f[g].type).replace(/no/, "") || "" !== b.canPlayType(f[g].type.replace(/mp3/, "mpeg")).replace(/no/, "")) {
                    h.method = "native";
                    h.url = f[g].url;
                    break
                }
            if ("native" === h.method && (null !== h.url && (b.src = h.url), "auto_plugin" !== a.mode)) return h
        }
        if ("auto" === a.mode || "auto_plugin" === a.mode || "shim" === a.mode)
            for (g = 0; g < f.length; g++) {
                j = f[g].type;
                for (b = 0; b < a.plugins.length; b++) {
                    e = a.plugins[b];
                    l = mejs.plugins[e];
                    for (c = 0; c < l.length; c++)
                        if (k = l[c], null == k.version || mejs.PluginDetector.hasPluginVersion(e, k.version))
                            for (d =
                                0; d < k.types.length; d++)
                                if (j == k.types[d]) return h.method = e, h.url = f[g].url, h
                }
            }
        if ("auto_plugin" === a.mode && "native" === h.method) return h;
        "" === h.method && 0 < f.length && (h.url = f[0].url);
        return h
    },
    formatType: function(b, a) {
        return b && !a ? this.getTypeFromFile(b) : a && ~a.indexOf(";") ? a.substr(0, a.indexOf(";")) : a
    },
    getTypeFromFile: function(b) {
        b = b.substring(b.lastIndexOf(".") + 1);
        return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(b) ? "video" : "audio") + "/" + this.getTypeFromExtension(b)
    },
    getTypeFromExtension: function(b) {
        var a =
            b;
        jQuery.each({
            mp4: ["mp4", "m4v"],
            ogg: ["ogg", "ogv", "oga"],
            webm: ["webm", "webmv", "webma"]
        }, function(c, d) {
            -1 < d.indexOf(b) && (a = c)
        });
        return a
    },
    createErrorMessage: function(b, a, c) {
        var d = b.htmlMediaElement,
            e = document.createElement("div");
        e.className = "me-cannotplay";
        try {
            e.style.width = d.width + "px", e.style.height = d.height + "px"
        } catch (f) {}
        e.innerHTML = "" !== c ? '<a href="' + b.url + '"><img src="' + c + '" width="100%" height="100%" /></a>' : '<a href="' + b.url + '"><span>Download File</span></a>';
        d.parentNode.insertBefore(e, d);
        d.style.display = "none";
        a.error(d)
    },
    createPlugin: function(b, a, c, d, e, f) {
        var c = b.htmlMediaElement,
            g = 1,
            j = 1,
            h = "me_" + b.method + "_" + mejs.meIndex++,
            l = new mejs.PluginMediaElement(h, b.method, b.url),
            k = document.createElement("div"),
            m;
        l.tagName = c.tagName;
        for (m = 0; m < c.attributes.length; m++) {
            var n = c.attributes[m];
            !0 == n.specified && l.setAttribute(n.name, n.value)
        }
        for (m = c.parentNode; null !== m && "body" != m.tagName.toLowerCase();) {
            if ("p" == m.parentNode.tagName.toLowerCase()) {
                m.parentNode.parentNode.insertBefore(m, m.parentNode);
                break
            }
            m = m.parentNode
        }
        b.isVideo ? (g = 0 < a.videoWidth ? a.videoWidth : null !== c.getAttribute("width") ? c.getAttribute("width") : a.defaultVideoWidth, j = 0 < a.videoHeight ? a.videoHeight : null !== c.getAttribute("height") ? c.getAttribute("height") : a.defaultVideoHeight, g = mejs.Utility.encodeUrl(g), j = mejs.Utility.encodeUrl(j)) : a.enablePluginDebug && (g = 320, j = 240);
        l.success = a.success;
        mejs.MediaPluginBridge.registerPluginElement(h, l, c);
        k.className = "me-plugin";
        k.id = h + "_container";
        b.isVideo ? c.parentNode.insertBefore(k, c) : document.body.insertBefore(k,
            document.body.childNodes[0]);
        d = ["id=" + h, "isvideo=" + (b.isVideo ? "true" : "false"), "autoplay=" + (d ? "true" : "false"), "preload=" + e, "width=" + g, "startvolume=" + a.startVolume, "timerrate=" + a.timerRate, "height=" + j];
        null !== b.url && ("flash" == b.method ? d.push("file=" + mejs.Utility.encodeUrl(b.url)) : d.push("file=" + b.url));
        a.enablePluginDebug && d.push("debug=true");
        a.enablePluginSmoothing && d.push("smoothing=true");
        f && d.push("controls=true");
        a.pluginVars && (d = d.concat(a.pluginVars));
        switch (b.method) {
            case "silverlight":
                k.innerHTML =
                    '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + h + '" name="' + h + '" width="' + g + '" height="' + j + '"><param name="initParams" value="' + d.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + a.pluginPath + a.silverlightName + '" /></object>';
                break;
            case "flash":
                mejs.MediaFeatures.isIE ? (b = document.createElement("div"),
                        k.appendChild(b), b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + h + '" width="' + g + '" height="' + j + '"><param name="movie" value="' + a.pluginPath + a.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + d.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') :
                    k.innerHTML = '<embed id="' + h + '" name="' + h + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + a.pluginPath + a.flashName + '" flashvars="' + d.join("&") + '" width="' + g + '" height="' + j + '"></embed>';
                break;
            case "youtube":
                a = b.url.substr(b.url.lastIndexOf("=") + 1);
                youtubeSettings = {
                    container: k,
                    containerId: k.id,
                    pluginMediaElement: l,
                    pluginId: h,
                    videoId: a,
                    height: j,
                    width: g
                };
                mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                break;
            case "vimeo":
                l.vimeoid = b.url.substr(b.url.lastIndexOf("/") + 1), k.innerHTML = '<object width="' + g + '" height="' + j + '"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="flashvars" value="api=1" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=' + l.vimeoid +
                    '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" /><embed src="//vimeo.com/moogaloop.swf?api=1&amp;clip_id=' + l.vimeoid + '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="' + g + '" height="' + j + '"></embed></object>'
        }
        c.style.display = "none";
        return l
    },
    updateNative: function(b, a) {
        var c = b.htmlMediaElement,
            d;
        for (d in mejs.HtmlMediaElement) c[d] = mejs.HtmlMediaElement[d];
        a.success(c, c);
        return c
    }
};
mejs.YouTubeApi = {
    isIframeStarted: !1,
    isIframeLoaded: !1,
    loadIframeApi: function() {
        if (!this.isIframeStarted) {
            var b = document.createElement("script");
            b.src = "http://www.youtube.com/player_api";
            var a = document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(b, a);
            this.isIframeStarted = !0
        }
    },
    iframeQueue: [],
    enqueueIframe: function(b) {
        this.isLoaded ? this.createIframe(b) : (this.loadIframeApi(), this.iframeQueue.push(b))
    },
    createIframe: function(b) {
        var a = b.pluginMediaElement,
            c = new YT.Player(b.containerId, {
                height: b.height,
                width: b.width,
                videoId: b.videoId,
                playerVars: {
                    controls: 0
                },
                events: {
                    onReady: function() {
                        b.pluginMediaElement.pluginApi = c;
                        mejs.MediaPluginBridge.initPlugin(b.pluginId);
                        setInterval(function() {
                            mejs.YouTubeApi.createEvent(c, a, "timeupdate")
                        }, 250)
                    },
                    onStateChange: function(b) {
                        mejs.YouTubeApi.handleStateChange(b.data, c, a)
                    }
                }
            })
    },
    createEvent: function(b, a, c) {
        c = {
            type: c,
            target: a
        };
        if (b && b.getDuration) {
            a.currentTime = c.currentTime = b.getCurrentTime();
            a.duration = c.duration = b.getDuration();
            c.paused = a.paused;
            c.ended = a.ended;
            c.muted = b.isMuted();
            c.volume = b.getVolume() / 100;
            c.bytesTotal = b.getVideoBytesTotal();
            c.bufferedBytes = b.getVideoBytesLoaded();
            var d = c.bufferedBytes / c.bytesTotal * c.duration;
            c.target.buffered = c.buffered = {
                start: function() {
                    return 0
                },
                end: function() {
                    return d
                },
                length: 1
            }
        }
        a.dispatchEvent(c.type, c)
    },
    iFrameReady: function() {
        for (this.isIframeLoaded = this.isLoaded = !0; 0 < this.iframeQueue.length;) this.createIframe(this.iframeQueue.pop())
    },
    flashPlayers: {},
    createFlash: function(b) {
        this.flashPlayers[b.pluginId] = b;
        var a, c =
            "http://www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + b.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        mejs.MediaFeatures.isIE ? (a = document.createElement("div"), b.container.appendChild(a), a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + b.pluginId + '" width="' + b.width + '" height="' + b.height + '"><param name="movie" value="' + c + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') :
            b.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + b.pluginId + '" data="' + c + '" width="' + b.width + '" height="' + b.height + '" style="visibility: visible; "><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    },
    flashReady: function(b) {
        var a = this.flashPlayers[b],
            c = document.getElementById(b),
            d = a.pluginMediaElement;
        d.pluginApi = d.pluginElement = c;
        mejs.MediaPluginBridge.initPlugin(b);
        c.cueVideoById(a.videoId);
        b = a.containerId + "_callback";
        window[b] =
            function(a) {
                mejs.YouTubeApi.handleStateChange(a, c, d)
            };
        c.addEventListener("onStateChange", b);
        setInterval(function() {
            mejs.YouTubeApi.createEvent(c, d, "timeupdate")
        }, 250)
    },
    handleStateChange: function(b, a, c) {
        switch (b) {
            case -1:
                c.paused = !0;
                c.ended = !0;
                mejs.YouTubeApi.createEvent(a, c, "loadedmetadata");
                break;
            case 0:
                c.paused = !1;
                c.ended = !0;
                mejs.YouTubeApi.createEvent(a, c, "ended");
                break;
            case 1:
                c.paused = !1;
                c.ended = !1;
                mejs.YouTubeApi.createEvent(a, c, "play");
                mejs.YouTubeApi.createEvent(a, c, "playing");
                break;
            case 2:
                c.paused = !0;
                c.ended = !1;
                mejs.YouTubeApi.createEvent(a, c, "pause");
                break;
            case 3:
                mejs.YouTubeApi.createEvent(a, c, "progress")
        }
    }
};

function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}

function onYouTubePlayerReady(b) {
    mejs.YouTubeApi.flashReady(b)
}
window.mejs = mejs;
window.MediaElement = mejs.MediaElement;
"undefined" != typeof jQuery ? mejs.$ = jQuery : "undefined" != typeof ender && (mejs.$ = ender);
(function(b) {
    mejs.MepDefaults = {
        poster: "",
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function(a) {
            return a.duration * 0.05
        },
        defaultSeekForwardInterval: function(a) {
            return a.duration * 0.05
        },
        audioWidth: -1,
        audioHeight: -1,
        startVolume: 0.8,
        loop: false,
        enableAutosize: true,
        alwaysShowHours: false,
        showTimecodeFrameCount: false,
        framesPerSecond: 25,
        autosizeProgress: true,
        alwaysShowControls: false,
        iPadUseNativeControls: false,
        iPhoneUseNativeControls: false,
        AndroidUseNativeControls: false,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: true,
        enableKeyboard: true,
        pauseOtherPlayers: true,
        keyActions: [{
            keys: [32, 179],
            action: function(a, b) {
                b.paused || b.ended ? b.play() : b.pause()
            }
        }, {
            keys: [38],
            action: function(a, b) {
                var d = Math.min(b.volume + 0.1, 1);
                b.setVolume(d)
            }
        }, {
            keys: [40],
            action: function(a, b) {
                var d = Math.max(b.volume - 0.1, 0);
                b.setVolume(d)
            }
        }, {
            keys: [37, 227],
            action: function(a, b) {
                if (!isNaN(b.duration) &&
                    b.duration > 0) {
                    if (a.isVideo) {
                        a.showControls();
                        a.startControlsTimer()
                    }
                    var d = Math.max(b.currentTime - a.options.defaultSeekBackwardInterval(b), 0);
                    b.setCurrentTime(d)
                }
            }
        }, {
            keys: [39, 228],
            action: function(a, b) {
                if (!isNaN(b.duration) && b.duration > 0) {
                    if (a.isVideo) {
                        a.showControls();
                        a.startControlsTimer()
                    }
                    var d = Math.min(b.currentTime + a.options.defaultSeekForwardInterval(b), b.duration);
                    b.setCurrentTime(d)
                }
            }
        }, {
            keys: [70],
            action: function(a) {
                typeof a.enterFullScreen != "undefined" && (a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen())
            }
        }]
    };
    mejs.mepIndex = 0;
    mejs.players = [];
    mejs.MediaElementPlayer = function(a, c) {
        if (!(this instanceof mejs.MediaElementPlayer)) return new mejs.MediaElementPlayer(a, c);
        this.$media = this.$node = b(a);
        this.node = this.media = this.$media[0];
        if (typeof this.node.player != "undefined") return this.node.player;
        this.node.player = this;
        typeof c == "undefined" && (c = this.$node.data("mejsoptions"));
        this.options = b.extend({}, mejs.MepDefaults, c);
        mejs.players.push(this);
        this.init();
        return this
    };
    mejs.MediaElementPlayer.prototype = {
        hasFocus: false,
        controlsAreVisible: true,
        init: function() {
            var a = this,
                c = mejs.MediaFeatures,
                d = b.extend(true, {}, a.options, {
                    success: function(b, c) {
                        a.meReady(b, c)
                    },
                    error: function(b) {
                        a.handleError(b)
                    }
                }),
                e = a.media.tagName.toLowerCase();
            a.isDynamic = e !== "audio" && e !== "video";
            a.isVideo = a.isDynamic ? a.options.isVideo : e !== "audio" && a.options.isVideo;
            if (c.isiPad && a.options.iPadUseNativeControls || c.isiPhone && a.options.iPhoneUseNativeControls) {
                a.$media.attr("controls", "controls");
                if (c.isiPad && a.media.getAttribute("autoplay") !== null) {
                    a.media.load();
                    a.media.play()
                }
            } else if (!c.isAndroid || !a.AndroidUseNativeControls) {
                a.$media.removeAttr("controls");
                a.id = "mep_" + mejs.mepIndex++;
                a.container = b('<div id="' + a.id + '" class="mejs-container"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(a.$media[0].className).insertBefore(a.$media);
                a.container.addClass((c.isAndroid ? "mejs-android " : "") + (c.isiOS ? "mejs-ios " : "") + (c.isiPad ? "mejs-ipad " :
                    "") + (c.isiPhone ? "mejs-iphone " : "") + (a.isVideo ? "mejs-video " : "mejs-audio "));
                if (c.isiOS) {
                    c = a.$media.clone();
                    a.container.find(".mejs-mediaelement").append(c);
                    a.$media.remove();
                    a.$node = a.$media = c;
                    a.node = a.media = c[0]
                } else a.container.find(".mejs-mediaelement").append(a.$media);
                a.controls = a.container.find(".mejs-controls");
                a.layers = a.container.find(".mejs-layers");
                c = a.isVideo ? "video" : "audio";
                e = c.substring(0, 1).toUpperCase() + c.substring(1);
                a.width = a.options[c + "Width"] > 0 || a.options[c + "Width"].toString().indexOf("%") >
                    -1 ? a.options[c + "Width"] : a.media.style.width !== "" && a.media.style.width !== null ? a.media.style.width : a.media.getAttribute("width") !== null ? a.$media.attr("width") : a.options["default" + e + "Width"];
                a.height = a.options[c + "Height"] > 0 || a.options[c + "Height"].toString().indexOf("%") > -1 ? a.options[c + "Height"] : a.media.style.height !== "" && a.media.style.height !== null ? a.media.style.height : a.$media[0].getAttribute("height") !== null ? a.$media.attr("height") : a.options["default" + e + "Height"];
                a.setPlayerSize(a.width, a.height);
                d.pluginWidth = a.height;
                d.pluginHeight = a.width
            }
            mejs.MediaElement(a.$media[0], d)
        },
        showControls: function(a) {
            var b = this;
            if (!b.controlsAreVisible) {
                if (typeof a == "undefined" || a) {
                    b.controls.css("visibility", "visible").stop(true, true).fadeIn(200, function() {
                        b.controlsAreVisible = true
                    });
                    b.container.find(".mejs-control").css("visibility", "visible").stop(true, true).fadeIn(200, function() {
                        b.controlsAreVisible = true
                    })
                } else {
                    b.controls.css("visibility", "visible").css("display", "block");
                    b.container.find(".mejs-control").css("visibility",
                        "visible").css("display", "block");
                    b.controlsAreVisible = true
                }
                b.setControlsSize()
            }
        },
        hideControls: function(a) {
            var c = this;
            if (c.controlsAreVisible)
                if (typeof a == "undefined" || a) {
                    c.controls.stop(true, true).fadeOut(200, function() {
                        b(this).css("visibility", "hidden").css("display", "block");
                        c.controlsAreVisible = false
                    });
                    c.container.find(".mejs-control").stop(true, true).fadeOut(200, function() {
                        b(this).css("visibility", "hidden").css("display", "block")
                    })
                } else {
                    c.controls.css("visibility", "hidden").css("display", "block");
                    c.container.find(".mejs-control").css("visibility", "hidden").css("display", "block");
                    c.controlsAreVisible = false
                }
        },
        controlsTimer: null,
        startControlsTimer: function(a) {
            var b = this,
                a = typeof a != "undefined" ? a : 1500;
            b.killControlsTimer("start");
            b.controlsTimer = setTimeout(function() {
                b.hideControls();
                b.killControlsTimer("hide")
            }, a)
        },
        killControlsTimer: function() {
            if (this.controlsTimer !== null) {
                clearTimeout(this.controlsTimer);
                delete this.controlsTimer;
                this.controlsTimer = null
            }
        },
        controlsEnabled: true,
        disableControls: function() {
            this.killControlsTimer();
            this.hideControls(false);
            this.controlsEnabled = false
        },
        enableControls: function() {
            this.showControls(false);
            this.controlsEnabled = true
        },
        meReady: function(a, c) {
            var d = this,
                e = mejs.MediaFeatures,
                f = c.getAttribute("autoplay"),
                f = !(typeof f == "undefined" || f === null || f === "false"),
                g;
            if (!d.created) {
                d.created = true;
                d.media = a;
                d.domNode = c;
                if ((!e.isAndroid || !d.options.AndroidUseNativeControls) && (!e.isiPad || !d.options.iPadUseNativeControls) && (!e.isiPhone || !d.options.iPhoneUseNativeControls)) {
                    d.buildposter(d, d.controls, d.layers,
                        d.media);
                    d.buildkeyboard(d, d.controls, d.layers, d.media);
                    d.buildoverlays(d, d.controls, d.layers, d.media);
                    d.findTracks();
                    for (g in d.options.features) {
                        e = d.options.features[g];
                        if (d["build" + e]) try {
                            d["build" + e](d, d.controls, d.layers, d.media)
                        } catch (j) {}
                    }
                    d.container.trigger("controlsready");
                    d.setPlayerSize(d.width, d.height);
                    d.setControlsSize();
                    if (d.isVideo) {
                        if (mejs.MediaFeatures.hasTouch) d.$media.bind("touchstart", function() {
                            d.controlsAreVisible ? d.hideControls(false) : d.controlsEnabled && d.showControls(false)
                        });
                        else {
                            (d.media.pluginType == "native" ? d.$media : b(d.media.pluginElement)).click(function() {
                                a.paused ? a.play() : a.pause()
                            });
                            d.container.bind("mouseenter mouseover", function() {
                                if (d.controlsEnabled && !d.options.alwaysShowControls) {
                                    d.killControlsTimer("enter");
                                    d.showControls();
                                    d.startControlsTimer(2500)
                                }
                            }).bind("mousemove", function() {
                                if (d.controlsEnabled) {
                                    d.controlsAreVisible || d.showControls();
                                    d.options.alwaysShowControls || d.startControlsTimer(2500)
                                }
                            }).bind("mouseleave", function() {
                                d.controlsEnabled && !d.media.paused &&
                                    !d.options.alwaysShowControls && d.startControlsTimer(1E3)
                            })
                        }
                        f && !d.options.alwaysShowControls && d.hideControls();
                        d.options.enableAutosize && d.media.addEventListener("loadedmetadata", function(a) {
                            if (d.options.videoHeight <= 0 && d.domNode.getAttribute("height") === null && !isNaN(a.target.videoHeight)) {
                                d.setPlayerSize(a.target.videoWidth, a.target.videoHeight);
                                d.setControlsSize();
                                d.media.setVideoSize(a.target.videoWidth, a.target.videoHeight)
                            }
                        }, false)
                    }
                    a.addEventListener("play", function() {
                        for (var a = 0, b = mejs.players.length; a <
                            b; a++) {
                            var c = mejs.players[a];
                            c.id != d.id && (d.options.pauseOtherPlayers && !c.paused && !c.ended) && c.pause();
                            c.hasFocus = false
                        }
                        d.hasFocus = true
                    }, false);
                    d.media.addEventListener("ended", function() {
                        try {
                            d.media.setCurrentTime(0)
                        } catch (a) {}
                        d.media.pause();
                        d.setProgressRail && d.setProgressRail();
                        d.setCurrentRail && d.setCurrentRail();
                        d.options.loop ? d.media.play() : !d.options.alwaysShowControls && d.controlsEnabled && d.showControls()
                    }, false);
                    d.media.addEventListener("loadedmetadata", function() {
                        d.updateDuration && d.updateDuration();
                        d.updateCurrent && d.updateCurrent();
                        if (!d.isFullScreen) {
                            d.setPlayerSize(d.width, d.height);
                            d.setControlsSize()
                        }
                    }, false);
                    setTimeout(function() {
                        d.setPlayerSize(d.width, d.height);
                        d.setControlsSize()
                    }, 50);
                    b(window).resize(function() {
                        d.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || d.setPlayerSize(d.width, d.height);
                        d.setControlsSize()
                    });
                    d.media.pluginType == "youtube" && d.container.find(".mejs-overlay-play").hide()
                }
                if (f && a.pluginType == "native") {
                    a.load();
                    a.play()
                }
                if (d.options.success)
                    if (typeof d.options.success ==
                        "string") window[d.options.success](d.media, d.domNode, d);
                    else d.options.success(d.media, d.domNode, d)
            }
        },
        handleError: function(a) {
            this.controls.hide();
            this.options.error && this.options.error(a)
        },
        setPlayerSize: function(a, c) {
            if (typeof a != "undefined") this.width = a;
            if (typeof c != "undefined") this.height = c;
            if (this.height.toString().indexOf("%") > 0) {
                var d = this.media.videoWidth && this.media.videoWidth > 0 ? this.media.videoWidth : this.options.defaultVideoWidth,
                    e = this.media.videoHeight && this.media.videoHeight > 0 ? this.media.videoHeight :
                    this.options.defaultVideoHeight,
                    f = this.container.parent().width(),
                    d = parseInt(f * e / d, 10);
                if (this.container.parent()[0].tagName.toLowerCase() === "body") {
                    f = b(window).width();
                    d = b(window).height()
                }
                if (d != 0) {
                    this.container.width(f).height(d);
                    this.$media.width("100%").height("100%");
                    this.container.find("object, embed, iframe").width("100%").height("100%");
                    this.isVideo && this.media.setVideoSize && this.media.setVideoSize(f, d);
                    this.layers.children(".mejs-layer").width("100%").height("100%")
                }
            } else {
                this.container.width(this.width).height(this.height);
                this.layers.children(".mejs-layer").width(this.width).height(this.height)
            }
        },
        setControlsSize: function() {
            var a = 0,
                c = 0,
                d = this.controls.find(".mejs-time-rail"),
                e = this.controls.find(".mejs-time-total");
            this.controls.find(".mejs-time-current");
            this.controls.find(".mejs-time-loaded");
            var f = d.siblings();
            this.options && !this.options.autosizeProgress && (c = parseInt(d.css("width")));
            if (c === 0 || !c) {
                f.each(function() {
                    b(this).css("position") != "absolute" && (a = a + b(this).outerWidth(true))
                });
                c = this.controls.width() - a - (d.outerWidth(true) -
                    d.width())
            }
            d.width(c);
            e.width(c - (e.outerWidth(true) - e.width()));
            this.setProgressRail && this.setProgressRail();
            this.setCurrentRail && this.setCurrentRail()
        },
        buildposter: function(a, c, d, e) {
            var f = b('<div class="mejs-poster mejs-layer"></div>').appendTo(d),
                c = a.$media.attr("poster");
            if (a.options.poster !== "") c = a.options.poster;
            c !== "" && c != null ? this.setPoster(c) : f.hide();
            e.addEventListener("play", function() {
                f.hide()
            }, false)
        },
        setPoster: function(a) {
            var c = this.container.find(".mejs-poster"),
                d = c.find("img");
            d.length ==
                0 && (d = b('<img width="100%" height="100%" />').appendTo(c));
            d.attr("src", a)
        },
        buildoverlays: function(a, c, d, e) {
            if (a.isVideo) {
                var f = b('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(d),
                    g = b('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(d),
                    j = b('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(d).click(function() {
                        e.paused ?
                            e.play() : e.pause()
                    });
                e.addEventListener("play", function() {
                    j.hide();
                    f.hide();
                    c.find(".mejs-time-buffering").hide();
                    g.hide()
                }, false);
                e.addEventListener("playing", function() {
                    j.hide();
                    f.hide();
                    c.find(".mejs-time-buffering").hide();
                    g.hide()
                }, false);
                e.addEventListener("seeking", function() {
                    f.show();
                    c.find(".mejs-time-buffering").show()
                }, false);
                e.addEventListener("seeked", function() {
                    f.hide();
                    c.find(".mejs-time-buffering").hide()
                }, false);
                e.addEventListener("pause", function() {
                        mejs.MediaFeatures.isiPhone || j.show()
                    },
                    false);
                e.addEventListener("waiting", function() {
                    f.show();
                    c.find(".mejs-time-buffering").show()
                }, false);
                e.addEventListener("loadeddata", function() {
                    f.show();
                    c.find(".mejs-time-buffering").show()
                }, false);
                e.addEventListener("canplay", function() {
                    f.hide();
                    c.find(".mejs-time-buffering").hide()
                }, false);
                e.addEventListener("error", function() {
                    f.hide();
                    c.find(".mejs-time-buffering").hide();
                    g.show();
                    g.find("mejs-overlay-error").html("Error loading this resource")
                }, false)
            }
        },
        buildkeyboard: function(a, c, d, e) {
            b(document).keydown(function(b) {
                if (a.hasFocus &&
                    a.options.enableKeyboard)
                    for (var c = 0, d = a.options.keyActions.length; c < d; c++)
                        for (var h = a.options.keyActions[c], l = 0, k = h.keys.length; l < k; l++)
                            if (b.keyCode == h.keys[l]) {
                                b.preventDefault();
                                h.action(a, e, b.keyCode);
                                return false
                            }
                return true
            });
            b(document).click(function(c) {
                if (b(c.target).closest(".mejs-container").length == 0) a.hasFocus = false
            })
        },
        findTracks: function() {
            var a = this,
                c = a.$media.find("track");
            a.tracks = [];
            c.each(function(c, e) {
                e = b(e);
                a.tracks.push({
                    srclang: e.attr("srclang").toLowerCase(),
                    src: e.attr("src"),
                    kind: e.attr("kind"),
                    label: e.attr("label") || "",
                    entries: [],
                    isLoaded: false
                })
            })
        },
        changeSkin: function(a) {
            this.container[0].className = "mejs-container " + a;
            this.setPlayerSize(this.width, this.height);
            this.setControlsSize()
        },
        play: function() {
            this.media.play()
        },
        pause: function() {
            this.media.pause()
        },
        load: function() {
            this.media.load()
        },
        setMuted: function(a) {
            this.media.setMuted(a)
        },
        setCurrentTime: function(a) {
            this.media.setCurrentTime(a)
        },
        getCurrentTime: function() {
            return this.media.currentTime
        },
        setVolume: function(a) {
            this.media.setVolume(a)
        },
        getVolume: function() {
            return this.media.volume
        },
        setSrc: function(a) {
            this.media.setSrc(a)
        },
        remove: function() {
            this.media.pluginType === "flash" ? this.media.remove() : this.media.pluginType === "native" && this.$media.prop("controls", true);
            this.isDynamic || this.$node.insertBefore(this.container);
            this.container.remove()
        }
    };
    if (typeof jQuery != "undefined") jQuery.fn.mediaelementplayer = function(a) {
        return this.each(function() {
            new mejs.MediaElementPlayer(this, a)
        })
    };
    b(document).ready(function() {
        b(".mejs-player").mediaelementplayer()
    });
    window.MediaElementPlayer = mejs.MediaElementPlayer
})(mejs.$);
(function(b) {
    b.extend(mejs.MepDefaults, {
        playpauseText: "Play/Pause"
    });
    b.extend(MediaElementPlayer.prototype, {
        buildplaypause: function(a, c, d, e) {
            var f = b('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + this.id + '" title="' + this.options.playpauseText + '"></button></div>').appendTo(c).click(function(a) {
                a.preventDefault();
                e.paused ? e.play() : e.pause();
                return false
            });
            e.addEventListener("play", function() {
                f.removeClass("mejs-play").addClass("mejs-pause")
            }, false);
            e.addEventListener("playing", function() {
                f.removeClass("mejs-play").addClass("mejs-pause")
            }, false);
            e.addEventListener("pause", function() {
                f.removeClass("mejs-pause").addClass("mejs-play")
            }, false);
            e.addEventListener("paused", function() {
                f.removeClass("mejs-pause").addClass("mejs-play")
            }, false)
        }
    })
})(mejs.$);
(function(b) {
    b.extend(mejs.MepDefaults, {
        stopText: "Stop"
    });
    b.extend(MediaElementPlayer.prototype, {
        buildstop: function(a, c, d, e) {
            b('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + this.id + '" title="' + this.options.stopText + '"></button></div>').appendTo(c).click(function() {
                e.paused || e.pause();
                if (e.currentTime > 0) {
                    e.setCurrentTime(0);
                    c.find(".mejs-time-current").width("0px");
                    c.find(".mejs-time-handle").css("left", "0px");
                    c.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0));
                    c.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0));
                    d.find(".mejs-poster").show()
                }
            })
        }
    })
})(mejs.$);
(function(b) {
    b.extend(MediaElementPlayer.prototype, {
        buildprogress: function(a, c, d, e) {
            b('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(c);
            c.find(".mejs-time-buffering").hide();
            var f =
                c.find(".mejs-time-total"),
                d = c.find(".mejs-time-loaded"),
                g = c.find(".mejs-time-current"),
                j = c.find(".mejs-time-handle"),
                h = c.find(".mejs-time-float"),
                l = c.find(".mejs-time-float-current"),
                k = function(a) {
                    var a = a.pageX,
                        b = f.offset(),
                        c = f.outerWidth(),
                        d = 0,
                        d = 0,
                        g = a - b.left;
                    if (a > b.left && a <= c + b.left && e.duration) {
                        d = (a - b.left) / c;
                        d = d <= 0.02 ? 0 : d * e.duration;
                        m && e.setCurrentTime(d);
                        if (!mejs.MediaFeatures.hasTouch) {
                            h.css("left", g);
                            l.html(mejs.Utility.secondsToTimeCode(d));
                            h.show()
                        }
                    }
                },
                m = false;
            f.bind("mousedown", function(a) {
                if (a.which ===
                    1) {
                    m = true;
                    k(a);
                    b(document).bind("mousemove.dur", function(a) {
                        k(a)
                    }).bind("mouseup.dur", function() {
                        m = false;
                        h.hide();
                        b(document).unbind(".dur")
                    });
                    return false
                }
            }).bind("mouseenter", function() {
                b(document).bind("mousemove.dur", function(a) {
                    k(a)
                });
                mejs.MediaFeatures.hasTouch || h.show()
            }).bind("mouseleave", function() {
                if (!m) {
                    b(document).unbind(".dur");
                    h.hide()
                }
            });
            e.addEventListener("progress", function(b) {
                a.setProgressRail(b);
                a.setCurrentRail(b)
            }, false);
            e.addEventListener("timeupdate", function(b) {
                a.setProgressRail(b);
                a.setCurrentRail(b)
            }, false);
            this.loaded = d;
            this.total = f;
            this.current = g;
            this.handle = j
        },
        setProgressRail: function(a) {
            var b = a != void 0 ? a.target : this.media,
                d = null;
            b && b.buffered && b.buffered.length > 0 && b.buffered.end && b.duration ? d = b.buffered.end(0) / b.duration : b && b.bytesTotal != void 0 && b.bytesTotal > 0 && b.bufferedBytes != void 0 ? d = b.bufferedBytes / b.bytesTotal : a && (a.lengthComputable && a.total != 0) && (d = a.loaded / a.total);
            if (d !== null) {
                d = Math.min(1, Math.max(0, d));
                this.loaded && this.total && this.loaded.width(this.total.width() *
                    d)
            }
        },
        setCurrentRail: function() {
            if (this.media.currentTime != void 0 && this.media.duration && this.total && this.handle) {
                var a = this.total.width() * this.media.currentTime / this.media.duration,
                    b = a - this.handle.outerWidth(true) / 2;
                this.current.width(a);
                this.handle.css("left", b)
            }
        }
    })
})(mejs.$);
(function(b) {
    b.extend(mejs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: " <span> | </span> "
    });
    b.extend(MediaElementPlayer.prototype, {
        buildcurrent: function(a, c, d, e) {
            b('<div class="mejs-time"><span class="mejs-currenttime">' + (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(c);
            this.currenttime = this.controls.find(".mejs-currenttime");
            e.addEventListener("timeupdate", function() {
                a.updateCurrent()
            }, false)
        },
        buildduration: function(a,
            c, d, e) {
            if (c.children().last().find(".mejs-currenttime").length > 0) b(this.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(c.find(".mejs-time"));
            else {
                c.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container");
                b('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(c)
            }
            this.durationD = this.controls.find(".mejs-duration");
            e.addEventListener("timeupdate", function() {
                    a.updateDuration()
                },
                false)
        },
        updateCurrent: function() {
            this.currenttime && this.currenttime.html(mejs.Utility.secondsToTimeCode(this.media.currentTime, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        },
        updateDuration: function() {
            this.media.duration && this.durationD && this.durationD.html(mejs.Utility.secondsToTimeCode(this.media.duration, this.options.alwaysShowHours, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        }
    })
})(mejs.$);
(function(b) {
    b.extend(mejs.MepDefaults, {
        muteText: "Mute Toggle",
        hideVolumeOnTouchDevices: true,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    });
    b.extend(MediaElementPlayer.prototype, {
        buildvolume: function(a, c, d, e) {
            if (!mejs.MediaFeatures.hasTouch || !this.options.hideVolumeOnTouchDevices) {
                var f = this.isVideo ? this.options.videoVolume : this.options.audioVolume,
                    g = f == "horizontal" ? b('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + this.id + '" title="' + this.options.muteText +
                        '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(c) : b('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + this.id + '" title="' + this.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(c),
                    j = this.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
                    h = this.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
                    l = this.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
                    k = this.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
                    m = function(a, b) {
                        if (!j.is(":visible") && typeof b != "undefined") {
                            j.show();
                            m(a, true);
                            j.hide()
                        } else {
                            a = Math.max(0, a);
                            a = Math.min(a, 1);
                            a == 0 ? g.removeClass("mejs-mute").addClass("mejs-unmute") : g.removeClass("mejs-unmute").addClass("mejs-mute");
                            if (f == "vertical") {
                                var c = h.height(),
                                    d = h.position(),
                                    e = c - c * a;
                                k.css("top", d.top + e - k.height() / 2);
                                l.height(c - e);
                                l.css("top", d.top + e)
                            } else {
                                c = h.width();
                                d = h.position();
                                c = c * a;
                                k.css("left", d.left + c - k.width() / 2);
                                l.width(c)
                            }
                        }
                    },
                    n = function(a) {
                        var b = null,
                            c = h.offset();
                        if (f == "vertical") {
                            b = h.height();
                            parseInt(h.css("top").replace(/px/, ""), 10);
                            b = (b - (a.pageY - c.top)) / b;
                            if (c.top == 0 || c.left == 0) return
                        } else {
                            b = h.width();
                            b = (a.pageX - c.left) / b
                        }
                        b = Math.max(0, b);
                        b = Math.min(b, 1);
                        m(b);
                        b == 0 ? e.setMuted(true) : e.setMuted(false);
                        e.setVolume(b)
                    },
                    o = false,
                    p = false;
                g.hover(function() {
                    j.show();
                    p = true
                }, function() {
                    p = false;
                    !o && f == "vertical" && j.hide()
                });
                j.bind("mouseover", function() {
                    p = true
                }).bind("mousedown", function(a) {
                    n(a);
                    b(document).bind("mousemove.vol", function(a) {
                        n(a)
                    }).bind("mouseup.vol", function() {
                        o = false;
                        b(document).unbind(".vol");
                        !p && f == "vertical" && j.hide()
                    });
                    o = true;
                    return false
                });
                g.find("button").click(function() {
                    e.setMuted(!e.muted)
                });
                e.addEventListener("volumechange", function() {
                    if (!o)
                        if (e.muted) {
                            m(0);
                            g.removeClass("mejs-mute").addClass("mejs-unmute")
                        } else {
                            m(e.volume);
                            g.removeClass("mejs-unmute").addClass("mejs-mute")
                        }
                }, false);
                if (this.container.is(":visible")) {
                    m(a.options.startVolume);
                    e.pluginType === "native" && e.setVolume(a.options.startVolume)
                }
            }
        }
    })
})(mejs.$);
(function(b) {
    b.extend(mejs.MepDefaults, {
        usePluginFullScreen: true,
        newWindowCallback: function() {
            return ""
        },
        fullscreenText: "Fullscreen"
    });
    b.extend(MediaElementPlayer.prototype, {
        isFullScreen: false,
        isNativeFullScreen: false,
        docStyleOverflow: null,
        isInIframe: false,
        buildfullscreen: function(a, c, d, e) {
            if (a.isVideo) {
                a.isInIframe = window.location != window.parent.location;
                if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    d = null;
                    d = mejs.MediaFeatures.hasMozNativeFullScreen ? b(document) : a.container;
                    d.bind(mejs.MediaFeatures.fullScreenEventName,
                        function() {
                            if (mejs.MediaFeatures.isFullScreen()) {
                                a.isNativeFullScreen = true;
                                a.setControlsSize()
                            } else {
                                a.isNativeFullScreen = false;
                                a.exitFullScreen()
                            }
                        })
                }
                var f = this,
                    g = b('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + f.id + '" title="' + f.options.fullscreenText + '"></button></div>').appendTo(c);
                if (f.media.pluginType === "native" || !f.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) g.click(function() {
                    mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() ||
                        a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
                });
                else {
                    var j = null;
                    if (function() {
                            var a = document.createElement("x"),
                                b = document.documentElement,
                                c = window.getComputedStyle;
                            if (!("pointerEvents" in a.style)) return false;
                            a.style.pointerEvents = "auto";
                            a.style.pointerEvents = "x";
                            b.appendChild(a);
                            c = c && c(a, "").pointerEvents === "auto";
                            b.removeChild(a);
                            return !!c
                        }() && !mejs.MediaFeatures.isOpera) {
                        var h = false,
                            l = function() {
                                if (h) {
                                    k.hide();
                                    m.hide();
                                    n.hide();
                                    g.css("pointer-events", "");
                                    f.controls.css("pointer-events",
                                        "");
                                    h = false
                                }
                            },
                            k = b('<div class="mejs-fullscreen-hover" />').appendTo(f.container).mouseover(l),
                            m = b('<div class="mejs-fullscreen-hover"  />').appendTo(f.container).mouseover(l),
                            n = b('<div class="mejs-fullscreen-hover"  />').appendTo(f.container).mouseover(l),
                            o = function() {
                                var a = {
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                };
                                k.css(a);
                                m.css(a);
                                n.css(a);
                                k.width(f.container.width()).height(f.container.height() - f.controls.height());
                                a = g.offset().left - f.container.offset().left;
                                fullScreenBtnWidth = g.outerWidth(true);
                                m.width(a).height(f.controls.height()).css({
                                    top: f.container.height() -
                                        f.controls.height()
                                });
                                n.width(f.container.width() - a - fullScreenBtnWidth).height(f.controls.height()).css({
                                    top: f.container.height() - f.controls.height(),
                                    left: a + fullScreenBtnWidth
                                })
                            };
                        b(document).resize(function() {
                            o()
                        });
                        g.mouseover(function() {
                            if (!f.isFullScreen) {
                                var b = g.offset(),
                                    c = a.container.offset();
                                e.positionFullscreenButton(b.left - c.left, b.top - c.top, false);
                                g.css("pointer-events", "none");
                                f.controls.css("pointer-events", "none");
                                k.show();
                                n.show();
                                m.show();
                                o();
                                h = true
                            }
                        });
                        e.addEventListener("fullscreenchange",
                            function() {
                                l()
                            })
                    } else g.mouseover(function() {
                        if (j !== null) {
                            clearTimeout(j);
                            delete j
                        }
                        var b = g.offset(),
                            c = a.container.offset();
                        e.positionFullscreenButton(b.left - c.left, b.top - c.top, true)
                    }).mouseout(function() {
                        if (j !== null) {
                            clearTimeout(j);
                            delete j
                        }
                        j = setTimeout(function() {
                            e.hideFullscreenButton()
                        }, 1500)
                    })
                }
                a.fullscreenBtn = g;
                b(document).bind("keydown", function(b) {
                    (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || f.isFullScreen) && b.keyCode == 27 && a.exitFullScreen()
                })
            }
        },
        enterFullScreen: function() {
            var a =
                this;
            if (!(a.media.pluginType !== "native" && (mejs.MediaFeatures.isFirefox || a.options.usePluginFullScreen))) {
                docStyleOverflow = document.documentElement.style.overflow;
                document.documentElement.style.overflow = "hidden";
                normalHeight = a.container.height();
                normalWidth = a.container.width();
                if (a.media.pluginType === "native")
                    if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                        mejs.MediaFeatures.requestFullScreen(a.container[0]);
                        a.isInIframe && setTimeout(function e() {
                            a.isNativeFullScreen && (b(window).width() !== screen.width ?
                                a.exitFullScreen() : setTimeout(e, 500))
                        }, 500)
                    } else if (mejs.MediaFeatures.hasSemiNativeFullScreen) {
                    a.media.webkitEnterFullscreen();
                    return
                }
                if (a.isInIframe) {
                    var c = a.options.newWindowCallback(this);
                    if (c !== "")
                        if (mejs.MediaFeatures.hasTrueNativeFullScreen) setTimeout(function() {
                            if (!a.isNativeFullScreen) {
                                a.pause();
                                window.open(c, a.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no")
                            }
                        }, 250);
                        else {
                            a.pause();
                            window.open(c, a.id, "top=0,left=0,width=" +
                                screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                            return
                        }
                }
                a.container.addClass("mejs-container-fullscreen").width("100%").height("100%");
                setTimeout(function() {
                    a.container.css({
                        width: "100%",
                        height: "100%"
                    });
                    a.setControlsSize()
                }, 500);
                if (a.pluginType === "native") a.$media.width("100%").height("100%");
                else {
                    a.container.find("object, embed, iframe").width("100%").height("100%");
                    a.media.setVideoSize(b(window).width(), b(window).height())
                }
                a.layers.children("div").width("100%").height("100%");
                a.fullscreenBtn && a.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen");
                a.setControlsSize();
                a.isFullScreen = true
            }
        },
        exitFullScreen: function() {
            if (this.media.pluginType !== "native" && mejs.MediaFeatures.isFirefox) this.media.setFullscreen(false);
            else {
                mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || this.isFullScreen) && mejs.MediaFeatures.cancelFullScreen();
                document.documentElement.style.overflow = docStyleOverflow;
                this.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight);
                if (this.pluginType === "native") this.$media.width(normalWidth).height(normalHeight);
                else {
                    this.container.find("object embed").width(normalWidth).height(normalHeight);
                    this.media.setVideoSize(normalWidth, normalHeight)
                }
                this.layers.children("div").width(normalWidth).height(normalHeight);
                this.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen");
                this.setControlsSize();
                this.isFullScreen = false
            }
        }
    })
})(mejs.$);
(function(b) {
    b.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: "Captions/Subtitles"
    });
    b.extend(MediaElementPlayer.prototype, {
        hasChapters: false,
        buildtracks: function(a, c, d, e) {
            if (a.isVideo && a.tracks.length != 0) {
                var f;
                a.chapters = b('<div class="mejs-chapters mejs-layer"></div>').prependTo(d).hide();
                a.captions = b('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position"><span class="mejs-captions-text"></span></div></div>').prependTo(d).hide();
                a.captionsText = a.captions.find(".mejs-captions-text");
                a.captionsButton = b('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + this.id + '" title="' + this.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + a.id + '_captions" id="' + a.id + '_captions_none" value="none" checked="checked" /><label for="' + a.id + '_captions_none">None</label></li></ul></div></div>').appendTo(c).hover(function() {
                    b(this).find(".mejs-captions-selector").css("visibility", "visible")
                }, function() {
                    b(this).find(".mejs-captions-selector").css("visibility",
                        "hidden")
                }).delegate("input[type=radio]", "click", function() {
                    lang = this.value;
                    if (lang == "none") a.selectedTrack = null;
                    else
                        for (f = 0; f < a.tracks.length; f++)
                            if (a.tracks[f].srclang == lang) {
                                a.selectedTrack = a.tracks[f];
                                a.captions.attr("lang", a.selectedTrack.srclang);
                                a.displayCaptions();
                                break
                            }
                });
                a.options.alwaysShowControls ? a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : a.container.bind("mouseenter", function() {
                    a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                }).bind("mouseleave",
                    function() {
                        e.paused || a.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                    });
                a.trackToLoad = -1;
                a.selectedTrack = null;
                a.isLoadingTrack = false;
                for (f = 0; f < a.tracks.length; f++) a.tracks[f].kind == "subtitles" && a.addTrackButton(a.tracks[f].srclang, a.tracks[f].label);
                a.loadNextTrack();
                e.addEventListener("timeupdate", function() {
                    a.displayCaptions()
                }, false);
                e.addEventListener("loadedmetadata", function() {
                    a.displayChapters()
                }, false);
                a.container.hover(function() {
                    if (a.hasChapters) {
                        a.chapters.css("visibility",
                            "visible");
                        a.chapters.fadeIn(200).height(a.chapters.find(".mejs-chapter").outerHeight())
                    }
                }, function() {
                    a.hasChapters && !e.paused && a.chapters.fadeOut(200, function() {
                        b(this).css("visibility", "hidden");
                        b(this).css("display", "block")
                    })
                });
                a.node.getAttribute("autoplay") !== null && a.chapters.css("visibility", "hidden")
            }
        },
        loadNextTrack: function() {
            this.trackToLoad++;
            if (this.trackToLoad < this.tracks.length) {
                this.isLoadingTrack = true;
                this.loadTrack(this.trackToLoad)
            } else this.isLoadingTrack = false
        },
        loadTrack: function(a) {
            var c =
                this,
                d = c.tracks[a],
                e = function() {
                    d.isLoaded = true;
                    c.enableTrackButton(d.srclang, d.label);
                    c.loadNextTrack()
                };
            d.isTranslation ? mejs.TrackFormatParser.translateTrackText(c.tracks[0].entries, c.tracks[0].srclang, d.srclang, c.options.googleApiKey, function(a) {
                d.entries = a;
                e()
            }) : b.ajax({
                url: d.src,
                success: function(a) {
                    d.entries = mejs.TrackFormatParser.parse(a);
                    e();
                    d.kind == "chapters" && c.media.duration > 0 && c.drawChapters(d)
                },
                error: function() {
                    c.loadNextTrack()
                }
            })
        },
        enableTrackButton: function(a, c) {
            c === "" && (c = mejs.language.codes[a] ||
                a);
            this.captionsButton.find("input[value=" + a + "]").prop("disabled", false).siblings("label").html(c);
            this.options.startLanguage == a && b("#" + this.id + "_captions_" + a).click();
            this.adjustLanguageBox()
        },
        addTrackButton: function(a, c) {
            c === "" && (c = mejs.language.codes[a] || a);
            this.captionsButton.find("ul").append(b('<li><input type="radio" name="' + this.id + '_captions" id="' + this.id + "_captions_" + a + '" value="' + a + '" disabled="disabled" /><label for="' + this.id + "_captions_" + a + '">' + c + " (loading)</label></li>"));
            this.adjustLanguageBox();
            this.container.find(".mejs-captions-translations option[value=" + a + "]").remove()
        },
        adjustLanguageBox: function() {
            this.captionsButton.find(".mejs-captions-selector").height(this.captionsButton.find(".mejs-captions-selector ul").outerHeight(true) + this.captionsButton.find(".mejs-captions-translations").outerHeight(true))
        },
        displayCaptions: function() {
            if (typeof this.tracks != "undefined") {
                var a, b = this.selectedTrack;
                if (b != null && b.isLoaded)
                    for (a = 0; a < b.entries.times.length; a++)
                        if (this.media.currentTime >= b.entries.times[a].start &&
                            this.media.currentTime <= b.entries.times[a].stop) {
                            this.captionsText.html(b.entries.text[a]);
                            this.captions.show().height(0);
                            return
                        }
                this.captions.hide()
            }
        },
        displayChapters: function() {
            var a;
            for (a = 0; a < this.tracks.length; a++)
                if (this.tracks[a].kind == "chapters" && this.tracks[a].isLoaded) {
                    this.drawChapters(this.tracks[a]);
                    this.hasChapters = true;
                    break
                }
        },
        drawChapters: function(a) {
            var c = this,
                d, e, f = e = 0;
            c.chapters.empty();
            for (d = 0; d < a.entries.times.length; d++) {
                e = a.entries.times[d].stop - a.entries.times[d].start;
                e = Math.floor(e /
                    c.media.duration * 100);
                if (e + f > 100 || d == a.entries.times.length - 1 && e + f < 100) e = 100 - f;
                c.chapters.append(b('<div class="mejs-chapter" rel="' + a.entries.times[d].start + '" style="left: ' + f.toString() + "%;width: " + e.toString() + '%;"><div class="mejs-chapter-block' + (d == a.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + a.entries.text[d] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(a.entries.times[d].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(a.entries.times[d].stop) +
                    "</span></div></div>"));
                f = f + e
            }
            c.chapters.find("div.mejs-chapter").click(function() {
                c.media.setCurrentTime(parseFloat(b(this).attr("rel")));
                c.media.paused && c.media.play()
            });
            c.chapters.show()
        }
    });
    mejs.language = {
        codes: {
            af: "Afrikaans",
            sq: "Albanian",
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            ca: "Catalan",
            zh: "Chinese",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            tl: "Filipino",
            fi: "Finnish",
            fr: "French",
            gl: "Galician",
            de: "German",
            el: "Greek",
            ht: "Haitian Creole",
            iw: "Hebrew",
            hi: "Hindi",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            fa: "Persian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            es: "Spanish",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese",
            cy: "Welsh",
            yi: "Yiddish"
        }
    };
    mejs.TrackFormatParser = {
        pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
        pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
        split2: function(a, b) {
            return a.split(b)
        },
        parse: function(a) {
            for (var b = 0, a = this.split2(a, /\r?\n/), d = {
                    text: [],
                    times: []
                }, e, f; b < a.length; b++)
                if (this.pattern_identifier.exec(a[b])) {
                    b++;
                    if ((e = this.pattern_timecode.exec(a[b])) && b < a.length) {
                        b++;
                        f = a[b];
                        for (b++; a[b] !== "" && b < a.length;) {
                            f = f + "\n" + a[b];
                            b++
                        }
                        d.text.push(f);
                        d.times.push({
                            start: mejs.Utility.timeCodeToSeconds(e[1]),
                            stop: mejs.Utility.timeCodeToSeconds(e[3]),
                            settings: e[5]
                        })
                    }
                }
            return d
        }
    };
    if ("x\n\ny".split(/\n/gi).length != 3) mejs.TrackFormatParser.split2 = function(a, b) {
        var d = [],
            e = "",
            f;
        for (f = 0; f < a.length; f++) {
            e = e + a.substring(f, f + 1);
            if (b.test(e)) {
                d.push(e.replace(b, ""));
                e = ""
            }
        }
        d.push(e);
        return d
    }
})(mejs.$);
(function(b) {
    b.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function(a) {
                return typeof a.enterFullScreen == "undefined" ? null : a.isFullScreen ? "Turn off Fullscreen" : "Go Fullscreen"
            },
            click: function(a) {
                a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
            }
        }, {
            render: function(a) {
                return a.media.muted ? "Unmute" : "Mute"
            },
            click: function(a) {
                a.media.muted ? a.setMuted(false) : a.setMuted(true)
            }
        }, {
            isSeparator: true
        }, {
            render: function() {
                return "Download Video"
            },
            click: function(a) {
                window.location.href = a.media.currentSrc
            }
        }]
    });
    b.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function(a) {
            a.contextMenu = b('<div class="mejs-contextmenu"></div>').appendTo(b("body")).hide();
            a.container.bind("contextmenu", function(b) {
                if (a.isContextMenuEnabled) {
                    b.preventDefault();
                    a.renderContextMenu(b.clientX - 1, b.clientY - 1);
                    return false
                }
            });
            a.container.bind("click", function() {
                a.contextMenu.hide()
            });
            a.contextMenu.bind("mouseleave", function() {
                a.startContextMenuTimer()
            })
        },
        isContextMenuEnabled: true,
        enableContextMenu: function() {
            this.isContextMenuEnabled =
                true
        },
        disableContextMenu: function() {
            this.isContextMenuEnabled = false
        },
        contextMenuTimeout: null,
        startContextMenuTimer: function() {
            var a = this;
            a.killContextMenuTimer();
            a.contextMenuTimer = setTimeout(function() {
                a.hideContextMenu();
                a.killContextMenuTimer()
            }, 750)
        },
        killContextMenuTimer: function() {
            var a = this.contextMenuTimer;
            if (a != null) {
                clearTimeout(a);
                delete a
            }
        },
        hideContextMenu: function() {
            this.contextMenu.hide()
        },
        renderContextMenu: function(a, c) {
            for (var d = this, e = "", f = d.options.contextMenuItems, g = 0, j = f.length; g <
                j; g++)
                if (f[g].isSeparator) e = e + '<div class="mejs-contextmenu-separator"></div>';
                else {
                    var h = f[g].render(d);
                    h != null && (e = e + ('<div class="mejs-contextmenu-item" data-itemindex="' + g + '" id="element-' + Math.random() * 1E6 + '">' + h + "</div>"))
                }
            d.contextMenu.empty().append(b(e)).css({
                top: c,
                left: a
            }).show();
            d.contextMenu.find(".mejs-contextmenu-item").each(function() {
                var a = b(this),
                    c = parseInt(a.data("itemindex"), 10),
                    e = d.options.contextMenuItems[c];
                typeof e.show != "undefined" && e.show(a, d);
                a.click(function() {
                    typeof e.click !=
                        "undefined" && e.click(d);
                    d.contextMenu.hide()
                })
            });
            setTimeout(function() {
                d.killControlsTimer("rev3")
            }, 100)
        }
    })
})(mejs.$);