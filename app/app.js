'use strict';

angular
  .module('datenight', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
          resolve: {
              requireNoAuth: function($state, Auth){
                  return Auth.$requireSignIn().then(function(auth){
                      $state.go('memberHome');
                  }, function(error){
                      return;
                  });
              }
          }
      })
        .state('login', {
            url: '/login',
            controller: 'AuthController as authCtrl',
            templateUrl: 'auth/login.html',
            resolve: {
                requireNoAuth: function($state, Auth){
                    return Auth.$requireSignIn().then(function(auth){
                        $state.go('memberHome');
                    }, function(error){
                        return;
                    });
                }
            }
        })
        .state('register', {
            url: '/register',
            controller: 'AuthController as authCtrl',
            templateUrl: 'auth/register.html',
            resolve: {
                requireNoAuth: function($state, Auth){
                    return Auth.$requireSignIn().then(function(auth){
                        $state.go('memberHome');
                    }, function(error){
                        return;
                    });
                }
            }
        })
        .state('profile', {
            url: '/profile',
            controller: 'ProfileCtrl as profileCtrl',
            templateUrl: 'users/profile.html',
            resolve: {
                auth: function($state, Users, Auth){
                    return Auth.$requireSignIn().catch(function(){
                        $state.go('memberHome');
                    });
                },
                profile: function(Users, Auth){
                    return Auth.$requireSignIn().then(function(auth){
                        return Users.getProfile(auth.uid).$loaded();
                    });
                }
            }
        })
        .state('memberHome', {
            url: '/memberHome',
            controller: 'MemberHomeCtrl as memberHomeCtrl',
            templateUrl: 'home/member-home.html',
            resolve: {
                profile: function ($state, Auth, Users){
                    return Auth.$requireSignIn().then(function(auth){
                        return Users.getProfile(auth.uid).$loaded().then(function (profile){
                            if(profile.displayName){
                                return profile;
                            } else {
                                $state.go('profile');
                            }
                        });
                    }, function(error){
                        $state.go('home');
                    });
                }
            }
        });

    $urlRouterProvider.otherwise('/');
  })
    .config(function(){
        var config = {
            apiKey: "AIzaSyBMsXqWFjybkuetbByF5-rgR1_e6KCb-vQ",
            authDomain: "greatdates-54083.firebaseapp.com",
            databaseURL: "https://greatdates-54083.firebaseio.com",
            projectId: "greatdates-54083",
            storageBucket: "greatdates-54083.appspot.com",
            messagingSenderId: "357685181018"
        };
        firebase.initializeApp(config);
    })
