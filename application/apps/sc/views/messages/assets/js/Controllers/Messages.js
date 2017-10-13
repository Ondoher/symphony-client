Package('SC.Controllers', {
	Messages : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listenViewEvent('new', 'messages', this.onNew.bind(this));
			this.views = SYMPHONY.services.subscribe('views');
		},

		onNew : function(type, id, selector, name)
		{
			var service = new SC.Services.Messages(id, name, selector.children().first());

			this.views.loaded(name, service);
		},
	})
});

SAPPHIRE.application.registerController('messages', new SC.Controllers.Messages());
