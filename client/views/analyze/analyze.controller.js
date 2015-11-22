'use strict';

angular.module('hackuci2015')
  .controller('AnalyzeCtrl', function ($http, $scope, $location, UserFactory) {

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
        $http({
          method: 'GET',
          url: '/api/process-songs',
          params: {
            songs: JSON.stringify(vm.selectedTracks),
            user: JSON.stringify(UserFactory.getCurrentUser())
          }
        }).then(function success (result) {
          result.data.name = result.data.user_name;
          UserFactory.setCurrentUser(result.data)
          $location.path('/matches');
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
