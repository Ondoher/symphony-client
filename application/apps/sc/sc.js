var Q = require('q');
var sapphire = require('sapphire-express');
require('./rpc/rpc');

function main(req, res, app)
{
	app.addCSS([
		'/sc/assets/css/sc.css',
		'/sc/assets/css/flex.css',
		'/sc/assets/css/fonts.css',
		'/sc/assets/css/workspace.css',
		'/sc/assets/css/grid.css',
		'/sc/assets/tempo/tempo.css',
	]);

	app.addJS([
		'/socket.io/socket.io.js',
		'/assets/js/lib/translate.js',
		'/assets/js/lib/templates.js',
		'/assets/js/lib/ajax-service.js',
		'/assets/js/lib/socket-service.js',
		'/sc/assets/js/polyfills.js',
		'/sc/assets/js/3rdParty/underscore.js',
	]);

	return Q(app)
}

function use(type, name, req, res)
{
	var module = require('./' + type + '/' + name + '/' + name + '.js');
	return function(app)
	{
		return module(req, res, app);
	}
}

exports.getApplication = function(req, res)
{
	var session = req.session.get();
	var app = new sapphire.Application('SC', req, res);

	app.setTitle('Open Source Symphony Client');
	app.setBody('apps/sc/templates/body.html');
	app.setMaster('apps/sc/templates/master.html');
	app.addVariable('baseUrl', CONFIG.baseUrl);
	app.addVariable('userId', 131);
	app.addConfig('socketPort', process.env.socketPort);
	app.addConfig('socketUrl', CONFIG.baseSocketUrl + ':' + process.env.socketPort);
	app.addVariable('foo', 'bar');

	return main(req, res, app)
		.then(sapphire.features.animator.bind(sapphire.features.animator, req, res))
		.then(sapphire.features.dialogs.bind(sapphire.features.dialogs, req, res))
		.then(use('features', 'service', req, res))
		.then(use('features', 'views', req, res))
		.then(use('features', 'drag', req, res))
		.then(use('features', 'models', req, res))
		.then(use('features', 'web-client', req, res))
		.then(use('features', 'start', req, res))
		.then(use('features', 'navigation', req, res))
		.then(use('features', 'chat-nav', req, res))
		.then(use('features', 'messages', req, res))
        .then(use('features', 'renderer', req, res))
        .then(use('features', 'entity', req, res))
        .then(use('features', 'url-entity', req, res))
		.then(use('views', 'nav-sidebar', req, res))
		.then(use('views', 'grid', req, res))
		.then(use('views', 'module', req, res))
		.then(use('views', 'editor', req, res))
		.then(use('views', 'messages', req, res))
		.then(use('views', 'chat', req, res))
		.then(function(app)
		{
			return Q(app);
		})
}
