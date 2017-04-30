angular.module('datenight')
    .controller('DatesCtrl', function($state, profile){
        var datesCtrl = this;
        datesCtrl.profile = profile;
        if(datesCtrl.profile.dateOption2Str)
            datesCtrl.profile.dateOption2 = new Date(datesCtrl.profile.dateOption2Str);
        if(datesCtrl.profile.dateOption1Str)
            datesCtrl.profile.dateOption1 = new Date(datesCtrl.profile.dateOption1Str);

        var now = new Date();
        datesCtrl.nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        datesCtrl.nextMonth= new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

        datesCtrl.updateProfile = function(){
            datesCtrl.profile.dateOption1Str = datesCtrl.profile.dateOption1.toString();
            datesCtrl.profile.dateOption2Str = datesCtrl.profile.dateOption2.toString();
            datesCtrl.profile.$save().then(function(){
                $state.go('memberHome');
            });
        };

    });