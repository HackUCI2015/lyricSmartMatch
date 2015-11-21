'use strict';

angular.module('hackuci2015')
  .controller('MatchesCtrl', function (UserFactory) {

    var vm = this;

    angular.extend(vm, {
      name: 'MatchesCtrl',

      matchUser: function (userId) {
        $('#user-id-' + userId)
          .html('Matched!')
          .prop('disabled', true);
      }
    });

    UserFactory.getUsers()
      .then(function (rows) {
        vm.users = rows;
      }, function (err) {
        console.log(err);
      });

  });
