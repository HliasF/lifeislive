/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

(function(d) {
    var e = function() {};
    d.extend(e.prototype, {
        name: "spotlight",
        options: {
            effect: "fade",
            duration: 300,
            transition: "swing",
            cls: "spotlight",
            overlaySelector: ".overlay",
            overlayDefault: "overlay-default"
        },
        initialize: function(c, a) {
            a = d.extend({}, this.options, a, c.data());
            c.attr("data-spotlight") && d.each(c.attr("data-spotlight").split(";"), function(b, c) {
                var d = c.match(/\s*([A-Z_]*?)\s*:\s*(.+)\s*/i);
                d && (a[d[1]] = d[2])
            });
            var b = c.children(a.overlaySelector).first();
            b.length || (b = d("<div>").addClass(a.overlayDefault).appendTo(c));
            b.css({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }).wrapInner("<div>");
            c.css({
                position: "relative",
                overflow: "hidden"
            }).addClass(a.cls);
            c.bind({
                mouseenter: function() {
                    b.stop().css({
                        visibility: "visible",
                        width: c.width(),
                        height: "top" == a.effect || "bottom" == a.effect ? "auto" : c.height()
                    });
                    switch (a.effect) {
                        case "right":
                            b.css({
                                right: -1 * b.width(),
                                top: 0,
                                bottom: 0
                            }).animate({
                                right: 0
                            }, a.duration, a.transition);
                            break;
                        case "left":
                            b.css({
                                left: -1 * b.width(),
                                top: 0,
                                bottom: 0
                            }).animate({
                                left: 0
                            }, a.duration, a.transition);
                            break;
                        case "top":
                            b.css({
                                left: 0,
                                top: -1 * b.height()
                            }).animate({
                                top: 0
                            }, a.duration, a.transition);
                            break;
                        case "bottom":
                            b.css({
                                left: 0,
                                bottom: -1 * b.height()
                            }).animate({
                                bottom: 0
                            }, a.duration, a.transition);
                            break;
                        default:
                            b.show().css({
                                opacity: 0,
                                top: 0,
                                left: 0
                            }).animate({
                                opacity: 1
                            }, a.duration, a.transition, function() {
                                d.support.opacity || (b.get(0).filter = "", b.attr("style", ("" + b.attr("style")).replace(/alpha\(opacity=([\d.]+)\)/i, "")))
                            })
                    }
                },
                mouseleave: function() {
                    b.stop();
                    switch (a.effect) {
                        case "right":
                            b.animate({
                                right: -1 *
                                    b.width()
                            }, a.duration, a.transition);
                            break;
                        case "left":
                            b.animate({
                                left: -1 * b.width()
                            }, a.duration, a.transition);
                            break;
                        case "top":
                            b.animate({
                                top: -1 * b.height()
                            }, a.duration, a.transition);
                            break;
                        case "bottom":
                            b.animate({
                                bottom: -1 * b.height()
                            }, a.duration, a.transition);
                            break;
                        default:
                            b.animate({
                                opacity: 0
                            }, a.duration, a.transition, function() {
                                b.hide()
                            })
                    }
                }
            })
        }
    });
    d.fn[e.prototype.name] = function() {
        var c = arguments,
            a = c[0] ? c[0] : null;
        return this.each(function() {
            var b = d(this);
            if (e.prototype[a] && b.data(e.prototype.name) &&
                "initialize" != a) b.data(e.prototype.name)[a].apply(b.data(e.prototype.name), Array.prototype.slice.call(c, 1));
            else if (!a || d.isPlainObject(a)) {
                var f = new e;
                e.prototype.initialize && f.initialize.apply(f, d.merge([b], c));
                b.data(e.prototype.name, f)
            } else d.error("Method " + a + " does not exist on jQuery." + e.name)
        })
    }
})(jQuery);