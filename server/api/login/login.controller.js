'use strict';

var fs = require('fs');
var pg = require('pg');

var conString = require('../../config/environment').conString;

function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * Get list of Login
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  if (!req.query && !req.query.name) return res.status(401).send('Could not get user.');

  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    var query = (
      'SELECT id FROM users WHERE user_name = "' + req.query.name + '"'
    );
    console.log(query);
    client.query(query, function (err, result) {
      //call `done()` to release the client back to the pool 
      done();
      console.log(result);
      
      if (err) {
        return console.error('error running query', err);
      }

      res.status(200).json(result);
    });
  })
};


/**
 * Get a single Login
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * Creates a new Login in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * Updates an existing Login in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * Deletes a Login from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
