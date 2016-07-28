(function () {
    'use strict';
    angular.module('wd-Shipper')
            .controller('loginController', loginController);

    loginController.$inject = ['$location', '$rootScope', '$ionicLoading'];
    function loginController($location, $rootScope, $ionicLoading) {
        var $this = this;

        $this.doLogin = loginAction;
        function loginAction() {
            var userName = $this.dataLogin.username;
            var userPassword = $this.dataLogin.password;

            $ionicLoading.show();
            firebase.auth().signInWithEmailAndPassword(userName, userPassword)
                    .then(function (dataAuth) {
                        $ionicLoading.hide();
                        $rootScope.currentUser = {
                            uid: dataAuth.uid,
                            displayName: dataAuth.displayName,
                            email: dataAuth.email,
                            photoUrl: dataAuth.photoURL
                        };
                        // Limpa o formulario.
                        $this.dataLogin.username = '';
                        $this.dataLogin.password = '';
                        $location.path('/app/lista-tarefas');
                    }, function (error) {
                        console.log(error);
                    });
        }
    }
})();