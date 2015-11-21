'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * Get list of ProcessSongs
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  fs.readFile('server/api/process-songs/process-songs.data.json', 'utf-8', function (err, processSongss) {
    if (err) { return handleError(res, err); }
    res.status(200).json(JSON.parse(processSongss));
  });
};


/**
 * Get a single ProcessSongs
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * Creates a new ProcessSongs in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * Updates an existing ProcessSongs in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * Deletes a ProcessSongs from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
