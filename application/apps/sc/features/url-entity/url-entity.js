var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
    var urlEntity = new Feature(app, '/sc/features/url-entity/');

	urlEntity.addJS(['assets/js/services/composer.js']);

	return Q(app);
}
