Package('SC.Controllers', {
	Chat : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listenViewEvent('new', 'chat', this.onNew.bind(this));
		},

		onNew : function(type, id, selector, name)
		{
			console.log('onNew', type, id, selector, name)
			var service = new SC.Services.Chat(id, name, selector.children().first());
			service.setup(name);
		},
	})
});

SAPPHIRE.application.registerController('chat', new SC.Controllers.Chat());
