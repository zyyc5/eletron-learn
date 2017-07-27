app.factory('AuthService', ['$q','$http', "$window", function ($q, database, $http, $window) {
    var authService = {};
    var userInfo;

    
    function hash512(pwd, key,intor)
    {
        if (intor == 0)
            return pwd;


        var hmacObj = new jsSHA('SHA-512','TEXT');
        hmacObj.setHMACKey(key,'HEX');
        hmacObj.update(pwd);

        var hash = hmacObj.getHMAC('HEX');
        return hash512(hash,key, intor - 1);
    }

    authService.logout = function () {
        var deferred = Utils.defer();//$q.defer();
        setTimeout2(function () {
            userInfo = null;
            $window.sessionStorage["userInfo"] = null;
            
            deferred.resolve({ status: 'success' });
        }, 100);
        return deferred.promise;
    }

    authService.getUserInfo = function () {
        init();
        return userInfo;
    }

    function init() {
        if (window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse(window.sessionStorage["userInfo"]);
        }
    }

    init();



    return authService;
}]);