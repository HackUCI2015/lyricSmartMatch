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

    client.query(query, function (err, result) {
      //call `done()` to release the client back to the pool 
      done();
      
      if (err) {
        return console.error('error running query', err);
      }

      var users = result.rows;

      var user = {
        username: "maxpaulus",
        id: 123456,
        'agreeableness': .52,
        'orderliness' : 1.0,
        'excitement_seeking' : .11,
        'fiery': .24
      }

      var distancesToOtherUsers = [];

      for (var j = 0; j < users.length; j++) {
        var otherUser = users[j];
        if (otherUser.id !== user.id) {
          var diffSum = 0;
          for (var trait in user) {
            if (user.hasOwnProperty(trait) && trait !== 'username' && trait !== 'id') {
              var diff = Math.abs(+user[trait] - +otherUser[trait]);
              console.log('\n'); 
              console.log(otherUser);
              console.log('user: ' + (user[trait]) + ', other: ' + (otherUser[trait]));
              console.log(diff)
              diffSum += diff;
            }
          }
          distancesToOtherUsers.push({
            distance: diffSum.toFixed(2),
            username: otherUser.user_name,
            id: otherUser.id
          });
        }
      }

      distancesToOtherUsers = distancesToOtherUsers
        .sort(function (a, b) { return a.distance < b.distance })
        .splice(0,5);
      console.log(distancesToOtherUsers);
      res.status(200).json(distancesToOtherUsers);
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
