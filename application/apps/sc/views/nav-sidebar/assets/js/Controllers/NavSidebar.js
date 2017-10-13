Package('Sfe.Controllers', {
	NavSidebar : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();
			this.views = SYMPHONY.services.subscribe('views');

			SAPPHIRE.application.listenViewEvent('new', 'nav-sidebar', this.onNew.bind(this));
		},

		onNew : function(type, id, selector, name)
		{
			var service = new Sfe.Services.NavSidebar(id, name, selector.children().first());
			service.setup();
		},
	})
});

SAPPHIRE.application.registerController('nav-sidebar', new Sfe.Controllers.NavSidebar());
