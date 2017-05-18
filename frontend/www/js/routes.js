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
        templateUrl: 'templates/chats.html',
        controller: 'ChatController',
        controllerAs: 'vm',
      });

    $urlRouterProvider.otherwise('/');
  }
}(angular));
