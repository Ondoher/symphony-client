var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var service = new Feature(app, '/sc/features/service/');

	service.addJS(['assets/js/util.js', 'assets/js/service.js', 'assets/js/registry.js', 'assets/js/start.js'])

	return Q(app);
}
