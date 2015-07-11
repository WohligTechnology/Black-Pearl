// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ngRoute',
  'phonecatControllers',
  'templateservicemod',
    'navigationservice'
]);

firstapp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'views/template.html',
            controller: 'home'
        }).
        when('/user', {
            templateUrl: 'views/template.html',
            controller: 'user'
        }).
        when('/login', {
            templateUrl: 'views/template.html',
            controller: 'login'
        }).
        when('/signup', {
            templateUrl: 'views/template.html',
            controller: 'signup'
        }).
        when('/edituser/:id', {
            templateUrl: 'views/template.html',
            controller: 'edituser'
        }).
        when('/createuser', {
            templateUrl: 'views/template.html',
            controller: 'createuser'
        }).
       
        when('/device/:id', {
            templateUrl: 'views/template.html',
            controller: 'device'
        }).
        when('/folder/:id', {
            templateUrl: 'views/template.html',
            controller: 'folder'
        }).
        when('/share/:id', {
            templateUrl: 'views/template.html',
            controller: 'share'
        }).
        when('/feeds/:id', {
            templateUrl: 'views/template.html',
            controller: 'feeds'
        }).
        when('/note/:id', {
            templateUrl: 'views/template.html',
            controller: 'note'
        }).
        when('/createnote/:id', {
            templateUrl: 'views/template.html',
            controller: 'createnote'
        }).
        when('/editnote/:user/:id', {
            templateUrl: 'views/template.html',
            controller: 'editnote'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);