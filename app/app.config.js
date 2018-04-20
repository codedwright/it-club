app.config(['$locationProvider', '$routeProvider',
		function config($locationProvider, $routeProvider) {
			
			$routeProvider  
				.when('/', { 
					templateUrl: 'partials/home.html',
					controller: 'HomeCtrl',
      				controllerAs: 'home'
				})
				.when('/members', { 
					templateUrl: 'partials/members.html',
					controller: 'MembersCtrl',
      				controllerAs: 'members',
				})
				.when('/events', { 
					templateUrl: 'partials/events.html',
					controller: 'EventsCtrl',
      				controllerAs: 'events',
				})
				.when('/affiliation', { 
					templateUrl: 'partials/affiliation.html',
					controller: 'AffiliatesCtrl',
      				controllerAs: 'affiliation',
				})
				.when('/training', { 
					templateUrl: 'partials/training.html',
					controller: 'TrainingCtrl',
      				controllerAs: 'training',
				})
				.when('/news', { 
					templateUrl: 'partials/news.html',
					controller: 'NewsCtrl',
      				controllerAs: 'news',
				})
				.when('/gallery', { 
					templateUrl: 'partials/gallery.html',
					controller: 'GalleryCtrl',
      				controllerAs: 'gallery',
				})
				.when('/posts', { 
					templateUrl: 'partials/home.html',
					controller: 'HomeCtrl',
      				controllerAs: 'home',
				})
				.otherwise('/'); 
				
			$locationProvider.html5Mode(true);
		}
	]);