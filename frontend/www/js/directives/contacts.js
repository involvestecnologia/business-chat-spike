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
    'ChatService',
  ];
  function ContactsController(ChatService) {
    var vm = this;
    vm.contacts = ChatService.users;
    vm.current = ChatService.current;

    function _selectContact(contact) {
      ChatService.current.contact = contact;
    }

    vm.selectContact = _selectContact;
  }
}(angular));
