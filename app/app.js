var app = angular.module('appAltiora', [
    'ngRoute',
    'clientControllers'
  ]);
  
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/', {
        templateUrl: './app/modules/client/viewer/client.list.html',
        controller: 'clientCrudCtrl'
      }).
      when('/client/create/:id?', {
        templateUrl: './app/modules/client/viewer/client.create.html',
        controller: 'clientCrudCtrl'
      }).
      when('/order/create/:id?', {
        templateUrl: './app/modules/order/viewer/order.create.html',
        controller: 'clientCrudCtrl'
      }).
      when('/order/list/:id?', {
        templateUrl: './app/modules/order/viewer/order.list.html',
        controller: 'clientCrudCtrl'
      }).
        otherwise({
          redirectTo: '/'
        });
    }]);

    
   