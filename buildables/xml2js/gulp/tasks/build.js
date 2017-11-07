var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    plumber = require('gulp-plumber'),
    args = require('yargs').argv,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    lazypipe = require('lazypipe'),
    exorcist = require('exorcist'),
    makeBundler = require('../helpers/makeBundler'),
    onError = require('../helpers/onError');

var compress = lazypipe().pipe(buffer).pipe(function() {
    return uglify({
        mangle: false,
        output: {
            ascii_only: true
        }
    });
});

var exorcise = function() {
    return exorcist('dist/services.map');
};

gulp.task('build', function() {
    var bundler = makeBundler({
        watch: false,
        browserifyOpts: global.CONFIG.BROWSERIFY_BUILD_OPTS
    });

    var rebundle = function() {
        return bundler.bundle()
            .pipe(gulpif(!args.compress, exorcise()))
            .pipe(source('xml2js.js'))
            .pipe(plumber({ onError: onError }))
            .pipe(gulpif(args.compress, compress()))
            .pipe(gulp.dest('dist'));
    };

    return rebundle();
});
