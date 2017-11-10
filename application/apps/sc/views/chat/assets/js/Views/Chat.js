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
			this.postButton = selector.find('.post-button');
			this.postButton.click(this.onPost.bind(this));

			module.setBody(selector);
			selector.append(module);
			editor.attach(selector.find('.editor-container'));
			messages.attach(selector.find('.messages'));
		},

		onPost : function()
		{
			var content = this.editor.get();
			this.fire('post', content, {});
		}
	})
});
