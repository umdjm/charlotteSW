angular.module('datenight')
    .factory('Spotify', function($http){
        var apiBase = 'https://api.spotify.com/v1';

        function searchArtists(artist){
            return $http.get("https://api.spotify.com/v1/search?q=" + artist + "&type=artist")
                .then(function(result){
                    if(!result || !result.data || !result.data.artists || !result.data.artists.items)
                        return false;
                    if(!result.data.artists.items.length)
                        return false;

                    return result.data.artists.items[0];
                });
        }

        return { searchArtists: searchArtists }
    });