var UrlComposerService = new Class({
	implements : ['ready', 'get'],

	initialize : function()
	{
		SYMPHONY.services.make('url-composer', this, this.implements, true);
	},

	ready : function()
	{
		this.entityService = SYMPHONY.services.subscribe('entity');
		this.entityService.registerComposer({
			inputType: 'search',
			re : /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/i
		}, SYMPHONY.services.subscribe('url-composer'));
	},

	get : function(text)
	{
		return {
			type: 'com.symphony.string.url',
			url: text
		}
	}
});

new UrlComposerService();
