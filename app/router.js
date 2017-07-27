app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/index', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        })
        .when("/about", {
             templateUrl: "app/views/about.html",
             controller: "AboutController",
             resolve: {
                 auth: ["$q", "AuthService", function ($q, AuthService) {
                     var userInfo = AuthService.getUserInfo();
                     if (userInfo) {
                         return $q.when(userInfo);
                     }
                     else {
                         return $q.reject({ authenticated: false });
                     }
                 }]
             }
         }).when("/cloudadmin", {
             templateUrl: "app/views/cloudadmin.html",
             controller: "CloudAdminController",
             resolve: {
                 auth: ["$q", "AuthService", function ($q, AuthService) {
                     var userInfo = AuthService.getUserInfo();
                     if (userInfo) {
                         return $q.when(userInfo);
                     }
                     else {
                         return $q.reject({ authenticated: false });
                     }
                 }]
             }
         }).when("/msgcenter", {
            templateUrl: "app/views/msgcenter.html",
            controller: "MsgCenterController",
            resolve: {
                auth: ["$q", "AuthService", function ($q, AuthService) {
                    var userInfo = AuthService.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    }
                    else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        }).when("/saleReport", {
            templateUrl: "app/views/xiaoshouReport.html",
            controller: "SaleReportController",
            resolve: {
                auth: ["$q", "AuthService", function ($q, AuthService) {
                    var userInfo = AuthService.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    }
                    else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        }).when("/tuicaiReport", {
            templateUrl: "app/views/tuicaiReport.html",
            controller: "tuicaiReportController",
            resolve: {
                auth: ["$q", "AuthService", function ($q, AuthService) {
                    var userInfo = AuthService.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    }
                    else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        }).when("/bujimingka", {
            templateUrl: "app/views/bujimingka.html",
            controller: "BujimingkaCtrl",
            resolve: {
                auth: ["$q", "AuthService", function ($q, AuthService) {
                    var userInfo = AuthService.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    }
                    else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        }).when("/login", {
          templateUrl: "app/views/login.html",
          controller: "LoginController"
      })
      .otherwise(
        { redirectTo: function(){               
                    return '/index';
            }
        });
}])
;