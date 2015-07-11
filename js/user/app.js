var adminurl = "http://130.211.118.86/";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    return {
        getnav: function () {
            return hello;
        }

    }
});