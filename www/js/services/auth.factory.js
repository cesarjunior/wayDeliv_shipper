(function () {
    'use strict';
    angular.module('wd-Shipper')
            .factory('authFactory', authFactory);

    authFactory.$inject = ['$q'];
    function authFactory($q) {
        var $this = this;

        var efetuarLoginAction = function (userMail, userPassword) {
            console.log('Aguarde, efetuando login!!');
            var deferred = $q.defer();
            var currentUser;
            firebase.auth().signInWithEmailAndPassword(userMail, userPassword)
                    .then(function (dataAuth) {
                        associarEstabelecimentoAction(dataAuth.uid).then(function (dataEstabelecimento) {
                            currentUser = {
                                uid: dataAuth.uid,
                                displayName: dataAuth.displayName,
                                email: dataAuth.email,
                                photoUrl: dataAuth.photoURL,
                                estabelecimento: {
                                    id: dataEstabelecimento.key,
                                    nome: dataEstabelecimento.val().nome,
                                    localizacao: {
                                        lat: dataEstabelecimento.val().endereco.localizacao.lat,
                                        lng: dataEstabelecimento.val().endereco.localizacao.lng
                                    }
                                }
                            };
                            console.log('Login efetuado com sucesso!!');
                            deferred.resolve(currentUser);
                        }, function (error) {
                            console.log('Falha ao associar usuário ao estabelecimento!!');
                            deferred.reject(error);
                        });
                    }, function (error) {
                        console.log('Não foi possivel efetuar o login!!');
                        console.log(error);
                        deferred.reject(error);
                    });

            return deferred.promise
        };

        var associarEstabelecimentoAction = function (idUser) {
            var deferred = $q.defer();
            firebase.database().ref("estabelecimentos/").once("value", function (snapshot) {
                var dataEstabelecimento = null;
                snapshot.forEach(function (childSnapshot) {
                    if (childSnapshot.val().uid == idUser) {
                        dataEstabelecimento = childSnapshot;
                    }
                });
                if (dataEstabelecimento != null) {
                    deferred.resolve(dataEstabelecimento);
                } else {
                    var error = {
                        code: '',
                        message: 'Usuário não associado a estabelecimento válido.'
                    }
                    deferred.reject(error);
                }
            });
            return deferred.promise;
        };

        var isAuthenticatedAction = function () {
            var deferred = $q.defer();
            var authenticated = firebase.auth().currentUser;
            if (authenticated != null) {
                associarEstabelecimentoAction(authenticated.uid).then(function (dataEstabelecimento) {
                    var currentUser = {
                        uid: authenticated.uid,
                        displayName: authenticated.displayName,
                        email: authenticated.email,
                        photoUrl: authenticated.photoURL,
                        estabelecimento: {
                            id: dataEstabelecimento.key,
                            nome: dataEstabelecimento.val().nome,
                            localizacao: {
                                lat: dataEstabelecimento.val().endereco.localizacao.lat,
                                lng: dataEstabelecimento.val().endereco.localizacao.lng
                            }
                        }
                    };
                    deferred.resolve(currentUser);
                });
            } else {
                deferred.reject({code: '', message: ''});
            }
            return deferred.promise;
        }

        return {
            efetuarLogin: efetuarLoginAction,
            associarEstabelecimento: associarEstabelecimentoAction,
            isAuthenticated: isAuthenticatedAction
        };
    }
})();