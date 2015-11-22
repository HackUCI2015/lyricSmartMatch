'use strict';

angular.module('hackuci2015')
  .controller('HomeCtrl', function (UserFactory, $location, $http) {

    var vm = this;

    angular.extend(vm, {
      name: '',

      registerName: '',

      registerPhone: '',

      login: function () {
        $http({
          method: 'GET',
          url: '/api/login',
          params: { name: vm.name }
        }).then(function (result) {
          UserFactory.currentUser = {
            name: vm.name,
            id: result.data.id
          };
          console.log(UserFactory.currentUser);
          $location.path('/analyze');
        }, function (err) {
          console.log(err);
        });
      },

      register: function () {
        $http({
          method: 'GET',
          url: '/api/register',
          params: {
            user_name: vm.registerName,
            phone_number: vm.registerPhone
          }
        }).then(function (result) {
          UserFactory.currentUser = {
            name: result.data.user_name,
            id: result.data.id
          };
          console.log(UserFactory.currentUser);
          $location.path('/analyze');
        }, function (err) {
          console.log(err);
        });
      }
    });

  });
