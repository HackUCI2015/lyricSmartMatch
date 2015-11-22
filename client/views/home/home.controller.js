'use strict';

angular.module('hackuci2015')
  .controller('HomeCtrl', function (UserFactory, $location) {

    var vm = this;

    angular.extend(vm, {
      name: '',

      login: function () {
        UserFactory.currentUser = {
          name: vm.name
        };

        $location.path('/analyze');
      }
    });

  });
