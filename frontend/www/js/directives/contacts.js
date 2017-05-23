(function (angular) {
  angular.module('app.directives').directive('contacts', ContactsDirective);

  ContactsDirective.$inject = [];
  function ContactsDirective() {
    return {
      templateUrl: 'templates/directives/contacts.html',
      restrict: 'E',
      scope: {},
      controller: ContactsController,
      controllerAs: 'vm',
      bindToController: true,
    };
  }

  ContactsController.$inject = [
    '$scope',
    'ChatService',
  ];
  function ContactsController($scope, ChatService) {
    var vm = this;
    vm.contacts = ChatService.users;
    vm.current = ChatService.current;

    $scope.$on(ChatService.EVENTS.USER_TYPING, function (event, user) {
      var contact = vm.contacts.data.find(function (c) {
        return c._id === user._id;
      });
      if (!contact) return;
      contact.typing = true;
    });

    $scope.$on(ChatService.EVENTS.USER_STOPPED_TYPING, function (event, user) {
      var contact = vm.contacts.data.find(function (c) {
        return c._id === user._id;
      });
      if (!contact) return;
      contact.typing = false;
    });

    function _selectContact(contact) {
      ChatService.current.contact = contact;
    }

    vm.selectContact = _selectContact;
  }
}(angular));
