Package('SC.Controllers', {
	ChatNav : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onReady : function()
		{
			this.view = new SC.Views.ChatNav();
			this.view.draw()
		}
	})
});

SAPPHIRE.application.registerController('chat-nav', new SC.Controllers.ChatNav());
