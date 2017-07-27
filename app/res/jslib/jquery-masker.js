(function (b) {
    b.fn.fakeLoader = function (m) {
        var f = b.extend({
            timeToHide: 1200,
            pos: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            zIndex: "9999",
            bgColor: "#000",
            spinner: "spinner6",
            imagePath: "",
            opatity: '0.5'
        }, m);

        this.show = function () {
            a();
            b(d).fadeIn();
            return d.css({ backgroundColor: f.bgColor, zIndex: f.zIndex, opacity: f.opatity })
        }

        this.hide = function () {
            a();
            b(d).fadeOut();
            //return d.css({ backgroundColor: f.bgColor, zIndex: 0, opacity: 0 })
        }

        var l = '<div class="fl spinner1"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
        var k = '<div class="fl spinner2"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
        var j = '<div class="fl spinner3"><div class="dot1"></div><div class="dot2"></div></div>';
        var i = '<div class="fl spinner4"></div>';
        var h = '<div class="fl spinner5"><div class="cube1"></div><div class="cube2"></div></div>';
        var g = '<div class="fl spinner6"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
        var e = '<div class="fl spinner7"><div class="circ1"></div><div class="circ2"></div><div class="circ3"></div><div class="circ4"></div></div>';
        var d = b(this);
        d.html('<div class="f2 desc" style="color:#fff;font-size:20px;"></div>');
        var c = { position: f.pos, width: f.width, height: f.height, top: f.top, left: f.left };
        d.css(c);
        d.each(function () {
            var n = f.spinner;
            switch (n) {
                case "spinner1":
                    d.html(d.html() + l);
                    break;
                case "spinner2":
                    d.html(d.html() + k);
                    break;
                case "spinner3":
                    d.html(d.html() + j);
                    break;
                case "spinner4":
                    d.html(d.html() + i);
                    break;
                case "spinner5":
                    d.html(d.html() + h);
                    break;
                case "spinner6":
                    d.html(d.html() + g);
                    break;
                case "spinner7":
                    d.html(d.html() + e);
                    break;
                default:
                    d.html(d.html() + l)
            }
            if (f.imagePath != "") {
                d.html(d.html() + '<div class="fl"><img src="' + f.imagePath + '"></div>');               
            }
            d.append('<div class="f3 loaderlong" style="color: rgb(255, 255, 255); font-size: 18px;"></div>');
            a()
        });
        //setTimeout(function () {
        //    b(d).fadeOut()
        //}, f.timeToHide);
        return this;
    };
    function a() {
        var c = b(window).width();
        var e = b(window).height();
        var d = b(".fl").outerWidth();
        var f = b(".fl").outerHeight();
        b(".fl").css({ position: "absolute", left: (c / 2) - (d / 2), top: (e / 2) - (f / 2) })

        var g = b(".f2").width();
        var h = b(".f2").height();
        b(".f2").css({ position: "absolute", left: (c / 2) - (g / 2), top: (e / 2) - (h / 2) - f - 25 })

        var f3g = b(".f3").width();
        var f3h = b(".f3").height();
        b(".f3").css({ position: "absolute", left: (c / 2) - (f3g / 2), top: (e / 2) - (f3h / 2) + 35 })
    }

    b(window).load(function () {
        a();
        b(window).resize(function () {
            a()
        })
    });
}(jQuery));
var focusDom = null;
var loaderInterval = null;
jQuery.extend({
    maskLoader: function (option, desc,showlong) {
        $('.maskloader').remove();
        if (loaderInterval)
            loaderInterval.stop();
        if ($('.maskloader').length == 0) {
            $('body').append('<div class="maskloader" tabindex="-100"></div>');
        }
        if (option == 'show') {
            var _tmp = $('.maskloader').fakeLoader();
            if(desc){
                $('.maskloader').find(".desc").html(desc);
            }
            if (showlong && typeof showlong == 'number')
            {
                $('.maskloader').find(".loaderlong").html(showlong);
                function loaderlong()
                {
                    var loaddom = $('.loaderlong');
                    if(loaddom)
                    {
                        var longtime = loaddom.html();
                        longtime = parseInt(longtime)-1;
                        loaddom.html(longtime);
                        if (longtime == 0)
                            $.maskLoader('hide');
                    }
                }
                loaderInterval = Utils.setInterval(loaderlong, 1000);
            }
            focusDom = document.activeElement;
            $('.maskloader').focus();
            return _tmp.show();
        }
        if (focusDom)
            focusDom.focus();
        return $('.maskloader').hide();

    }
});