var viewsService = new Class({
	implements : ['ready', 'load', 'loaded'],

	initialize : function()
	{
		SYMPHONY.services.make('views', this, this.implements, true);
		this.waiting = {};
		this.services = {};
	},

	load : function(type, name)
	{
		if (this.services[name]) return Q(this.services[name]);
		var params = Array.prototype.slice.call(arguments, 0);

		this.waiting[name] = Q.defer();

		SAPPHIRE.application.showView.apply(SAPPHIRE.application, params)
			.then(function(loaded)
			{
				if (!loaded)
				{
					console.warn('failed to load', type);
					console.warn(new Error('could not load view', type));
					this.waiting[name].reject(new Error('could not load view', type));
				}
			}.bind(this));


		return this.waiting[name].promise;
	},

	loaded : function(name, service)
	{
		this.services[name] = service;
		return this.waiting[name].resolve(service);
	}
});

new viewsService();
