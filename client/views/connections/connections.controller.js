'use strict';

angular.module('hackuci2015')
  .controller('ConnectionsCtrl', function (UserFactory, $rootScope) {

    var vm = this;

    angular.extend(vm, {
      connections: [],

      textUser: function (userId) {
        $('#user-id-' + userId)
          .html('Texted!')
          .prop('disabled', true);
      }
    });

    $rootScope.toggleTransparency();

    UserFactory.getConnections()
      .then(function (rows) {
        $rootScope.toggleTransparency();
        vm.connections = rows;
      }, function (err) {
        console.log(err);
      });


  });
