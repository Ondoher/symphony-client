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
			parent.append(this.selector);
		},

		show : function(name, id)
		{
			this.views = SYMPHONY.services.subscribe('views');
			this.views.load(name, id)
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
				selector = SAPPHIRE.templates.get('grid-module');
				this.modules[id] = {
					id : id,
					service : service,
					selector: selector,
				}
			}
			else
			{
				selector = this.modules[id].selector;
			}

			service.attach(selector);
			this.selector.append(selector);
			this.currentModule = id;
		},

		pin : function(id)
		{
		},

		hide : function(id)
		{
			var module = this.modules[id];
			if (!module) return;
			if (!module.selector) return;

			module.selector.detach();
		},
	})
})
