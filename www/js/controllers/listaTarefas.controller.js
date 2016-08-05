(function () {
    'use strict';
    angular.module('wd-Shipper')
            .controller('listaTarefasController', listaTarefasController);

    listaTarefasController.$inject = ['$scope', '$ionicLoading', '$ionicHistory'];
    function listaTarefasController($scope, $ionicLoading, $ionicHistory) {
        var $this = this;

        $this.tarefas = [];

        $ionicHistory.removeBackView();

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