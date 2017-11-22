Package('SC.Controllers', {
	Module : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();
			this.views = SYMPHONY.services.subscribe('views');

			SAPPHIRE.application.listenViewEvent('new', 'module', this.onNew.bind(this));
		},

		onNew : function(type, id, selector, name)
		{
			var service = new SC.Services.Module(id, name, selector.children().first());
			selector.addClass('grid-module draggable');
			selector.attr('draggable', "true");

			this.views.loaded(name, service);
		},
	})
});

SAPPHIRE.application.registerController('module', new SC.Controllers.Module());
