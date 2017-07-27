var Utils = {};

Utils.extends = function (Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}

Utils.sampleExtends = function (Child, Parent, defult) {
    if (!defult)
        defult = {};
    if (!Child)
        Child = {};
    if (Parent == null || typeof Parent == 'undefined')
        return defult;
    var tp = Utils.clone(Parent);
    var allchildkeys = [];
    for (var key in Child) {
        allchildkeys.push(key);
    }
    for (var pk in Parent) {
        if (allchildkeys.indexOf(pk) >= 0)
            continue;
        Child[pk] = Parent[pk];
    }
    return Child;
}

Utils.overridCopy = function (child, parent) {
    for(var c in child)
    {
        parent[c] = child[c];
    }
    return parent;
};

Utils.toAscii = function (str) {
    var bytes = [];
    for (var i = 0, len = str.length; i < len; i++) {
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
};

Utils.deferredCallback = function ($q, orgDeferred, processFunc) {
    var deferred = Utils.defer();
    orgDeferred.then(function (result) {
        if (processFunc) {
            deferred.resolve(processFunc(result));
        }
        else {
            deferred.resolve(result);
        }
    }, function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
};

//num:view传入的输入内容；ele 当前操作的元素；$scope
Utils.writeInput = function (num, ele, $scope) {
    var newNum;
    var currentElement = ele;
    if (num == 'del') {
        newNum = currentElement.val().substring(0, currentElement.val().length - 1)
    } else if (num == 'clear') {
        newNum = '';
    } else {
        newNum = Utils.replaceStrOfSel(currentElement.val(), num, currentElement[0].selectionStart, currentElement[0].selectionEnd,
            currentElement.attr('modelTy'), currentElement.attr('maxlength'), currentElement.attr('sizeNum'));
    }
    currentElement.val(newNum);
    var bufferModelData = "$scope." + currentElement.attr('ng-model') + "=currentElement.val()";
    eval(bufferModelData);
}


/**
   Utils.formatDate(new Date(), "yyyy-MM-dd"); 
   Utils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
 */
Utils.formatDate = function (date, fmt) {
    if (date == null) {
        return "";
    }
    if (typeof (date) == 'string' || typeof (date) == 'number') {
        date = new Date(date);
    }
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }

    return fmt;
};

function _fromatNumberString(src, length) {
    var len = src.length;
    for (var i = len; i < length;i++) {
        src = "0" + src;
    }
    return src;
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": _fromatNumberString(""+this.getMilliseconds(),3) //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

String.prototype.encodeHex = function () {
    var bytes = [];
    for (var i = 0; i < this.length; ++i) {
        bytes.push(this.charCodeAt(i));
    }
    return bytes.toString();
};

String.prototype.decodeHex = function () {
    var str = [];
    var hex = this.split(',');
    for (var i = 0; i < hex.length; i++) {
        str.push(String.fromCharCode(hex[i]));
    }
    return str.join('');
    //return str.toString().replace(/,/g, "");
};

/**
	var str = "";
	var obj = null;
	var arr = [];
	var fall = {};

	Utils.isEmpty(str) === true
	Utils.isEmpty(obj) === true
	Utils.isEmpty(arr) === true
	Utils.isEmpty(fall) === true

*/
Utils.isEmpty = function (obj) {
    if (obj == null) {
        return true;
    }
    var type = typeof obj;
    if (type == "array") {
        return obj.length == 0;
    }
    if (type == "string") {
        return obj.length < 1;
    }
    for (var prop in obj) {
        return false;
    }
    return true;
};

Utils.isTrue = function (bool) {
    return bool === 'true' || bool === '1' || bool === true;
}

Utils.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

Utils.removeFromArray = function (array, key, compareIndex) {
    if (array != null && array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            if (compareIndex == null) {
                if (array[i] == key) {
                    array.splice(i, 1);
                }
            } else {
                if (array[i][compareIndex] == key) {
                    array.splice(i, 1);
                }
            }
        }
    } else {
        return;
    }
};

Utils.replaceFromArray = function (array, obj, compareIndex) {
    if (array != null && array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][compareIndex] == obj[compareIndex]) {
                array[i] = obj;
            }
        }
    } else {
        return;
    }
};

Utils.arrayFind = function (array, key, compareIndex) {
    if (array != null && array.length > 0) {
        for (var idx in array) {
            if (array[idx][compareIndex] == key) {
                return array[idx];
            }
        }
    }
    return null;
};

Utils.arrayFindIndex = function (array, key, compareIndex) {
    if (array != null && array.length > 0) {
        for (var idx in array) {
            if (array[idx][compareIndex] == key) {
                return idx;
            }
        }
    }
    return null;
};

Utils.contains = function (array, key, compareIndex) {
    if (compareIndex == null) {
        for (var idx in array) {
            if (array[idx] == key) {
                return true;
            }
        }
    } else {
        for (var idx in array) {
            if (array[idx][compareIndex] == key) {
                return true;
            }
        }
    }
    return false;
};

Utils.containsObj = function (array, key, compareIndex) {
    if (compareIndex == null) {
        for (var idx in array) {
            if (array[idx] == key) {
                return { include: true, idx: idx };
            }
        }
    } else {
        for (var idx in array) {
            if (array[idx][compareIndex] == key) {
                return { include: true, idx: idx };
            }
        }
    }
    return { include: false, idx: -1 };
};

Utils.showSuccessInfo = function (message) {
    Utils.showSuccessInfoDelay(message, 500);
}

Utils.showSuccessInfoDelay = function (message, delay) {
    var msgInfo = message ? message : "操作成功!";
    msgInfo = "<i class='fa fa-check'></i> " + msgInfo;
    $.maskLoader("show", msgInfo);
    setTimeout2(function () {
        $.maskLoader("hide");
    }, delay);
}

Utils.showFailureInfo = function (message, okfunc) {
    if (message&&message.indexOf('undefind') >= 0)
        console.trace()
    Utils.showFailureInfoDelay(message, 2000, okfunc);
}

Utils.showFailureInfoDelay = function (message, delay, okfunc) {
    var msgInfo = message ? message : "操作失败!";
    if (msgInfo.indexOf('请检查您设备的时间设置')>=0 || msgInfo.indexOf('只处理5分钟内的请求')>=0) {
        msgInfo = "亲, 你的设备时间好像不对哦. 请检查一下吧.";
    }
	msgInfo = msgInfo.substr(0,150);
    $.myconfirm(msgInfo, okfunc);
};

Utils.confirm = function (message, okfuc, cancelfuc) {
    var msgInfo = message ? message : "操作失败!";
    $.myconfirm2(msgInfo, okfuc, cancelfuc);
}

//授权
Utils.imprower = function (something, impName, okfun, service, use) {
    $.impowerDialog(something, impName, okfun, service, use);
}


Utils.formatSeqNo = function (seq, len) {
    len = len == null ? 5 : len;
    var output = "" + seq;
    var length = output.length;
    if (length < len) {
        for (var i = 0, remain = len - length; i < remain; i++) {
            output = "0" + output;
        }
    }
    return output;
}

Utils.formatCanbieTime = function (_timeint) {
    var _hours = "";
    var _minutes = "";
    var _seconds = "";

    _hours = (_timeint / (3600)) + "";
    var _temp = _timeint % (3600);
    _minutes = ":" + Utils.format24Clock((_temp / 60));
    _temp = _temp % 60;
    _seconds = ":" + Utils.format24Clock(_temp);
    _str = Utils.format24Clock(_hours) + _minutes + _seconds;
    return _str;
}

Utils.toCanbieTime = function (date) {
    return (date.getHours()) * 3600 + (date.getMinutes()) * 60 + date.getSeconds();
}

Utils.format24Clock = function (time) {
    time = parseInt(time);
    if (time < 10) {
        return "0" + time;
    }
    return time;
}

Utils.toIDQueryString = function (idArray) {
    var str = "";
    for (var idx in idArray) {
        str += "'" + idArray[idx] + "',";
    }
    if (str.length > 0) {
        str = str.substring(0, str.length - 1);
    }
    return str;
};

Utils.callAjax = function (ajaxURL, callback, data, method, datatype, contentType, errorCallback) {
    $.ajax({
        type: method == null ? "POST" : method,
        url: ajaxURL,
        data: data,
        dataType: datatype == null ? "json" : datatype,
        success: callback,
        contentType: contentType == null ? "application/json; charset=utf-8" : contentType,
        error: function (error, data) {
        	if(errorCallback) {
        		errorCallback(error, data);
        		return; 
        	}
            if (error.status == 404) {
                Utils.showFailureInfo("请检查网络是否正常, " + ajaxURL + "无法访问！");
                return;
            }
            Utils.winLog("ajax error", error.status, ajaxURL, data, error.responseText);
        }
    });
};
Utils.guid = function () {
    return UUID.generate().replaceAll('-', '');
};

Utils.toNumberDecimal = function (number, digit) {
    var f = parseFloat(number);
    if (isNaN(f)) {
        return null;
    }
    var pow = Math.pow(10, digit);
    f = Math.round(number * pow) / pow;
    return f;
};

Utils.parseJsonDate = function (jsondate) {
    jsondate = jsondate.replace("/Date(", "").replace(")/", "");
    if (jsondate.indexOf("+") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("+"));
    }
    else if (jsondate.indexOf("-") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("-"));
    }

    return new Date(parseInt(jsondate));
}

Utils.now = function () {
    var t = new Date().format("yyyy-MM-dd hh:mm:ss");
    return t;
}

Utils.nowWith = function (d) {
    var t = d.format("yyyy-MM-dd hh:mm:ss");
    return t;
}

/**
 * added by peter.shang
 *
 * 只要涉及到钱，必须调用这个方法
 * 1. 执行四舍五入
 * 2. 2为格式
 * 3.有可能是直接让设置为取证或者2为小树
 * @param rm  金额
 */
Utils.mnan = function (rm) {
    if (isNaN(rm)) {
        rm = '0';
    }
    if (typeof rm == 'string')
        rm = rm.replaceAll(',', '');
    rm = _.toNumber(rm);
    return _.round(rm, BIZCONSTANT.MONEY_PRECISE);
}

Utils.m = function (rm) {
    if (typeof rm == 'string')
        rm = rm.replaceAll(',', '');
    rm = _.toNumber(rm);
    if (rm < 0) {
        return _.round(-rm, BIZCONSTANT.MONEY_PRECISE) * (-1);
    }
    return _.round(rm, BIZCONSTANT.MONEY_PRECISE);
}

Utils.ml = function (m) {
    return _.round(m).toFixed(2); //四舍五入抹零
}

Utils.m2string = function (m) {
    return Utils.m(m).ToString('C');
}


//#region 对字符串进行处理的工具方法，打印使用

// 获取指定个数的空格构成的字符串
Utils.printBlank = function (length) {
    var blank = "";
    for (var i = 0; i < length; i++) {
        blank = blank + " ";
    }
    return blank;
}

Utils.getPrinterLength = function (aOrgStr) {
    var intLen = Utils.getRealLen(aOrgStr);
    //var i;
    //var chars = aOrgStr.split(""); 
    //for (i = 0; i < chars.length; i++)
    //{
    //	if (chars[i] == '°' || aOrgStr.charCodeAt(i) > 255)
    //	{
    //		intLen++;
    //	}
    //}
    return intLen;
}

//根据关键字进行获取整行（数据源，关键字，偏移量）
Utils.getPrintLineByK = function (printtext, keyword, offset) {
    var spprinttextarr = printtext.split('\n');
    var spindex = -1;
    for (var s in spprinttextarr) {
        var stext = spprinttextarr[s];
        if (stext.indexOf(keyword) >= 0)
            spindex = s;
    }
    if (offset && typeof offset == 'number')
        spindex = Utils.m(spindex) + offset;
    if (spindex >= 0) {
        return spprinttextarr[spindex];
    }
    return '';
}

//根据关键字进行整行修改（数据源，关键字，偏移量(数字或者数字数组),进行整行替换的字符串或者对字符串操作的函数）
Utils.editPrintLineByK = function (printtext, keyword, offset, funOrReplaceStr) {
    var spprinttextarr = printtext.split('\n');
    var spindex = -1;
    for (var s in spprinttextarr) {
        var stext = spprinttextarr[s];
        if (stext.indexOf(keyword) >= 0)
            spindex = s;
    }
    if (offset && typeof offset == 'number') {
        offset = [offset];
    } else if (!Utils.isArray(offset))
        offset = [0];
    //spindex = Utils.m(spindex) + offset;
    if (spindex >= 0) {
        //return spprinttextarr[spindex];
        for (var i in offset) {
            var sindex = Utils.m(spindex) + offset[i];
            if (typeof funOrReplaceStr == 'string')
                spprinttextarr[sindex] = funOrReplaceStr;
            if (typeof funOrReplaceStr == 'function')
                spprinttextarr[sindex] = funOrReplaceStr(spprinttextarr[sindex]);
        }
    }
    return printtext = spprinttextarr.join('\n');
}

///
//根据关键字进行整行删除（数据源，关键字，偏移量（数字或者数字数组【是数字数组的话，值必须从大到小】）,进行行自定义判断的函数，返回true或者false）
Utils.removePrintLineByK = function (printtext, keyword, offset, fun) {
    var spprinttextarr = printtext.split('\n');
    var spindex = -1;
    for (var s in spprinttextarr) {
        var stext = spprinttextarr[s];
        if (stext.indexOf(keyword) >= 0)
            spindex = s;
    }
    if (offset && typeof offset == 'number')
        offset = [offset];
    else if (!Utils.isArray(offset))
        offset = [0];
    //spindex = Utils.m(spindex) + offset;
    if (offset && spindex >= 0) {
        for (var i in offset) {
            var si = Utils.m(spindex) + offset[i];
            if (typeof fun == 'function' && fun(spprinttextarr[si], offset[i]))
                spprinttextarr.splice(si, 1);
            else if (typeof fun != 'function')
                spprinttextarr.splice(si, 1);
        }

    }
    return printtext = spprinttextarr.join('\n');
}

//统计字符长度， 对于双音节的字符长度算2，例如汉字
Utils.getRealLen = function (str) {
    return str.replace(/[^\x00-\xff]/g, '__').length;
}

// #endregion

Utils.clone = function (myObj) {
    if (typeof (myObj) != 'object') return myObj;
    if (myObj == null) return myObj;
    var myNewObj = Array.isArray(myObj) ? new Array() : new Object();
    for (var i in myObj) {
        if (i != '$$hashKey') {
            if (typeof (myObj[i]) == 'object' && myObj[i] != null)
                if (Array.isArray(myObj[i]))
                    myNewObj[i] = Utils.arrClone(myObj[i]);
                else
                    myNewObj[i] = Object.create(myObj[i]);//myObj[i];
            else
                myNewObj[i] = myObj[i];
        }

    }
    //myNewObj = Object.create(myNewObj);

    return myNewObj;
};

Utils.arrClone = function (arr) {
    var newArr = [];
    for (var x in arr) {
        newArr.push(Utils.clone(arr[x]));
    }
    return newArr;
};

Utils.getCurCBStartAndEndTime = function (canbie) {

    var startTime = new Date().format("yyyy-MM-dd") + " " + canbie.formatStarttime;

    var endTime = canbie.endtime;
    if (canbie.starttime > canbie.endtime)
        endTime = Utils.AddTime(0, 0, 1).format("yyyy-MM-dd") + "" + canbie.formatEndtime;;

    return { startTime: startTime, endTime: endTime };
    //测试用
    //return { startTime: "2016-03-03 08:00:00", endTime: "2016-04-26 23:00:00" };    
}
Utils.isMaster = function (config) {
    if (!CONSTANTS.PRODUCTION) { // 本机调试模式，直接当作主机处理
        return true;
    }
    var configObj;
    if (config == null) {
        configObj = InstallConfigService.getLocalStorageInstallConfigSync();
    } else {
        configObj = config;
    }
    return configObj == null || (configObj != null && ((configObj.isMaster == true || configObj.isMaster == "true") && configObj.hasOwnProperty("ip") && configObj.ip != null));
}

//获取设备名称
Utils.DeviceName = function () {
    var devicename = '';

    if (window.CONTEXT.env == CONSTANTS.EnvConstants.WINDOWS) {
        if (typeof require == 'function') {
            var iconv = require('iconv-lite')

            var os = require("os");
            var hostname = iconv.decode(os.hostname(), 'gb2312')
            //var interfaces = os.networkInterfaces();
            //var addresses = [];
            //for (var k in interfaces) {
            //    for (var k2 in interfaces[k]) {
            //        var address = interfaces[k][k2];
            //        //console.log(address);
            //        if (address.family === 'IPv4' && !address.internal) {
            //            addresses.push(address.address);
            //        }
            //    }
            //}

            //// 如果有多个地址，优先选择192.开头的
            ////console.log(addresses);
            //var final = addresses[0]; //默认取第一个
            //angular.forEach(addresses, function (e) {
            //    if (e.indexOf("192") > -1) //有的VPN会有多个地址，优先去192.开头的
            //        final = e;
            //});

            devicename = hostname;
        } else
            devicename = 'WebKit';
    }
    else if (CONTEXT.env == CONSTANTS.EnvConstants.ANDROID) {
        // 在Native端已经加了macAddress 来保证deviceName的唯一性
        devicename = AndroidAdapter.getDeviceName();
    }
    else if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
        devicename = IOSAdapter.getDeviceName();
    }
    else {
        devicename = 'FAKE DEVICE,NOT IMPLEMENTED';
        console.log("获取不到硬件信息");
    }
    return devicename;
}

//获取设备IP
Utils.DeviceIP = function () {
    var devicename = '';

    if (window.CONTEXT.env == CONSTANTS.EnvConstants.WINDOWS) {
        if (typeof require == 'function') {
            var iconv = require('iconv-lite')

            var os = require("os");
            //var hostname = iconv.decode(os.hostname(), 'gb2312')
            var interfaces = os.networkInterfaces();
            var addresses = [];
            for (var k in interfaces) {
                for (var k2 in interfaces[k]) {
                    var address = interfaces[k][k2];
                    //console.log(address);
                    if (address.family === 'IPv4' && !address.internal) {
                        addresses.push(address.address);
                    }
                }
            }

            // 如果有多个地址，优先选择192.开头的
            //console.log(addresses);
            var final = addresses[0]; //默认取第一个
            angular.forEach(addresses, function (e) {
                if (e.indexOf("192") > -1) //有的VPN会有多个地址，优先去192.开头的
                    final = e;
            });

            devicename = final;
        } else
            devicename = '127.0.0.1';
    }
    else if (CONTEXT.env == CONSTANTS.EnvConstants.ANDROID) {
        // 在Native端已经加了macAddress 来保证deviceName的唯一性
        devicename = AndroidAdapter.getIp();
    }
    else if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
        devicename = IOSAdapter.getIp();
    }
    else {
        devicename = 'FAKE DEVICE,NOT IMPLEMENTED';
        console.log("获取不到硬件信息");
    }
    return devicename;
}

//打开手写输入法
Utils.openHandIME = function (domid) {
    var exec = require("child_process").spawn;
    var path = require('path');
    var nwPath = process.execPath;
    var nwDir = path.dirname(nwPath);
    var exepath = nwDir.replaceAll('\\\\', '/') + "/HandInput/handinput.exe";
    require("fs").exists(exepath, function (exists) {
        if (exists)
            exec(exepath);
    });
    if (domid && domid != '')
        $(domid).focus();
}

Utils.unique = function (arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

Utils.uniqueArrayObject = function (arr, key) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem[key]]) {
            result.push(elem);
            hash[elem[key]] = true;
        }
    }
    return result;
}


Utils.getCanbieByTime = function (canbies, t) {
    if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
        t = t == null ? new Date() : (typeof t == "object") ? t : new Date(t.replace(/-/g, "/"));
    } else {
        t = t == null ? new Date() : (typeof t == "object") ? t : new Date(t);
    }
    var canbieTime = Utils.toCanbieTime(t);
    //这里用克隆赋值一个新的数组
    var rows = Utils.clone(canbies);
    for (var idx in rows) {
        var canbie = Utils.clone(rows[idx]);
        var endTime = canbie.endtime;
        if (canbie.starttime > canbie.endtime) {
            endTime = parseInt(canbie.endtime) + 86400;

            if (canbie.starttime > canbieTime)
                canbieTime = parseInt(canbieTime) + 86400;
        }
        if (canbie.starttime <= canbieTime && canbieTime <= endTime) {
            var cloneTime = Utils.clone(t);

            if (canbieTime > 86400) {
                canbie.formatStarttime = t.AddTime(0, 0, -1).format("yyyy-MM-dd") + " " + canbie.formatStarttime;
                t = t.AddTime(0, 0, 1);
            } else {
                canbie.formatStarttime = t.format("yyyy-MM-dd") + " " + canbie.formatStarttime;
            }

            if (endTime > 86400 && canbieTime < 86400) {
                canbie.formatEndtime = t.AddTime(0, 0, 1).format("yyyy-MM-dd") + " " + canbie.formatEndtime;
            } else {
                canbie.formatEndtime = t.format("yyyy-MM-dd") + " " + canbie.formatEndtime;
            }

            return canbie;
        } else {
            if (canbieTime > 86400)
                canbieTime = parseInt(canbieTime) - 86400;
        }
    }
    return null;
}

Utils.encodeBuffer = function (text, encode) {
    if (window.CONTEXT.env != CONSTANTS.EnvConstants.WINDOWS)
        return text;
    var iconv = null;
    if (typeof (require) != 'undefined') {
        iconv = require("iconv-lite");
    }
    return iconv.encode(text, encode);

}

//初始化页面权限
Utils.initViewRole = function () {
    //延迟800毫秒 后执行
    //setTimeout(function () {
    if (!ROLEUSEABLE.USEABLE)
        return;
    var rolenodes = $('body').find('[roleValue]');
    rolenodes.each(
        function () {
            var temp = $(this).attr("roleValue");
            if (temp != undefined) {
                if (!ROLE_POWER[temp] || BIZCONSTANT.OPERATOR_ROLES.indexOf(ROLE_POWER[temp]) < 0) {
                    if ($(this).attr("ng-click")) {
                        $(this).attr("ng-click", "noRole()");
                    }
                    if ($(this).attr("ng-mobile-click")) {
                        $(this).attr("ng-mobile-click", "noRole()");
                    }
                }
            }
        }
    );
    // },800)
}

// Add by Lisa, 仅支持iOS, 替换所有 "ng-click" 为 "ng-mobile-click"
Utils.replaceClickEventForIOS = function () {
    if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
        var clicks = $('body').find('[ng-click]');
        clicks.each(
				function () {
				    if ($(this).prop("tagName") == "INPUT" || $(this).prop("tagName") == "TR") {
				        return;
				    }
				    var temp = $(this).attr("ng-click");
				    if (temp != undefined) {
				        $(this).attr("ng-mobile-click", temp);
				        $(this).removeAttr("ng-click");
				    }
				}
		);
    }
};

//是否可以进行折扣
Utils.allowZk = function (zk, ty) {
    //定额
    if (ty == 'de') {
        if (BIZCONSTANT.HIGHEST_DE == null) {
            return true;
        } else {
            if ((BIZCONSTANT.HIGHEST_DE - 0) >= (zk - 0)) {
                return true;
            } else {
                return false
            }
        }
    }
    //比例
    if (ty == 'bl') {
        if (BIZCONSTANT.HIGHEST_ZK == null) {
            return true;
        } else {
            if ((BIZCONSTANT.HIGHEST_ZK - 0) <= (zk - 0)) {
                return true;
            } else {
                return false
            }
        }
    }

}

//美团心跳
Utils.parseMeiTuanURL = function (mturl) {

    var paramstrs = [];
    if (mturl.indexOf('?') > -1)
        paramstrs = mturl.split('?')[1].split('&');
    else
        paramstrs = mturl.split('&');
    var params = [];
    for (var i in paramstrs) {
        var tpparam = paramstrs[i].split('=');
        if (tpparam.length == 2 && tpparam[1] != '')
            params.push(paramstrs[i].replace('=', ''));
    }
    params = params.sort(function (a, b) {
        if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
            return a < b ? -1 : a > b ? 1 : 0;
        } else {
            return a > b;
        }
    });
    var cynstr = MEITUANSIGNKEY;
    for (var s in params) {
        cynstr += params[s];
    }
    var shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.update(cynstr);
    return shaObj.getHash("HEX");
};

//是否有某个权限
Utils.roleAble = function (rolecode, operator_roles) {
    if (!ROLEUSEABLE.USEABLE)
        return true;
    if (!operator_roles)
        operator_roles = BIZCONSTANT.OPERATOR_ROLES;
    return operator_roles.indexOf(rolecode) >= 0 || operator_roles.indexOf(ROLE_POWER[rolecode]) >= 0;
}

//是否有某个权限(没有的话，提示)
Utils.roleAbleShowMsg = function (rolecode) {
    var res = Utils.roleAble(rolecode);
    if (!res)
        Utils.showFailureInfo("你没有此操作权限");
    return res;
}

/**
	使用扩展的defer/promise原型替换掉angular本身的defer/promise
	如果调用参数时传入q, 将会继续沿用angular的defer原型。
*/
Utils.defer = function (q) {
    if (q) {
        return q.defer();
    }
    var defer = new YsDefer();
    var promise = new YsPromiser();
    defer.promise = promise;
    return defer;
};

function setTimeout2(func, interval) {
    if (typeof global != "undefined" && global.setTimeout) {
        return global.setTimeout(func, interval);
    }
    else {
        return window.setTimeout(func, interval);
    }
}

function clearTimeout2(index) {
    if (typeof global != "undefined" && global.clearTimeout) {
        return global.clearTimeout(index);
    }
    else {
        return window.clearTimeout(index);
    }
}

function Interval(func, interval) {
    var start = false;
    var timeoutindex = null;

    var wrap = function () {
        if (!start)
            return;
        func();
        timeoutindex = setTimeout2(wrap, interval);
    };

    this.start = function () {
        start = true;
        timeoutindex = setTimeout2(wrap, interval);
    };

    this.stop = function () {
        start = false;
        clearTimeout2(timeoutindex);
    };

    this.isRunning = function () { return start; };

    this.start();
}

Utils.setInterval = function (func, interval) {
    return new Interval(func, interval);
};

//发送网络广播
Utils.sendBroadcast = function (message) {
    if (_POS_CLIENT_SOCKET_ && _POS_CLIENT_SOCKET_.SOPEN)
        _POS_CLIENT_SOCKET_.send(JSON.stringify(message));
    else
        setTimeout2(function () { Utils.sendBrocast(message); }, 1000);
}

//精确加法
Utils.accAdd = function (arg1, arg2) {
    var r1, r2, m, c;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        }
        else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    }
    else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m
}

//精确减法
Utils.accSub = function (arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

Utils.weight = null;
Utils.getWeight = function (weightobj) {
    if (!weightobj)
        weightobj = Utils.weight;
    if (!weightobj)
        return '';
    if (typeof weightobj === 'string')
        weightobj = JSON.parse(weightobj);

    return Utils.m2string(weightobj.weight);
}

//精确乘法
Utils.accMul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

//精确除法
Utils.accMul = function (arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

//使用新窗口打开链接
Utils.openNewWin = function (newurl, params, closefuc, opt) {
    var defaultOpt = {
        position: 'center', width: 1024, height: 768, fullscreen: false, toolbar: false, title: '', icon: 'icon.png'
    };
    opt = angular.extend({}, defaultOpt, opt);
    var winobj = null;
    newurl += '?' + getParamStrByArrayParams(params);
    newurl = handlePosUrl(newurl);
    if (window.CONTEXT.env == CONSTANTS.EnvConstants.ANDROID) {
        window.yunshan.gotoHoutaiguanli(newurl);
    } else if (window.CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
        IOSAdapter.gotoHoutaiguanli(newurl);
    }

    console.log(newurl);
    if (typeof (require) != 'undefined') {
        var gui = require('nw.gui');
        winobj = gui.Window.open(newurl, opt);

        winobj.on("close", function () {
            winobj.close(true);
            if (closefuc)
                closefuc();
        });

        gui.Window.get().on('close', function () {
            this.hide();

            if (winobj != null)
                winobj.close(true);
            this.close(true);
        });
        return winobj;
    }
}

//判断当前环境下是否是开发环境    zyy
// 不传参的话使用同步方法获取
// 传回调函数的话则异步获取 --推荐异步方式
Utils.isDevE = function (cb) {
    var devE = false;

    if (window.CONTEXT.env == CONSTANTS.EnvConstants.WINDOWS && typeof require != 'undefined') {
        try {
            var path = require('path');
            var nwPath = process.execPath;
            var nwDir = path.dirname(nwPath);
            if (cb)
                return require("fs").exists(nwDir + '/app/app.min.js', function (exits) {
                    if (cb)
                        cb(!exits);
                });
            else {
                return devE = !require("fs").existsSync(nwDir + '/app/app.min.js');
            }
        } catch (e) {

        }
    }
    if (cb)
        cb(devE);
    return devE;
}

// windows环境下记录日志（以文件为存储媒介）
Utils.winLog = function (logType) {

    var log = "";
    var args = arguments;
    if (args.length == 0) {
        return;
    }
    if (logType && logType.length > 0 && BIZCONSTANT.LOGTYPE.hasOwnProperty(logType)) {
        delete args[0];
    }
    if (args.length == 0) {
        return;
    }
    try {
        for (var i in args) {
            var tplog = '';

            if (Utils.isArray(args[i])) {
                for (var j in args[i]) {
                    var arrlog = '';

                    if (typeof args[i][j] == 'object')
                        arrlog = JSON.stringify(args[i][j]);
                    else
                        arrlog = args[i][j];
                    tplog += i + '-' + j + ' : ' + arrlog + '\r\n';
                }
            }
            else if (typeof args[i] == 'object') {
                tplog = JSON.stringify(args[i]);
            }
            else
                tplog = args[i];
            log += i + ' : ' + tplog + '\r\n';
        }
        log = log.replaceAll(' at', '\r\n\t at');
        //年月日，用来创建文件
        //年月日时分秒
        var time = new Date();
        var time_name = Utils.formatDate(time, 'yyyy-MM-dd');
        var time_note = Utils.formatDate(time, 'yyyy-MM-dd hh:mm:ss')
        var s = "\r\n----------------------分割线--version:" + CONSTANTS.APPVERSION + "----------------------\r\n" + time_note + "\r\n\r\n";
        s = s + log;
        var fileName = '\\notedata_';
        if(CONTEXT.env == CONSTANTS.EnvConstants.ANDROID){
            fileName = 'notedata_';
            if (logType && logType.length > 0 && BIZCONSTANT.LOGTYPE.hasOwnProperty(logType)) {
                fileName =logType + "_";
            }
            window.yunshan.writeLogInfo(fileName+time_name,s);
        }else{
            var path = require('path');
            var nwPath = process.execPath;
            var nwDir = path.dirname(nwPath) + '\\log\\';
            var fs = require("fs");
            if (logType && logType.length > 0 && BIZCONSTANT.LOGTYPE.hasOwnProperty(logType)) {
                fileName = "\\" + logType + "_";
            }
           
            _doWriteFile(fs, nwDir + fileName + time_name + '.txt', s)
        }

    } catch (e) {

    }
}

var _fileBuffer = [];

function _doWriteFile(fs, filename, content) {
	_fileBuffer.push({m:fs, f: filename, data:content});
}
function _doAppendFile() {
	var d = null;
	var bufferLimit = 1000;
	var count = 0;
	while((d = _fileBuffer.shift()) != null) {
		if(count >= bufferLimit){
			setTimeout2(_doAppendFile, 5000);
			return;
		}
		count ++;
		
		d.m.appendFile(d.f, d.data, function (err) {
	        if (err) {
	        	console.log("file error: " + err.message);
	            window.localStorage.setItem("file_append_error", err);
	        }
	        window.localStorage.setItem("file_append_success", new Date());
	   });
	}
	setTimeout2(_doAppendFile, 5000);
}
_doAppendFile();

//获取App版本
Utils.AppVersion = function (cb) {
    if (CONTEXT.env == CONSTANTS.EnvConstants.WINDOWS && typeof require != 'undefined') {
        var regedit = require('regedit')
        regedit.list(['HKCU\\SOFTWARE\\IEASY360\\YUNSHAN\\AutoUpdater'])
            .on('data', function (entry) {
                var currentVer = "0";
                try {
                    currentVer = entry.data.values['version'].value;
                } catch (ex) {
                    currentVer = "";
                }
                cb(currentVer);
            })
    }

    if (CONTEXT.env == CONSTANTS.EnvConstants.ANDROID) {
        cb(window.yunshan.getAppVersionName());
    }
    if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
        cb(IOSAdapter.getAppVersionName());
    }
};

//重启NW进程
Utils.nwRestart = function () {
    var child, child_process = require('child_process');
    if (process.platform == "darwin") {
        child = child_process.spawn("open", ["-n", "-a", process.execPath.match(/^([^\0]+?\.app)\//)[1]], { detached: true });
    } else {
        child = child_process.spawn(process.execPath, [], { detached: true });
    }
    child.unref();
    require("nw.gui").Window.get().hide();
    process._nw_app.quit();
};

Utils.replaceStrOfSel = function (str, waitStr, start, end, type, len, numSize) {

    if (str.length >= len) {
        return str
    }

    var newStr = str.substring(0, start) + waitStr + str.substring(end, str.length);
    if (type == 'num') {
        if (isNaN(newStr)) {
            return str;
        }

        if (numSize == 'undefined') {
            if (newStr < numSize) {
                return str
            }
        }
    }
    return newStr
}


//exe子进程，用于与C#编写的exe进行通讯
Utils.childProcess = function (option, messageCallback, errorCallback) {
    this.childprocess = null;
    this.onceListenters = {};
    this.alawysListenters = {};
    this.cachedata = "";
    this.alwaysListenter = null;
    this.errorListenter = null;
    this.trueClose = false;
    var me = this;
    var iconv = require('iconv-lite');
    if (window.CONTEXT.env != CONSTANTS.EnvConstants.WINDOWS)
        return null;
    var defaultOpt = {
        exe: 'NYSProcess.exe',
        closeCallback: function (exitcode) { },
        autoReOpen: false,
        args: []
    };
    var opt = null;
    if (typeof option == 'string') {
        defaultOpt.exe = option;
        opt = defaultOpt;
    }
    else {
        opt = angular.extend({}, defaultOpt, option);
    }
    opt.args = ['pos'].concat(opt.args);

    var getparam = function (obj) { return { cguid: Utils.guid(), data: obj } };

    this.open = function () {
        var exec = require("child_process").spawn;
        //var path = require('path');
        //var nwPath = process.execPath;
        //var nwDir = path.dirname(nwPath);

        //me.childprocess = exec(nwDir + "/" + opt.exe, opt.args);
        me.childprocess = exec(opt.exe, opt.args);
        me.childprocess.stdin.setEncoding("binary");
        me.childprocess.stdout.setEncoding("binary");
        if (me.childprocess == null)
            if (opt.closeCallback)
                opt.closeCallback(-1);
        Utils.winLog(opt.exe + "启动成功");
        me.childprocess.on('exit', function (code) {
            Utils.winLog('已关闭，代码：', code);
            if (opt.autoReOpen && code != 0 && !me.trueClose)
                setTimeout2(function () {
                    me.open();
                    console.log('reopen' + opt.exe, !!me.childprocess);
                }, 2000);
            if (opt.closeCallback)
                opt.closeCallback(code);
        });

        me.childprocess.stdout.on('data', function (data) {
            //console.log('' + data);
            var result = null;
            var json = '';
            try {

                //json = iconv.decode(data, 'gbk').replaceAll('\n', '');
                json = data.toString();//.replaceAll('\n', '');
                if (json.endsWith('\r\n'))
                    json = json.substr(0, json.length - 1);
                json = me.cachedata + json;
                me.cachedata = "";
                var resultdatas = json.split('@=@');
                for (var j in resultdatas) {
                    if (resultdatas.length == 1) {
                        me.cachedata += resultdatas[j];
                        continue;
                    }
                    if (j == (resultdatas.length - 1) && resultdatas[j] != '') {
                        me.cachedata += resultdatas[j];
                        continue;
                    }

                    var jsondata = "";
                    try {
                        var jsondata = JSON.parse(resultdatas[j]);

                    } catch (ee) {
                        me.cachedata += resultdatas[j];
                        //console.error(resultdatas[j]);
                        continue;
                    }
                    var onceListenters = me.onceListenters[jsondata.cguid];
                    if (onceListenters) {
                        onceListenters(jsondata.Error, jsondata.data);
                        delete me.onceListenters[jsondata.cguid];
                    }

                    if (me.alawysListenters[jsondata.cguid]) {
                        me.alawysListenters[jsondata.cguid](jsondata.Error, jsondata.data);
                    }

                    if (me.alwaysListenter)
                        me.alwaysListenter(jsondata.data, jsondata.Error);
                    if (me.errorListenter && jsondata.Error && jsondata.Error.length > 2)
                        me.errorListenter(jsondata.Error);

                }
            } catch (e) {
                if (me.errorListenter)
                    me.errorListenter(e.message);
                console.error(e);
                //console.error(json);
            }
        });

        me.childprocess.stdout.on('error', function (error) {
            Utils.winLog('childprocess error ', opt.exe, error);
        });
    };

    this.close = function (close) {
        me.trueClose = !!close;
        me.childprocess.kill();
    };

    this.send = function (data, oncecb, alawyscb) {
        if (!me.childprocess && oncecb)
            return oncecb('所需进程尚未启动');
        if (!me.childprocess.stdin.writable && oncecb)
            return oncecb('无法建立通道连接');
        var data = getparam(data);
        //console.log(JSON.stringify(data));
        if (oncecb)
            me.onceListenters[data.cguid] = oncecb;
        if (alawyscb)
            me.alawysListenters[data.cguid] = alawyscb;
        var senddata = iconv.encode(JSON.stringify(data) + "\r\n", 'gbk');
        me.childprocess.stdin.write(senddata);
    };

    me.alwaysListenter = messageCallback;
    me.errorListenter = errorCallback;
    me.open(messageCallback, errorCallback);
    console.info('this', this);
};

/***
 * edit by loujin
 * 统一处理不同平台的外卖声音
 */
Utils.playAudioPlayer = function () {
    if (CONTEXT.env == CONSTANTS.EnvConstants.ANDROID) {
        window.yunshan.playAudio();
    }
    else if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
        IOSAdapter.playLocalAudio("waimai");
    }
    else if (CONTEXT.env == CONSTANTS.EnvConstants.WINDOWS) {
        var audioPlayer = window.document.getElementById("audioPlayer");
        audioPlayer.currentTime = 0;
        var playTimes = 5;
        var interval = setInterval(function () {
            if(playTimes == 0) {
                clearInterval(interval);
            }else {
                audioPlayer.play();
                playTimes--;
            }
        },2000);
    }
}
/***
 * 异常订单信息
 */
Utils.playAudioPlayer_yc = function () {
    if (CONTEXT.env == CONSTANTS.EnvConstants.ANDROID) {
        window.yunshan.playAudio_unusual();
    }
    else if (CONTEXT.env == CONSTANTS.EnvConstants.IOS) {
        IOSAdapter.playLocalAudio("ycorder");
    }
    else if (CONTEXT.env == CONSTANTS.EnvConstants.WINDOWS) {
        var audioPlayer = window.document.getElementById("ycorderPlayer");
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    }
}


window.Utils = Utils;


Date.prototype.AddTime = function (year, month, day, hours, minute, second) {

    if (!Utils.isEmpty(year))
        this.setFullYear(this.getFullYear() + parseInt(year))
    if (!Utils.isEmpty(month))
        this.setMonth(this.getMonth() + parseInt(month));
    if (!Utils.isEmpty(day))
        this.setDate(this.getDate() + parseInt(day));
    if (!Utils.isEmpty(hours))
        this.setHours(this.getHours() + parseInt(hours));
    if (!Utils.isEmpty(minute))
        this.setMinutes(this.getMinutes() + parseInt(minute));
    if (!Utils.isEmpty(second))
        this.setSeconds(this.getSeconds() + parseInt(second));

    return this;
}

function YsDefer() {
    var me = this;
    this.resolve = function (data) {
        if (me.promise) {
            me.promise._call(data, null);
        }
    };

    this.reject = function (err) {
        if (me.promise) {
            me.promise._call(null, err);
        }

    };

    this.promise = null;
};

function YsPromiser() {
    this.success = null;
    this.error = null;
    this._chain = null;

    this.then = function (success, error) {
        this._chain = new YsPromiser();
        this.success = success;
        this.error = error;
        return this._chain;
    };

    this._call = function (data, err) {
        if (data != null && this.success != null) {
            this.success(data);
        }
        else if (err != null && this.error != null) {
            this.error(err);
        }
        else if (err == null && data == null && this.success != null) {
            this.success(data);
        }
        if (this._chain) {
            this._chain._call(data, err);
        }
        else {
            try {
                angular.element(document.getElementById('_rootElement')).scope().$apply();
            } catch (ex) { }
        }
    };
};

var _POS_CLIENT_SOCKET_ = null;
function SocketClient(callback) {
    var socket;
    var masterhost = 'null';
    var _install_config_ = window.localStorage.getItem('_install_config_');
    if (!_install_config_ || _install_config_ == '')
        return;
    else
        masterhost = JSON.parse(_install_config_).masterHost;
    if (!masterhost || masterhost == 'null')
        masterhost = '127.0.0.1';
    var url = 'ws:' + masterhost + ':' + WEB_SERVER.SOCEKTPORT;

    if ('WebSocket' in window) {
        socket = new WebSocket(url);
    } else if ('MozWebSocket' in window) {
        socket = new MozWebSocket(url);
    } else {
        //alert('当前浏览器不支持websocket，请更换浏览器')
        return console.log('当前浏览器不支持websocket，请更换浏览器');
    }

    socket.SOPEN = false;

    socket.onopen = function (event) {
        socket.SOPEN = true;
    }

    socket.onmessage = function (event) {
        callback(event);
    }

    socket.onclose = function (event) {
        socket.SOPEN = false;
        setTimeout2(function () { _POS_CLIENT_SOCKET_ = SocketClient(callback); }, 1e3);//一秒后重连
        console.log("socket close() ");
    }

    socket.onerror = function (event) {
        socket.close();
    }
    return socket;
}

Utils.getWaimaiType = function (ordersource, pm) {
    console.log(pm)
    if (ordersource == 'eleme') {
        return '饿了么';
    }

    if (ordersource == 'meituan') {
        return '美团';
    }

    if (ordersource == 'meituanwaimai') {
        return '美团';
    }

    if (ordersource == 'baidu') {
        return '百度';
    }

    if (ordersource == 'baiduwaimai') {
        return '百度';
    }

    if (ordersource == 'WeiXinWaiMai') {
        if (pm.pmSource == 'weixinpm') {
            return '微信外卖';
        } else {
            return null;
        }
    }

    if (ordersource == 'weixin') {
        if (pm.pmSource == 'weixinpm') {
            return '微信';
        } else {
            return null;
        }
    }

    return null;
}

// nodejs mysql实现，未完成
function MysqlImpl(host, user, pwd, db) {
	this.host = host;
	this.user = user;
	this.pwd = pwd;
	this.db = db;
	var me = this;
	var mysql = require('mysql');
	var pool  = mysql.createPool({
		  connectionLimit : 10,
		  host            : host,
		  user            : user,
		  password        : pwd,
		  database        : db
	});

	
	this.execCommand = function(queryAndParamsArray, callback, errorCallback) {
		pool.getConnection(function(err, connection) {
			 if (err) {
			 	
			    errorCallback(err, true);
			    return;
			 }
			
			var rows = [];
			
			var doQuery = function(idx, sqltext, isSelect, conn,cb) {
				var result = {row:[],rowsAffected:0};
				conn.query(sqltext, function (error, results, fields) {
				  if (error) {
				  	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				  	console.log("ERROR: ");
			 		console.log(sqltext);
			 		if(error.message.toLowerCase().indexOf("duplicate column") == -1) {
			 			alert(sqltext + " <<<<<------>>>>>:" + error.message);
			 		}
				  	return cb(error);
				  }
				  if(isSelect) {
				  	result.row = results == null ? [] : results;
				  }
				  else{
				  	result.rowsAffected = results.affectedRows;
				  }
				  rows[idx] = result;
				  cb(null, idx);
				});
			}
			var fallcall = function(idx, sqltext, isSelect, connection) {
				this.idx = idx;
				this.sqltext = sqltext;
				this.isSelect = isSelect;
				this.conn = connection;
				var me = this;
				this._doQuery = function(cb) {
					doQuery(me.idx, me.sqltext, me.isSelect, me.conn, cb);
				}
			}
			connection.beginTransaction(function(err) {
				if (err) { 
					connection.release();
					errorCallback(err);
			    	return;
				}
				
				var funcArray = [];
				
				var pushArray = function(fc) {
					funcArray.push(function(cb) {
						fc._doQuery(cb);
					});					
				}
				for(var idx in queryAndParamsArray) {
					var sqltext = queryAndParamsArray[idx].query.trim();
					var paramlist = queryAndParamsArray[idx].params == null ? [] : queryAndParamsArray[idx].params;
					sqltext = sqltext.Replace("datetime(?)", "?");
					sqltext = me.formatSql(sqltext,paramlist);
					var fc = new fallcall(idx, sqltext, sqltext.toLowerCase().startsWith("select"), connection);
					pushArray(fc);
				}
				async.series(funcArray,
				 	function(err, results){
				 		connection.release();
				 		if(err) {
				 			return errorCallback(err);
				 		}
					  	connection.commit(function(err) {
					        if (err) {
					          	return connection.rollback(function() {
					          		return errorCallback(err);
					          	});
					        }
					        return callback(null, rows);
					    });
				 		
				});
			});
		});
	}
	
	this.formatSql = function(sqltext, paramlist){
        var sql = "";
        sql = sqltext.Replace("text primary", "VARCHAR(200) primary")
            .Replace("strftime('%s','now', 'localtime')", "UNIX_TIMESTAMP(now())")
            .Replace("strftime('%s','now', 'localtime')", "UNIX_TIMESTAMP(now())")
            .Replace("strftime('%s',", "UNIX_TIMESTAMP(")
            .Replace("datetime('now','localtime')", "now()")
            .Replace("date('now','localtime')", "DATE_FORMAT(now(),'%Y-%m-%d') ")
            .Replace("date('now')", "DATE_FORMAT(now(),'%Y-%m-%d')")
            .Replace("localtime", "%Y-%m-%d %H:%i:%s")
            .Replace("datetime(", "DATE_FORMAT(")
            .Replace("as float", "AS DECIMAL(10,2)")
            .Replace("as double", "AS DECIMAL(10,2)")
            .Replace("as text", "AS CHAR(100)")
            .Replace("\t", " ")
            .Replace("as int", "as signed")
            .Replace("DATE_FORMAT('now'", "DATE_FORMAT(now()")
            .Replace("INSERT or IGNORE", "insert ignore ")
            .Replace("INSERT OR IGNORE", "insert ignore ")
            .Replace("insert or ignore", "insert ignore ")
            .Replace("INSERT or", "")
            .Replace("insert or", "")
            .Replace("UNIX_TIMESTAMP( 'now', '%Y-%m-%d %H:%i:%s')", "UNIX_TIMESTAMP( now())")
            .Replace("changes()", "1 ")
            .Replace("cast (", "cast(")
            .Replace("CAST (", "cast(")
            .Replace("in ()", "in (null)")
            .Replace("in()", "in (null)");

        if (sql.toLowerCase().indexOf("create") != -1 || sql.toLowerCase().indexOf("alter") != -1 )
        {
            if (sql.Contains("pos_billing_detail"))
            {
                sql = sql.Replace("INTEGER", "bigint").Replace("integer", "bigint");
            }
            if(sql.Contains("NUMERIC"))
            {
                sql = sql.Replace("NUMERIC", "DECIMAL(10,2)");
            }
        }

        while (sql.Contains("||"))
        {
        	var findMatch = new RegExp("    (.*?)    ");
        	if(findMatch.test(sql)){
        		var itemsql = RegExp.$1;
        		var replacesql = (" concat(" + itemsql.Replace("||", ",") + ")");
            	sql = sql.Replace("    "+itemsql+"    ", replacesql);
        	}           
        }
        // fill in params
		sql = mysql.format(sql, paramlist);
        return sql;
	}
}

String.prototype.Replace = function(src, dest) {
	var text = this;
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	text = text.replace(src, dest);
	return text;
}

String.prototype.Contains = function(src) {
	return this.indexOf(src) != -1;
}

String.prototype.trim=function(){return this.replace(/(^\s+)|(\s+$)/g,'')}