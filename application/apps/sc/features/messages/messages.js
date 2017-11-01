var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var messages = new Feature(app, '/sc/features/messages/');

 	messages.addJS(['assets/js/List.js', 'assets/js/Services/Messages.js', ]);

	return Q(app);
}
