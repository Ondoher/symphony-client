var Config = {
    BROWSERIFY_BUILD_OPTS: {
        entries: [
            './src/index.js'
        ],
        extensions: ['.js'],
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    },
};

module.exports = Config;
