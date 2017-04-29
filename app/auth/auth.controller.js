angular.module('datenight')
    .controller('AuthController', function(Auth, $state){
        var authCtrl = this;

        authCtrl.user = {
            email: '',
            password: ''
        };

        authCtrl.login = function (){
            Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (auth){
                $state.go('memberHome');
            }, function (error){
                authCtrl.error = error;
            });
        };

        authCtrl.register = function (){
            Auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function (user){
                $state.go('memberHome');
            }, function (error){
                authCtrl.error = error;
            });
        };

    });