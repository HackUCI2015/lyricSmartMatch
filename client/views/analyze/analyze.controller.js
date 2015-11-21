'use strict';

angular.module('hackuci2015')
  .controller('AnalyzeCtrl', function () {

    angular.extend(this, {
      name: 'AnalyzeCtrl',

      sendSongs: function () {
        var songList = $('#song-list').val();
        console.log(songList);
      }
    });

  });
