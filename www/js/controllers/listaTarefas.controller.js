(function () {
    'use strict';
    angular.module('wd-Shipper')
            .controller('listaTarefasController', listaTarefasController);

    listaTarefasController.$inject = ['$scope', '$ionicPlatform', '$cordovaGeolocation', '$cordovaDialogs'];
    function listaTarefasController($scope, $ionicPlatform, $cordovaGeolocation, $cordovaDialogs) {
        var $this = this;

        $this.tarefas = [];

        getTarefas();
        function getTarefas() {
            firebase.database().ref('estabelecimentos/-KKipucz8AD8xJ6NLedH/entregas/')
                    .orderByKey()
                    .on('value', function (snapshot) {
                        console.log('On Firebase')
                        $this.tarefas = snapshot.val();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }

                    });
        }

        $this.btnConcluir = concluirAction;
        function concluirAction() {
            console.log('Acionado');
            $ionicPlatform.ready(function () {
                console.log('Platform Ready');
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            console.log(position);
                            var lat = position.coords.latitude
                            var long = position.coords.longitude
                            $cordovaDialogs.alert('Latitude: ' + lat + ' Longitude: ' +long, 'Teste Dialog', 'OK');
                            $cordovaDialogs.beep(3);
                        }, function (err) {
                            // error
                        });

            });
        }
    }
})();