Package('SC.Models', {
	Datafeed : new Class({
		implements : ['ready', 'run'],

		initialize : function()
		{
			SYMPHONY.services.make('datafeed', this, this.implements, true);
			SC.service.listen('socketConnect', this.onSocketConnect.bind(this));
		},

		ready : function()
		{
		},

		run : function(userId)
		{
			console.log('run', userId)
			this.userId = userId;
		},


		listenFeed : function()
		{
			SC.service.socketUnlisten('feed');
			SC.service.socketListen('feed', function(data)
			{
				console.log('feed', data);
				this.fire('data', data);
			}.bind(this));
		},

		onSocketConnect : function()
		{
			console.log('connected');
			var data = {
				userId: SC.userId,
			};

			this.listenFeed();
			SC.service.message('sc/feed/start', data, 'POST')
				.then(function(user) {
					console.log('user', user);
					SC.user = user;
					this.fire('started', user);
				}.bind(this));
		},
	})
});

SAPPHIRE.application.registerModel('datafeed', new SC.Models.Datafeed());
