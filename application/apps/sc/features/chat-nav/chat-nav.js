var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var chatNav = new Feature(app, '/sc/features/chat-nav/');

 	chatNav.addJS(['assets/js/Controllers/ChatNav.js', 'assets/js/Views/ChatNav.js', 'assets/js/Services/ChatNav.js', ]);

	return Q(app);
}
