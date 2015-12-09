var gulp = require('gulp');

//dependencies
var uglify = require('gulp-uglify');
var concat = require('gulp-concat'); 
var rename = require('gulp-rename');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var eslint = require('gulp-eslint');
var source = require('vinyl-source-stream');

var gutil = require('gulp-util');

gulp.task('init', function () {
    del(['./build/transformed/','./build/concatenated','./dist']);
});

gulp.task('copy', function () {
  return gulp
    .src('./source/html/*.html')
    .pipe(gulp.dest('./dist/html'))
})

gulp.task('lint', function () {
    return gulp.src([
      './source/js/*.js',
      './source/jsx/*.jsx'
    ])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('transform', function(){
   return browserify('./source/jsx/progressbar_app.jsx')
   		.transform(babelify)
   		.bundle()
   		.pipe(source('progressbar.js'))
   		.pipe(gulp.dest('./build/transformed/'));
});


gulp.task('concat', function() {
    return gulp.src(['./source/js/*.js','./build/transformed/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build/concatenated/'))
        .pipe(rename('progressbar.min.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['init', 'copy', 'lint', 'transform','concat']);
