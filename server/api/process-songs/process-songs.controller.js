'use strict';

var fs = require('fs');
var watson = require('watson-developer-cloud');
var lyr = require('lyrics-fetcher');
var async = require('async');
var pg = require('pg');

var conString = require('../../config/environment').conString;

var translateCategoriesToSQLColumns = {
  'Openness': 'openness',
  'Adventurousness': 'adventurousness',
  'Artistic interests': 'artistic_interests',
  'Emotionality': 'emotionality',
  'Imagination': 'imagination',
  'Intellect': 'intellect',
  'Authority-challenging': 'authority_challenging',
  'Conscientiousness': 'conscientiousness',
  'Achievement striving': 'achievement_striving',
  'Cautiousness': 'cautiousness',
  'Dutifulness': 'dutifulness',
  'Orderliness': 'orderliness',
  'Self-discipline': 'self_discipline',
  'Self-efficacy': 'self_efficacy',
  'Extraversion': 'extraversion',
  'Activity level': 'activity_level',
  'Assertiveness': 'assertiveness',
  'Cheerfulness': 'cheerfulness',
  'Excitement-seeking': 'excitement_seeking',
  'Outgoing': 'outgoing',
  'Gregariousness': 'gregariousness',
  'Agreeableness': 'agreeableness',
  'Altruism': 'altruism',
  'Cooperation': 'cooperation',
  'Modesty': 'modesty',
  'Uncompromising': 'uncompromising',
  'Sympathy': 'sympathy',
  'Trust': 'trust',
  'Emotional range': 'emotional_range',
  'Fiery': 'fiery',
  'Prone to worry': 'prone_to_worry',
  'Melancholy': 'melancholy',
  'Immoderation': 'immoderation',
  'Self-consciousness': 'self_consciousness',
  'Susceptible to stress': 'susceptible_to_stress'
}

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
      personalityInsight[translateCategoriesToSQLColumns[category.name]] = category.percentage.toFixed(2);

      for (var j = 0; j < category.children.length; ++j) {
        var subCategory = category.children[j];
        personalityInsight[translateCategoriesToSQLColumns[subCategory.name]] = subCategory.percentage.toFixed(2);
      }
    }

    insertIntoUsersTable(personalityInsight);
  }
}

function insertIntoUsersTable(personalityInsight) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    var query = 
      'INSERT INTO users(user_name, openness, adventurousness, ' + 
      'artistic_interests, emotionality, imagination, intellect, ' +
      'authority_challenging, conscientiousness, achievement_striving, ' +
      'cautiousness, dutifulness, orderliness, self_discipline, ' +
      'self_efficacy, extraversion, activity_level, assertiveness, ' +
      'cheerfulness, excitement_seeking, outgoing, gregariousness, ' +
      'agreeableness, altruism, cooperation, modesty, uncompromising, ' +
      'sympathy, trust, emotional_range, fiery, prone_to_worry, melancholy, ' +
      'immoderation, self_consciousness, susceptible_to_stress) VALUES ' +
      "('vnguyen94', '0.05', '0.06', '0.07', '0.08', " +
      "'0.09', '0.10', '0.11', '0.12', '0.13', '0.14', '0.15', '0.16', " +
      "'0.17', '0.18', '0.19', '0.20', '0.21', '0.22', '0.23', '0.24', " +
      "'0.25', '0.26', '0.27', '0.28', '0.29', '0.30', '0.31', '0.32', " +
      "'0.33', '0.34', '0.35', '0.36', '0.37', '0.38', '0.39')";

    client.query(query, function (err, result) {
      //call `done()` to release the client back to the pool 
      done();
      
      if (err) {
        return console.error('error running query', err);
      }

      res.status(200).json({});
    });
  });
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
