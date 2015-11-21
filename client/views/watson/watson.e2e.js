'use strict';

describe('watson route', function () {

  beforeEach(function () {
    browser.get('/watson');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('WatsonCtrl');
  });

});
