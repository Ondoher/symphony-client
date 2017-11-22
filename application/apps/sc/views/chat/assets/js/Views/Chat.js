Package('SC.Views', {
	Chat : new Class({
		Extends : Sapphire.View,

		initialize : function()
		{
			this.parent();
		},

		setup : function(module, header, body, room)
		{
			this.module = module;
			this.header = header;
			this.body = body;

			this.header.setRoom(room);
			this.body.setRoom(room);

			module.setHeader(header);
			module.setBody(body);
		},
	})
});
