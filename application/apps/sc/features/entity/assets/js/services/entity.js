var entityService = new Class({
	implements : ['ready', 'registerRenderer', 'getRenderer', 'registerComposer', 'getComposers'],

	initialize : function()
	{
		SYMPHONY.services.make('entity', this, this.implements, true);
		this.renderers = [];
		this.composers = [];
	},

	ready : function()
	{
	},

	registerComposer : function(options, service)
	{
		this.composers.push({options : options, service: service});
	},

	getComposers : function()
	{
		return this.composers;
	},

	registerRenderer : function(type, options, service)
	{
	},

	getRenderer : function(type, entity)
	{
	},
});

new entityService();
