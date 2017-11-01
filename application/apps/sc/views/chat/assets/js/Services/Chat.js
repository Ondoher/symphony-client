Package('SC.Services', {
	Chat : new Class({
		implements : ['setup', 'attach'],

		initialize : function(id, name, selector)
		{
			this.name = name;
			this.serviceName = 'chat-service-' + name;
			this.id = 'chat-' + name;
			this.streamId = id;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.views = SYMPHONY.services.subscribe('views');
			this.view = new SC.Views.Chat(name, selector);
			this.count = 0;
			this.received = 0;
			this.streamsModel = SYMPHONY.services.subscribe('streams-model');

			return SYMPHONY.services.subscribe(this.serviceName);
		},

		bootstrap : function()
		{
			var since = Math.round(Date.now());
			console.log('since', since);
			since = since - 2 * 60 * 60 * 24 * 1000;
			console.log('new since', since);
			this.model.read(this.streamId, since, 0, 50);
//			var messages = this.model.getMessages();
		},

		setup : function(id)
		{
			this.streamId = id;
			var promises = [];

			this.messagesModel = SYMPHONY.services.subscribe('messages-model');
			promises.push(this.views.load('module', 'chat-module-' + this.name));
			promises.push(this.views.load('editor', 'chat-editor-' + this.name));
			promises.push(this.views.load('messages', 'chat-messages-' + this.name));
			promises.push(this.streamsModel.members(this.streamId));
			Q.allSettled(promises)
				.then(function(response)
				{
					this.module = response[0].value;
					this.editor = response[1].value;
					this.messages = response[2].value;

					this.editor.setStreamId(this.streamId);
					this.view.setup(this.selector, this.module, this.editor, this.messages);
					this.view.listen('post', this.onPost.bind(this));
					this.views.loaded(this.name, this);
					this.model = SYMPHONY.services.subscribe('messages-model');
					this.model.listen('messages', this.onMessages.bind(this));

					this.bootstrap();
				}.bind(this));
		},

		attach : function(parent)
		{
			parent.append(this.selector);
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
		onPost : function(message)
		{
			message = message.replace(/\n$/g, '');
			this.messagesModel.post(message);
		},
/**/
		onMessages : function(streamId, messages)
		{
			if (this.streamId != streamId) return;

			this.addMessages(messages);
		},
	})
});
