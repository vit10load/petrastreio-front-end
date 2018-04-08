angular.module("petrastreio-web").controller("navbarController", function($scope,$location){
    $scope.navigarPara= function(destino){
        $location.path("/"+destino);
    }
});