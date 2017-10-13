var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
    var navSidebar = new Feature(app, '/sc/views/nav-sidebar/');

	navSidebar.addView({
		name: 'nav-sidebar',
		url: 'assets/pages/nav-sidebar.html',
		javascript: ['assets/js/Controllers/NavSidebar.js', 'assets/js/Views/NavSidebar.js', 'assets/js/Services/NavSidebar.js'],
		css: ['assets/css/nav-sidebar.css'],
		clone: true,
		detached: true,
	});

	return Q(app);
}
