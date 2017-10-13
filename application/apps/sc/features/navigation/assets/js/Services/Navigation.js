Package('Sfe.Services', {
	Navigation : new Class({
		implements : ['attach', 'addHeader', 'addItem'],

		initialize : function()
		{
			SYMPHONY.services.make('navigation', this, this.implements, true);

			this.container = $('<div>')
			this.headers = {};
			this.sortOrder = [];

			return SYMPHONY.services.subscribe('navigation');
		},

		attach : function(parent)
		{
			parent.append(this.container);
		},

		addHeader : function(id, title, selectorClass, serviceName)
		{
			var service =  SYMPHONY.services.subscribe(serviceName);
			if (!service) return;
			if (this.headers[id]) return;
			var selector = SAPPHIRE.templates.get('navigation-header');

			this.headers[id] = {
				id: id,
				title: title,
				selectorClass: selectorClass,
				service: service,
				selector: selector,
				container : selector.find('.items-container'),
				items: {},
			}

			selector.find('.header-title').html(title);
			this.container.append(selector);
		},

		addItem : function(headerId, itemId, title)
		{
			var header = this.headers[headerId]
			if (!header) return;
			if (header.items[itemId]) return;
			var selector = SAPPHIRE.templates.get('navigation-item');

			header.items[itemId] = {
				headerId: headerId,
				itemId: itemId,
				title: title,
			}

			var container = header.container;
			selector.find('.item-title').html(title);
			selector.click(this.onClick.bind(this, header.items[itemId]));

			container.append(selector);
		},

		onClick : function(item)
		{
			var header = this.headers[item.headerId];
			if (!header) return;
			if (!header.items[item.itemId]) return;

			header.service.invoke('select', item.headerId, item.itemId);
		},
	})
});

new Sfe.Services.Navigation();
