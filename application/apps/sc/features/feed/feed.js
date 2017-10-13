var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var feed = new Feature(app, '/sc/features/feed/');

  	feed.addJS(['assets/js/Controllers/Feed.js', 'assets/js/Views/Feed.js']);

	return Q(app);
}
