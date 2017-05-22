(function (angular) {
  angular.module('app')
    .config(Routes);

  Routes.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
  ];
  function Routes($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
      })

      .state('chat', {
        url: '/chat/:username',
        templateUrl: 'templates/chat.html',
        controller: 'ChatController',
        controllerAs: 'vm',
      });

    $urlRouterProvider.otherwise('/');
  }
}(angular));
