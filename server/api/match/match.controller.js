'use strict';

var fs = require('fs');
var pg = require('pg');

var conString = require('../../config/environment').conString;

function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * Get list of Match
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  console.log('im in here')
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var user = JSON.parse(req.query.user);
    console.log(req.query);
    var userId = user.id
    // console.log('userID: ' + userId);
  
    var query = "SELECT user2 from user_like_user WHERE user1 = " + userId;
    console.log(query);

    client.query(query, function (err, result) {
      if (err) {
        return console.error('error running query', err);
      }

      var query2 = "SELECT * from users u INNER JOIN user_like_user ulu ON u.id = ulu.user1 WHERE ulu.user2 = " + userId;

      client.query(query2, function (err, result2) {
        done();

        if (err) {
          return console.error('error runnig query', err);
        }
        console.log(result2);

        res.status(200).json(result2.rows);
      });
      // res.status(200).json({});
    });
  });
};


/**
 * Get a single Match
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * Creates a new Match in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var userId = req.query.userId;
    var otherUserId = req.query.otherUserId;
  
    var query = "INSERT INTO user_like_user(user1, user2) VALUES (" + userId + ", " + otherUserId + ")";

    client.query(query, function (err, result) {
      if (err) {
        return console.error('error running query', err);
      }

      var query2 = "SELECT * FROM user_like_user WHERE user1 = " + otherUserId + " AND user2 = " + otherUserId;

      client.query(query2, function (err, result2) {
        done();
        if (err) {
          return console.error('error running query', err);
        }

        res.status(200).json({});
      });
      res.status(200).json({});
    });
  });
};


/**
 * Updates an existing Match in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * Deletes a Match from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
