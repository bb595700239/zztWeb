var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var path = {
	sass: ['sass/**.scss']
}
gulp.task('sass', function () {
	return 	gulp.src(path.sass)
	        .pipe(sass())
	        .pipe(minifyCss({
	            keepSpecialComments: 0
	        }))
	        .pipe(rename({ extname: '.min.css' }))
	        .pipe(gulp.dest('css'));
});

gulp.task('watch',["sass"],function () {
    gulp.watch(path.sass,['sass']);
});