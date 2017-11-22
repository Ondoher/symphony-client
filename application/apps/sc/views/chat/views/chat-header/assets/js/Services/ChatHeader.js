Package('Sc.Services', {
	ChatHeader : new Class({
		implements : ['attach', 'setRoom'],

		initialize : function(id, name, selector)
		{
			this.serviceName = 'chat-header-service-' + name;
			this.id = 'chat-header' + name;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.view = new Sc.Views.ChatHeader(selector);
			this.grid = SYMPHONY.services.subscribe('grid');
			return SYMPHONY.services.subscribe(this.serviceName);
		},

		attach : function(parent)
		{
			parent.append(this.selector);
		},

		setRoom : function(room)
		{
			this.room = room;
			this.view.setRoom(room);
		}
	})
});

