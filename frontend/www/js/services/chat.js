(function (angular, io) {
  angular.module('app.services').factory('ChatService', ChatService);

  ChatService.$inject = [
    '$q',
    '$rootScope',
    'socketFactory',
  ];
  function ChatService($q, $rootScope, socketFactory) {
    var _socket = null;
    var _users = { data: [], count: 0 };
    var _current = {
      user: null,
      contact: null,
      messages: [],
    };
    var EVENTS = {
      UPDATED_USERS: '__updated__users__',
      UPDATED_MESSAGES: '__update__messages__',
      USER_TYPING: '__user__typing__',
      USER_STOPPED_TYPING: '__user__stopped__typing__',
    };

    function _bindEvents() {
      _socket.on('user', function (user) {
        _current.user = user;
        $rootScope.$broadcast(EVENTS.UPDATED_USERS, _users);
      });

      _socket.on('users', function (users) {
        _users.data = users.data;
        _users.count = users.count;
        $rootScope.$broadcast(EVENTS.UPDATED_USERS, _users);
      });

      _socket.on('messages', function (messages) {
        _current.messages = messages.data;
        $rootScope.$broadcast(EVENTS.UPDATED_MESSAGES, _current.messages);
      });

      _socket.on('message', function (message) {
        _current.messages.push(message);
        $rootScope.$broadcast(EVENTS.UPDATED_MESSAGES, _current.messages);
      });

      _socket.on('online', function (user) {
        _users.data.push(user);
      });

      _socket.on('offline', function (user) {
        user = _users.data.find(function (usr) {
          return user._id === usr._id;
        });
        var index = _users.data.indexOf(user);
        _users.data.splice(index, 1);
      });

      _socket.on('typing', function (user) {
        $rootScope.$broadcast(EVENTS.USER_TYPING, user);
      });

      _socket.on('stopped-typing', function (user) {
        $rootScope.$broadcast(EVENTS.USER_STOPPED_TYPING, user);
      });
    }

    function _connect(username) {
      return $q(function (resolve) {
        _current.contact = null;

        _socket = socketFactory({
          ioSocket: io.connect('http://192.168.200.52:3000', { query: { name: username } }),
        });

        _socket.on('connect', function () {
          _bindEvents();
          _current.user = { name: username };
          resolve();
        });
      });
    }

    function _disconnect() {
      _socket.disconnect();
    }

    function _requestUsers() {
      _socket.emit('users');
    }

    function _setTyping(to) {
      _socket.emit('typing', to);
    }

    function _setStoppedTyping(to) {
      _socket.emit('stopped-typing', to);
    }

    function _sendMessage(to, message) {
      _socket.emit('message', { to: to, text: message });
    }

    function _requestMessages() {
      _socket.emit('messages');
    }

    return {
      connect: _connect,
      disconnect: _disconnect,
      requestUsers: _requestUsers,
      setTyping: _setTyping,
      setStoppedTyping: _setStoppedTyping,
      sendMessage: _sendMessage,
      requestMessages: _requestMessages,
      current: _current,
      users: _users,
      EVENTS: EVENTS,
    };
  }
}(angular, io));
