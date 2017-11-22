Package('Sc.Views', {
	ChatHeader : new Class({
		Extends : Sapphire.View,

		initialize : function(selector)
		{
			this.parent();
			this.selector = selector;
		},

		setRoom : function(room)
		{
			this.selector.find('.room-name').text(room.roomAttributes.name);
		}
	})
});
