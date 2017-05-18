(function (angular) {
  angular.module('app.services').factory('ChatService', ChatService);

  ChatService.$inject = [
    'SocketService',
  ];
  function ChatService(SocketService) {
    var _users = { data: [], count: 0 };
    var _messages = [];

    SocketService.on('users', function (users) {
      _users.data = users.data;
      _users.count = users.count;
    });

    SocketService.on('messages', function (messages) {
      _messages = messages;
    });

    SocketService.on('message', function (message) {
      _messages.push(message);
    });

    function _requestUsers() {
      SocketService.emit('users');
    }

    function _send(from, to, message) {
      return SocketService.emit('message-' + to.id, { from: from, message: message });
    }

    return {
      requestUsers: _requestUsers,
      send: _send,
      users: _users,
      messages: _messages,
    };
  }
}(angular));
