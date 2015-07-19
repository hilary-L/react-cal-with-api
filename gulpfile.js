var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var compass = require('gulp-compass');

var path = {
	HTML: 'src/index.html',
	SASS: 'src/sass/app.scss',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	DEST: 'public',
	DEST_BUILD: 'public/js',
	DEST_SRC: 'public/src',
	DEST_CSS: 'public/css',
	ENTRY_POINT: './src/js/components/CalApp.js'
};

gulp.task('copy', function() {
	gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST));
	});

gulp.task('watch', function() {
	gulp.watch(path.HTML, ['copy']);
	gulp.watch(path.SASS, ['compass']);

	var watcher = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [babelify],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true
		}));

	return watcher.on('update', function() {
		watcher.bundle()
			.pipe(source(path.OUT))
			.pipe(gulp.dest(path.DEST_SRC))
			console.log('Updated');
		})
	.bundle()
	.pipe(source(path.OUT))
	.pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('compass', function() {

	gulp.src('./src/sass/*.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: 'src/css',
			sass: 'src/sass'
			}))
		.pipe(gulp.dest(path.DEST_CSS));

});

gulp.task('default', ['watch', 'compass']);

gulp.task('build', function() {
	browserify({
		entries: [path.ENTRY_POINT],
		transform: [babelify]
		})
	.bundle()
	.pipe(source(path.MINIFIED_OUT))
	.pipe(streamify(uglify(path.MINIFIED_OUT)))
	.pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function() {
	gulp.src(path.HTML)
	.pipe(htmlreplace({
		'css': '/css/app.css',
		'js': '/js/' + path.MINIFIED_OUT
		}))
	.pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build', 'compass']);
