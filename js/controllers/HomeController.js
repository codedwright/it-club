app.controller('HomeController', ['$scope', '$http', 'NgMap', function($scope, $http, NgMap) {
    
    // https://ngmap.github.io/     
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyANiFWCJ6jQBnnJVez5wBS7tbERHaWm330";
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    }); 
    $http.get("https://api.orgsync.com/api/v3/portals/139217/events.json?key=saQO-P_BwlyykPjd0Et9woSjp_IgtCbnK1NhHcCBdA0&per_page=100&upcoming=true").then((results) => {
        console.log(results.data);
        $scope.events = results.data.data;
    })
}]);