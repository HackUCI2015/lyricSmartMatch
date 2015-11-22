'use strict';

angular.module('hackuci2015')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/connections', {
        templateUrl: 'views/connections/connections.html',
        controller: 'ConnectionsCtrl',
        controllerAs: 'vm'
      });
  });
