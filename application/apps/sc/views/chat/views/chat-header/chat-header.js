var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var chatHeader = new Feature(app, '/sc/views/chat/views/chat-header/');

	chatHeader.addView({
		name: 'chat-header',
		url: 'assets/pages/chat-header.html',
		javascript: [
			'assets/js/Controllers/ChatHeader.js',
			'assets/js/Views/ChatHeader.js',
			'assets/js/Services/ChatHeader.js',
		],
		css: ['assets/css/chat-header.css'],
		clone: true,
		detached: true,
	});

	return Q(app);
}
