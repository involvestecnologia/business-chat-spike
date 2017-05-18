(function (angular) {
  angular.module('app.directives').directive('chat', ChatDirective);

  ChatDirective.$inject = [];
  function ChatDirective() {
    return {
      templateUrl: 'templates/directives/chat.html',
      restrict: 'E',
      scope: {
        from: '=',
        to: '=',
      },
      controller: ChatController,
      controllerAs: 'vm',
      bindToController: true,
    };
  }

  ChatController.$inject = [
    'ChatService',
  ];
  function ChatController(ChatService) {
    var vm = this;

    function _sendMessage() {
      ChatService.send(vm.from, vm.to, vm.message);
      vm.message = '';
    }

    vm.message = '';
    vm.sendMessage = _sendMessage;
    vm.messages = ChatService.messages;
  }
}(angular));
