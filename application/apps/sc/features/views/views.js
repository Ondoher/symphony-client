var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var views = new Feature(app, '/sc/features/views/');

	views.addJS(['assets/js/services/views.js']);

	return Q(app);
}
