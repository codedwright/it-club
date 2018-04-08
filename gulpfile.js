//npm i gulp gulp-imagemin gulp-concat gulp-util gulp-uglify gulp-autoprefixer gulp-sftp --save-dev

var gulp = require('gulp'); 
var uglify = require('gulp-uglify'); 

var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sftp = require('gulp-sftp');


// Scripts Task
// Uglifies
gulp.task('scripts01', function(){
	return gulp.src(['./scripts/php.js', './scripts/route.js', './scripts/varAccounts.js', './node_modules/'])
		.pipe(concat('scripts_initial.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});

// Scripts Task
// Uglifies
gulp.task('scripts02', function(){
	return gulp.src(['./scripts/account.js', './scripts/admin.js', './scripts/forgot.js', './scripts/campaign.js', './scripts/login.js', './scripts/logout.js', './scripts/records.js', './scripts/search.js', './scripts/signup.js', './scripts/submit.js', './scripts/templates.js', './scripts/test.js', './scripts/events.js', './scripts/demo.js', './scripts/init.js'])
		.pipe(concat('scripts_write.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});

// Scripts Task
// Upload
gulp.task('scriptsBuildUpload', function(){
	return gulp.src(['./build/js/scripts_write.js', './build/js/scripts_initial.js'])
		.pipe(sftp({
			host: "referralcarpetcare.com",
		    user: "referral",
		    password: "Web=money1",
		    remotePath: "/home3/referral/public_html/referralfw/partners/build/js/"
		}));
});

// Scripts Upload
gulp.task('scriptsUpload', function(){
	return gulp.src('scripts/*.js')
		.pipe(sftp({
			host: "",
		    user: "",
		    password: "",
		    remotePath: "/home3/referral/public_html/referralfw/partners/scripts/"
		}));
});

// Styles Task
// Sass
gulp.task('styles', function(){
	return sass('css/*.scss', {
			style: 'expanded' // expanded
		})
		.pipe(prefix('last 2 versions'))
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('build/css'))
		.on('error', handleError);
		console.log('styles');
});

// Image Task
// Compress
gulp.task('image', function(){
	return gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build'));
});

// Watch Task
// Watches JS
gulp.task('watch', function(){

	gulp.watch('**/*.php', reload);

	gulp.watch('images/*', ['image', reload]);

	gulp.watch('scripts/*.js', ['scripts01', 'scripts02', 'scriptsUpload', reload]);

	gulp.watch('build/js/*.js', ['scriptsBuildUpload', reload]);

	gulp.watch('css/*.scss', ['styles', reload]);

});

gulp.task('default', ['scripts01', 'scripts02', 'styles', 'image', 'browser-sync', 'watch']);