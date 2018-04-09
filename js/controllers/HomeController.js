app.controller('HomeController', ['$scope', 'NgMap', function($scope, NgMap) {
    
    // https://ngmap.github.io/     
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyANiFWCJ6jQBnnJVez5wBS7tbERHaWm330";
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    }); 
}]);