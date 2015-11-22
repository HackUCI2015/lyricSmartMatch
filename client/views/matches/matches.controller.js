'use strict';

angular.module('hackuci2015')
  .controller('MatchesCtrl', function (UserFactory, $http) {

    var vm = this;

    angular.extend(vm, {
      name: 'MatchesCtrl',

      matchUser: function (userId) {
        $('#user-id-' + userId)
          .html('Matched!')
          .prop('disabled', true);

        $http({
          method: 'POST',
          url: '/api/match',
          params: {
            userId: UserFactory.getCurrentUser().id,
            otherUserId: userId
          }
        });
      }
    });

    UserFactory.getUsers()
      .then(function (rows) {
        vm.users = rows;
      }, function (err) {
        console.log(err);
      });

  });
