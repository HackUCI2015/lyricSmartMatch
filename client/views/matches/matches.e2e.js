'use strict';

describe('matches route', function () {

  beforeEach(function () {
    browser.get('/matches');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('MatchesCtrl');
  });

});
