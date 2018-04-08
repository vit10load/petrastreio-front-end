angular.module("petrastreio-web").controller("rastreioController", function ($scope, $location,$websocket, petRastreioAPIService) {
    var dataStream = $websocket('ws://petrastreio.herokuapp.com/websockets/coords');

    dataStream.onMessage(function(message) {
        //$scope.mensagemRecebida = message.data;
        console.log(message.data);

        if(message.data.indexOf("latitude")>0){
            var coords = JSON.parse(message.data);
            marcarPontosNoMapa(coords);
        }


    });

    $scope.enviar = function(text){
        dataStream.send(text);
    };

    $scope.map = {
        center: {
            latitude: -20,
            longitude: -49
        },
        options:{
            streetViewControl:false
        },
        zoom: 15
    };

    $scope.pontos = [];
    $scope.polylines = [];

    $scope.carregarRastreamento = function () {
        petRastreioAPIService.ultimaCoordenada().then(function (data) {
            var coords = data.data;

            marcarPontosNoMapa(coords);
        })
    };

    var marcarPontosNoMapa = function (coords) {
        $scope.map.center = {
            latitude: parseFloat(coords.latitude),
            longitude: parseFloat(coords.longitude)
        };

        $scope.pontos =[{
            id: coords.id,
            latitude: parseFloat(coords.latitude),
            longitude: parseFloat(coords.longitude)
        }];

        tracarRota(coords);
    };

    var tracarRota = function (coords) {
        $scope.polylines = [
            {
                id: 1,
                path: coords,
                stroke: {
                    color: 'RED',
                    weight: 3
                },
                geodesic: true,
                visible: true
            }
        ];
    };

    $scope.carregarRastreamento();
});