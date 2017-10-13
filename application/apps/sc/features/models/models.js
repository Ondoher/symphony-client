var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var models = new Feature(app, '/sc/features/models/');

	models.addJS(['assets/js/Models/Service.js', 'assets/js/Models/Datafeed.js', 'assets/js/Models/Messages.js']);

	return Q(app);
}
