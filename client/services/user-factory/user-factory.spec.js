'use strict';

describe('Factory: UserFactory', function () {

  beforeEach(module('hackuci2015'));

  var UserFactory;

  beforeEach(inject(function (_UserFactory_) {
    UserFactory = _UserFactory_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
