'use strict';

angular.module('hackuci2015')
  .directive('topbar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/topbar/topbar.html',
      replace: true
    };
  });
