Package('Sfe.Services', {
	Editor : new Class({
		implements : ['attach', 'clear', 'getContent'],

		initialize : function(id, name, selector)
		{
			this.serviceName = 'editor-service-' + name;
			this.id = 'editor-' + name;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.searchers = [];
			return SYMPHONY.services.subscribe(this.serviceName);
		},

		attach : function(parent)
		{
			this.entityService = SYMPHONY.services.subscribe('entity');
			this.composers = this.entityService.getComposers();
			this.processComposers();

			this.editor = new MediumEditor(this.selector.find('.edit-container')[0], {
				disableReturn: false,
			});







/*
//				mode: Medium.richMode,
				keyContext : {
					13 : function(evt) {
						return;
						if (evt.shiftKey) return true;
						var html = this.editor.value();
						html = html.replace(/<br[~>]*>/g, '');
						this.editor.value('<p><br></p>');

						html = '<messageML>' + html + '</messageML>';
						this.fire('enter', html);
						return false
					}.bind(this),
				},
			});
			this.editor.value('<p><br></p>');
//			this.editor.on('text-change', this.onTextChange.bind(this));
/*, {
				theme: 'snow',
				modules: {
					keyboard: {
						bindings: {
							enter: {
								key: 13,
								handler: function()
								{
									var html = this.editor.root.innerHTML;
									html = '<messageML>' + html + '</messageML>';
									console.log('html', html);
//									this.fire('enter', html);
									this.clear();

								}.bind(this)
							}
						}
					}
				}
			});
			this.editor.on('text-change', this.onTextChange.bind(this));
			*/
/**/
			parent.append(this.selector);
		},

		getContent : function()
		{
			var html = this.editor.value();
			if (html === '<p><br></p>') return null;
			return html;
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


