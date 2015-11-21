'use strict';

angular.module('hackuci2015')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/matches', {
        templateUrl: 'views/matches/matches.html',
        controller: 'MatchesCtrl',
        controllerAs: 'vm'
      });
  });
