var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    onError = require('./onError');

module.exports = function(source, dest) {
    return gulp.src(source)
        .pipe(plumber({ onError: onError }))
        .pipe(gulp.dest(dest));
};