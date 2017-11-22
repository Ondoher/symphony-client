Package('SC', {
	Service : new Class({
		Extends : Sapphire.Eventer,
		Implements: [Sapphire.Services.AjaxService, Sapphire.Services.SocketService],

		initialize : function()
		{
			this.parent();
			this.initializeAjaxService(true);
			this.initializeSocketService(true);
			this.start();
		},

		start : function()
		{
			console.log('this.setupSocketServer', SC.socketUrl);
			this.setupSocketServer(SC.socketUrl);
		}
	})
});

SC.service = new SC.Service();
