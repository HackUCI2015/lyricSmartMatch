'use strict';

angular.module('hackuci2015')
  .controller('HomeCtrl', function (UserFactory, $location, $http) {

    var vm = this;

    angular.extend(vm, {
      name: '',

      login: function () {
        $http({
          method: 'GET',
          url: '/api/login',
          params: { name: vm.name }
        }, function (id) {
          UserFactory.currentUser = {
            name: vm.name,
            id: id
          };
          console.log(id);
          $location.path('/analyze');
        }, function (err) {
          console.log(err);
        });
      }
    });

  });
