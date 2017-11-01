Package('Sc.Controllers', {
	Editor : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();
			this.views = SYMPHONY.services.subscribe('views');

			SAPPHIRE.application.listenViewEvent('new', 'editor', this.onNew.bind(this));
		},

		onNew : function(type, id, selector, name)
		{
			var service = new Sc.Services.Editor(id, name, selector.children().first());

			this.views.loaded(name, service);
		},
	})
});

SAPPHIRE.application.registerController('editor', new Sc.Controllers.Editor());
