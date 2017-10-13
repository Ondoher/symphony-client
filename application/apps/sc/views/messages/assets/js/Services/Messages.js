Package('SC.Services', {
	Messages : new Class({
		implements : ['attach', 'start', 'addMessages'],

		initialize : function(id, name, selector)
		{
			this.serviceName = 'messages-service-' + name;
			this.id = 'messages-' + name;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.view = new SC.Views.Messages(selector);
			this.principalModel = SYMPHONY.services.subscribe('principal-model');
			this.grid = SYMPHONY.services.subscribe('grid');
			return SYMPHONY.services.subscribe(this.serviceName);
		},


		attach : function(parent)
		{
			parent.append(this.selector);
		},

		addMessages : function(messages)
		{
			this.view.addMessages(messages);
		},
	})
});

