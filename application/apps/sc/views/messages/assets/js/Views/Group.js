Package('SC.Views', {
	Group : new Class({
		Extends : Sapphire.View,
		initialize : function(date)
		{
			this.parent();
			this.date = date;
			this.messages = [];
			this.messageIdx = {};
			this.selector = SAPPHIRE.templates.get('message-group');
			this.selector.find('.message-group-title').html(new Date(date).format('%b %e'));
			this.messageContainer = this.selector.find('.message-group-list');
			this.presence = SYMPHONY.services.subscribe('presence');
			this.renderer = SYMPHONY.services.subscribe('message-renderer');
		},

		getSelector : function()
		{
			return this.selector;
		},

		getDate : function()
		{
			return this.date;
		},

		compareMessages : function(a, b)
		{
			if (a.selector) a = a.message;
			if (b.selector) b = b.message;

			aTime = a.sent;
			bTime = b.sent;

			return aTime - bTime;
		},

		findInsertion : function(messages, targetMessage)
		{
			messages = messages || this.messages;

			return messages.bsearch(targetMessage, this.compareMessages, this);
		},

		setContinuation : function(selector, message1, message2)
		{
			var sent1 = message1.sent;
			var sent2 = message2.sent;
			var delta = (sent2 - sent1) / 1000;

			if (message1.userId === message2.userId && delta <= 30)
				selector.addClass('continuation');
		},

		addMessage : function(message)
		{
			if (this.messageIdx[message.id]) console.log('duplicate of ', message.messageId);
			if (this.messageIdx[message.id]) return;
			this.messageIdx[message.id] = message;

			var template = SAPPHIRE.templates.get('message');

			var toRender = {
				format: 'com.symphony.messageml.v2',
				presentationML: message.text,
				entityJSON: message.data,
			}

			var rendered = this.renderer.render(toRender);

			console.log(toRender, rendered);

			template.find('.body').append(rendered);
			template.find('.name').html(message.userName);
			template.find('.message-time').html(new Date(message.sent).format('%H:%M'));
//			this.presence.track(message.sender, template.find('.message-presence'));
//			template.find('.name').click(this.fire.bind(this, 'profile', message.sender));

			var element = {
				message: message,
				selector : template,
			};

			if (this.messages.length === 0)
			{
				this.messages.push(element);
				this.messageContainer.append(element.selector);
			}

			var isFirst = this.compareMessages(message, this.messages[0]) <= 0;
			var isLast = this.compareMessages(message, this.messages.getLast()) >0;

			if (isFirst)
			{
				this.messages.splice(0, 0, element);
				this.messageContainer.prepend(element.selector);
				// set continuation on next this.setContinuation(element.selector, insertElement.message, element.message);
			}
			else if (isLast)
			{
				this.messageContainer.append(element.selector);
				this.setContinuation(element.selector, this.messages.getLast().message, element.message);
				this.messages.push(element);
			}
			else
			{
				var insert = this.findInsertion(this.messages, message);
				var insertElement = this.messages[insert]
				this.messages.splice(insert + 1, 0, element);
				insertElement.selector.after(element.selector);
				this.setContinuation(element.selector, insertElement.message, element.message);
				// set continuation on next this.setContinuation(element.selector, insertElement.message, element.message);
			}
		},
	})
});
