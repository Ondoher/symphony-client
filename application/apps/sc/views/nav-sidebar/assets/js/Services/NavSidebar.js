Package('Sfe.Services', {
	NavSidebar : new Class({
		implements : ['setup', 'attach'],

		initialize : function(id, name, selector)
		{
			this.name = name;
			this.navigation = SYMPHONY.services.subscribe('navigation');
			this.serviceName = 'nav-sidebar-service-' + name;
			this.id = 'nav-sidebar-' + name;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.views = SYMPHONY.services.subscribe('views');
			this.view = new Sfe.Views.NavSidebar(name, selector);

			return SYMPHONY.services.subscribe(this.serviceName);
		},

		setup : function()
		{
			var promises = [];

			this.view.setup(this.selector);
			this.navigation.attach(this.selector.find('.navigation-container'));
			this.views.loaded(this.name, this);

/*			promises.push(this.views.load('global-access-panel', 'global-access-panel'));
			Q.allSettled(promises)
				.then(function(response)
				{
					this.view.setup(this.selector);
					this.navigation.attach(this.selector.find('.navigation-container'));
					this.views.loaded(this.name, this);
				}.bind(this));
*/
		},

		attach : function(parent)
		{
			parent.append(this.selector);
		},
	})
});
