app.controller('HomeCtrl', ['$scope', '$http', 'NgMap', function($scope, $http, NgMap) {
    var home = this;

    //https://stackoverflow.com/questions/32055944/ngmap-for-markers-in-google-map

    // https://ngmap.github.io/     
    home.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyANiFWCJ6jQBnnJVez5wBS7tbERHaWm330";
    // NgMap.getMap().then(function(map) {
    //     // console.log(map.getCenter());
    //     // console.log('markers', map.markers);
    //     // console.log('shapes', map.shapes);
    // }); 
    $http.get("https://api.orgsync.com/api/v3/portals/139217/events.json?key=saQO-P_BwlyykPjd0Et9woSjp_IgtCbnK1NhHcCBdA0&per_page=100&upcoming=true")
        .then(function(results) {
            console.log(results.data);
            home.events = results.data.data;
        });
}]);