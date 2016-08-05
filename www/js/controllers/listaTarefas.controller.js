(function () {
    'use strict';
    angular.module('wd-Shipper')
            .controller('listaTarefasController', listaTarefasController);

    listaTarefasController.$inject = ['$scope', '$ionicLoading', '$ionicHistory', '$ionicPlatform'];
    function listaTarefasController($scope, $ionicLoading, $ionicHistory, $ionicPlatform) {
        var $this = this;

        $this.tarefas = [];

        $ionicHistory.removeBackView();
        $scope.$on("$ionicView.enter", function (event, data) {
            // handle event
            console.log("Entro: ", data.stateParams);
            $ionicPlatform.onHardwareBackButton(function () {
                console.log('Action Go Back');
                $ionicPlatform.exitApp();
            });
        });
        $scope.$on("$ionicView.leave", function (event, data) {
            // handle event
            console.log("Saiu: ", data.stateParams);
            $ionicPlatform.offHardwareBackButton(function () {
                console.log('Off Action Go Back');
                //$ionicPlatform.exitApp();
            });
        });

        getTarefas();
        function getTarefas() {
            $ionicLoading.show();
            firebase.database().ref('estabelecimentos/-KKipucz8AD8xJ6NLedH/entregas/')
                    .orderByChild('situacao')
                    .equalTo(null)
                    .on('value', function (snapshot) {
                        $ionicLoading.hide();
                        $this.tarefas = snapshot.val();
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }

                    });
        }

        $this.btnConcluir = concluirAction;
        function concluirAction() {

        }
    }
})();