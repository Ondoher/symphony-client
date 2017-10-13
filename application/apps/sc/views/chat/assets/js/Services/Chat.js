Package('SC.Services', {
	Chat : new Class({
		implements : ['setup', 'attach'],

		initialize : function(id, name, selector)
		{
			this.name = name;
			this.serviceName = 'chat-service-' + name;
			this.id = 'chat-' + name;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.views = SYMPHONY.services.subscribe('views');
			this.view = new SC.Views.Chat(name, selector);
			this.count = 0;
			this.received = 0;

			return SYMPHONY.services.subscribe(this.serviceName);
		},

		setup : function()
		{
			var promises = [];

			this.messagesModel = SYMPHONY.services.subscribe('messages-model');
			promises.push(this.views.load('module', 'chat-module-' + this.name));
//			promises.push(this.views.load('editor', 'chat-editor-' + this.name));
			promises.push(this.views.load('messages', 'chat-messages-' + this.name));
			Q.allSettled(promises)
				.then(function(response)
				{
					this.module = response[0].value;
//					this.editor = response[1].value;
					this.messages = response[1].value;
					this.view.setup(this.selector, this.module, this.editor, this.messages);
//					this.view.listen('post', this.onPost.bind(this));
					this.views.loaded(this.name, this);
					this.model = SYMPHONY.services.subscribe('messages-model');
					this.model.listen('messages', this.onMessages.bind(this));
					var messages = this.model.getMessages();

					this.addMessages(messages);
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
//				if (message.workflow) return;
				toSend.push(message);
			}, this);

			this.count += toSend.length;
			this.messages.addMessages(toSend);
		},

/*
		onPost : function(message)
		{
			message = message.replace(/\n$/g, '');
			this.messagesModel.post(message);
		},
*/
		onMessages : function(messages)
		{
		// filter mine
			this.addMessages(messages);
		},
	})
});
