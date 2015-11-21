'use strict';

angular.module('hackuci2015')
  .factory('UserFactory', function ($http) {

    return {
      getUsers: function () {
        $http({
          method: 'GET',
          url: '/api/get-users'
        }).then(function success (result) {
          console.log(result.data.rows);
        }, function error (err) {
          console.log(err);
        });
      }
    };

  });
