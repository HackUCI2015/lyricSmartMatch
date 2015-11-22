'use strict';

var fs = require('fs');
var request = require('request');


function handleError (res, err) {
  return res.status(500).send(err);
}


function sendTextMessage(user, otherUser) {
  request.post({
    url: 'https://api.shoutpoint.com/v0/Dials/SMS',
    json: {
      call: {
        no: otherUser.phone_number,
        caller_id_no: '19494316294'
      },
      message: 'Hey ' + user.user_name + ', ' + otherUser.user_name + ' wants to talk to you.'
    },
    headers: {
      'X-API-Key': 'TdHDHOP2PmagjJhbnvdBUzQhej0wMyE0',
      'Content-Type': 'application/json'
    }
  }, function (err, res, body) {
    if (err) {
      return err;
    }
  });
}


/**
 * Get list of Text
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  var user = JSON.parse(req.query.user);
  var otherUser = JSON.parse(req.query.otherUser);

  sendTextMessage(user, otherUser);
  sendTextMessage(otherUser, user);
};


/**
 * Get a single Text
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * Creates a new Text in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * Updates an existing Text in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * Deletes a Text from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
