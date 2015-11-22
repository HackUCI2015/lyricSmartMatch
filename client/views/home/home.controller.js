'use strict';

angular.module('hackuci2015')
  .controller('HomeCtrl', function ($rootScope, $location) {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl',

      login: function () {
        $rootScope.user = {
          name: 'vnguyen94'
        }
        $location.path('/analyze');
      }
    });

  });
