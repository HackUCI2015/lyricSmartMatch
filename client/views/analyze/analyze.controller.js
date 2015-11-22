'use strict';

angular.module('hackuci2015')
  .controller('AnalyzeCtrl', function ($http, $scope) {

    var vm = this;

    angular.extend(vm, {
      name: 'AnalyzeCtrl',

      selectedTracks: [],

      selectTrack: function (track) {
        vm.selectedTracks.push({
          artist: track.artists[0].name,
          name: track.name,
          thumbnail: track.album.images[2].url
        });
      },

      removeTrack: function ($index) {
        vm.selectedTracks.splice($index, 1);
      },

      sendSongs: function () {
        console.log(vm.selectedTracks);
        $http({
          method: 'GET',
          url: '/api/process-songs',
          params: {
            songs: JSON.stringify(vm.selectedTracks)
          }
        }).then(function success (data) {
          console.log(data);
        }, function error (err) {
          console.log(err);
        });
      }

    });

    $('#typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      limit: 12,
      async: true,
      source: function (query, processSync, processAsync) {
        return $.ajax({
          url: 'https://api.spotify.com/v1/search',
          type: 'GET',
          data: {
            query: query,
            offset: 0,
            limit: 10,
            type: 'track'
          },
          dataType: 'json',
          success: function (json) {
            $scope.$apply(function () {
              vm.tracks = json.tracks.items;
            });
          }
        });
      }
    });


  });
