Package('Sc.Services', {
	Editor : new Class({
		implements : ['attach', 'clear', 'get', 'set', 'setStreamId'],

		initialize : function(id, name, selector)
		{
			this.serviceName = 'editor-service-' + name;
			this.id = 'editor-' + name;
			SYMPHONY.services.make(this.serviceName, this, this.implements, true);
			this.selector = selector;
			this.selector.attr('id', this.id);
			this.searchers = [];
			this.mentions = SYMPHONY.services.subscribe('mentions');
			this.streams = SYMPHONY.services.subscribe('streams-model');
			this.converter = SYMPHONY.services.subscribe('converter');
			return SYMPHONY.services.subscribe(this.serviceName);
		},

		attach : function(parent)
		{
			this.entityService = SYMPHONY.services.subscribe('entity');
			this.composers = this.entityService.getComposers();
			this.processComposers();
			var container = this.selector.find('.edit-content')[0];

			this.editor = new Quill(container, {
				modules: {
                    mentions: {getUsers: this.typeahead.bind(this)},
					formula: true,
					syntax: true,
					toolbar: this.selector.find('#toolbar-container')[0],
				},
				placeholder: 'Type your message here...',
				theme: 'snow',
				bounds: container,
			});
			parent.append(this.selector);
		},

		convertToMessageML : function(html) {
			var result = this.converter.convert(html);
			console.log(result);
			return result;
		},

		get : function()
		{
			var html = this.editor.root.innerHTML;
			return this.convertToMessageML(html);
		},

		clear : function()
		{
			this.editor.setText('\n');
		},

		setStreamId : function(id)
		{
			this.streamId = id;
		},

		loadMembers : function()
		{
			if (this.roomUsers) return Q(roomUsers);
			return this.streams.members(this.streamId)
				.then(function(members)
				{
					this.roomUsers = [];
					members.each(function(member)
					{
						console.log(member);
						var user = member.user;
						user.isCreator = member.isCreator;
						user.isOwner = member.isOwner;
						user.joinDate = member.joinDate;
						this.roomUsers.push(user);
					}, this);

					return this.roomUsers;
				});
		},

		typeahead : function(query)
		{
			return this.loadMembers()
				.then(function(users)
				{
					function compare(a, b)
					{
						var namea = normalize(a.name);
						var nameb = normalize(b.name);

						return namea.localeCompare(nameb);
					}

					function normalize(name)
					{
						name = name.toLowerCase();
						name = name.replace(/ /g, '');

						return name;
					}
					var startList = [];
					var anywhereList = [];
					query = normalize(query);

					users.each(function(user)
					{
						var name = user.displayName;
						name = normalize(name);

						var idx = name.indexOf(query);
						if (idx === -1) return;
						if (idx === 0) startList.push({name: user.displayName, id: user.userId});
						else anywhereList.push({name: user.displayName, id: user.userId});
					}, this);

					startList.sort(compare);
					anywhereList.sort(compare);

					if (startList.length > 5) return startList.slice(0, 5);
					var combinedList = startList.slice(0);
					combinedList = combinedList.concat(anywhereList.slice(0, 5 - startList.length));

					return combinedList;
				}.bind(this));
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


