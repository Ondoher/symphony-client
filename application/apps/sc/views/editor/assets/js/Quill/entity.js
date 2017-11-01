var Inline = Quill.import('blots/inline');

function InlineEntity()
{
	Inline.call(this)
}

InlineEntity = Object.merge({}, Inline, InlineEntity, {
	blotName : 'inline-entity',
	tagName : 'span',
	className: 'inline-entity',

	create : function(data)
	{
		var node = Inline.create.call();

		node.dataset.data = data;

		return node;

	},

	formats : function(node)
	{
	},

	value : function(node)
	{
	}
});

InlineEntity.prototype = Object.merge({}, Inline.prototype, {
	formats : function()
	{
/*
//		this.domNode.foo = this.domNode.innerHTML;
		console.log('formats', this, this.domNode.innerHTML)
		this.attributes.attributes.a = { value : function() {return 'foo'}};
		console.log(this.attributes.values())
		return super.formats();
*/
	}
});




