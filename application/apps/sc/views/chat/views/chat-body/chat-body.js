var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var chatBody = new Feature(app, '/sc/views/chat/views/chat-body/');

	chatBody.addView({
		name: 'chat-body',
		url: 'assets/pages/chat-body.html',
		javascript: ['assets/js/Controllers/ChatBody.js', 'assets/js/Views/ChatBody.js', 'assets/js/Services/ChatBody.js'],
		css: ['assets/css/chat-body.css'],
		clone: true,
		detached: true,
	});

	return Q(app);
}
