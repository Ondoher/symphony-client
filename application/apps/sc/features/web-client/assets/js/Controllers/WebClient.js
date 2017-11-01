Package('SC.Controllers', {
	WebClient : new Class({
		Extends : Sapphire.Controller,

		initialize : function()
		{
			this.parent();

			SAPPHIRE.application.listen('start', this.onStart.bind(this));
		},

		onStart : function(done)
		{
			var promises = [];
			this.layout = SAPPHIRE.templates.get('layout');
			$(document.body).append(this.layout);
			this.view = new SC.Views.WebClient();
			this.views = SYMPHONY.services.subscribe('views');

			promises.push(this.views.load('grid', '1'));
			promises.push(this.views.load('nav-sidebar', 'nav-sidebar'));
//			promises.push(this.views.load('main-header', 'main-header'));
			Q.allSettled(promises)
				.then(function(response)
				{
					var grid = response[0].value;
					var sidebar = response[1].value;
//					var mainHeader = response[2].value;

//					this.view.addHeader(mainHeader);
					this.view.addNavSidebar(sidebar);
					this.view.addGrid(grid);

					done();
				}.bind(this))
/**/
		}
	})
});

SAPPHIRE.application.registerController('web-client', new SC.Controllers.WebClient());
