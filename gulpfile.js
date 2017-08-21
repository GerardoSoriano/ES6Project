var gulp        = require('gulp');
var renaame     = require('gulp-rename');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var es          = require('event-stream');

gulp.task('build', function(done){

    var files = [
        './app/src/js/app.js',
        './app/src/js/login.js'
    ];

    var tasks = files.map(function(entry){

        return browserify({entries: entry, debug: true})
            .transform("babelify", { presets: ["es2015"] })
            .bundle()
            .pipe(source(entry))
            .pipe(renaame({extname: '.bundle.js'}))
            .pipe(gulp.dest('./'));

    })
    return es.merge.apply(null, tasks);

});

gulp.task('watch', ['build'], function(){
    
    gulp.watch('./app/src/js/*.js', ['build']);

});

gulp.task('default', ['build','watch']);