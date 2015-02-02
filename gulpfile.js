var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var open = require('gulp-open');

gulp.task('build', function () {
	gulp
	.src(['./src/angular-file-input.js'])
	.pipe(concat('angular-file-input.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist'));
	gulp
	.src(['./src/angular-file-input.js'])
	.pipe(concat('angular-file-input.js'))
	.pipe(gulp.dest('./dist'));
});

gulp.task('run', function () {
	gulp.src('./demo/index.html')
	.pipe(open('<%file.path%>'));
});

gulp.task('default', ['build', 'run']);