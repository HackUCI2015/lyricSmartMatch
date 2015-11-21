'use strict';

var fs = require('fs');
var pg = require('pg');

var conString = require('../../config/environment').conString;

function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * Get list of GetUsers
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    var query = 
      'SELECT * from users';

    client.query(query, function (err, users) {
      //call `done()` to release the client back to the pool 
      done();
      
      if (err) {
        return console.error('error running query', err);
      }

      res.status(200).json(users);
    });
  });
};


/**
 * Get a single GetUsers
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * Creates a new GetUsers in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * Updates an existing GetUsers in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * Deletes a GetUsers from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
