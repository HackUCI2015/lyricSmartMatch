'use strict';

describe('Directive: sidenav', function () {

  beforeEach(module('hackuci2015', 'templates'));

  var element, scope;

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = angular.element('<sidenav></sidenav>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });
});
