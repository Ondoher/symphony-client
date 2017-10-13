var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var grid = new Feature(app, '/sc/views/grid/');

	grid.addView({
		name: 'grid',
		url: 'assets/pages/grid.html',
		javascript: ['assets/js/Controllers/Grid.js', 'assets/js/Services/Grid.js'],
		css: ['assets/css/grid.css'],
	});

	return Q(app);
}
