(function () {
    'use strict';
}());
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		build: '<%= new Date().getTime() %>',
		product: '<%= _.capitalize(pkg.name) %>',
		copyrightNotice: 'Copyright (c) <%= grunt.template.today("yyyy") %> Foo.',
		banner: 
			"/*!\n" +
			" * <%= product %> v.<%= pkg.version %>\n" +
			" * <%= copyrightNotice %>\n" +
			" *\n" +
			" * Author: <%= pkg.author.name %> (<%= pkg.author.email %>).\n" +
			" */\n\n",

		concat: {
            options: {
				stripBanners: false,
				banner: '<%= banner %>',
				separator: '\n'
			},
			lib: {
				src: [
					'node_modules/angular/angular.js', 
					'node_modules/angular-route/angular-route.js',
					'node_modules/angular-animate/angular-animate.js',
					'node_modules/angular-sanitize/angular-sanitize.js',
					'node_modules/ngmap/build/scripts/ng-map.js'
				],
                dest: 'scripts.js'
			},
            dist: {
                src: [
					'js/app.js',
					'js/controllers/*.js',
					'js/services/*.js',
					'!js/controllers/*.spec.js',
					'!js/services/*.spec.js',
					'js/app.config.js',
					'js/**.js'
				],
                dest: '<%= pkg.name %>.js'
            }
        },

		uglify: {
			options: {
				banner: '<%= banner %>',
				mangle: false,
			},
			lib: {
				src: 'scripts.js',
				dest: 'scripts.min.js'
			},
			build: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			}
		},

		jshint: {
			files: ['gruntfile.js', 'js/portfolio.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: 'styles',
					cssDir: 'styles',
					specify: 'styles/styles.scss',
					sourcemap: true,
					environment: 'development',
					outputStyle: 'compressed'
				}
			}
		},

		karma: {
			unit: {
				options: {
					frameworks: ['jasmine'],
					singleRun: true,
					autoWatch: true,
					browsers: ['PhantomJS'],
					files: [
						'node_modules/angular/angular.min.js', 
						'node_modules/angular-route/angular-route.min.js',
						'node_modules/angular-animate/angular-animate.min.js',
						'node_modules/angular-sanitize/angular-sanitize.min.js',
						'node_modules/ngmap/build/scripts/ng-map.min.js',
						'node_modules/angular-mocks/angular-mocks.js', // All dependencies required before loading tests or scripts
						'js/app.js',
						'js/app.config.js',
						'js/controllers/*.js', // no arrow functions or spread syntax
					]
				}
			}
		},

		bump: {
			options: {
				files: ['package.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				metadata: '',
				regExp: false
			}
		},

		watch: {
			options: {
		    	livereload: true
		    },
			css: {
				files: '**/*.scss',
	            tasks: 'compass',
	            
			},
			js: {
				files: ['js/*.js', 'js/**/*.js'],
				tasks: ['concat', 'uglify'],
            },
            html: {
            	files: '**/*.html'
            }
        }	


	});

	// Load the plugin that provides the "uglify" task.
	
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify:build']);
	grunt.registerTask('build', ['compass', 'concat', 'uglify:lib', 'uglify:build']);
	grunt.registerTask('test', ['karma']);

	// https://github.com/semantic-release/semantic-release
	// https://docs.npmjs.com/getting-started/semantic-versioning
	grunt.loadNpmTasks('grunt-bump');
};