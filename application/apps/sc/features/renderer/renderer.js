var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var renderer = new Feature(app, '/sc/features/renderer/');

	renderer.addJS(['assets/js/built/renderer.js']);
	renderer.addCSS(['assets/css/renderer.css']);

	return Q(app);
}
