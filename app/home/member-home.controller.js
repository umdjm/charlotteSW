angular.module('datenight')
    .controller('MemberHomeCtrl', function($state, Auth, Users, profile){
        var memberHomeCtrl = this;
        memberHomeCtrl.profile = profile;
        memberHomeCtrl.getDisplayName = Users.getDisplayName;
        memberHomeCtrl.getGravatar = Users.getGravatar;
        memberHomeCtrl.logout = function(){
            Auth.$signOut().then(function(){
                $state.go('home');
            });
        };
    });