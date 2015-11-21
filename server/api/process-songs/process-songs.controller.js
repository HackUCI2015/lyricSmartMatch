'use strict';

var fs = require('fs');
var watson = require('watson-developer-cloud');
var lyr = require('lyrics-fetcher');
var async = require('async');

function handleError (res, err) {
  return res.status(500).send(err);
}


function getLyrics(prev, song, callback) {
  console.log ('fetching: ' + song.artist + ' - ' + song.name);
  lyr.fetch(song.artist, song.name, function (err, lyrics) {
    if (err) {
      callback(err);
    } else {
      callback(null, prev + lyrics);
    }
  });
}

function processCombinedLyrics(err, response) {
  if (err) {
    res.status(500).json({ error: 'could not load lyrics' });
  } else {
    var personalityInsight = {};
    var bigFive = response.tree.children[0].children[0].children;

    for (var i = 0; i < bigFive.length; ++i) {
      var category = bigFive[i];
      personalityInsight[category.name] = category.percentage.toFixed(2);

      for (var j = 0; j < category.children.length; ++j) {
        var subCategory = category.children[j];
        personalityInsight[subCategory.name] = subCategory.percentage.toFixed(2);
      }
    }

    console.log(personalityInsight);
  }
}


/**
 * Get list of ProcessSongs
 *
 * @param req
 * @param res
 */
 exports.index = function (req, res) {
  var songs = JSON.parse(req.query.songs);

  async.reduce(songs, '', getLyrics, function (err, result) {
    if (err) return err;

    var personality_insights = watson.personality_insights({
      username: '60f616bf-9bd5-43d4-988f-be838c2fbbb1',
      password: '7L8dPygbFFce',
      version: 'v2'
    });

    personality_insights.profile({
      text: result
    }, processCombinedLyrics);
  });
}


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
  console.log('i posted');
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
