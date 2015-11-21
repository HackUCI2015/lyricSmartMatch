'use strict';

angular.module('hackuci2015')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/watson', {
        templateUrl: 'views/watson/watson.html',
        controller: 'WatsonCtrl',
        controllerAs: 'vm'
      });
  });
