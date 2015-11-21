'use strict';

angular.module('hackuci2015', [
  'ngRoute',
  'ngAnimate',
  'ngMaterial',
  'ngAria'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  })
  .run(function ($rootScope, $location, $mdSidenav) {

    angular.extend($rootScope, {
      toggleSidenav: function (menuId) {
        $mdSidenav(menuId).toggle();
      },

      isActive: function (route) {
        return route === $location.path();
      },

      navigate: function (link) {
        $location.path(link);

        if ($mdSidenav('left').isOpen()) {
          $rootScope.toggleSidenav('left');
        }
      },

      menuItems: [
        {
          link: '/',
          title: 'Home',
          disabledIfLoggedOut: false
        },
        {
          link: '/analyze',
          title: 'Analyze',
          disabledIfLoggedOut: false
        },
        {
          link: '/matches',
          title: 'Matches',
          disabledIfLoggedOut: false
        }
      ]
    });
  });
