var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var editor = new Feature(app, '/sc/views/editor/');

	app.addJS([
		'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js',
	], true);

	editor.addView({
		name: 'editor',
		url: 'assets/pages/editor.html',
		javascript: ['assets/js/Controllers/Editor.js', 'assets/js/Views/Editor.js', 'assets/js/Services/Editor.js',
			'assets/js/3rdParty/quill/quill.core.js',
			'assets/js/3rdParty/quill/quill.js',
			'assets/js/Quill/mention.js',

/*
			'assets/js/3rdParty/medium-editor.js',
			'assets/js/3rdParty/medium/undo.js',
			'assets/js/3rdParty/medium/rangy-core.js',
			'assets/js/3rdParty/medium/rangy-classapplier.js',
			'assets/js/3rdParty/medium/medium.js',
*/
		],
		css: [
			'assets/css/editor.css',
			'assets/css/mention.css',
			'assets/css/3rdParty/quill/quill.core.css',
			'assets/css/3rdParty/quill/quill.snow.css',
			'assets/css/3rdParty/quill/quill.bubble.css',
//			'assets/css/3rdParty/highlight/default.css',
			'assets/css/3rdParty/highlight/codepen-embed.css',
		],
		clone: true,
		detached: true,
	});

	return Q(app);
}
