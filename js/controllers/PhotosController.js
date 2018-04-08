app.controller('PhotosController', ['$scope', 'photos', '$routeParams', function($scope, photos, $routeParams) {
	photos.success(function(data) {
		$scope.detail = data[$routeParams.id];
		$scope.small = window.outerWidth < 700;
	});
}]);