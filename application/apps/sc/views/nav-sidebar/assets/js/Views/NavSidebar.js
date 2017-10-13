Package('Sfe.Views', {
	NavSidebar : new Class({
		Extends : Sapphire.View,

		initialize : function()
		{
			this.parent();
		},

		setup : function(selector, profile)
		{
			this.selector = selector;
//			this.profile = profile;

//			selector.append(profile);
//           profile.attach(selector.find('.mini-profile'));
		}
	})
});
