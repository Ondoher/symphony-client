var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var webClient = new Feature(app, '/sc/features/web-client/');

	webClient.addCSS(['assets/css/web-client.css']);
	webClient.addJS(['assets/js/Controllers/WebClient.js', 'assets/js/Views/WebClient.js']);
	webClient.addTemplates('templates/layout.html');;

	return Q(app);
}
