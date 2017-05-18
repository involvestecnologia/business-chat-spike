(function (angular, io) {
  angular.module('app.services').factory('SocketService', SocketService);

  SocketService.$inject = [
    'socketFactory',
  ];
  function SocketService(socketFactory) {
    var ioSocket = io.connect('http://localhost:3000', { query: { user_id: 1 } });
    return socketFactory({
      ioSocket: ioSocket,
    });
  }
}(angular, io));
