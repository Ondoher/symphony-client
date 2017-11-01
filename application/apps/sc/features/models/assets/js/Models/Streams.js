Package('SC.Models', {
	Streams : new Class({
		implements : ['ready', 'start', 'members'],

		initialize : function()
		{
			console.log('Messages::initialize');
			SYMPHONY.services.make('streams-model', this, this.implements, true);
		},

		start : function()
		{
			this.feed = SYMPHONY.services.subscribe('datafeed');
			this.feed.listen('data', this.onData.bind(this));
		},

		ready : function()
		{
			this.members = {};
		},

		members : function(streamId, skip, limit)
		{
			var data = {
				userId: SC.userId,
				streamId: streamId,
				skip: skip,
				limit: limit
			};

			if (this.members[streamId]) return Q(this.members[streamId]);

			return SC.service.message('sc/streams/members', data)
				.then(function(response)
				{
					console.log('response', response);
					this.members[streamId] = response.members;
				}.bind(this));
		},

		onData : function(data)
		{
		// look for join maestro messages
		},
	})
});

new SC.Models.Streams();
