Package('SC.Views', {
	Messages : new Class({
		Extends : Sapphire.View,

		initialize : function(selector)
		{
			this.parent();
			this.selector = selector;
			this.container = selector.find('.messages-container');
			this.groups = [];
			this.groupIdx = {};

			this.scrollWindow = throttle(function()
			{
				var el = this.container[0];
				this.container.scrollTop(el.scrollHeight - el.clientHeight);
			}.bind(this), 250);
		},

		roundToDay : function(timeStamp)
		{
			timeStamp -= timeStamp % (24 * 60 * 60 * 1000);//subtract amount of time since midnight
			timeStamp += new Date().getTimezoneOffset() * 60 * 1000;//add on the timezone offset
			return timeStamp;
		},

		addGroup : function(date)
		{
			var group = new SC.Views.Group(date);
			this.groupIdx[date] = group;
			if (this.groups.length === 0)
			{
				this.groups.push(group);
				this.container.append(group.getSelector());
			}

			var idx = this.groups.bsearch(group, function(a, b)
			{
				return a.getDate() - b.getDate();
			}, this);

			if (idx === 0)
			{
				this.groups.splice(0, 0, group);
				this.container.prepend(group.getSelector());
			}
			else if (idx === this.groups.length - 1)
			{
				this.groups.push(group);
				this.container.append(group.getSelector());
			}
			else
			{
				var beforeGroup = this.groups[idx - 1];
				this.groups.splice(idx + 1, 0, group);
				beforeGroup.getSelector().after(group.getSelector());
			}

		},

		getGroup : function(date)
		{
			if (!this.groupIdx[date]) group = this.addGroup(date)
			group = this.groupIdx[date];

			return group;
		},

		compareMessages : function(a, b)
		{
			if (a.selector) a = a.message;
			if (b.selector) b = b.message;

			aTime = a.sent;
			bTime = b.sent;

			return aTime - bTime;
		},

		sortMessages : function(messages)
		{
			messages = messages || this.messages;
			messages.sort(this.compareMessages.bind(this));

			return messages;
		},

		addMessages : function(messages)
		{
			if (!messages || messages.length === 0) return;

			messages = this.sortMessages(messages);

			messages.each(function(message)
			{
				var timeStamp = message.sent;
				var date = this.roundToDay(timeStamp);
				var group = this.getGroup(date);
				group.addMessage(message);
			}, this);

			this.scrollWindow();
		}
	})
});
