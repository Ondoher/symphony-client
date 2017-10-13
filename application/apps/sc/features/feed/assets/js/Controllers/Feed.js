Package('SC.Controllers', {
	Feed : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onReady : function()
		{
			this.view = new SC.Views.Feed();
			this.view.draw()
		}
	})
});

SAPPHIRE.application.registerController('feed', new SC.Controllers.Feed());
