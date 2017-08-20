var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');

gulp.task('build', function(){

    return browserify({entries: './app/src/js/app.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./app/dist/js'));

});

gulp.task('watch', ['build'], function(){
    
    gulp.watch('./app/src/js/*.js', ['build']);

});

gulp.task('default', ['build','watch']);