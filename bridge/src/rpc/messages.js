var Q = require('q');
var RpcHandler =  require('sapphire-rpc').RpcHandler;
var runner = require('../users/runner');

class RpcUser extends RpcHandler {
	constructor ()
	{
		super('messages', SERVER);
	}

	read (channel, data)
	{
		var id = data.id;
		var user = runner.getUser(id);
		if (!user) return 'no user found.';
		var messages = user.messages;
		if (!messages) return 'user not initialized.';

		return messages.read(data.threadId, data.since, data.offset, data.limit);
	}

	post (channel, data)
	{
		var id = data.id;
		var threadId = data.threadId;
		var message = data.message;
		var json = data.json;
		var user = runner.getUser(id);
		if (!user) return 'no user found.';

		var messages = user.messages;
		if (!messages) return 'user not initialized.';

		return messages.post(threadId, message, json);
	}
}

var rpc = new RpcUser();
