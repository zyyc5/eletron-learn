var ieasyModule = null;
var appid = "pos";
var appsecret = "cMVS0MoqTCnp2ngcwoRrz3A3UPsygiOt";

var app = angular.module('ieasy360', [
        'ngResource',
        'ngSanitize',
        'ngRoute',
        "ui.router"
])
        .provider({
            $rootElement: function () {
                this.$get = function () {
                    return angular.element($("#_rootElement"));
                };
            }
        })
        .config(['$compileProvider', function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
        }]).config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state("banci", {
                url: "/banci",
                templateUrl: "app/views/jieban.html",
                controller: "JiebanController"
            });
        }]);

// 所有 module 加载完之后，在$rootScope 上面绑一些公共方法。
app.run(['$rootScope', function($rootScope){
 
    // controller 的view 页面加载完成后，执行的事件
    $rootScope.$on("$viewContentLoaded", function () {
        // 点击键盘时，不会使输入框失去焦点
        $('.kbb').on("mousedown", false);
        $('.kbb_btn').on("mousedown", false);
        $('.keyboard').on("mousedown", false);
        $('.modal').attr('data-backdrop', 'static');
    });



}]);

//处理 angular 中未处理的异常
app.factory('$exceptionHandler', ['$log', function ($log) {
    return function (exception, cause) {
        $log.warn(exception, cause);
        Utils.winLog('ANGULAR_EXCEPTION: ', exception, exception.stack, cause);
    };
}]);

// 系统常量配置
// app.constant('CONSTANTS', CONSTANTS).constant('BIZ', BIZCONSTANT).constant('BUSINESS', BUSINESS);

// app.factory('_', function () {
//     return window._; // assumes lodash has already been loaded on the page
// });

app.filter('myDateFormat', ['$filter', function myDateFormat($filter) {
    return function (text) {
        if (Utils.isEmpty(text)) {
            return "";
        }
        var tempdate = new Date(text.replace(/-/g, "/"));
        return $filter('date')(tempdate, "HH:mm:ss");
    }
}]);


app.filter('checkmark', function () {
    return function (input) {
        return input == 1 ? '\u2713' : '\u2718';
    }
});



function callAjax(url, callback, data, method, errorFunc) {
    jQuery.ajax({
        type: method == null ? "POST" : method,
        url: url,
        data: data,
        timeout: 50000,
        dataType: "json",
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate", "Pragma": "no-cache", "Expires": "0" },
        contentType: "application/json",
        success: callback,
        error: errorFunc == null ? function (error, data) {
            $.maskLoader("hide");
            console.log("请求出错。url::" + url + ";原因：：" + JSON.stringify(error));
        } : errorFunc
    });
}


$.ajaxSetup({
    beforeSend: function (xhrhttp, req) {

        var url = req.url;
        if (url.indexOf("file:") == 0)
            return;
        //验证是否是需要加token的地址    
        var TokenHost = null;
        for (var key in VALIDATE_TOKEN_HOST) {
            if (url.indexOf(VALIDATE_TOKEN_HOST[key].HOST_BASIC) > 0) {
                TokenHost = VALIDATE_TOKEN_HOST[key];
                break;
            }
        }
        if (TokenHost == null)
            return;

        ////获取参数数组
        //var arrayParam = getParams(req.url);
        //if (url.indexOf("?") > 0) {
        //    url = req.url.substring(0, req.url.indexOf("?"));
        //}
        if (TokenHost.TYPE == TOKEN_HOST_TYPE.POS) {
            req.url = handlePosUrl(req.url);
        } else if (TokenHost.TYPE == TOKEN_HOST_TYPE.WEIXIN) {
            req.url = handleWeixinUrl(req.url);
        }
        req.headers = {
            'app_id': (CONTEXT.env == CONSTANTS.EnvConstants.IOS ? 'POS_iPad' : 'POS'),
            'app_version': CONSTANTS.APPVERSION,
            'group_id': GlobalCache ? (GlobalCache.BASEINFO().groupId) : 'NO_DATA',
            'org_id': GlobalCache ? (GlobalCache.BASEINFO().mdId) : 'NO_DATA'
        };

        for(var k in req.headers)
        {
            xhrhttp.setRequestHeader(k, req.headers[k]);
        }
    }
})


/* handle pos url  start */
function handlePosUrl(url) {
    var _url = url;
    //获取参数数组
    var arrayParam = getParams(url);
    if (_url.indexOf("?") > 0) {
        _url = url.substring(0, url.indexOf("?"));
    }
    //var tempUrl = _url + "?" + getParamStrByArrayParams(arrayParam) + "&signature=" + requestToken(req.url, arrayParam);
    return _url + "?" + getParamStrByArrayParams(arrayParam) + "&signature=" + requestToken(url, arrayParam);
}
function requestToken(url, params) {
    var urlStr = "";
    if (url.indexOf("?") > 0) {
        urlStr = url.substring(0, url.indexOf("?"));
    } else {
        urlStr = url;
    }
    var fullurl = urlStr + appsecret + buildQueryString(params);
    //TODO MD5处理
    return hex_md5(fullurl).toUpperCase();
}
//获取param的字符串
function buildQueryString(params) {
    var queryStr = "";

    params.sort(function (a, b) {
        if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        } else {
            return a.name > b.name;
        }
    });

    return getParamStrByArrayParams(params);
}
/*
 *获取地址中的参数
 * url   初始地址
 * 返回格式  [{name:'xxx',value:'xxx'},{name:'xxx',value:'xxx'}]
 */
function getParams(url) {
    var timestamp = new Date().getTime();
    var params = [{ name: 't', value: timestamp }, { name: 'token', value: timestamp }, { name: 'appid', value: appid }];
    if (url.indexOf("?") > 0) {
        var paramStr = url.substring(url.indexOf("?") + 1);
        var arrayParam = paramStr.split("&");
        for (var idx in arrayParam) {
            var singleParam = arrayParam[idx].split("=");
            if (singleParam[0].toLowerCase() != "t" && singleParam[0].toLowerCase() != "token" && singleParam[0].toLowerCase() != 'appid')
                params.push({ name: singleParam[0], value: singleParam[1] });
        }
    }
    return params;
}
//根据参数数组获取参数字符串
function getParamStrByArrayParams(params) {
    var queryStr = "";
    for (var idx in params) {
        queryStr = queryStr + params[idx].name + "=" + params[idx].value + "&";
    }
    queryStr = queryStr.substring(0, queryStr.length - 1);
    return queryStr;
}
/* handle pos url  end */

/* handle weixin url  start */
function handleWeixinUrl(url) {
    var _url = url;
    //获取参数数组
    var arrayParam = getPosParams(url);
    if (_url.indexOf("?") > 0) {
        _url = url.substring(0, url.indexOf("?"));
    }
    arrayParam.push({ name: "token", value: generateRequestToken(_url, arrayParam) });

    //var tempUrl = _url + "?" + getParamStrByArrayParams(arrayParam) + "&signature=" + requestToken(req.url, arrayParam);
    return _url + "?" + getParamStrByArrayParams(arrayParam);
}


function getPosParams(url) {
    var timestamp = new Date().getTime();
    var params = [{ name: 't', value: timestamp }];
    if (url.indexOf("?") > 0) {
        var paramStr = url.substring(url.indexOf("?") + 1);
        var arrayParam = paramStr.split("&");
        for (var idx in arrayParam) {
            var singleParam = arrayParam[idx].split("=");
            if (singleParam[0].toLowerCase() != "t" && singleParam[0].toLowerCase() != "token")
                params.push({ name: singleParam[0], value: singleParam[1] });
        }
    }
    return params;
}
function generateRequestToken(url, parameters) {
    var fullurl = url + getParamStrByArrayParams(parameters) + WEIXIN.API_KEY;
    return hex_md5(fullurl).toUpperCase();
}

// 记录壳子中浏览器部分的未处理的异常
window.onerror = function (errmsg, sUrl,sline) {
    if (!CONSTANTS.PRODUCTION) {
        Utils.showFailureInfo(errmsg);
    }
    try
    {
        Utils.winLog("WINONERROR:", errmsg, sUrl, sline);
    } catch (e) {

    }
}

// 记录壳子中 Node部分未处理的异常
function bindNodeError() {
    if (typeof process == 'undefined')
        return;
    process.on('uncaughtException', function (err) {
        console.error('An Node-JS uncaught error ');
        console.error(err.stack);
        Utils.winLog('NODE-JS _UNCAUGHTEXCEPTION: ', err.message, err.stack);
    });
}

bindNodeError();

//页面刷新前，将网络服务停止
window.onbeforeunload = function () {
   
}

function showImportantTips(message, clickFunc, stopInfo) {
    if (stopInfo && stopInfo.stop){
        return;
    }
    var tip = document.getElementById("imp_tips");
    if (tip == null) {
        tip = $("<div style='position:absolute;text-align:center;width:300px;height:200px;background: #efefef;"
            + "z-index:10;-webkit-box-shadow: 0 0 20px #4c4c4c;-moz-box-shadow: 0 0 20px #4c4c4c;box-shadow: 0 0 20px #4c4c4c;' id='imp_tips'>"
            + "<div style='color: white;font-size: 16px;width: 100%;height: 28px;line-height: 28px;background: #ff5122;'>"
            + "<span style='position:absolute;left:10px;color:#fff;display: none' id='imp_tips_stop'>停止</span>警告"
            + "<span style='position:absolute;right:10px;color:#fff;' onclick='$(\"#imp_tips\").hide();'>关闭</span></div>"
            + "<div class='_bodyContent' style='font-size:16px;padding-top:10px; width: 100%;height: 170px;vertical-align: middle;'></div></div>")

        $(document.body).append($(tip));
    }
    var bodyContent = $(tip).find("._bodyContent");
    bodyContent.html(message);
    if (clickFunc) {
        bodyContent.unbind("click");
        bodyContent.click(clickFunc);
    }
    if (stopInfo){
        $("#imp_tips_stop").show();
        $("#imp_tips_stop").click(function () {
            stopInfo.stop = true;
            $("#imp_tips_stop").hide();
            $("#imp_tips").hide();
        });
    }
    $(tip).css("right", "-300px").css("bottom", "100px").show();
    $(tip).animate({right: "0px"}, 1000);
    $(document).css({"overflow": "hidden"});
    $(document.body).css({"overflow": "hidden"});
}