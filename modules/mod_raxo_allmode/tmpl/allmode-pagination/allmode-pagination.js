/*
 * ================================================================
   RAXO All-mode PRO J1.6 - Template JS
 * ----------------------------------------------------------------
 * jQuery pajinate.js - v0.2
 * copyright 2010 Wes Nolte, MIT License
 * http://wesnolte.com
 * ================================================================
*/
(function(a) {
    a.fn.pajinate = function(b) {
        function i(f) {
            var d = h.data(n);
            start_from = f * d;
            end_on = start_from + d;
            k.fadeOut(250, function() {
                j.hide();
                j.slice(start_from, end_on).show();
                k.fadeIn(500)
            });
            g.find(b.nav_panel_id).children(".page_link[longdesc=" + f + "]").addClass("active_page").siblings(".active_page").removeClass("active_page");
            h.data(l, f);
            o()
        }

        function p(f, d) {
            a(f).siblings(".active_page").siblings(".page_link[longdesc=" + d + "]").css("display") == "none" && e.each(function() {
                a(this).children(".page_link").hide().slice(parseInt(d -
                    b.num_page_links_to_display + 1), d + 1).show()
            })
        }

        function q(f, d) {
            a(f).siblings(".active_page").siblings(".page_link[longdesc=" + d + "]").css("display") == "none" && e.each(function() {
                a(this).children(".page_link").hide().slice(d, d + parseInt(b.num_page_links_to_display)).show()
            })
        }

        function o() {
            e.children(".page_link:visible").hasClass("last") ? e.children(".more").hide() : e.children(".more").show();
            e.children(".page_link:visible").hasClass("first") ? e.children(".less").hide() : e.children(".less").show()
        }
        var l = "current_page",
            n = "items_per_page",
            h;
        b = a.extend({
            item_container_id: ".allmode_items",
            items_per_page: 5,
            nav_panel_id: ".allmode_pagenav",
            num_page_links_to_display: 10,
            start_page: 0,
            nav_label_first: "&laquo;",
            nav_label_prev: "Prev",
            nav_label_next: "Next",
            nav_label_last: "&raquo;"
        }, b);
        var k, g, j, e;
        return this.each(function() {
            g = a(this);
            k = a(this).find(b.item_container_id);
            j = g.find(b.item_container_id).children();
            h = g;
            h.data(l, 0);
            h.data(n, b.items_per_page);
            var f = k.children().size();
            f = Math.ceil(f / b.items_per_page);
            var d = '<a class="first_link" href="">' +
                b.nav_label_first + "</a>";
            d += '<a class="previous_link" href="">' + b.nav_label_prev + '</a><span class="ellipse less">...</span>';
            for (var m = 0; f > m;) {
                d += '<a class="page_link" href="" longdesc="' + m + '">' + (m + 1) + "</a>";
                m++
            }
            d += '<span class="ellipse more">...</span><a class="next_link" href="">' + b.nav_label_next + "</a>";
            d += '<a class="last_link" href="">' + b.nav_label_last + "</a>";
            e = g.find(b.nav_panel_id);
            e.html(d).each(function() {
                a(this).find(".page_link:first").addClass("first");
                a(this).find(".page_link:last").addClass("last")
            });
            e.children(".ellipse").hide();
            e.find(".previous_link").next().next().addClass("active_page");
            j.hide();
            j.slice(0, h.data(n)).show();
            var r = g.children(b.nav_panel_id + ":first").children(".page_link").size();
            b.num_page_links_to_display = Math.min(b.num_page_links_to_display, r);
            e.children(".page_link").hide();
            e.each(function() {
                a(this).children(".page_link").slice(0, b.num_page_links_to_display).show()
            });
            g.find(".first_link").click(function(c) {
                c.preventDefault();
                q(a(this), 0);
                i(0)
            });
            g.find(".last_link").click(function(c) {
                c.preventDefault();
                c = r - 1;
                p(a(this), c);
                i(c)
            });
            g.find(".previous_link").click(function(c) {
                c.preventDefault();
                c = a(this);
                new_page = parseInt(h.data(l)) - 1;
                if (a(c).siblings(".active_page").prev(".page_link").length == true) {
                    q(c, new_page);
                    i(new_page)
                }
            });
            g.find(".next_link").click(function(c) {
                c.preventDefault();
                c = a(this);
                new_page = parseInt(h.data(l)) + 1;
                if (a(c).siblings(".active_page").next(".page_link").length == true) {
                    p(c, new_page);
                    i(new_page)
                }
            });
            g.find(".page_link").click(function(c) {
                c.preventDefault();
                i(a(this).attr("longdesc"))
            });
            o()
        })
    }
})(jQuery);