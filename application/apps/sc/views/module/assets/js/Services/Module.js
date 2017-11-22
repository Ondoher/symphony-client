Package('SC.Services', {
	Module : new Class({
		implements : ['attach', 'detach', 'setBody', 'setHeader', 'canHandle', 'getTargets'],

		initialize : function(id, name, selector)
		{
			this.serviceName = 'module-service-' + name;
			this.id = 'module-' + name;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
//			this.drag = SYMPHONY.services.subscribe('drag');
//			this.drag.add(this.registryService);
			this.id = id;
			this.name = name;
			this.selector = selector;
			this.selector.attr('id', this.id);

			return SYMPHONY.services.subscribe(this.serviceName);
		},

		attach : function(parent)
		{
			parent.append(this.selector);
		},

		detach : function(parent)
		{
			this.selector.detach();
		},

		setBody : function(body)
		{
			this.selector.find('.module-body').empty();
			body.attach(this.selector.find('.module-body'));
		},

		setHeader : function(header)
		{
			this.selector.find('.module-header').empty();
			header.attach(this.selector.find('.module-header'));
		},

		canHandle : function(target)
		{
			return target.attr('id') === this.id;
		},

		getTargets : function() {
			var targets = {
				split: 'edges',
				elements: []
			}

			var elements = $('#grid .grid-module');

			elements.each(function(idx, el)
			{
				targets.elements.push({el: $(el), data: {}});
			}.bind(this));

			return targets;
		}
	})
});
