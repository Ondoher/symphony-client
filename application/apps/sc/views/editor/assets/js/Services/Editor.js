Package('Sc.Services', {
	Editor : new Class({
		implements : ['attach', 'clear', 'getContent', 'setStreamId'],

		initialize : function(id, name, selector)
		{
			this.serviceName = 'editor-service-' + name;
			this.id = 'editor-' + name;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.searchers = [];
			this.mentions = SYMPHONY.services.subscribe('mentions') || true;
			return SYMPHONY.services.subscribe(this.serviceName);
		},

		attach : function(parent)
		{
			this.entityService = SYMPHONY.services.subscribe('entity');
			this.composers = this.entityService.getComposers();
			this.processComposers();

			console.log('this.selector.find(\'.edit-content\')[0]', this.selector.find('.edit-content')[0]);

			this.editor = new Quill(this.selector.find('.edit-content')[0], {
				modules: {
					mentions: (this.mentions) ? {getUsers: this.getUsers.bind(this)} : undefined,
					formula: true,
					syntax: true,
					toolbar: this.selector.find('#toolbar-container')[0]
				},
				placeholder: 'Compose an epic...',
				theme: 'snow'
			});
			parent.append(this.selector);
		},

		getContent : function()
		{
			var html = this.editor.value();
			if (html === '<p><br></p>') return null;
			return html;
		},

		setStreamId : function(id)
		{
			this.streamId = id;
		},

		getUsers : function(query)
		{
			console.log('getUsers', query);
			return Q([{name: 'Glenn Anderson', id: 1}, {name: 'George Washington', id: 2}, {name: 'Bucky McSkipperstein', id: 3}]);
		},

		processComposers : function()
		{
			this.composers.each(function(composer)
			{
				if (composer.options.inputType === 'search')
				{
					this.searchers.push(composer);
				}
			}, this);
		},

		clear : function()
		{
			this.editor.value('<p><br></p>');
		},

		onTextChange : function(delta, original, source)
		{
			var text = this.editor.getText();

			var searcher = this.searchers.find(function(searcher) {
				var re = searcher.options && searcher.options.re;
				var service = searcher.service;
				if (!re || !service) return;

				var result = re.exec(text);
				return (result);
			});

			if (!searcher) return;
			var re = searcher.options && searcher.options.re;
			var service = searcher.service;
			if (!re || !service) return;

			var result = re.exec(text);
			console.log(result, result[0].length, this.editor.getSelection());
			var entity = service.get(result[0]);

			console.log(entity);
		}
	})
});

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
	value: function(predicate) {
	 'use strict';
	 if (this == null) {
	   throw new TypeError('Array.prototype.find called on null or undefined');
	 }
	 if (typeof predicate !== 'function') {
	   throw new TypeError('predicate must be a function');
	 }
	 var list = Object(this);
	 var length = list.length >>> 0;
	 var thisArg = arguments[1];
	 var value;

	 for (var i = 0; i < length; i++) {
	   value = list[i];
	   if (predicate.call(thisArg, value, i, list)) {
		 return value;
	   }
	 }
	 return undefined;
	}
  });
}


