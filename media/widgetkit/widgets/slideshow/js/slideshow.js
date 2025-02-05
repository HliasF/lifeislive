/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

(function(e) {
    function l(a) {
        return $widgetkit.css3(a)
    }
    var o = $widgetkit.support,
        j = function() {};
    j.prototype = e.extend(j.prototype, {
        name: "slideshow",
        options: {
            index: 0,
            width: "auto",
            height: "auto",
            autoplay: !0,
            interval: 5E3,
            navbar_items: 4,
            caption_animation_duration: 500,
            kenburns_animation_duration: null,
            slices: 20,
            duration: 500,
            animated: "random",
            easing: "swing"
        },
        nav: null,
        navbar: null,
        captions: null,
        caption: null,
        kbi: 0,
        initialize: function(a, c) {
            var b = this;
            this.options = e.extend({}, this.options, c);
            this.element = this.wrapper =
                a;
            this.ul = this.wrapper.find("ul.slides:first").css({
                width: "100%",
                overflow: "hidden"
            });
            this.wrapper.css({
                position: "relative"
            });
            this.slides = this.ul.css({
                position: "relative"
            }).children().css({
                top: "0px",
                left: "0px",
                position: "absolute"
            }).hide();
            this.index = this.slides[this.options.index] ? this.options.index : 0;
            e(".next", this.wrapper).bind("click", function() {
                b.stop();
                b.nextSlide()
            });
            e(".prev", this.wrapper).bind("click", function() {
                b.stop();
                b.prevSlide()
            });
            if (this.wrapper.find(".nav:first").length) {
                this.nav = this.wrapper.find(".nav:first");
                var d = this.nav.children();
                d.each(function(a) {
                    e(this).bind("click", function() {
                        b.stop();
                        b.slides[a] && b.show(a)
                    })
                });
                a.bind("slideshow-show", function(a, b, c) {
                    e(d.removeClass("active").get(c)).addClass("active")
                })
            }
            this.wrapper.find(".captions:first").length && this.wrapper.find(".caption:first").length && (this.captions = this.wrapper.find(".captions:first").hide().children(), this.caption = this.wrapper.find(".caption:first").hide());
            this.nav && e(this.nav.children().get(this.index)).addClass("active");
            this.navbar &&
                e(this.navbar.children().get(this.index)).addClass("active");
            this.showCaption(this.index);
            this.timer = null;
            this.hover = !1;
            this.wrapper.hover(function() {
                b.hover = true
            }, function() {
                b.hover = false
            });
            "ontouchend" in document && (a.bind("touchstart", function(b) {
                function c(a) {
                    if (g) {
                        var b = a.originalEvent.touches ? a.originalEvent.touches[0] : a;
                        i = {
                            time: (new Date).getTime(),
                            coords: [b.pageX, b.pageY]
                        };
                        Math.abs(g.coords[0] - i.coords[0]) > 10 && a.preventDefault()
                    }
                }
                var d = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                    g = {
                        time: (new Date).getTime(),
                        coords: [d.pageX, d.pageY],
                        origin: e(b.target)
                    },
                    i;
                a.bind("touchmove", c).one("touchend", function() {
                    a.unbind("touchmove", c);
                    g && i && i.time - g.time < 1E3 && (Math.abs(g.coords[0] - i.coords[0]) > 30 && Math.abs(g.coords[1] - i.coords[1]) < 75) && g.origin.trigger("swipe").trigger(g.coords[0] > i.coords[0] ? "swipeleft" : "swiperight");
                    g = i = void 0
                })
            }), this.wrapper.bind("swipeleft", function() {
                b.stop();
                b.nextSlide()
            }).bind("swiperight", function() {
                b.stop();
                b.prevSlide()
            }));
            e(window).bind("resize", function() {
                b.resize()
            });
            b.resize();
            b.slides.eq(b.index).css("z-index", 2).show();
            "kenburns" == b.options.animated && o.canvas && b.show(this.index, !0);
            b.options.autoplay && b.start()
        },
        resize: function() {
            this.fx && (this.slicer && this.slicer.remove(), this.slides.filter(":animated").stop(!0, !0), this.next.css({
                top: 0,
                left: 0,
                "z-index": 2
            }).show(), "kenburns" == this.options.animated && o.canvas && (this.element.find("img:animated").stop().css({
                width: "",
                height: "",
                top: "",
                left: ""
            }).fadeIn("fast"), this.element.find("canvas.tmp").remove()), this.current.css({
                top: 0,
                left: 0,
                "z-index": 1
            }).hide());
            this.fx = !1;
            var a = this.options.width,
                c = this.options.height;
            this.slides.css("width", "");
            this.slides.css("height", "");
            this.ul.css("height", "");
            this.wrapper.css("width", "");
            "auto" != a && this.wrapper.width() < a && (c = a = "auto");
            this.wrapper.css({
                width: "auto" == a ? this.wrapper.width() : a
            });
            var a = this.ul.width(),
                b = c;
            "auto" == b && (b = 0, this.slides.css("width", a).show().each(function() {
                b = Math.max(b, e(this).height())
            }).hide().eq(this.index).show());
            this.slides.css({
                height: b,
                width: this.ul.width()
            });
            this.ul.css("height", b)
        },
        nextSlide: function() {
            this.show(this.slides[this.index + 1] ? this.index + 1 : 0)
        },
        prevSlide: function() {
            this.show(-1 < this.index - 1 ? this.index - 1 : this.slides.length - 1)
        },
        show: function(a, c) {
            this.index == a && !c || this.fx && "kenburns" != this.options.animated || (this.current = e(this.slides.get(this.index)), this.next = e(this.slides.get(a)), this.animated = this.options.animated, this.duration = this.options.duration, this.easing = this.options.easing, this.dir = a > this.index ? "right" : "left", this.init = c, this.showCaption(a),
                this.element.trigger("slideshow-show", [this.index, a]), this.index = a, this[this.animated] ? (this.fx = !0, this[this.animated]()) : (this.current.hide(), this.next.show()))
        },
        showCaption: function(a) {
            if (this.caption && this.captions[a]) {
                var c = e(this.captions.get(a)).html();
                this.caption.is(":animated") && this.caption.stop();
                if ("" == e.trim(c)) this.caption.is(":visible") && this.caption.fadeOut(this.options.caption_animation_duration);
                else if (this.caption.is(":visible")) {
                    var b = this;
                    this.caption.fadeOut(this.options.caption_animation_duration,
                        function() {
                            e(this).html(c).delay(200).css("opacity", "").fadeIn(b.options.caption_animation_duration)
                        })
                } else this.caption.html(c).fadeIn(this.options.caption_animation_duration)
            }
        },
        start: function() {
            if (!this.timer) {
                var a = this;
                this.timer = setInterval(function() {
                    ("kenburns" == a.options.animated || !a.hover && !a.fx) && a.nextSlide()
                }, this.options.interval)
            }
        },
        stop: function() {
            if (this.timer) {
                clearInterval(this.timer);
                this.tmptimer && clearTimeout(this.tmptimer);
                var a = this;
                this.tmptimer = setTimeout(function() {
                    a.start();
                    this.tmptimer = !1
                }, 3E4);
                this.timer = !1
            }
        },
        bindTransitionEnd: function(a) {
            var c = this;
            e(a).bind("webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd", function() {
                c.fx = null;
                c.next.css({
                    "z-index": "2",
                    left: 0,
                    top: 0
                }).show();
                c.current.hide();
                c.slicer && c.slicer.remove()
            })
        },
        randomSimple: function() {
            var a = "top bottom fade slide scroll swipe".split(" ");
            this.animated = a[Math.floor(Math.random() * a.length)];
            this[this.animated]()
        },
        randomFx: function() {
            var a = "sliceUp sliceDown sliceUpDown fold puzzle boxes boxesReverse".split(" ");
            this.animated = a[Math.floor(Math.random() * a.length)];
            this[this.animated]()
        },
        top: function() {
            var a = this;
            this.current.css({
                "z-index": 1
            });
            this.next.css({
                "z-index": 2,
                display: "block",
                left: 0,
                top: this.wrapper.height() * ("bottom" == this.animated ? 2 : -1)
            }).animate({
                top: 0
            }, {
                duration: a.duration,
                easing: a.easing,
                complete: function() {
                    a.fx = null;
                    a.current.hide()
                }
            })
        },
        bottom: function() {
            this.top.apply(this)
        },
        left: function() {
            var a = this;
            this.current.css({
                "z-index": 1
            });
            this.next.css({
                "z-index": 2,
                display: "block",
                left: this.current.width() *
                    ("right" == this.animated ? 2 : -1)
            }).animate({
                left: 0
            }, {
                duration: a.duration,
                easing: this.easing,
                complete: function() {
                    a.fx = null;
                    a.current.hide()
                }
            })
        },
        right: function() {
            this.left()
        },
        slide: function() {
            var a = this;
            this.current.css({
                "z-index": 1
            });
            this.next.css({
                "z-index": 2,
                display: "block",
                left: this.current.width() * ("right" == this.dir ? 2 : -1)
            }).animate({
                left: 0
            }, {
                duration: a.duration,
                easing: this.easing,
                complete: function() {
                    a.fx = null;
                    a.current.hide()
                }
            })
        },
        fade: function() {
            var a = this;
            this.next.css({
                top: 0,
                left: 0,
                "z-index": 1
            }).fadeIn(a.duration);
            this.current.css({
                "z-index": 2
            }).fadeOut(this.duration, function() {
                a.fx = null;
                a.current.hide().css({
                    opacity: 1
                })
            })
        },
        scrollLeft: function() {
            var a = this;
            this.current.css({
                "z-index": 1
            });
            this.next.css({
                "z-index": 2,
                display: "block",
                left: this.current.width() * ("scrollRight" == this.animated ? 1 : -1)
            }).animate({
                left: 0
            }, {
                duration: a.duration,
                easing: this.easing,
                complete: function() {
                    a.fx = null;
                    a.current.hide()
                },
                step: function(c, b) {
                    a.current.css("left", (Math.abs(b.start) - Math.abs(c)) * ("scrollRight" == a.animated ? -1 : 1))
                }
            })
        },
        scrollRight: function() {
            this.scrollLeft(this)
        },
        scroll: function() {
            var a = this;
            this.current.css({
                "z-index": 1
            });
            this.next.css({
                "z-index": 2,
                display: "block",
                left: this.current.width() * ("right" == this.dir ? 1 : -1)
            }).animate({
                left: 0
            }, {
                duration: a.duration,
                easing: this.easing,
                complete: function() {
                    a.fx = null;
                    a.current.hide()
                },
                step: function(c, b) {
                    a.current.css("left", (Math.abs(b.start) - Math.abs(c)) * ("right" == a.dir ? -1 : 1))
                }
            })
        },
        swipe: function() {
            var a = this;
            this.current.css({
                "z-index": 2
            });
            this.next.css({
                "z-index": 1,
                top: 0,
                left: this.next.width() / 3 * ("right" == a.dir ? 1 : -1)
            }).show();
            var c = e("<div></div>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: this.current.outerWidth(),
                    height: this.current.outerHeight(),
                    opacity: 0,
                    "background-color": "#000"
                }).appendTo(this.current),
                b = e("<div></div>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: this.current.outerWidth(),
                    height: this.current.outerHeight(),
                    opacity: 0.6,
                    "background-color": "#000"
                }).appendTo(this.next);
            c.animate({
                opacity: 0.6
            }, {
                duration: a.duration
            });
            b.animate({
                opacity: 0
            }, {
                duration: a.duration
            });
            this.current.animate({
                left: ("right" == a.dir ?
                    -1 : 1) * this.current.width()
            }, {
                duration: a.duration,
                easing: "easeOutCubic",
                complete: function() {
                    a.fx = null;
                    a.current.hide();
                    c.remove();
                    b.remove()
                }
            });
            this.next.animate({
                left: 0
            }, {
                duration: a.duration,
                easing: "easeOutCubic"
            })
        },
        slice: function() {
            var a = this,
                c = this.next.find("img:first"),
                b = "sliceUp" == this.animated ? "bottom" : "top";
            if (c.length) {
                var d = this.current.find("img:first").position(),
                    h = a.next.width(),
                    k = a.next.height();
                p(this, d.top, d.left);
                for (var d = Math.round(this.slicer.width() / this.options.slices), f = 0; f <
                    this.options.slices; f++) {
                    var g = f == this.options.slices - 1 ? this.slicer.width() - d * f : d;
                    "sliceUpDown" == this.animated && (b = 0 == (f % 2 + 2) % 2 ? "top" : "bottom");
                    this.slicer.append(e("<div />").css(b, 0).css(l({
                        position: "absolute",
                        left: d * f + "px",
                        width: g + "px",
                        height: 0,
                        background: "url(" + c.attr("src") + ") no-repeat -" + (d + f * d - d) + "px " + b,
                        "background-size": h + "px " + k + "px",
                        opacity: 0,
                        transition: "all " + a.duration + "ms ease-in " + 60 * f + "ms"
                    })))
                }
                this.slices = this.slicer.children();
                this.bindTransitionEnd.apply(this, [this.slices.get(this.slices.length -
                    1)]);
                this.current.css({
                    "z-index": 1
                });
                this.slicer.show();
                var i = this.wrapper.height();
                if (o.transition) this.slices.css(l({
                    height: i,
                    opacity: 1
                }));
                else {
                    var n = 0;
                    this.slices.each(function(b) {
                        var c = e(this);
                        setTimeout(function() {
                            c.animate({
                                height: i,
                                opacity: 1
                            }, a.duration, function() {
                                b == a.slices.length - 1 && e(this).trigger("transitionend")
                            })
                        }, n);
                        n += 60
                    })
                }
            } else this.next.css({
                "z-index": "2",
                left: 0,
                top: 0
            }).show(), this.current.hide(), this.fx = null
        },
        sliceUp: function() {
            this.slice.apply(this)
        },
        sliceDown: function() {
            this.slice.apply(this)
        },
        sliceUpDown: function() {
            this.slice.apply(this)
        },
        fold: function() {
            var a = this,
                c = this.next.find("img:first");
            if (c.length) {
                var b = this.current.find("img:first").position(),
                    d = a.next.width(),
                    h = a.next.height();
                p(this, b.top, b.left);
                for (var k = Math.round(this.slicer.width() / this.options.slices) + 2, b = this.current.height(), f = 0; f < this.options.slices + 1; f++) {
                    var g = f == a.options.slices ? a.slicer.width() - k * f : k;
                    this.slicer.append(e("<div />").css(l({
                        position: "absolute",
                        left: k * f + "px",
                        width: g,
                        top: "0px",
                        height: b,
                        background: "url(" +
                            c.attr("src") + ") no-repeat -" + (k + f * k - k) + "px 0%",
                        "background-size": d + "px " + h + "px",
                        opacity: 0,
                        transform: "scalex(0.0001)",
                        transition: "all " + a.duration + "ms ease-in " + (100 + 60 * f) + "ms"
                    })))
                }
                this.slices = this.slicer.children();
                this.bindTransitionEnd.apply(this, [this.slices.get(this.slices.length - 1)]);
                this.current.css({
                    "z-index": 1
                });
                this.slicer.show();
                if (o.transition) this.slices.css(l({
                    opacity: 1,
                    transform: "scalex(1)"
                }));
                else {
                    var i = 0;
                    this.slices.width(0).each(function(b) {
                        var c = b == a.options.slices - 1 ? a.slicer.width() -
                            k * b : k,
                            d = e(this);
                        setTimeout(function() {
                            d.animate({
                                opacity: 1,
                                width: c
                            }, a.duration, function() {
                                b == a.slices.length - 1 && e(this).trigger("transitionend")
                            })
                        }, i + 100);
                        i += 50
                    })
                }
            } else this.next.css({
                "z-index": "2",
                left: 0,
                top: 0
            }).show(), this.current.hide(), this.fx = null
        },
        puzzle: function() {
            var a = this,
                c = Math.round(this.options.slices / 2),
                b = Math.round(this.wrapper.width() / c),
                d = Math.round(this.wrapper.height() / b),
                h = Math.round(this.wrapper.height() / d) + 1,
                k = this.next.find("img:first");
            if (k.length) {
                var f = this.current.find("img:first").position(),
                    g = a.next.width(),
                    i = a.next.height();
                p(this, f.top, f.left);
                for (var f = this.wrapper.width(), n = 0; n < d; n++)
                    for (var m = 0; m < c; m++) this.slicer.append(e("<div />").css(l({
                        position: "absolute",
                        left: b * m + "px",
                        width: m == c - 1 ? f - b * m + "px" : b + "px",
                        top: h * n + "px",
                        height: h + "px",
                        background: "url(" + k.attr("src") + ") no-repeat -" + (b + m * b - b) + "px -" + (h + n * h - h) + "px",
                        "background-size": g + "px " + i + "px",
                        opacity: 0,
                        "-webkit-transform": "translateZ(0)",
                        "-moz-transform": "rotate(0)",
                        transition: "all " + a.duration + "ms ease-in 0ms"
                    })));
                this.slices = s(this.slicer.children());
                this.bindTransitionEnd.apply(this, [this.slices.get(this.slices.length - 1)]);
                this.current.css({
                    "z-index": 1
                });
                this.slicer.show();
                this.slices.each(function(b) {
                    var c = e(this);
                    setTimeout(function() {
                        o.transition ? c.css(l({
                            opacity: 1
                        })) : c.animate({
                            opacity: 1
                        }, a.duration, function() {
                            b == a.slices.length - 1 && e(this).trigger("transitionend")
                        })
                    }, 100 + 50 * b)
                })
            } else this.next.css({
                "z-index": "2",
                left: 0,
                top: 0
            }).show(), this.current.hide(), this.fx = null
        },
        boxes: function() {
            var a = this,
                c = Math.round(this.options.slices / 2),
                b = Math.round(this.wrapper.width() /
                    c),
                d = Math.round(this.wrapper.height() / b),
                h = Math.round(this.wrapper.height() / d) + 1,
                k = 0,
                f = this.next.find("img:first");
            if (f.length) {
                var g = this.current.find("img:first").position(),
                    i = a.next.width(),
                    n = a.next.height();
                p(this, g.top, g.left);
                for (g = 0; g < d; g++)
                    for (var m = 0; m < c; m++) this.slicer.append(e("<div />").css(l({
                        position: "absolute",
                        left: b * m + "px",
                        width: 0,
                        top: h * g + "px",
                        height: 0,
                        background: "url(" + f.attr("src") + ") no-repeat -" + (b + m * b - b) + "px -" + (h + g * h - h) + "px",
                        "background-size": i + "px " + n + "px",
                        opacity: 0,
                        transition: "all " +
                            (100 + a.duration) + "ms ease-in 0ms"
                    })).data("base", {
                        width: m == c - 1 ? this.wrapper.width() - b * m : b,
                        height: h
                    }));
                this.slices = this.slicer.children();
                this.current.css({
                    "z-index": 1
                });
                this.slicer.show();
                var j = 0,
                    q = 0,
                    r = [];
                r[j] = [];
                b = "boxesReverse" == this.animated ? this.slices._reverse() : this.slices;
                this.bindTransitionEnd.apply(this, [b.get(b.length - 1)]);
                b.each(function() {
                    r[j][q] = e(this);
                    q++;
                    q == c && (j++, q = 0, r[j] = [])
                });
                for (m = h = 0; m < c * d; m++) {
                    f = m;
                    for (g = 0; g < d; g++) 0 <= f && f < c && (function(b, c, d, t) {
                        var f = r[b][c];
                        setTimeout(function() {
                            o.transition ?
                                f.css({
                                    opacity: "1",
                                    width: f.data("base").width,
                                    height: f.data("base").height
                                }) : f.animate({
                                    opacity: "1",
                                    width: f.data("base").width,
                                    height: f.data("base").height
                                }, a.duration, function() {
                                    t == a.slices.length - 1 && e(this).trigger("transitionend")
                                })
                        }, 100 + d)
                    }(g, f, k, h, b.length), h++), f--;
                    k += 100
                }
            } else this.next.css({
                "z-index": "2",
                left: 0,
                top: 0
            }).show(), this.current.hide(), this.fx = null
        },
        boxesReverse: function() {
            this.boxes.apply(this)
        },
        kenburns: function() {
            var a = this,
                c = this.next.find("img:first"),
                b = a.options.kenburns_animation_duration ||
                2 * a.options.interval;
            if (c.length)
                if (o.canvas) {
                    c.stop(!1, !0).css({
                        width: "",
                        height: ""
                    });
                    this.slides.not(this.current).not(this.next).hide();
                    this.current.css({
                        "z-index": 1
                    });
                    this.next.css({
                        "z-index": 2,
                        visibility: "hidden",
                        opacity: 1
                    }).show();
                    this.next.find("canvas.tmp").remove();
                    c.position();
                    var d = c.attr("width"),
                        h = c.attr("height"),
                        k = [{
                                start: ["c-l", 1],
                                stop: ["c-r", 1.2]
                            }, {
                                start: ["t-r", 1],
                                stop: ["b-l", 1.2]
                            }, {
                                start: ["b-l", 1],
                                stop: ["t-r", 1.2]
                            }, {
                                start: ["t-c", 1],
                                stop: ["b-c", 1.2]
                            }, {
                                start: ["c-c", 1],
                                stop: ["c-c", 1.2]
                            },
                            {
                                start: ["b-r", 1],
                                stop: ["t-l", 1.2]
                            }, {
                                start: ["c-l", 1],
                                stop: ["c-r", 1.2]
                            }
                        ],
                        f = k[this.kbi ? this.kbi : 0],
                        g = e('<canvas class="tmp"></canvas>'),
                        i = function(a, b) {
                            var b = b || 1,
                                c = {
                                    top: 0,
                                    left: 0,
                                    width: d * b,
                                    height: h * b
                                };
                            switch (a) {
                                case "t-l":
                                    c.top = c.left = 0;
                                    break;
                                case "t-c":
                                    c.top = 0;
                                    c.left = -1 * ((c.width - d) / 2);
                                    break;
                                case "t-r":
                                    c.top = 0;
                                    c.left = -1 * (c.width - d);
                                    break;
                                case "c-l":
                                    c.top = -1 * ((c.height - h) / 2);
                                    c.left = 0;
                                    break;
                                case "c-c":
                                    c.top = -1 * ((c.height - h) / 2);
                                    c.left = -1 * ((c.width - d) / 2);
                                    break;
                                case "c-r":
                                    c.top = -1 * ((c.height - h) / 2);
                                    c.left = -1 * (c.width - d);
                                    break;
                                case "b-l":
                                    c.top = -1 * (c.height - h);
                                    c.left = 0;
                                    break;
                                case "b-c":
                                    c.top = -1 * (c.height - h);
                                    c.left = -1 * ((c.width - d) / 2);
                                    break;
                                case "b-r":
                                    c.top = -1 * (c.height - h), c.left = -1 * (c.width - d)
                            }
                            return c
                        };
                    if (d > this.ul.width()) {
                        var l = d / this.ul.width(),
                            d = this.ul.width(),
                            h = h / l;
                        this.ul.height(h).css("overflow", "hidden").css("z-index", "4")
                    }
                    g.attr({
                        width: d,
                        height: h
                    }).css({
                        width: d,
                        height: h,
                        opacity: 0
                    });
                    c.css({
                        width: "",
                        height: "",
                        top: "",
                        left: ""
                    }).after(g).hide();
                    var m = g.get(0).getContext("2d");
                    this.next.css({
                        visibility: "visible"
                    });
                    g.animate({
                        opacity: 1
                    }, a.duration);
                    var j = !1,
                        q = !1,
                        r = !1,
                        p = !1;
                    c.css(i.apply(this, f.start)).animate(i.apply(this, f.stop), {
                        step: function(a, b) {
                            !1 !== j && (!1 !== q && !1 !== r && !1 !== p) && (m.drawImage(c.get(0), j, q, r, p), p = r = q = j = !1);
                            "width" == b.prop && (r = a);
                            "height" == b.prop && (p = a);
                            "left" == b.prop && (j = a);
                            "top" == b.prop && (q = a)
                        },
                        complete: function() {
                            e(this).css({
                                width: "",
                                height: "",
                                top: "",
                                left: ""
                            });
                            a.fx = null
                        },
                        easing: "swing",
                        duration: b
                    });
                    a.kbi = k[a.kbi + 1] ? a.kbi + 1 : 0
                } else this.fade(this);
            else this.next.css({
                "z-index": "2",
                left: 0,
                top: 0
            }).show(), this.current.hide(), this.fx = null
        },
        scale: function() {
            var a = this;
            o.transition ? (this.fx = null, this.slides.css(l({
                transition: "none",
                transform: "none",
                opacity: 1
            })), this.slides.not(this.current).hide(), this.current.one("webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd", function() {
                a.next.css({
                    "z-index": "2",
                    left: 0,
                    top: 0,
                    opacity: 1
                }).show();
                e(this).hide().css(l({
                    transition: "none",
                    transform: "none",
                    opacity: 1
                }))
            }).css(l({
                "z-index": 2,
                opacity: 1,
                transform: "scale(1)",
                transition: "all " +
                    a.duration + "ms ease-in-out 0ms"
            })), this.next.css(l({
                "z-index": 1,
                opacity: 1,
                transform: "none"
            })).show(), a.current.css({
                "z-index": 2
            }).css(l({
                opacity: 0,
                transform: "scale(1.5)"
            }))) : this.fade(this)
        },
        rotate: function() {
            if (o.transition) {
                var a = this,
                    c = this.current,
                    b = [
                        ["rotate(90deg) translate(200%, -10%) scale(0.2)", "rotate(-90deg) translate(-200%, -10%) scale(0.2)"],
                        ["rotate(-90deg) translate(-200%, -10%) scale(0.2)", "rotate(90deg) translate(200%, -10%) scale(0.2)"],
                        ["rotate(-90deg) translate(200%, -90%) scale(0.2)",
                            "rotate(90deg) translate(-200%, -90%) scale(0.2)"
                        ],
                        ["rotate(90deg) translate(-200%, -90%) scale(0.2)", "rotate(-90deg) translate(200%, -90%) scale(0.2)"],
                        ["rotate(90deg) translate(200%, -10%) scale(0.2)", "rotate(90deg) translate(-200%, -90%) scale(0.2)"],
                        ["rotate(-90deg) translate(-200%, -10%) scale(0.2)", "rotate(-90deg) translate(200%, -90%) scale(0.2)"],
                        ["rotate(90deg) translate(-200%, -90%) scale(0.2)", "rotate(90deg) translate(200%, -10%) scale(0.2)"],
                        ["rotate(-90deg) translate(200%, -90%) scale(0.2)",
                            "rotate(-90deg) translate(-200%, -10%) scale(0.2)"
                        ],
                        ["rotate(10deg) translate(200%, 20%) scale(0.2)", "rotate(10deg) translate(-200%, -20%) scale(0.2)"],
                        ["rotate(10deg) translate(-200%, -20%) scale(0.2)", "rotate(10deg) translate(200%, 20%) scale(0.2)"],
                        ["rotate(-10deg) translate(200%, -20%) scale(0.2)", "rotate(-10deg) translate(-200%, 20%) scale(0.2)"],
                        ["rotate(-10deg) translate(-200%, 20%) scale(0.2)", "rotate(-10deg) translate(200%, -20%) scale(0.2)"],
                        ["translate(50%, 200%) scale(0.2)", "translate(-50%, -200%) scale(0.2)"],
                        ["translate(-50%, -200%) scale(0.2)", "translate(50%, 200%) scale(0.2)"],
                        ["translate(50%, -200%) scale(0.2)", "translate(-50%, 200%) scale(0.2)"],
                        ["translate(-50%, 200%) scale(0.2)", "translate(50%, -200%) scale(0.2)"]
                    ],
                    d = parseInt(Math.random() * b.length);
                this.slides.not(this.current).hide();
                this.current.css({
                    "z-index": 1
                }).css(l({
                    opacity: 1,
                    transform: "rotate(0deg) translate(0, 0) scale(1)",
                    transition: "all " + this.duration + "ms ease-in-out 0ms"
                }));
                this.next.css(l({
                    "z-index": "2",
                    left: 0,
                    top: 0,
                    opacity: 0,
                    transform: b[d][0],
                    transition: "all " + this.duration + "ms ease-in-out 0ms"
                })).show();
                setTimeout(function() {
                    a.next.css(l({
                        opacity: 1,
                        transform: "rotate(0deg) translate(0, 0) scale(1)"
                    }));
                    a.current.css(l({
                        opacity: 0,
                        transform: b[d][1]
                    }));
                    setTimeout(function() {
                        a.fx = null;
                        a.slides.css(l({
                            transition: "",
                            transform: ""
                        }));
                        c.hide()
                    }, a.duration + 50)
                }, 10)
            } else this.fade(this)
        }
    });
    e.fn._reverse = [].reverse;
    var s = function(a) {
            for (var c, b, d = a.length; d; c = parseInt(Math.random() * d), b = a[--d], a[d] = a[c], a[c] = b);
            return a
        },
        p = function(a, c, b) {
            c = c || 0;
            b =
                b || 0;
            a.slicer = e("<li />").addClass("slices").css({
                top: c,
                left: b,
                position: "absolute",
                width: a.wrapper.width(),
                height: a.ul.height(),
                "z-index": 3
            }).hide().appendTo(a.ul)
        };
    e.fn[j.prototype.name] = function() {
        var a = arguments,
            c = a[0] ? a[0] : null;
        return this.each(function() {
            var b = e(this);
            if (j.prototype[c] && b.data(j.prototype.name) && "initialize" != c) b.data(j.prototype.name)[c].apply(b.data(j.prototype.name), Array.prototype.slice.call(a, 1));
            else if (!c || e.isPlainObject(c)) {
                var d = new j;
                j.prototype.initialize && d.initialize.apply(d,
                    e.merge([b], a));
                b.data(j.prototype.name, d)
            } else e.error("Method " + c + " does not exist on jQuery." + j.name)
        })
    }
})(jQuery);