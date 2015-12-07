var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var reactify = require('reactify'); 
 
 
 gulp.task('default', function(){
    return browserify('./source/progressbar_app.jsx')
    		.transform(reactify)
    		.bundle()
    		.pipe(source('progressbar.js'))
    		.pipe(gulp.dest('./build/'));
});
 
