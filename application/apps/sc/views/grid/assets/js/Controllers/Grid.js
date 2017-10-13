Package('Sfe.Controllers', {
	Grid : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listenViewEvent('new', 'grid', this.onNew.bind(this));
			this.views = SYMPHONY.services.subscribe('views');
		},

		onNew : function(type, id, selector, name)
		{
			var service = new Sfe.Services.Grid(id, name, selector.children().children().first());
			this.views.loaded(name, service);
		},
	})
});

SAPPHIRE.application.registerController('grid', new Sfe.Controllers.Grid());
