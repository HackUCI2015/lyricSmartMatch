'use strict';

describe('connections route', function () {

  beforeEach(function () {
    browser.get('/connections');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('ConnectionsCtrl');
  });

});
