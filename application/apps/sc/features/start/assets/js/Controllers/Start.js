Package('SC.Controllers', {
	Start : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
			SAPPHIRE.application.listen('start', this.onStart.bind(this));
		},

		onStart : function(cb)
		{
			this.feed = SYMPHONY.services.subscribe('datafeed');
			this.feed.run(SC.userId);
			cb();
		},

		onReady : function()
		{
			this.view = new SC.Views.Start();
			this.view.draw()
		}
	})
});

SAPPHIRE.application.registerController('start', new SC.Controllers.Start());
