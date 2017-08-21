var gulp        = require('gulp');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var es          = require('event-stream');

gulp.task('sass', function(){
    return gulp.src('./app/src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('js', function(){
    var files = [
        'app.js',
        'login.js'
    ];
    var tasks = files.map(function(entry){
        return browserify({entries: './app/src/js/' + entry, debug: true})
            .transform("babelify", { presets: ["es2015"] })
            .bundle()
            .pipe(source(entry))
            .pipe(rename({extname: '.bundle.js'}))
            .pipe(gulp.dest('./app/dist/js'));
    })
    return es.merge.apply(null, tasks);
});
    
gulp.task('watch', ['js','sass'], function(){
    gulp.watch('./app/src/js/*.js', ['js']);
    gulp.watch('./app/src/scss/*.scss', ['sass'])
});

gulp.task('default', ['js','sass','watch']);