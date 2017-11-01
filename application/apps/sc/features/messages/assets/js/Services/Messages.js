var MessagesService = new Class({
	implements : ['start', 'ready', 'getList'],

	initialize : function()
	{
		this.serviceName = 'messages';
		SYMPHONY.services.make(this.serviceName, this, this.implements, true);
	},

	start : function()
	{
		this.messageLists = {};
	},

	ready : function()
	{
	},

	getList : function(name) {
		this.messageLists[name] = this.messageLists[name] || new SC.Utils.List();
		return this.messageLists[name];
	}
});

new MessagesService();
