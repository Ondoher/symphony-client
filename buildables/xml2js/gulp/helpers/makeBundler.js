var browserify = require('browserify'),
    watchify = require('watchify'),
    hbsfy = require('hbsfy'),
    shim = require('browserify-shim'),
    onError = require('./onError'),
    args = require('yargs').argv;

module.exports = function(opts) {
    var bundler;

    opts = opts || {};
    opts.debug = !args.compress;

    if (opts.watch) {
        bundler = watchify(browserify(opts.browserifyOpts, watchify.args));
    } else {
        bundler = browserify(opts.browserifyOpts);
    }

    bundler = bundler.on('log', console.log.bind(console))
        .on('error', onError);

    return bundler;
};