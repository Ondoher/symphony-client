var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var messages = new Feature(app, '/sc/views/messages/');

	messages.addView({
		name: 'messages',
		url: 'assets/pages/messages.html',
		javascript: [
			'assets/js/Controllers/Messages.js',
			'assets/js/Views/Messages.js',
			'assets/js/Views/Group.js',
			'assets/js/Services/Messages.js',
		],
		css: ['assets/css/messages.css'],
		clone: true,
		detached: true,
	});

	return Q(app);
}
