(function () {
    'use strict';
    angular.module('wd-Shipper', ['ionic', 'starter.controllers', 'ngCordova'])

            .run(function ($ionicPlatform, APP_SETTINGS) {
                $ionicPlatform.ready(function () {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        cordova.plugins.Keyboard.disableScroll(true);

                    }
                    if (window.StatusBar) {
                        // org.apache.cordova.statusbar required
                        StatusBar.styleDefault();
                    }
                });
                firebase.initializeApp(APP_SETTINGS.FIREBASE);
            })

            .config(function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                        .state('login', {
                            url: '/login',
                            templateUrl: 'templates/login.html',
                            controller: 'loginController',
                            controllerAs: 'vm'
                        })
                        .state('app', {
                            url: '/app',
                            abstract: true,
                            templateUrl: 'templates/menu.html',
                            controller: 'AppCtrl'
                        })
                        .state('app.listaTarefas', {
                            url: '/lista-tarefas',
                            views: {
                                'menuContent': {
                                    templateUrl: 'templates/listaTarefas.html',
                                    controller: 'listaTarefasController',
                                    controllerAs: 'vm'
                                }
                            }
                        })
                        .state('app.concluirTarefa', {
                            url: '/concluir-tarefa/:idTarefa',
                            views: {
                                'menuContent': {
                                    templateUrl: 'templates/concluirTarefa.html',
                                    controller: 'concluirTarefaController',
                                    controllerAs: 'vm'
                                }
                            }
                        });
                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/login');
            });
})();
