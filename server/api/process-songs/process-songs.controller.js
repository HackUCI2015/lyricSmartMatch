'use strict';

var fs = require('fs');
var watson = require('watson-developer-cloud');
var lyr = require('lyrics-fetcher');

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
  lyr.fetch('drake', 'started from the bottom', function (err, lyrics) {
    if (err !== null) {
      console.log(err);
    }
    else {
      console.log("found lyrics");
      var personality_insights = watson.personality_insights({
        username: "60f616bf-9bd5-43d4-988f-be838c2fbbb1",
        password: "7L8dPygbFFce",
        version: 'v2'
      });

      personality_insights.profile({
        text: lyrics
      }, function (err, response) {
        if (err) {
          console.log('error:', err);
        }
        else {
          var bigFive = response.tree.children[0].children[0].children;
          for (var i = 0; i < bigFive.length; ++i) {
            var category = bigFive[i];
            console.log(category.name + ": " + category.percentage.toFixed(2));
            for (var j = 0; j < category.children.length; ++j) {
              var subCategory = category.children[j];
              console.log('  ' + subCategory.name + ": " + subCategory.percentage.toFixed(2));
            }
          }
        }
      });
    }
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
