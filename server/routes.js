'use strict';

var config = require('./config/environment');

module.exports = function (app) {

  // API
  app.use('/api/texts', require('./api/text'));
  app.use('/api/match', require('./api/match'));
  app.use('/api/register', require('./api/register'));
  app.use('/api/login', require('./api/login'));
  app.use('/api/get-users', require('./api/get-users'));
  app.use('/api/process-songs', require('./api/process-songs'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });

};
