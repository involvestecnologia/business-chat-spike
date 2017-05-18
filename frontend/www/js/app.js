(function (angular) {
  angular.module('app.controllers', []);
  angular.module('app.services', []);
  angular.module('app.directives', []);
  angular.module('app.filters', []);

  angular.module('app', [
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters',
    'ui.router',
    'btford.socket-io',
  ]).run(Run);

  Run.$inject = [];
  function Run() {
  }
}(angular));
