app.factory('photos', ['$http', function($http) {
	return $http.get('https://api.unsplash.com/photos/?client_id=5badc84bef4c17ed1a47d6a12d01048984856830bb0ef6a9f446a0005378bd32')
	.success(function(data) {
		//console.log(data);
		data.splice(9, 1);
		return data;
	})
	.error(function(data) {
		console.log("Error: " + data);
		return data;
	});
}]);
