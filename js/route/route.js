angular.module("petrastreio-web").config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"view/home.html"
    });

    $routeProvider.when("/rastreio",{
        templateUrl:"view/rastreio.html",
        controller:"rastreioController"
    });

    $routeProvider.when("/caminho",{
        templateUrl:"view/caminho.html",
        controller:"caminhoController"
    });

    $routeProvider.when("/historico",{
        templateUrl:"view/historico.html",
        controller:"historicoController"
    });

}]);