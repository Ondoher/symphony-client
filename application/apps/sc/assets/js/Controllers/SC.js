Package('SC.Controllers', {
	SC : new  Class({
		Extends: Sapphire.Controller,

		initialize : function()
		{
			this.parent();
			SAPPHIRE.application.listen('start', this.onStart.bind(this));
			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onStart : function(callback)
		{
			callback();
		},

		onReady : function()
		{
			this.view = new SC.Views.SC();
		}
	})
});

SAPPHIRE.application.registerController('sc', new SC.Controllers.SC());
