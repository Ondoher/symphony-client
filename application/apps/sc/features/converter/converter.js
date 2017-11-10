var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var converter = new Feature(app, '/sc/features/converter/');

 	converter.addJS(['assets/js/Controllers/Converter.js', 'assets/js/Views/Converter.js', 'assets/js/Services/Converter.js', ]);

	return Q(app);
}
