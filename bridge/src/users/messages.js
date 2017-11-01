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

}


module.exports = Messages;
