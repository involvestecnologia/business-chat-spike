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
    vm.message = '';

    function _getMessages() {
      return ChatService.current.messages.filter(function (message) {
        var from = message.from._id || message.from;
        var to = message.to.find(function (t) {
          return (t._id || t) === vm.to._id;
        });

        return from === vm.to._id || to === vm.to._id;
      });
    }

    function _sendMessage() {
      ChatService.sendMessage(vm.to, vm.message);
      vm.message = '';
    }

    function _hasMessage() {
      return vm.message.length > 0 && vm.message !== ' ';
    }

    vm.getMessages = _getMessages;
    vm.sendMessage = _sendMessage;
    vm.hasMessage = _hasMessage;
  }
}(angular));
