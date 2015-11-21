'use strict';

angular.module('hackuci2015')
  .controller('AnalyzeCtrl', function ($http) {

    angular.extend(this, {
      name: 'AnalyzeCtrl',

      sendSongs: function () {
        var songList = $('#song-list').val().split('\n');
        var compiledSongList = [];
        var song;

        for (var i = 0; i < songList.length; ++i) {
          song = songList[i].split(' - ');

          if (song)
            compiledSongList.push({
              artist: song[0],
              name: song[1]
            });
        }

        console.log('compiledSongList');
        console.log(compiledSongList);
        $http({
          method: 'GET',
          url: '/api/process-songs',
          params: {
            songs: JSON.stringify(compiledSongList)
          }
        }).then(function success (data) {
          console.log(data);
        }, function error (err) {

        })
      }
    });

  });
