(function () {
    'use strict';
    angular.module('wd-Shipper')
            .controller('concluirTarefaController', concluirTarefaController);

    concluirTarefaController.$inject = ['$ionicLoading', '$stateParams', '$filter', '$location', '$cordovaGeolocation', '$ionicPlatform', '$cordovaCamera'];
    function concluirTarefaController($ionicLoading, $stateParams, $filter, $location, $cordovaGeolocation, $ionicPlatform, $cordovaCamera) {
        var $this = this;

        $ionicLoading.show();
        firebase.database().ref('estabelecimentos/-KKipucz8AD8xJ6NLedH/entregas/' + $stateParams.idTarefa)
                .once('value', function (snapshot) {
                    $ionicLoading.hide();
                    $this.destinatario = snapshot.val().destinatario;
                    $this.endereco = $filter('formatAdress')(snapshot.val().endereco);
                });

        $this.finalizarTarefa = finalizarTarefaAction;
        function finalizarTarefaAction() {

            $ionicPlatform.ready(function () {
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            var data = {
                                situacao: $this.situacao,
                                observacao: $this.observacao,
                                entregador: 'Cesar Junior'
                            };
                            data['/endereco/localizacao'] = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            $ionicLoading.show();
                            firebase.database()
                                    .ref('estabelecimentos/-KKipucz8AD8xJ6NLedH/entregas/' + $stateParams.idTarefa)
                                    .update(data).then(function () {
                                $ionicLoading.hide();
                                $location.path('/lista-tarefas');
                            });
                        }, function (error) {
                            console.log(error);
                        });
            });

        }

        $this.iniciarCamera = iniciarCameraAction;
        function iniciarCameraAction() {
            $ionicPlatform.ready(function () {
                var options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    console.log(imageData);
                    var image = document.getElementById('myImage');
                    image.src = imageData;
                }, function (error) {
                    console.log(error);
                });
            });
        }
    }
})();