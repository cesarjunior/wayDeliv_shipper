(function () {
    'use strict';
    angular.module('wd-Shipper')
            .controller('listaTarefasController', listaTarefasController);

    listaTarefasController.$inject = ['$scope', '$ionicLoading', '$ionicHistory', '$ionicPlatform'];
    function listaTarefasController($scope, $ionicLoading, $ionicHistory, $ionicPlatform) {
        var $this = this;

        $this.tarefas = [];

        function actionBackButton() {
            console.log('Action Go Back');
            ionic.Platform.exitApp();
        }
        $scope.$on("$ionicView.enter", function () {
            // handle event
            console.log("Entro");
            $ionicPlatform.onHardwareBackButton(actionBackButton);
        });
        $scope.$on("$ionicView.leave", function () {
            // handle event
            console.log("Saiu");
            $ionicPlatform.offHardwareBackButton(actionBackButton);
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