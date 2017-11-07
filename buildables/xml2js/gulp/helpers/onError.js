module.exports = function(err) {
    console.log(err);

    if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'staging') {
        process.exit(1);
    }

    this.emit('end');
};