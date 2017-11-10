var symphonyApi = require('symphony-api');
var Q = require('q');

class Messages {
	constructor (id, api)
	{
		this.id = id;
		this.api = api;
	}

	read (threadId, since, offset, limit)
	{
		return this.api.message.v4.read(threadId, since, offset, limit);
	}

	post (threadId, message, data)
	{
		console.log(threadId, message, data);
		return this.api.message.v4.send(threadId, message, data);
	}
}


module.exports = Messages;
