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
    '$scope',
    'ChatService',
    '$timeout',
  ];
  function ChatController($scope, ChatService, $timeout) {
    var typingTimeout = null;
    var typing = false;
    var vm = this;
    vm.message = '';

    $scope.$watch(function () {
      return vm.message;
    }, function () {
      if (vm.message.length <= 0) return;
      if (!typing) {
        ChatService.setTyping(vm.to);
        typing = true;
      }

      if (typingTimeout) clearTimeout(typingTimeout);
      typingTimeout = setTimeout(function () {
        ChatService.setStoppedTyping(vm.to);
        typing = false;
      }, 1000);
    });

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

    function _scrollDown() {
      var panel = document.querySelector('#chat-panel-body');
      if (!panel) return;
      $timeout(function () {
        panel.scrollTop = panel.scrollHeight;
      });
    }

    vm.getMessages = _getMessages;
    vm.sendMessage = _sendMessage;
    vm.hasMessage = _hasMessage;
    vm.scrollDown = _scrollDown;
  }
}(angular));
