(function (angular) {
  angular.module('app.controllers').controller('ChatController', ChatController);

  ChatController.$inject = [
    'ChatService',
  ];
  function ChatController(ChatService) {
    var vm = this;
    vm.users = ChatService.users;

    function _requestUsers() {
      ChatService.requestUsers();
    }

    vm.requestUsers = _requestUsers;
  }
}(angular));
