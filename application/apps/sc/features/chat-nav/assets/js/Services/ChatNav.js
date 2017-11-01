var ChatNavService = new Class({
	implements : ['start', 'ready', 'select'],

	initialize : function()
	{
		this.serviceName = 'chat-nav';
		SYMPHONY.services.make(this.serviceName, this, this.implements, true);
	},

	start : function()
	{
		this.navigation = SYMPHONY.services.subscribe('navigation');
		this.feed = SYMPHONY.services.subscribe('datafeed');
		this.feed.listen('started', this.onStarted.bind(this));
	},

	ready : function()
	{
		this.grid = SYMPHONY.services.subscribe('grid');
	},

	select : function(header, id)
	{
		console.log('select', header, id);
		this.grid.show('chat', id);

	},

	onStarted : function()
	{
		this.navigation.addHeader('chat-header', 'CONVERSATIONS', '', this.serviceName);
		var user = SC.user;

		Object.each(user.streams, function(stream)
		{
			if (stream.streamType.type === 'ROOM')
			{
				this.navigation.addItem('chat-header', stream.id, stream.roomAttributes.name);
			}
		}, this);
	}
});

new ChatNavService();
