angular.module("petrastreio-web").controller("caminhoController", function ($scope, $location, petRastreioAPIService) {

    $scope.map = {
        center: {
            latitude: -20,
            longitude: -49
        },
        options: {
            streetViewControl: false
        },
        zoom: 16
    };

    $scope.pontos = [];
    $scope.polylines = [];

    $scope.carregarRastreamento = function () {
        petRastreioAPIService.listarCoordenadas(60).then(function (data) {
            data = data.data;
            var listaCoords = [];
            var coord;
            for (var i in data) {
                coord = {
                    id: data[i].id,
                    latitude: parseFloat(data[i].latitude),
                    longitude: parseFloat(data[i].longitude),
                    label: data[i].id,

                    show: false
                };
                listaCoords.push(coord);
            }
            ;
            marcarPontosNoMapa(listaCoords);
        })
    };

    var marcarPontosNoMapa = function (listaCoords) {
        if (listaCoords[listaCoords.length / 2]) {
            $scope.map.center = {
                latitude: parseFloat(listaCoords[listaCoords.length / 2].latitude),
                longitude: parseFloat(listaCoords[listaCoords.length / 2].longitude)
            };
        }

        $scope.pontos = listaCoords;

        tracarRota(listaCoords);
    };

    var tracarRota = function (listaCoords) {
        $scope.polylines = [
            {
                id: 1,
                path: listaCoords,
                stroke: {
                    color: 'RED',
                    weight: 3
                }, icons: [{
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                    },
                    offset: '25px',
                    repeat: '50px'
                }],

                geodesic: true,
                visible: true
            }
        ];
    };

    $scope.carregarRastreamento();
});