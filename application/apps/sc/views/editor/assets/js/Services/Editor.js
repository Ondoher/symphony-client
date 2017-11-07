Package('Sc.Services', {
	Editor : new Class({
		implements : ['attach', 'clear', 'getContent', 'setStreamId'],

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
			return SYMPHONY.services.subscribe(this.serviceName);
		},

		attach : function(parent)
		{
			this.entityService = SYMPHONY.services.subscribe('entity');
			this.composers = this.entityService.getComposers();
			this.processComposers();

			this.editor = new Quill(this.selector.find('.edit-content')[0], {
				modules: {
					mentions: {getUsers: this.typeahead.bind(this)},
					formula: true,
					syntax: true,
					toolbar: this.selector.find('#toolbar-container')[0]
				},
				placeholder: 'Type your message here...',
				theme: 'snow'
			});
			parent.append(this.selector);
		},

		getContent : function()
		{
			var content = this.editor.editor.delta;
			var html = this.editor.root.innerHTML;
//			this.editor.setText('\n');
			console.log(content);
			console.log(html);
			return content;
		},

		setStreamId : function(id)
		{
			this.streamId = id;
		},

		getUsers : function(query)
		{
			console.log('getUsers', query);
			return Q([{name: 'Glenn Anderson', id: 1}, {name: 'George Washington', id: 2}, {name: 'Bucky McSkipperstein', id: 3}]);
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

					console.log(startList, anywhereList);

					if (startList.length > 5) return startList.slice(0, 5);
					var combinedList = startList.slice(0);
					combinedList = combinedList.concat(anywhereList.slice(0, 5 - startList.length));
					console.log(combinedList);

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


