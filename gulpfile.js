var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var pump = require('pump');

gulp.task('serve', ['sass', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("assets/js/*.js", ['js']);
    gulp.watch(["app/**/*.html"]).on("change", browserSync.reload);
});

gulp.task("sass", function(cb) {
    pump([
        gulp.src("assets/scss/*.scss"),
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
        gulp.src("assets/js/*.js"),
        uglify(),
        gulp.dest("app/js"),
        browserSync.stream()
    ], cb);
});



gulp.task('default', ['serve']);