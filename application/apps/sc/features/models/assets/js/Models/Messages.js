Package('SC.Models', {
	Messages : new Class({
		implements : ['ready', 'start', 'post', 'getMessages'],

		initialize : function()
		{
			console.log('Messages::initialize');
			SYMPHONY.services.make('messages-model', this, this.implements, true);
			this.messages = [];
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

		getMessages : function()
		{
			return this.messages;
		},

		isChatType : function(message)
		{
			console.log('isChatType', message, message.type === 'MESSAGESENT')
			return message.type === 'MESSAGESENT';
		},

		getUserId : function(message)
		{
			return (message.initiator && message.initiator.user && message.initiator.user.userId) || -1;
		},

		getMessageId : function(message)
		{
			return (message.payload &&
				message.payload.messageSent &&
				message.payload.messageSent.message &&
				message.payload.messageSent.message.messageId) || -1;
		},

		getStreamId : function(message)
		{
			return (message.payload &&
				message.payload.messageSent &&
				message.payload.messageSent.message &&
				message.payload.messageSent.message.stream &&
				message.payload.messageSent.message.stream.streamId) || -1;
		},

		getFullName : function(message)
		{
			return (message.initiator && message.initiator.user && message.initiator.user.displayName) || 'Unknown';
		},

		getText : function(message)
		{
			return (message.payload &&
				message.payload.messageSent &&
				message.payload.messageSent.message &&
				message.payload.messageSent.message.message) || '';
		},

		getData : function(message)
		{
			var data = (message.payload &&
				message.payload.messageSent &&
				message.payload.messageSent.message &&
				message.payload.messageSent.message.data) || '{}';

				try
				{
					data = JSON.parse(message.payload.messageSent.message.data)
				}
				catch (e)
				{
					console.warn('cannot parse', message.payload.messageSent.message.data);
					console.warn(e.stack);
					data = {};
				}

				return data;
		},

		flattenMessage : function(message)
		{
			return {
				id: this.getMessageId(message),
				streamId: this.getUserId(message),
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
					var flattened = this.flattenMessage(one);
					this.messages.push(flattened);
					messages.push(flattened);
				}
			}, this);

			console.log('Messages::onData:firng', messages);
			this.fire('messages', messages);
		},
	})
});

new SC.Models.Messages();
