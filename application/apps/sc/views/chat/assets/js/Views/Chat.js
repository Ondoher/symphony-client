Package('SC.Views', {
	Chat : new Class({
		Extends : Sapphire.View,

		initialize : function()
		{
			this.parent();
		},

		setup : function(selector, module, editor, messages)
		{
			this.selector = selector;
			this.module = module;
			this.editor = editor;
			this.messages = messages;

//			this.editor.listen('enter', this.onEnter.bind(this));
			module.setBody(selector);
			selector.append(module);
//			editor.attach(selector.find('.editor'));
			messages.attach(selector.find('.messages'));
		},

		onEnter : function(message)
		{
			this.fire('post', message);
		},
	})
});
