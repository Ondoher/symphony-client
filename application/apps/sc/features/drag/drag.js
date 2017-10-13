var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var drag = new Feature(app, '/sc/features/drag/');

	drag.addJS(['assets/js/Services/Drag.js']);
	drag.addCSS(['assets/css/drag.css']);

	return Q(app);
}
