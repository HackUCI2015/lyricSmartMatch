'use strict';

angular.module('hackuci2015')
  .controller('AnalyzeCtrl', function () {

    angular.extend(this, {
      name: 'AnalyzeCtrl',

      sendSongs: function () {
        var songList = $('#song-list').val().split('\n');
        var compiledSongList = [];
        var song;

        for (var i = 0; i < songList.length; ++i) {
          song = songList[i].split(' - ');

          if (song)
            compiledSongList.push(song);
        }

        console.log(compiledSongList);
      }
    });

  });
