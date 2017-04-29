angular.module('datenight')
    .factory('Auth', function($firebaseAuth){
        var auth = $firebaseAuth();

        return auth;
    });