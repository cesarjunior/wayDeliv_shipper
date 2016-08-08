(function () {
    'use strict';
    angular.module('wd-Shipper')
            .controller('listaTarefasController', listaTarefasController);

    listaTarefasController.$inject = ['$scope', '$ionicLoading', '$ionicHistory', '$ionicPlatform'];
    function listaTarefasController($scope, $ionicLoading, $ionicHistory, $ionicPlatform) {
        var $this = this;

        $this.tarefas = [];

        function actionBackButton() {
            ionic.Platform.exitApp();
        }
        $scope.$on("$ionicView.enter", function () {
            $ionicPlatform.onHardwareBackButton(actionBackButton);
        });
        $scope.$on("$ionicView.leave", function () {
            $ionicPlatform.offHardwareBackButton(actionBackButton);
        });

        getTarefas();
        function getTarefas() {
            $ionicLoading.show();
            firebase.database().ref('estabelecimentos/entregas/')
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