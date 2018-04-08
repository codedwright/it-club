app.config(['$locationProvider', '$routeProvider',
		function config($locationProvider, $routeProvider) {
			
			$routeProvider  
				.when('/', { 
					controller: 'HomeController',
					templateUrl: 'views/home.html',
				})
				.when('/about', { 
					controller: 'AboutController',
					templateUrl: 'views/about.html',
				})
				.when('/calendar', { 
					controller: 'CalendarController',
					templateUrl: 'views/calendar.html',
				})
				.when('/events', { 
					controller: 'EventsController',
					templateUrl: 'views/events.html',
				})
				.when('/news', { 
					controller: 'NewsController',
					templateUrl: 'views/news.html',
				})
				.when('/photos', { 
					controller: 'PhotosController',
					templateUrl: 'views/photos.html',
				})
				.when('/contact', { 
					controller: 'ContactController',
					templateUrl: 'views/contact.html',
				})
				.otherwise('/'); 
				
			$locationProvider.html5Mode(true);
		}
	]);