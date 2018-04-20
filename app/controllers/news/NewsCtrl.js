app.controller('NewsCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get("https://api.orgsync.com/api/v3/portals/139217/events.json?key=saQO-P_BwlyykPjd0Et9woSjp_IgtCbnK1NhHcCBdA0&per_page=100&upcoming=true")
        .then(function(results) {
            console.log(results.data);
            $scope.events = results.data.data;
        })
}]);