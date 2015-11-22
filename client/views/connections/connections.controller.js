'use strict';

angular.module('hackuci2015')
  .controller('ConnectionsCtrl', function (UserFactory) {

    var vm = this;

    angular.extend(vm, {
      connections: [],

      textUser: function (userId) {
        $('#user-id-' + userId)
          .html('Texted!')
          .prop('disabled', true);
      }
    });

    UserFactory.getConnections()
      .then(function (rows) {
        console.log(rows);
        vm.connections = rows;
      }, function (err) {
        console.log(err);
      });


  });
