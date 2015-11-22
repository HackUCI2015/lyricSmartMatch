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
      },

      getConnections: function () {
        // console.log(currentUser);
        return $q(function (resolve, reject) {
          $http({
            method: 'GET',
            url: '/api/match',
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
