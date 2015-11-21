'use strict';

angular.module('hackuci2015')
  .factory('UserFactory', function ($http, $q) {

    return {
      getUsers: function () {
        return $q(function (resolve, reject) {
          $http({
            method: 'GET',
            url: '/api/get-users'
          }).then(function (result) {
            resolve(result.data);
          }, function (err) {
            reject('could not get users.');
          });
        });
      }
    };

  });
