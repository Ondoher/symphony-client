Package('SC.Views', {
	WebClient : new Class({
		Extends : Sapphire.View,

		initialize : function()
		{
			this.parent();
			this.headerEl = $('#main-header');
			this.navEl = $('#nav');
			this.gridEl = $('#grid');
		},

		addHeader : function(header)
		{
			this.header = header;
			this.header.attach(this.headerEl);
		},

		addNavSidebar : function(sidebar)
		{
			this.sidebar = sidebar;
			this.sidebar.attach(this.navEl);
		},

		addGrid : function(grid)
		{
			this.grid = grid;
			this.grid.attach(this.gridEl);
		}
	})
});
