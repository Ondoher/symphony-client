var DragService = new Class({
	implements : ['ready', 'add'],

	initialize : function()
	{
		SYMPHONY.services.make('drag', this, this.implements, true);
		this.services = [];
		this.covers = [];
		this.dragHandlers = [];
	},

	ready : function()
	{
		var root = $(window.document);

		root.on('dragstart', '.draggable', this.onDragStart.bind(this));
		root.on('dragend', '.draggable', this.onDragEnd.bind(this));
	},

	add : function(dragService)
	{
		this.services.push(dragService);
	},

	makeDropTarget : function(target, service, type, el, data)
	{
		target.addClass('dropzone');

		target.on('dragenter', this.onDragEnter.bind(this, service, type, this.source, target, el, data));
		target.on('dragleave', this.onDragLeave.bind(this, service, type, this.source, target, el, data));
		target.on('drop', this.onDrop.bind(this, service, type, this.source, el, data));
	},

	makeDropSpan : function(left, top, width, height)
	{
		var style = 'left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px; height: ' + height + 'px;';
		return $('<span style="' + style + '">');
	},

	cleanUp : function()
	{
		this.dragHandlers = [];

		this.covers.each(function(el)
		{
			el.remove();
		}, this);

		this.covers = [];
	},

	onDragStart : function(e)
	{
		var target = e.target;
		e.originalEvent.dataTransfer.effectAllowed = 'move';

		this.dragHandlers = [];
		this.covers = [];
		this.source = target;

	// find all the services that can handle a drop of this element
		this.services.each(function(service)
		{
			var handler = service.invoke('canHandle', $(target));
			if (handler) this.dragHandlers.push(service);
		}, this);

		if (this.dragHandlers.length === 0)
		{
			e.preventDefault(true);
			e.stopPropagation();
			return;
		}

	// add target span elements for each potential drop target
		this.dragHandlers.each(function(service)
		{
			var targets = service.invoke('getTargets');
			if (!targets || !targets.elements) return;

			targets.elements.each(function(target)
			{
				var el = target.el;
				var data = target.data;

				var height = el.height();
				var width = el.width();
				var cover = this.makeDropSpan(0, 0, width, height);
				switch (targets.split)
				{
					case 'over':
						this.makeDropTarget(cover, service, 'body', el, data);
						break;

					case 'hsplit':
						var splitHeight = Math.floor(height / 2);
						var top = this.makeDropSpan(0, 0, width, splitHeight);
						var bottom = this.makeDropSpan(0, splitHeight, width, splitHeight);

						this.makeDropTarget(top, service, 'top', el, data);
						this.makeDropTarget(bottom, service, 'bottom', el, data);

						cover.append(top);
						cover.append(bottom);
						break;

					case 'vsplit':
						var splitWidth = Math.floor(width / 2);
						var left = this.makeDropSpan(0, 0, splitWidth, height);
						var right = this.makeDropSpan(splitWidth, 0, splitWidth, height);

						this.makeDropTarget(left, service, 'left', el, data);
						this.makeDropTarget(right, service, 'right', el, data);

						cover.append(left);
						cover.append(right);
						break;

					case 'hedges':
						var edgeWidth = Math.floor(Math.min(width * 0.1, 25));
						var mainWidth = width - edgeWidth * 2;

						var leftEdge = this.makeDropSpan(0, 0, edgeWidth, height);
						var rightEdge = this.makeDropSpan(width - edgeWidth, 0, edgeWidth, height);
						var body = this.makeDropSpan(edgeWidth, 0, width - edgeWidth * 2, height);

						this.makeDropTarget(leftEdge, service, 'leftEdge', el, data);
						this.makeDropTarget(rightEdge, service, 'rightEdge', el, data);
						this.makeDropTarget(body, service, 'body', el, data);

						cover.append(rightEdge);
						cover.append(body);
						cover.append(leftEdge);
						break;

					case 'vedges':
						var edgeHeight = Math.floor(Math.min(height * 0.1, 25));
						var mainHeight = height - edgeHeight * 2;

						var topEdge = this.makeDropSpan(0, 0, width, edgeHeight);
						var bottomEdge = this.makeDropSpan(0, height - edgeHeight, width, edgeHeight);
						var body = this.makeDropSpan(0, edgeHeight, width, height - edgeHeight * 2);

						this.makeDropTarget(topEdge, service, 'topEdge', el, data);
						this.makeDropTarget(bottomEdge, service, 'bottomEdge', el, data);
						this.makeDropTarget(body, service, 'body', el, data);

						cover.append(topEdge);
						cover.append(body);
						cover.append(bottomEdge);
						break;

					case 'edges':
						var edgeWidth = Math.floor(Math.min(width * 0.1, 25));
						var edgeHeight = Math.floor(Math.min(height * 0.1, 25));
						var mainWidth = width - edgeWidth * 2;
						var mainHeight = height - edgeHeight * 2;

						var leftEdge = this.makeDropSpan(0, 0, edgeWidth, height);
						var rightEdge = this.makeDropSpan(width - edgeWidth, 0, edgeWidth, height);
						var topEdge = this.makeDropSpan(edgeWidth, 0, width - edgeWidth * 2, edgeHeight);
						var bottomEdge = this.makeDropSpan(edgeWidth, height - edgeHeight, width - edgeWidth * 2, edgeHeight);
						var body = this.makeDropSpan(edgeWidth, edgeHeight, width- edgeWidth * 2, height - edgeHeight * 2);

						this.makeDropTarget(topEdge, service, 'topEdge', el, data);
						this.makeDropTarget(bottomEdge, service, 'bottomnEdge', el, data);
						this.makeDropTarget(leftEdge, service, 'leftEdge', el, data);
						this.makeDropTarget(rightEdge, service, 'rightEdge', el, data);
						this.makeDropTarget(body, service, 'body', el, data);

						cover.append(rightEdge);
						cover.append(topEdge);
						cover.append(body);
						cover.append(leftEdge);
						cover.append(bottomEdge);
						break;
				}

				el.append(cover);
				this.covers.push(cover);
			}, this);
		}, this);
	},

	onDragEnd : function()
	{
		this.cleanUp();
	},

	onDragEnter : function(service, type, source, target, el, data, e)
	{
		target.addClass('dropzone-hover');
		var valid = service.invoke('enter', type, source, el, data);
		if (!valid || valid === undefined)
		{
			e.preventDefault(true);
			e.stopPropagation();
		}
	},

	onDragLeave : function(service, type, source, target, el, data, e)
	{
		target.removeClass('dropzone-hover');
		var valid = service.invoke('leave', type, source, el, data);
		if (!valid || valid === undefined)
		{
			e.preventDefault(true);
			e.stopPropagation();
		}
	},

	onDrop : function(service, type, source, el, data)
	{
		var valid = service.invoke('drop', type, source, el, data);
		if (!valid || valid === undefined)
		{
			e.preventDefault(true);
			e.stopPropagation();
		}

		this.cleanUp();
	},

});

new DragService();
