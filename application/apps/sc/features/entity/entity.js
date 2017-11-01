var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
    var entity = new Feature(app, '/sc/features/entity/');

	entity.addJS(['assets/js/services/entity.js']);

	return Q(app);
}
