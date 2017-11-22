Package('Sfe.Services', {
	Grid : new Class({
		implements : ['attach', 'show', 'pin'],

		initialize : function(id, name, selector)
		{
			SYMPHONY.services.make('grid', this, this.implements, true);

			this.selector = selector;
			this.modules = {}

			return SYMPHONY.services.subscribe('grid');
		},

		attach : function(parent)
		{
			this.selector = parent;
		},

		show : function(name, id)
		{
			var params = Array.prototype.slice.call(arguments, 0);
			this.views = SYMPHONY.services.subscribe('views');
			this.views.load.apply(this.views, params)
				.then(function(service)
				{
					this.add(id, service);
				}.bind(this));
		},

		add : function(id, service)
		{
			var selector;

			if (this.currentModule) this.hide(this.currentModule);
			if (!this.modules[id])
			{
				this.modules[id] = {
					id : id,
					service : service,
				}
			}

			service.attach(this.selector);
			this.currentModule = id;
		},

		pin : function(id)
		{
		},

		hide : function(id)
		{
			var module = this.modules[id];
			if (!module) return;
			if (!module.service) return;

			module.service.detach();
		},
	})
})
