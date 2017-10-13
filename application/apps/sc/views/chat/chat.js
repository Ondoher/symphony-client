var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var chat = new Feature(app, '/sc/views/chat/');

	chat.addView({
		name: 'chat',
		url: 'assets/pages/chat.html',
		javascript: ['assets/js/Controllers/Chat.js', 'assets/js/Views/Chat.js', 'assets/js/Services/Chat.js'],
		css: ['assets/css/chat.css'],
		clone: true,
		detached: true,
	});

	return Q(app);
}
