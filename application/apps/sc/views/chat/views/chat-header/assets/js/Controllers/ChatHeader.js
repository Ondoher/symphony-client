Package('Sc.Controllers', {
	ChatHeader : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listenViewEvent('new', 'chat-header', this.onNew.bind(this));
			this.views = SYMPHONY.services.subscribe('views');
		},

		onNew : function(type, id, selector, name)
		{
			var service = new Sc.Services.ChatHeader(id, name, selector.children().first());

			this.views.loaded(name, service);
		},
	})
});

SAPPHIRE.application.registerController('chat-header', new Sc.Controllers.ChatHeader());
