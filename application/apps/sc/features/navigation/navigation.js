var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
    var navigation = new Feature(app, '/sc/features/navigation/');

	navigation.addCSS(['assets/css/navigation.css']);
	navigation.addJS(['assets/js/Services/Navigation.js']);
	navigation.addTemplates('templates/navigation.html');;

	return Q(app);
}
