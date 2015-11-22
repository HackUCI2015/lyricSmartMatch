'use strict';

angular.module('hackuci2015')
  .controller('HomeCtrl', function (UserFactory, $location, $http, $rootScope) {

    var vm = this;

    angular.extend(vm, {
      name: '',

      registerName: '',

      registerPhone: '',

      login: function () {
        $rootScope.toggleTransparency();

        $http({
          method: 'GET',
          url: '/api/login',
          params: { name: vm.name }
        }).then(function (result) {
          $rootScope.toggleTransparency();
          result.data.name = result.data.user_name;
          UserFactory.setCurrentUser(result.data);
          $location.path('/analyze');
        }, function (err) {
          console.log(err);
        });
      },

      register: function () {
        $rootScope.toggleTransparency();

        $http({
          method: 'GET',
          url: '/api/register',
          params: {
            user_name: vm.registerName,
            phone_number: vm.registerPhone
          }
        }).then(function (result) {
          $rootScope.toggleTransparency();

          UserFactory.setCurrentUser({
            name: result.data.user_name,
            id: result.data.id
          });
          $location.path('/analyze');
        }, function (err) {
          console.log(err);
        });
      }
    });

  });
