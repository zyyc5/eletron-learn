app.factory('qichacha', ['$q','$http', "$window", function ($q, $http, $window) {

    let Qichacha = {};

    Qichacha.search = function(key,cb){
        console.log($http);
        let url="http://www.qichacha.com/tax_getList?key="+key+"&user_id=56c3ed69a7a88c90458f6d033bfc194";
        $http.get(url).success(function(resp){
            console.log(resp); 
            let arr = [];
           
            cb(format(resp));
        });
    };


    function format(obj){
        if(typeof obj == 'string')
            return obj.replace('<em>','').replace('<em>','').replace('<em>','').replace('<em>','').replace('</em>','').replace('</em>','').replace('</em>','').replace('</em>','')
        if(typeof obj != 'object')
            return obj;
        for(var k in obj){
                obj[k] = format(obj[k]);
        }
        return obj;
    };

    return Qichacha;
}]);