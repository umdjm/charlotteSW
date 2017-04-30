angular.module('datenight')
    .controller('SurveyCtrl', function(Spotify, $state, profile){
        var surveyCtrl = this;
        surveyCtrl.profile = profile;

        surveyCtrl.restaurantTypes = ['Tapas', 'Italian', 'Sushi', 'Steak', 'Vegetarian', 'Seafood'];
        surveyCtrl.activityTypes = ['Hiking', 'Book Readings', 'Live Concerts', 'Theater',
            'Sporting Events', 'Bars', 'Comedy', 'Volunteering', 'Dancing', 'Trivia', 'Learning New Things', 'Excercise'];

        var now = new Date();
        surveyCtrl.nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        surveyCtrl.nextMonth= new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

        if(!profile.artists) {
            surveyCtrl.profile.artists = [{spotify: null, artistName: ""}, {spotify: null, artistName: ""}];
        }
        surveyCtrl.searchArtist = function(artist){
            Spotify.searchArtists(artist.artistName)
                .then(function(spotifyArtist){
                    artist.spotify = spotifyArtist;
                })
        };


        surveyCtrl.updateProfile = function(){
            surveyCtrl.profile.$save().then(function(){
                $state.go('memberHome.dates');
            });
        };
    });