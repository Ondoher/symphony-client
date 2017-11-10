var ESC_MAP = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
	"=": '&#61;'
};

function escapeHTML(s, forAttribute) {
	return s.replace(forAttribute ? /[&<>'"=]/g : /[&<>=]/g, function(c) {
		return ESC_MAP[c];
	});
}

var ConverterService = new Class({
	implements : ['start', 'ready', 'convert'],

	initialize : function()
	{
		this.serviceName = 'converter';
		SYMPHONY.services.make(this.serviceName, this, this.implements, true);
	},

	start : function()
	{
	},

	ready : function()
	{
	},

	getHTML: function(str)
	{
		var tmp = document.createElement('span');
		tmp.innerHTML = str;
		return tmp;
	},

	xmlize : function(str)
	{
		var e = this.getHTML(str);
		var xml = '';
		var serializer = new XMLSerializer()
		var nodes = Array.from(e.childNodes);

		nodes.each(function(node)
		{
			xml += serializer.serializeToString(node)
		}, this);

		return xml;
	},

	goodNode : function(type) {
		var goodNodes = ['__text__'];

		if (goodNodes.indexOf(type.toLowerCase()) !== -1) {
			return true;
		}

		return true;

//		  return Boolean(this.primitives[type.toLowerCase()]);
	},

/*
	This whole thing needs to be done using registries
*/
	tagHandler : function(node)
	{
		var type = node['#name'];

		if (type === 'em') return 'i';
		if (type === 'strong') return 'b';
	},

	classHandler : function(node)
	{
		var classesStr = node['$'] && node['$']['class'] || '';
		var classes = classesStr.toLowerCase().split(' ');
		var result;

		classes.each(function(name)
		{
			if (name === 'mention')
			{
				var id = (node['$'] && node['$']['data-id']);
				var name = (node['$'] && node['$']['data-name']);
				result = '<mention uid="' + id + '">@' + name + '</mention>';
			}
		}, this);

		return result;

	},

	parseOne : function(type, node) {
		var terminal = type === 'br' || type === 'hr' || type === 'img';
		var attributes = [];
		var goodAttr = ['src', 'href', 'class', 'shortcode', 'uid', 'tag'];

		if (node['$']) {
			_.each(node['$'], function(value, key) {
				if (goodAttr.indexOf(key) === -1) return;
				value = value.replace(/</g, '&lt;');
				value = value.replace(/>/g, '&gt;');
				value = value.replace(/&/g, '&amp;');
				attributes.push(key + '="' + value +'"');
			}, this);
		}

		var result = '<' + type + ' ' + attributes.join(' ');

		if (terminal) {
			result += '/>';
		} else {
			result += '>';
			result += this.parse(node);
			result += '</' + type + '>';
		}

		return result;
	},

	parse : function(node) {
		function parseOne(node) {
			if (!node) {
				return '';
			}

			var type = node['#name'];

			if (!this.goodNode(type)) {
				console.warn('unknown tag during conversion', type);
				return '';
			}

			switch(type) {
				case '__text__':
					return escapeHTML(node._, true);
				default:
					var classes = node['$'] && node['$']['class'];
					var result;

					result = this.classHandler(node);
					if (result) {
						return result;
					}

					result = this.tagHandler(node);
					if (result) type = result || type;

					return this.parseOne(type, node);
			}
		}

		function parseMany(nodes) {
			var result = '';
			_.each(nodes, function(node) {
				result += parseOne.call(this, node);
			}, this);

			return result;
		}

		var text = parseMany.call(this, node['$$']);

		return text;
	},

	convert : function(html)
	{
		var message = '<messageML>' + this.xmlize(html) + '</messageML>';
		var parseString = xml2js.parseString;
		var parsed;

		var options = {
			charsAsChildren: true,
			includeWhiteChars: true,
			explicitArray: true,
			explicitCharkey: true,
			explicitChildren: true,
			preserveChildrenOrder: true,
		};

		parseString(message, options, function(err, result) {
			parsed = result;
		});


		if (!parsed) {
			return {};
		}

		return '<messageML>' + this.parse(parsed.messageML) + '</messageML>';
	},
});

new ConverterService();
