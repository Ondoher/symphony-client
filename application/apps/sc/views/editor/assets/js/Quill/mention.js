//import Quill from 'quill';

const Delta = Quill.import('delta');
const Inline = Quill.import('blots/inline');
const Embed = Quill.import('blots/embed');

class MentionBlot extends Embed {
	static create(value) {
		console.log('create', value);
		const node = super.create();
		node.innerHTML = '@' + value.name;
		node.setAttribute('data-id', value.id);
		node.setAttribute('data-name', value.name);
		node.style.color = 'blue';
		return node;
	}

	static value(domNode) {
		return {
			id : domNode.getAttribute('data-id'),
			name : domNode.getAttribute('data-name'),
		};
	}

/*
//	format(name, value) {
//		super.format(name, value);
//	}

	static formats(node) {
		return true;
	}

	formats() {
		var formats = super.formats();
		formats['mention'] = MentionBlot.formats(this.domNode);
		return formats;
	}
*/
}

MentionBlot.blotName = 'mention';
MentionBlot.tagName = 'SPAN';
MentionBlot.className = 'mention';

//Quill.register({
//	'formats/mention': MentionBlot
//});

const h = (tag, attrs, ...children) => {
	const elem = document.createElement(tag);
	Object.keys(attrs).forEach(key => elem[key] = attrs[key]);
	children.forEach(child => {
		if (typeof child === 'string')
			child = document.createTextNode(child);
		elem.appendChild(child);
	});
	return elem;
};

class Mentions /* extends Module*/ {
	static register() {
		Quill.register(MentionBlot, true);
	}

	constructor(quill, {onClose, onOpen, getUsers, container}) {
		this.quill = quill;
		this.onClose = onClose;
		this.onOpen = onOpen;
		this.getUsers = getUsers;
		if (typeof container === 'string') {
			this.container = this.quill.container.parentNode.querySelector(container);
		} else if (container === undefined) {
			this.container = h('ul', {});
			this.quill.container.parentNode.appendChild(this.container);
		} else {
			this.container = container;
		}
		this.container.classList.add('ql-mention-menu');

//		this.container.style.position = 'relative';
//		this.container.style.display = 'none';

		this.onSelectionChange = this.maybeUnfocus.bind(this);
		this.onTextChange = this.update.bind(this);

		this.open = false;
		this.quill.mentionDialogOpen = false;
		this.atIndex = null;
		this.focusedButton = null;
		this.buttons = [];
		this.users = [];

		quill.keyboard.addBinding({
			// TODO: Once Quill supports using event.key (#1091) use that instead of shift-2
			key: 50,  // 2
			shiftKey: true,
		}, this.onAtKey.bind(this));

/**/
		quill.keyboard.addBinding({
			key: 40,	// ArrowDown
			collapsed: true,
//			format: ['mention']
		}, this.handleArrow.bind(this));

		quill.keyboard.addBinding({
			key: 27,  // Escape
			collapsed: null,
//			format: ['mention']
		}, this.handleEscape.bind(this));
/**/
//		quill.mentionHandler = this.handleEnterTab.bind(this);
	}

	onAtKey(range, context) {
		if (this.open) return true;
		if (range.length > 0) {
			this.quill.deleteText(range.index, range.length, Quill.sources.USER);
		}
//		this.quill.insertText(range.index, '@', 'mention', null, Quill.sources.USER);
		this.quill.insertText(range.index, '@', Quill.sources.USER);
		const atSignBounds = this.quill.getBounds(range.index);
		this.quill.setSelection(range.index + 1, Quill.sources.SILENT);

		this.atIndex = range.index;
		this.container.style.left = atSignBounds.left + 'px';
		this.container.style.top = atSignBounds.top + atSignBounds.height + 'px',
		this.container.style.position = 'absolute';
		this.open = true;
		this.quill.mentionDialogOpen = true;

		this.quill.on('text-change', this.onTextChange);
		this.quill.once('selection-change', this.onSelectionChange);
		this.update();
		this.onOpen && this.onOpen();
	}

	handleArrow() {
		console.log('handleArrow', arguments);
		if (!this.open) return true;
		this.buttons[0].focus();
		return false;
	}

	handleEnterTab() {
		if (!this.open) return true;
		this.close(this.users[0]);
	}

	handleEscape() {
		if (!this.open) return true;
		this.close();
	}

	update() {
		const sel = this.quill.getSelection().index;
		if (this.atIndex >= sel) { // Deleted the at character
			return this.close(null);
		}
		this.originalQuery = this.quill.getText(this.atIndex + 1, sel - this.atIndex - 1);
		this.query = this.originalQuery.toLowerCase();
		// TODO: Should use fuse.js or similar fuzzy-matcher
		console.log('looking for users', this.query);
		this.users = this.getUsers(this.query)
			.then(function(users)
			{
				this.users = users;
				this.renderCompletions(this.users);
			}.bind(this));
	}

	maybeUnfocus() {
		if (this.container.querySelector('*:focus')) return;
		this.close(null);
	}

	renderCompletions(users) {
		while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
		const buttons = Array(users.length);
		this.buttons = buttons;
		const handler = (i, user) => event => {

			if (event.key === 'ArrowDown' || event.keyCode === 40) {
				event.preventDefault();
				buttons[Math.min(buttons.length - 1, i + 1)].focus();
			} else if (event.key === 'ArrowUp' || event.keyCode === 38) {
				event.preventDefault();
				buttons[Math.max(0, i - 1)].focus();
			} else if (event.key === 'Enter' || event.keyCode === 13
					   || event.key === ' ' || event.keyCode === 32
					   || event.key === 'Tab' || event.keyCode === 9) {
				event.preventDefault();
				this.close(user);
			} else if (event.key === 'Escape' || event.keyCode === 27) {
				event.preventDefault();
				this.close();
			} else {
				this.quill.focus();
			}
		};
		users.forEach((user, i) => {
			const li = h('li', {},
						 h('button', {type: 'button'},
						   h('span', {className: 'matched'}, user.name.slice(0, this.query.length)),
						   h('span', {className: 'unmatched'}, user.name.slice(this.query.length))));
			this.container.appendChild(li);
			buttons[i] = li.firstChild;
			// Event-handlers will be GC-ed with button on each re-render:
			buttons[i].addEventListener('keydown', handler(i, user));
			buttons[i].addEventListener('mousedown', () => this.close(user));
			buttons[i].addEventListener('focus', () => this.focusedButton = i);
			buttons[i].addEventListener('unfocus', () => this.focusedButton = null);
		});
		this.container.style.display = 'block';
	}

	close(value) {
		console.log('close', value, this.query);
		this.container.style.display = 'none';
		while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
		this.quill.off('selection-change', this.onSelectionChange);
		this.quill.off('text-change', this.onTextChange);

		let delta = new Delta()
			.retain(this.atIndex)
			.delete(this.query.length + 1);
		let newIndex;
		if (value) {

			const {id, name} = value;
			this.quill.deleteText(this.atIndex, this.query.length + 1, Quill.sources.USER);
			this.quill.insertEmbed(this.atIndex, 'mention', {name: name, id: id}, Quill.sources.USER);
			this.quill.insertText(this.atIndex + 1, ' ', Quill.sources.USER);
			newIndex = this.atIndex + 2;
		}
//		this.quill.updateContents(delta, Quill.sources.USER);
		this.quill.setSelection(newIndex, 0, Quill.sources.SILENT);
		this.quill.focus();
		this.open = false;
		this.quill.mentionDialogOpen = false;
		this.onClose && this.onClose(value);
	}

}


Quill.register('modules/mentions', Mentions);
