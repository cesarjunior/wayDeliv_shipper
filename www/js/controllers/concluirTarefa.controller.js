(function () {
    'use strict';
    angular.module('wd-Shipper')
            .controller('concluirTarefaController', concluirTarefaController);

    concluirTarefaController.$inject = ['$ionicLoading', '$stateParams', '$filter', '$location', '$cordovaGeolocation', '$ionicPlatform', '$cordovaCamera'];
    function concluirTarefaController($ionicLoading, $stateParams, $filter, $location, $cordovaGeolocation, $ionicPlatform, $cordovaCamera) {
        var $this = this;
        $this.imgURI = null;

        $ionicLoading.show();
        firebase.database().ref('estabelecimentos/entregas/')
                .child($stateParams.idTarefa)
                .once('value', function (snapshot) {
                    $ionicLoading.hide();
                    $this.destinatario = snapshot.val().destinatario;
                    $this.endereco = $filter('formatAdress')(snapshot.val().endereco);
                });

        $this.finalizarTarefa = finalizarTarefaAction;
        function finalizarTarefaAction() {
            $ionicLoading.show();
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
                            if ($this.imgURI) {
                                data.foto = $this.imgURI;
                            }
                            data['/endereco/localizacao'] = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };

                            firebase.database()
                                    .ref('estabelecimentos/entregas/')
                                    .child($stateParams.idTarefa)
                                    .update(data).then(function () {
                                $ionicLoading.hide();
                                $location.path('/app/lista-tarefas');
                            });
                        }, function (error) {
                            $ionicLoading.hide();
                            console.log(error);
                        });
            });

        }

        $this.iniciarCamera = iniciarCameraAction;
        function iniciarCameraAction() {
            $ionicPlatform.ready(function () {
                console.log(Camera.DestinationType.DATA_URL);
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    console.log('Deus certo.');
                    console.log(imageData);
                    $this.imgURI = "data:image/jpeg;base64," + imageData;
                }, function (error) {
                    console.log(error);
                });
            });
        }
    }
})();