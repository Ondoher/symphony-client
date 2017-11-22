Package('SC.Views', {
	ChatBody : new Class({
		Extends : Sapphire.View,

		initialize : function()
		{
			this.parent();
		},

		setup : function(selector, editor, messages)
		{
			this.selector = selector;
			this.editor = editor;
			this.messages = messages;
			this.postButton = selector.find('.post-button');
			this.postButton.click(this.onPost.bind(this));

			editor.attach(selector.find('.editor-container'));
			messages.attach(selector.find('.messages'));
		},

		onPost : function()
		{
			var content = this.editor.get();
			this.fire('post', content, {});
		},

		setRoom : function(room)
		{
			this.room = room;
		}
	})
});
