(function (angular) {
  angular.module('app.controllers').controller('ChatController', ChatController);

  ChatController.$inject = [
    '$scope',
    '$stateParams',
    'ChatService',
  ];
  function ChatController($scope, $stateParams, ChatService) {
    var vm = this;
    vm.model = ChatService.current;

    ChatService.connect($stateParams.username)
      .then(ChatService.requestUsers)
      .then(ChatService.requestMessages)
      .then(function () {
        $scope.$on('$destroy', function () {
          ChatService.disconnect();
        });
      });
  }
}(angular));
