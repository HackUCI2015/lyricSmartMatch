'use strict';

angular.module('hackuci2015')
  .controller('ConnectionsCtrl', function (UserFactory, $rootScope, $http, $mdToast) {

    var vm = this;

    angular.extend(vm, {
      connections: [],

      textUser: function (userId) {
        $('#user-id-' + userId)
          .html('Texted!')
          .prop('disabled', true);

        var sms = {
          actions: [
            {
              type: 'SMS',
              params: {
                no: '19493756453',
                caller_id_no: '19494316294',
                message: 'hello world!'
              }
            },
            {
              type: 'HANGUP'
            }
          ]
        };

        $http({
          method: 'GET',
          url: '/api/texts',
          params: {
            user: JSON.stringify(UserFactory.getCurrentUser()),
            otherUser: JSON.stringify(vm.connections[userId])
          }
        }).then(function (data) {
          console.log(data);
          vm.showSimpleToast();
        })
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
