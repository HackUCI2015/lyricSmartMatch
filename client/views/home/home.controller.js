'use strict';

angular.module('hackuci2015')
  .controller('HomeCtrl', function () {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl',

      artists: []
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
            limit: 5,
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
    $('#typeahead').typeahead('open');

  });
