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

                        .state('app', {
                            url: '/app',
                            abstract: true,
                            templateUrl: 'templates/menu.html',
                            controller: 'AppCtrl'
                        })

                        .state('app.search', {
                            url: '/search',
                            views: {
                                'menuContent': {
                                    templateUrl: 'templates/search.html'
                                }
                            }
                        })

                        .state('app.browse', {
                            url: '/browse',
                            views: {
                                'menuContent': {
                                    templateUrl: 'templates/browse.html'
                                }
                            }
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

                        .state('app.single', {
                            url: '/playlists/:playlistId',
                            views: {
                                'menuContent': {
                                    templateUrl: 'templates/playlist.html',
                                    controller: 'PlaylistCtrl'
                                }
                            }
                        });
                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/app/lista-tarefas');
            });
})();
