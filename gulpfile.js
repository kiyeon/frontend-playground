var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var pump = require('pump');
var concat = require('gulp-concat');
var minifyhtml = require('gulp-minify-html');

gulp.task('serve', ['sass', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("assets/js/*.js", ['js']);
    gulp.watch(["app/**/*.html"], ['html']).on("change", browserSync.reload);
});

gulp.task('html', function(cb) {
    /*pump([
        gulp.src("app/!**!/!*.html"),
        minifyhtml(),
        gulp.dest("app/")
    ], cb);*/
});

gulp.task("sass", function(cb) {
    // [Why use Pump?](https://github.com/terinjokes/gulp-uglify/blob/master/docs/why-use-pump/README.md#why-use-pump)
    pump([
        gulp.src("assets/scss/*.scss"),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        // https://www.npmjs.com/package/gulp-sass
        // https://www.npmjs.com/package/node-reset-scss
        sass({
            outputStyle: 'compressed',
            includePaths: require('node-reset-scss').includePath
        }),
        gulp.dest("app/css"),
        browserSync.stream()
    ], cb);
});

gulp.task("js", function(cb) {
    pump([
        gulp.src('assets/js/*.js'),
        concat('app.js'),
        uglify(),
        gulp.dest('app/js'),
        browserSync.stream()
    ], cb);
});



gulp.task('default', ['serve']);