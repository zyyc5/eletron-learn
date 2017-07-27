app.controller("IndexController", ["$scope", "$location", "$window", '$q', '$timeout', 'qichacha',
    function ($scope, $location, $window, $q, $timeout, qichacha) {


        $scope.holderArr = [];
        $scope.serachKey = '';
        $scope.choseOne = null;

        $scope.init = function () {
            // $scope.holderArr = [{ KeyNo: 'fgdfgdgdgdfg', Name: '苏州知行易信心科技有限公司', CreditCode: '91320594071003129W', Address: '' }];
            // $scope.holderArr.push({ KeyNo: 'ggghfhfhfg', Name: '苏州langdong信心科技有限公司', CreditCode: '91320594071003129W', Address: '' });
        };


        $scope.serachCahnge = function () {
            if (!$scope.serachKey || $scope.serachKey.length <= 2)
                return;
            console.log($scope.serachKey);
            qichacha.search($scope.serachKey, function (resp) {
                if (typeof resp == 'string')
                    resp = JSON.parse(resp);
                $scope.holderArr = resp;
            });
        };

        $scope.choseCompany = function(company){
            $scope.choseOne = company;
            $scope.serachKey = company.Name;
        };

    }]);