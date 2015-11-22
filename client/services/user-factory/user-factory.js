'use strict';

angular.module('hackuci2015')
  .factory('UserFactory', function ($http, $q) {

    var currentUser = {};

    return {
      setCurrentUser: function (newUser) {
        currentUser = newUser;
      },

      getCurrentUser: function(newUser) {
        return currentUser;
      },

      getUsers: function () {
        console.log(currentUser);
        console.log('ok');
        return $q(function (resolve, reject) {
          $http({
            method: 'GET',
            url: '/api/get-users',
            params: { user: JSON.stringify(currentUser) }
          }).then(function (result) {
            resolve(result.data);
          }, function (err) {
            reject('could not get users.');
          });
        });
      }
    };

  });
