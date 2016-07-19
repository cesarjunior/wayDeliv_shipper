(function () {
    'use strict';
    angular.module('wd-Shipper')
            .filter('formatAdress', formatAdress);

    function formatAdress() {
        return function (objectAdress) {
            var formatedAdress;

            if (objectAdress.rua) {
                formatedAdress = objectAdress.rua;
            }
            if (objectAdress.complemento) {
                formatedAdress = formatedAdress + ', ' + objectAdress.complemento;
            }
            if (objectAdress.bairro) {
                formatedAdress = formatedAdress + ', ' + objectAdress.bairro;
            }

            return formatedAdress;
        }
    }
})();