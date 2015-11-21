'use strict';

angular.module('hackuci2015')
  .controller('HomeCtrl', function () {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl',

      sendSongs: function () {
        var songList = $('#song-list').val();
        console.log(songList);
      }
    });

  });
