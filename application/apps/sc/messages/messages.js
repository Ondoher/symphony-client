exports.read = function(socket, data, callback)
{
	var params = {
		id: data.userId,
		threadId: data.threadId,
		since: data.since,
		offset: data.offset,
		limit: data.limit
	};

	return SERVER.ask('sc', 'messages', 'read', params)
		.then(function(messages)
		{
			callback(messages);
		}.bind(this));
}

exports.post = function(socket, data, callback)
{
	var params = {
		id: data.userId,
		threadId: data.threadId,
		message: data.message,
		json: data.data,
	};

	return SERVER.ask('sc', 'messages', 'post', params)
		.then(function(response)
		{
			callback(response);
		}.bind(this));
}
