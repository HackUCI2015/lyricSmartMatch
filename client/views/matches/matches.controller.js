'use strict';

angular.module('hackuci2015')
  .controller('MatchesCtrl', function (UserFactory) {

    var vm = this;

    angular.extend(vm, {
      name: 'MatchesCtrl',

      getUsers: UserFactory.getUsers
    });

    vm.getUsers();

  });
