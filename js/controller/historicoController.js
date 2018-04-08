angular.module("petrastreio-web").controller("historicoController", function ($scope, $location, petRastreioAPIService) {
    $scope.coords = [];
    $scope.carregarHistorico = function () {
        petRastreioAPIService.listarCoordenadas(20).then(function (data) {
            data = data.data;
            var listaCoords = [];
            var coord;
            for (var i in data) {
                coord = {
                    id: data[i].id,
                    latitude: parseFloat(data[i].latitude),
                    longitude: parseFloat(data[i].longitude)
                };
                listaCoords.push(coord);
            };
            $scope.coords = listaCoords ;
        })
    };

    $scope.carregarHistorico();
});