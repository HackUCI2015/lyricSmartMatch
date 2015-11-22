'use strict';

var fs = require('fs');
var pg = require('pg');

var conString = require('../../config/environment').conString;


function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * Get list of Register
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
      "INSERT INTO users(user_name, phone_number) VALUES ('" +
      req.query.user_name + "', '" + req.query.phone_number + "')"
    );

    client.query(query, function (err, result) {

      if (err) {
        return console.error('error running query', err);
      }

      var query2 = "SELECT user_name, id from users WHERE user_name = '" + req.query.user_name + "'";

      client.query(query2, function (err, result2) {
        //call `done()` to release the client back to the pool 
        done();
        
        if (err) {
          return console.error('error running query', err);
        }

        console.log(result.rows[0]);
        res.status(200).json(result2.rows[0]);
      });
    });
  });
};


/**
 * Get a single Register
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * Creates a new Register in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * Updates an existing Register in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * Deletes a Register from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
