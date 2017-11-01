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
			tinymce.init({
				target: parent[0],
				theme: 'modern',
				plugins: [
					'advlist autolink lists link image charmap print preview hr anchor pagebreak',
					'searchreplace wordcount visualblocks visualchars code fullscreen',
					'insertdatetime media nonbreaking save table contextmenu directionality',
					'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
				],
				toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
				toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
				image_advtab: true,
				templates: [
					{ title: 'Test template 1', content: 'Test 1' },
					{ title: 'Test template 2', content: 'Test 2' }
				],
				content_css: [
					'//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
					'//www.tinymce.com/css/codepen.min.css'
				],
				setup :function(ed)
				{
					this.editor = ed;
					this.editor.on('keydown', function(event)
					{
						console.log('keydown', event);
						if (event.keyCode == 13)
						{
							console.log('enter');
							event.preventDefault();
							event.stopPropagation();
							if (!event.shift)
							{
								var html = this.editor.getContent();
								console.log('html', html);
								this.fire('enter', html);
							}
							return false;
						}
					}.bind(this));
				}.bind(this),
			});

		},

		getContent : function()
		{
			var html = tinymce.activeEditor.getContent();
			console.log('html');
//			if (html === '<p><br></p>') return null;
//			return html;
			return null;
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


