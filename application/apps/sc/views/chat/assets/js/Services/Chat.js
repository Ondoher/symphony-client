Package('SC.Services', {
	Chat : new Class({
		implements : ['setup', 'attach'],

		initialize : function(id, viewName, selector)
		{
			this.viewName = viewName;
			this.serviceName = 'chat-service-' + viewName;
			this.id = 'chat-' + viewName;
			this.streamId = id;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.views = SYMPHONY.services.subscribe('views');
			this.view = new SC.Views.Chat(name, selector);

			return SYMPHONY.services.subscribe(this.serviceName);
		},

		setup : function(room)
		{
			this.room = room;
			this.streamId = room.id;
			this.name = room.roomAttributes.name;
			var promises = [];

			promises.push(this.views.load('module', 'chat-module-' + this.viewName));
			promises.push(this.views.load('chat-header', 'chat-header-' + this.viewName, this.room));
			promises.push(this.views.load('chat-body', 'chat-body-' + this.viewName, this.room));
			Q.allSettled(promises)
				.then(function(response)
				{
					this.module = response[0].value;
					this.header = response[1].value;
					this.body = response[2].value;

					this.view.setup(this.module, this.header, this.body, this.room);
					this.views.loaded(this.viewName, this);
				}.bind(this)).done();
		},

		attach : function(parent)
		{
			this.module.attach(parent);
		},

		detach : function()
		{
			this.module.detach();
		},
	})
});
