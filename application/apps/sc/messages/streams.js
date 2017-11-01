exports.members = function(socket, data, callback)
{
	var params = {
		id: data.userId,
		streamId: data.streamId,
		skip: data.skip,
		limit: data.limit
	};

	return SERVER.ask('sc', 'user', 'members', params)
		.then(function(messages)
		{
			callback(messages);
		}.bind(this));
}
