'use strict';

angular.module('hackuci2015')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/analyze', {
        templateUrl: 'views/analyze/analyze.html',
        controller: 'AnalyzeCtrl',
        controllerAs: 'vm'
      });
  });
