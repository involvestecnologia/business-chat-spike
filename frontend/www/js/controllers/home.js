(function (angular) {
  angular.module('app.controllers').controller('HomeController', HomeController);

  HomeController.$inject = [
    '$state',
  ];
  function HomeController($state) {
    var vm = this;
    vm.username = '';

    function _connect() {
      $state.go('chat', { username: vm.username });
    }

    function _validateUsername() {
      return vm.username.trim().length > 3;
    }

    vm.connect = _connect;
    vm.validateUsername = _validateUsername;
  }
}(angular));
