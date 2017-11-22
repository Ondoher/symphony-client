Package('SC.Controllers', {
	ChatBody : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listenViewEvent('new', 'chat-body', this.onNew.bind(this));
		},

		onNew : function(type, id, selector, name, room)
		{
			var streamId = room.id;
			var service = new SC.Services.ChatBody(id, name, selector.children().first());
			service.setup(streamId);
		},
	})
});

SAPPHIRE.application.registerController('chat-body', new SC.Controllers.ChatBody());
