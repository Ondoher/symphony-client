var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var module = new Feature(app, '/sc/views/module/');

	module.addView({
		name: 'module',
		url: 'assets/pages/module.html',
		javascript: ['assets/js/Controllers/Module.js', 'assets/js/Services/Module.js'],
		css: ['assets/css/module.css'],
		clone: true,
		detached: true,
	});

	return Q(app);
}
