Package('SC.Services', {
	ChatBody : new Class({
		implements : ['setup', 'attach'],

		initialize : function(id, viewName, selector)
		{
			this.viewName = viewName;
			this.serviceName = 'chat-body-service-' + viewName;
			this.id = 'chat-body-' + viewName;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.views = SYMPHONY.services.subscribe('views');
			this.view = new SC.Views.ChatBody(name, selector);
			this.count = 0;
			this.received = 0;
			this.streamsModel = SYMPHONY.services.subscribe('streams-model');

			return SYMPHONY.services.subscribe(this.serviceName);
		},

		bootstrap : function()
		{
			var since = Math.round(Date.now());
			since = since - 2 * 60 * 60 * 24 * 1000;
			this.model.read(this.streamId, since, 0, 50);
		},

		setup : function(id)
		{
			this.streamId = id;
			var promises = [];

			this.messagesModel = SYMPHONY.services.subscribe('messages-model');
			promises.push(this.views.load('editor', 'chat-editor-' + this.viewName));
			promises.push(this.views.load('messages', 'chat-messages-' + this.viewName));
			promises.push(this.streamsModel.members(this.streamId));
			Q.allSettled(promises)
				.then(function(response)
				{
					this.editor = response[0].value;
					this.messages = response[1].value;

					this.editor.setStreamId(this.streamId);
					this.view.setup(this.selector, this.editor, this.messages);
					this.view.listen('post', this.onPost.bind(this));
					this.views.loaded(this.viewName, this);
					this.model = SYMPHONY.services.subscribe('messages-model');
					this.model.listen('messages', this.onMessages.bind(this));

					this.bootstrap();
				}.bind(this)).done();
		},

		attach : function(parent)
		{
			parent.append(this.selector);
		},

		setRoom : function(room)
		{
			this.room = room;
			this.view.setRoom(room);
		},

		addMessages : function(messages)
		{
			this.received += messages.length;
			var toSend = [];
			messages.each(function(message)
			{
				toSend.push(message);
			}, this);

			this.count += toSend.length;
			this.messages.addMessages(toSend);
		},

/**/
		onPost : function(message, data)
		{
			this.messagesModel.post(this.streamId, message, data);
			this.editor.clear();
		},
/**/
		onMessages : function(streamId, messages)
		{
			if (this.streamId != streamId) return;

			this.addMessages(messages);
		},
	})
});
