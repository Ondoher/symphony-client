Package('SC.Models', {
	Messages : new Class({
		implements : ['ready', 'start', 'read', 'post', 'getMessages'],

		initialize : function()
		{
			console.log('Messages::initialize');
			SYMPHONY.services.make('messages-model', this, this.implements, true);
			this.incomming = '';
		},

		start : function()
		{
			console.log('Messages::start');
			this.feed = SYMPHONY.services.subscribe('datafeed');
			this.feed.listen('data', this.onData.bind(this));
		},

		ready : function()
		{
			this.messageLists = SYMPHONY.services.subscribe('messages');
		},

		post : function(messageText)
		{
		/*
			message = {
				sessionHash : SFE.sessionToken,
				threadHash : SFE.threadToken,
				presentationML : messageText,
				responseFormat: 'JSON',
			};

			SFE.service.call(SFE.urls.send, message, 'POST');
		*/
		},

		read : function(threadId, since, offset, limit)
		{
			var data = {
				userId: SC.userId,
				threadId: threadId,
				since: since,
				offset: offset,
				limit: limit
			};

			SC.service.message('sc/messages/read', data)
				.then(function(data) {
					console.log('messages', data);
					var messages = [];
					data.each(function(one)
					{
						var flattened = this.flattenMessage(one);
						messages.push(flattened);
					}, this);

					this.addMessages(messages);
				}.bind(this));
		},

		addMessages : function(messages)
		{
			var newMessages = {};

			messages.each(function(message)
			{
				newMessages[message.streamId] = newMessages[message.streamId] || [];
				newMessages[message.streamId].push(message);
			}, this);

			Object.each(newMessages, function(messages, streamId)
			{
				var list = this.messageLists.getList(streamId);

				messages.each(function(message)
				{
					list.add('' + message.sent + '.' + message.id, message);
				}, this);

				this.fire('messages', streamId, messages);
			}, this);

		},

		getMessages : function(threadId)
		{
			return this.messages;
		},

		isChatType : function(message)
		{
		// !TODO: weed out maestro messages
			return true;
			console.log('isChatType', message, message.type === 'MESSAGESENT')
			return message.type === 'MESSAGESENT';
		},

		getMessageId : function(message)
		{
			return (message.messageId) || -1;
		},

		getUserId : function(message)
		{
			return (message.user.userId) || -1;
		},

		getStreamId : function(message)
		{
			return (message.stream.streamId) || -1;
		},

		getFullName : function(message)
		{
			return (message.user && message.user.displayName) || 'Unknown';
		},

		getText : function(message)
		{
			return (message.message) || '';
		},

		getData : function(message)
		{
			var data = (message.data) || '{}';

			try
			{
				data = JSON.parse(data)
			}
			catch (e)
			{
				console.warn('cannot parse', data);
				console.warn(e.stack);
				data = {};
			}

			return data;
		},

		flattenMessage : function(message)
		{
			return {
				id: this.getMessageId(message),
				streamId: this.getStreamId(message),
				userId: this.getUserId(message),
				userName: this.getFullName(message),
				sent: message.timestamp,
				text: this.getText(message),
				data : this.getData(message),
				original: message,
			}
		},

		onData : function(data)
		{
			console.log('Messages::onData', data);
			var messages = [];
			data.each(function(one)
			{
				if (this.isChatType(one))
				{
					var message = message.payload && message.payload.messageSent && message.payload.messageSent.message;

					if (!message) return;
					var flattened = this.flattenMessage(message);
					messages.push(flattened);
				}
			}, this);

			this.addMessages(messages);
		},
	})
});

new SC.Models.Messages();
